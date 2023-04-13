import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, Length } from "class-validator";

export class VerifyEmailCode {
    @ApiProperty()
    @IsNumberString()
    @Length(4, 4)
    code: string
}