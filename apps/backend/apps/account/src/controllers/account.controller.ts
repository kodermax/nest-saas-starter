import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { ApiBadRequestResponse, ApiConflictResponse, ApiOperation } from '@nestjs/swagger';
import { RegisterInput } from '../dto/register.input';
import { ExistAccountInput } from '../dto/exist-account.input';
import { Request, Response } from 'express';
import { VerifyEmailCode } from '../dto/verify-email-code.dto';
import { JwtRegGuard } from '../guards/jwt-reg.guard';
import { RequestWithUser } from '@app/auth/interfaces/user';
import { ConfigService } from '@nestjs/config';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService, private config: ConfigService) { }

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

  @Get('reg-token')
  @ApiOperation({ summary: 'Расшифровка RegToken' })
  @UseGuards(JwtRegGuard)
  parseRegToken(@Req() req: RequestWithUser) {
    const { user } = req
    return {
      id: user.id,
      email: user.email
    }
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
      secure: this.config.get('ENVIRONMENT') === 'development' ? false : true,
      path: '/',
      maxAge: 3600 * 3600,
      domain: 'localhost',
    });
    return user;
  }


  @Post('verify-email-code')
  @HttpCode(200)
  @UseGuards(JwtRegGuard)
  @ApiOperation({ summary: 'Проверка кода верификации почты' })
  async verifyEmailCode(@Body() payload: VerifyEmailCode, @Res({ passthrough: true }) response: Response, @Req() request: RequestWithUser
  ) {
    const { user, cookies: { tenantId } } = request
    await this.accountService.verifyEmailCode(payload.code)
    const cookies = await this.accountService.getAuthCookies(tenantId, user);
    for (const item of cookies) {
      response.cookie(item.name, item.value, item.options);
    }
    return {
      status: 'ok'
    };
  }
}

