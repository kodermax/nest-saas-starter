import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { ApiBadRequestResponse, ApiConflictResponse, ApiOperation } from '@nestjs/swagger';
import { RegisterInput } from '../dto/register.input';
import { ExistAccountInput } from '../dto/exist-account.input';
import { Request } from 'express';

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
  @HttpCode(200)
  @ApiOperation({ summary: 'Создание аккаунта пользователя' })
  @ApiBadRequestResponse({
    description: 'Одно из полей содержит не верные данные',
  })
  @ApiConflictResponse({ description: 'Такой пользователь уже существует' })
  async register(
    @Body() payload: RegisterInput,
    @Req() request: Request
  ) {
    const { tenantId } = request.cookies
    const user = await this.accountService.createUser(payload, tenantId);

    return user;
  }


}

