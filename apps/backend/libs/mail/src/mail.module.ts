import { MailService } from './mail.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }
