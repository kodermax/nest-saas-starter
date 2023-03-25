import { SendMailOptions } from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';

export interface Address {
    address: string;
    name: string;
}

export interface AttachmentLikeObject {
    path: string;
}

export type TextEncoding = 'quoted-printable' | 'base64';

export interface ISendMailOptions extends SendMailOptions {
    attachments?: Attachment[];
    bcc?: string | Address | Array<string | Address>;
    cc?: string | Address | Array<string | Address>;
    context?: {
        [name: string]: any;
    };
    date?: Date | string;
    encoding?: string;
    from?: string | Address;
    headers?: Headers;
    html?: string | Buffer;
    inReplyTo?: string | Address;
    raw?: string | Buffer;
    references?: string | string[];
    replyTo?: string | Address;
    sender?: string | Address;
    subject?: string;
    template?: string;
    text?: string | Buffer | AttachmentLikeObject;
    textEncoding?: TextEncoding;
    to?: string | Address | Array<string | Address>;
    transporterName?: string;
}