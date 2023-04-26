import { LoginUserDataCC } from '../types/user-types';

const STORAGE_KEY = 'su-auth-user-token';

class StorageUtils {
  storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  _getData() {
    const dataString = this.storage.getItem(STORAGE_KEY);
    const data = dataString ? JSON.parse(dataString) as LoginUserDataCC : null;
    return data;
  }

  // setData(data: LoginUserDataCC) {
  //   localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // }

  setData(data: LoginUserDataCC) {
    const { accessToken, user } = data;
    this.storage.setItem(STORAGE_KEY, JSON.stringify({ accessToken, user }));
  }

  getUser() {
    const data = this._getData();
    const user = data ? data.user : null;
    return user;
  }

  getToken(bearer = true) {
    const token = this._getData()?.accessToken;
    if (!token) {
      return '';
    }
    return bearer ? `Bearer ${token}` : token;
  }

  removeData() {
    this.storage.removeItem(STORAGE_KEY);
  }
}

export const storageUtils = new StorageUtils();
