/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly service: NotesService) { }

    @Get()
    findNotes() {
        return this.service.findNotes();
    }
}
