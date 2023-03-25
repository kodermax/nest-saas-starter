/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('notes')
export class NoteController {
    constructor(private readonly service: NoteService) { }

    @Get()
    findNotes() {
        return this.service.findNotes();
    }
}
