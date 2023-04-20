/*
https://docs.nestjs.com/providers#services
*/

import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Notes } from '@prisma/client';

@Injectable()
export class NotesService {
    constructor(private prisma: PrismaService) { }

    async findNotes(): Promise<Notes[]> {
        return this.prisma.note.findMany();
    }
}
