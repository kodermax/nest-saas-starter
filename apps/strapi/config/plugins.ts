export default ({ env }) => ({
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'in-v3.mailjet.com'),
                port: env('SMTP_PORT', 587),
                secure: false,
                auth: {
                    user: env('SMTP_USERNAME'),
                    pass: env('SMTP_PASSWORD'),
                },
            },
            settings: {
                defaultFrom: 'kodermax@yandex.ru',
                defaultReplyTo: 'kodermax@yandex.ru',
            },
        },
    },
});
