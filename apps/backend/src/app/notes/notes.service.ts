/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { Notes } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesService {
    constructor(private prisma: PrismaService) { }

    async findNotes(): Promise<Notes[]> {
        await this.prisma.note.create({
            data: {
                title: 'title',
                content: 'test'
            }
        })
        return this.prisma.note.findMany();
    }
}
