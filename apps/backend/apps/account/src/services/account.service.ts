import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { RegisterInput } from '../dto/register.input';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService,
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
        throw new ConflictException(`Email ${payload.email} already used.`);
      }
      throw new Error(e);
    }
  }
  public getHello(): string {
    return 'Hello World!';
  }
}
