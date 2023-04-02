import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { ApiBadRequestResponse, ApiConflictResponse, ApiOperation } from '@nestjs/swagger';
import { RegisterInput } from '../dto/register.input';
import { ExistAccountInput } from '../dto/exist-account.input';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post('exist-account')
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

  @Post('register')
  @HttpCode(200)
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBadRequestResponse({
    description: 'Одно из полей содержит не верные данные',
  })
  @ApiConflictResponse({ description: 'Такой пользователь уже существует' })
  async register(
    @Body() payload: RegisterInput,
  ) {
    const user = await this.accountService.createUser(payload);

    return user;
  }


}

