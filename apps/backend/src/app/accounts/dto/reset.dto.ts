import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RequestPasswordResetInputDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;
}

export class ResetInputDto {
    @ApiProperty()
    @MinLength(5)
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly token: string;
}