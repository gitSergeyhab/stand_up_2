
import {createTransport, Transporter} from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { userService } from './user-service';

class MailService {

    // с гугла и яндекса не работает - надо искать...
    transporter: Transporter<SMTPTransport.SentMessageInfo>;
    constructor() {
        this.transporter = createTransport({
            host: process.env.SMTP_HOST_Y,
            port: +process.env.SMTP_PORT_Y,
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL_Y,
                pass: process.env.SMTP_PASSWORD_Y,
            },
            logger: true
        })
    }

    async sendActivationMail({email, link} : {email: string, link: string}) {
        await this.transporter.sendMail({
            from: process.env.SMTP_MAIL_Y,
            to: email,
            subject: `Активация аккаунта на ${ process.env.API_URL}`,
            text:'',
            html: 
                `
                <div>
                    <h1>Чтобы активировать ваш аккаунт перейдите по ссылке</h1>
                    <a href="${link}">Ссылка на активацию</a>
                </div>
                `
        })
        
    }

    async sendActivationMailImitation({email, link} : {email: string, link: string}) {
        await userService.activate({activationLink: link});
    }
}

export const mailService = new MailService();