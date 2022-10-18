import { http } from '@/network';
import type { IUser, UserLoginInfo } from '@/types';
class UserService {
  readonly #USER_SERVICE_URL_PREFIX = 'user';
  // 用户进行登录
  async login(user: UserLoginInfo) {
    return await http.post('/login', user);
  }
  // 用户退出登录
  async logout(username: string) {
    return await http.get('/logout', { username }, false);
  }
  // 更新用户部分信息
  async update(id: number, username: string, avatar: string, showLoadingMessage = true) {
    return await http.patch(this.#USER_SERVICE_URL_PREFIX, { id, username, avatar }, showLoadingMessage);
  }
}

const userService = new UserService();

export default userService;
