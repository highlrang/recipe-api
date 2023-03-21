export class UserUpdateDto{
    userId: number;
    userName?: string;
    verificationToken?: string;
    certifiedYn?: boolean;
    address?: string;
}