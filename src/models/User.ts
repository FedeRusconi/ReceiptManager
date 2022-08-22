import { IHttpClient } from "../@types/IHttpClient";
import { IHttpResponse } from "../@types/IHttpResponse";
import { IUser } from "../@types/IUser";
import { HttpService } from "../services/HttpService";
import { useUserStore } from "../store/user";

export class User implements IUser, IHttpClient {
  http = HttpService.instance();

  store = useUserStore();

  _id: string;

  firstName: string;

  lastName: string;

  email: string;

  password?: string;

  confirmPassword?: string;

  constructor(user?: IUser) {
    if (user) {
      this._id = user._id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
    } else {
      this._id = '';
      this.firstName = '';
      this.lastName = '';
      this.email = '';
    }
  }

  /**
   * Register a new user
   */
  public async create(): Promise<IHttpResponse> {
    const {firstName, lastName, email, password, confirmPassword} = this;
    return this.http.post('auth/register', {firstName, lastName, email, password, confirmPassword})
      .then((response) => {
        this._id = response.data.payload._id;
        localStorage.setItem(HttpService.TOKEN_KEY, response.data.payload.token);
        this.store.setCurrentUser(this);
        return response.data as IHttpResponse;
      });
  }

  /**
   * Log in user
   */
  public async login(): Promise<IHttpResponse> {
    const {email, password} = this;
    return this.http.post('auth/login', {email, password})
      .then((response) => {
        const authUser = response.data.payload as IUser;
        this._id = authUser._id;
        this.firstName = authUser.firstName;
        this.lastName = authUser.lastName;
        localStorage.setItem(HttpService.TOKEN_KEY, response.data.payload.token);
        this.store.setCurrentUser(this);
        return response.data as IHttpResponse;
      });
  }

  /**
   * Log out user
   */
  public logout() {
    localStorage.removeItem(HttpService.TOKEN_KEY);
    this.store.resetCurrentUser();
    return true;
  }
}