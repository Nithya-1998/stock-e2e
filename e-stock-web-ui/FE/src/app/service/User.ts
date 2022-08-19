export interface User{
    id?:any;
    firstName:string;
    lastName:string;
    password?: string;
    role?:string;
    age: number;
    phoneNumber: number;
    emailId: string;
    dateOfBirth: string;
    isLoggedIn?: boolean
}
