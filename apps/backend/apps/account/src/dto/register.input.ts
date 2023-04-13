import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterInput {

    @ApiProperty({ example: 'kodermax@gmail.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'qwertymax' })
    @IsNotEmpty()
    @MinLength(5)
    password: string;
}