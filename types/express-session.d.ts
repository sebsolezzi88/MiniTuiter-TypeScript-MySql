import 'express-session';

declare module 'express-session' {
  interface Session {
    error?: string;
    success?: string
    userId?:number
    userName?:string
  }
}