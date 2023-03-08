import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { PasswordResetContext } from './contexts/password-reset.context';
import { ISendMailOptions } from './interfaces/send-mail-options.interface';
import path from 'path';
import fs from 'fs';
import { compile } from 'handlebars';
import mjml2html from 'mjml';

@Injectable()
export class MailService {
    transporter: any;
    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            host: 'in-v3.mailjet.com',
            port: 587,
            secure: false,
            auth: {
                user: this.configService.get('MJ_APIKEY_PUBLIC'),
                pass: this.configService.get('MJ_APIKEY_PRIVATE'),
            }
        });
    }
    public sendPasswordReset(name: string, email: string, token: string) {
        const context: PasswordResetContext = {
            siteUrl: this.configService.get('siteUrl'),
            resetUrl: `${this.configService.get('siteUrl')}/password-reset-confirmation?token=${encodeURI(token)}`,
            name,
            email
        };

        return this.send({
            template: 'password-reset',
            to: email,
            subject: `Password Reset Request`,
            context,
        })
    }

    private compileTemplate(options: ISendMailOptions) {
        const templateFile = path.join('src/assets/mail', options.template + '.mjml')
        const mjmlTemplate = fs.readFileSync(templateFile, 'utf8');
        const template = compile(mjmlTemplate);
        const mjml = template(options.context);
        const htmlOutput = mjml2html(mjml);
        return htmlOutput.html;
    }

    public async send(options: ISendMailOptions) {
        options.from = {
            name: this.configService.get('mail.senderName'),
            address: this.configService.get('mail.senderEmail'),
        }
        options.html = this.compileTemplate(options)
        await this.sendMail(options);
    }

    private async sendMail(sendMailOptions: ISendMailOptions) {
        if (this.configService.get('SKIP_SEND_MAIL') === 'Y') {
            console.log('try send email: ', sendMailOptions.to);
            return;
        }
        await this.transporter.sendMail(sendMailOptions, (err) => {
            if (err !== null) {
                console.log(sendMailOptions.to);
                console.log(err);
            }
        });
    } catch(error) {
        console.error(error);
    }
}
