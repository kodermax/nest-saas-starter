import { PrismaService } from '@app/prisma';
import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { RegisterInput } from '../dto/register.input';
import { PasswordService } from '@app/auth';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService
  ) {

  }


  public async createUser(payload: RegisterInput): Promise<User> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );
    try {
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          roles: ['User'],
        },
      });
      return user;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(`Email ${payload.email} уже используется.`);
      }
      throw new Error(e);
    }
  }

  public async existAccount(email: any): Promise<boolean> {
    const user = await this.prisma.user.findFirst({ where: { email } })
    if (user !== null) {
      throw new ConflictException('Этот аккаунт уже используется')
    }
    return false;
  }


  public getHello(): string {
    return 'Hello World!';
  }
}