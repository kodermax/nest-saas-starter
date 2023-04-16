/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';

@Controller()
export class IndexController {

    @Get()
    public index() {
        return 'Hello, World!';
    }

}
