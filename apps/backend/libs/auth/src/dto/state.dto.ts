import { ApiProperty } from '@nestjs/swagger';

export class AuthStateDto {

    @ApiProperty()
    email: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    id: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    middleName: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    role: string;
}
