import { autoInjectable } from "tsyringe";
import { UserApi } from "../../api/user.api";
import {
  EmailExistsException,
  InvalidCredentialsException,
} from "../../exceptions-and-responses";
import { generateHash, generateSalt } from "../../utils";

interface SignupDto {
  email: string;
  password: string;
}
interface SigninDto {
  email: string;
  password: string;
}

@autoInjectable()
export class AuthService {
  constructor(private api: UserApi) {}

  signUp = async (dto: SignupDto): Promise<boolean> => {
    const { email, password } = dto;

    const emailExists = await this.api.findByEmail(email);

    if (emailExists) {
      throw new EmailExistsException(email);
    }

    const salt = generateSalt();
    const hash = generateHash(password, salt);

    await this.api.create({ hash, salt, email });

    return true;
  };

  signIn = async (dto: SigninDto): Promise<boolean> => {
    const { email, password } = dto;

    const existingUser = await this.api.findByEmail(email);

    if (!existingUser) {
      throw new InvalidCredentialsException();
    }

    const { hash, salt } = existingUser;
    const newHash = generateHash(password, salt);

    if (hash !== newHash) {
      throw new InvalidCredentialsException();
    }

    return true;
  };
}
