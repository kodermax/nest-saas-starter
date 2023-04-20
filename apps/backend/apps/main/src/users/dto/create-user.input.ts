import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserInputDto {

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @MinLength(3)
    firstName: string;

    @IsString()
    @MinLength(3)
    lastName: string;
}