import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { ApiBadRequestResponse, ApiConflictResponse, ApiOperation } from '@nestjs/swagger';
import { RegisterInput } from '../dto/register.input';
import { ExistAccountInput } from '../dto/exist-account.input';
import { Request, Response } from 'express';
import { VerifyEmailCode } from '../dto/verify-email-code.dto';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post('check-availability')
  @HttpCode(200)
  @ApiOperation({ summary: 'Проверка существования пользователя' })
  @ApiConflictResponse({ description: 'Такой пользователь уже существует' })
  async existAccount(@Body() payload: ExistAccountInput) {
    const result = await this.accountService.existAccount(payload.email)
    return { result }
  }

  @Get()
  getHello(): string {
    return this.accountService.getHello();
  }

  @Post()
  @ApiOperation({ summary: 'Создание аккаунта пользователя' })
  @ApiBadRequestResponse({
    description: 'Одно из полей содержит не верные данные',
  })
  @ApiConflictResponse({ description: 'Такой пользователь уже существует' })
  async register(
    @Body() payload: RegisterInput,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request
  ) {
    const { tenantId } = request.cookies
    const user = await this.accountService.createUser(payload, tenantId);
    const token = this.accountService.getAccountRegisterToken(user);
    response.cookie('RegToken', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      path: '/',
      maxAge: 0
    });
    return user;
  }


  @Post('verify-email-code')
  @HttpCode(200)
  @ApiOperation({ summary: 'Проверка кода верификации почты' })
  async verifyEmailCode(@Body() payload: VerifyEmailCode) {
    const res = await this.accountService.verifyEmailCode(payload.code)
    return res;
  }
}

