import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginInput {
    @IsEmail()
    @ApiProperty({ default: 'admin@starter.com' })
    email: string;

    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({ default: 'admin' })
    password: string;
}