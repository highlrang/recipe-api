import { registerAs } from "@nestjs/config";

export default registerAs('email', () => ({

        service: "gmail",
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASSWORD
        },
        baseUrl: "localhost:3000"

    })
);