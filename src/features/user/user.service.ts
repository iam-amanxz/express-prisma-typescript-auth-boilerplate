import { UserApi } from "../../api";
import { User } from "../../api/user.api";

export class UserService {
  constructor(private api: UserApi) {}

  async getByEmail(email: string): Promise<User | null> {
    return this.api.findByEmail(email);
  }
}
