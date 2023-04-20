import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class ExistAccountInput {
    @ApiProperty()
    @IsEmail({}, { message: 'Не правильно указан Email' })
    email: string;
}