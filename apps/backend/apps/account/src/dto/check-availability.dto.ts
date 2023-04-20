import { IsString } from "class-validator";

export class CheckAvailabilityDto {
    @IsString()
    domain: string;
}