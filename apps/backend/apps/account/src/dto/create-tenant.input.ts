import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateTenantInput {
    @ApiProperty()
    @IsString()
    domain: string;
}