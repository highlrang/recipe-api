import { Inject, Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import emailConfig from 'src/config/emailConfig';
import { ConfigType } from '@nestjs/config';


interface EmailOptions{
    to: string;
    subject: string;
    html: string;
}

@Injectable()
export class EmailService {
    
    private transporter: Mail;

    constructor(
        @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
    ) {
        
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: config.auth.user,
                pass: config.auth.pass
            }
        });
    }

    async sendUserJoinVerification(email: string, signupVerifyToken: string){
        const baseUrl = 'http://localhost:3000';
        const url = `${baseUrl}/api/v1/user/email-verify?signupVerifyToken=${signupVerifyToken}`;

        const mailOptions: EmailOptions = {
            to: email,
            subject: '가입 인증 메일',
            html: '가입 확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>'
                + `<form action="${url}" method="POST">`
                + '<button>가입확인</button>'
                + '</form>'            
        }

        return await this.transporter.sendMail(mailOptions);
    }
}
