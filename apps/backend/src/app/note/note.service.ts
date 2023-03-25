/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Note, PrismaClient } from '@prisma/client';

@Injectable()
export class NoteService {
    constructor(private prisma: PrismaClient) { }

    async findNotes(): Promise<Note[]> {
        await this.prisma.note.create({
            data: {
                title: 'title',
                content: 'test'
            }
        })
        return this.prisma.note.findMany();
    }
}
