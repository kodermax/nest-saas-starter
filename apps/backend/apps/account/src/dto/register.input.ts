import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterInput {

    @ApiProperty({ default: 'kodermax@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ default: 'qwertymax' })
    @IsNotEmpty()
    @MinLength(5)
    password: string;
}