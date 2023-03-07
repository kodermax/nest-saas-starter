import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid'

@Injectable()
export class MailService {
    transporter: any;
    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport(nodemailerSendgrid({
            apiKey: process.env.SENDGRID_API_KEY
        }));
    }

    public async sendMail(
        to: string,
        name: string,
        subject: string,
        html: string,
        attachments?: Array<{ content: Buffer; filename: string }>,
        cc: Array<string> = [],
    ) {
        if (this.configService.get('SKIP_SEND_MAIL') === 'Y') {
            console.log('try send email: ', to);
            return;
        }
        try {
            const list = [...cc, ...(this.configService.get('mail.cc') || [])];
            const params = {
                from: {
                    name: this.configService.get('mail.senderName'),
                    address: this.configService.get('mail.senderEmail'),
                },
                cc: [...new Set(list)],
                to: {
                    name: name,
                    address: to,
                },
                subject: subject,
                html: html,
                attachments,
            };
            await this.transporter.sendMail(params, (err, info) => {
                if (err !== null) {
                    console.log(to);
                    console.log(name);
                    console.log(err);
                } else {
                    console.log(info.envelope);
                    console.log(info.messageId);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
}
