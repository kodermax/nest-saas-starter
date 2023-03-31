import { NoteService } from './note.service';
import { NoteController } from './note.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TenantModule } from '../tenant/tenant.module';

@Module({
    imports: [TenantModule],
    controllers: [
        NoteController],
    providers: [
        NoteService],
})
export class NoteModule { }
