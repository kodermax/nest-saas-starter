import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class RequestPasswordResetInputDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;
}