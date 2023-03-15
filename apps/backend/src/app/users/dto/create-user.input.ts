import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserInputDto {

    @IsString()
    @MinLength(3)
    firstName: string;

    @IsString()
    @MinLength(3)
    lastName: string;

    @IsEmail()
    @IsString()
    email: string;
}