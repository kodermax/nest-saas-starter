import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        NotesController],
    providers: [
        NotesService],
})
export class NotesModule { }
