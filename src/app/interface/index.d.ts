import { JwtPayload } from 'jsonwebtoken';

interface IUser extends JwtPayload {
  role: string;
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
