export class UserUpdateDto{
    userId: string;
    userName?: string;
    verificationToken?: string;
    certifiedYn?: boolean;
    address?: string;
}