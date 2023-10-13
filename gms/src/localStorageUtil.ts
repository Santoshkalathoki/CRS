export class LocalStorageUtil {

  protected static readonly localStorageName = 'gmsLS';
  protected static readonly localStorageNameEmail = 'gmsLSE';

  public static getStorage(): LocalStorage {
    const userJson = localStorage.getItem(this.localStorageName);
    return userJson !== null ? JSON.parse(userJson) : new LocalStorage();
  }

  public static setStorage(data: LocalStorage): void {
    localStorage.setItem(this.localStorageName, JSON.stringify(data));
  }

  public static clearStorage(): void {
    LocalStorageUtil.setStorage(new LocalStorage());
  }

  public static getEmailStorage(): LocalStorageEmail {
    const emailJson = localStorage.getItem(this.localStorageNameEmail);
    return emailJson !== null ? JSON.parse(emailJson) : new LocalStorageEmail();
  }

  public static setEmailStorage(data: LocalStorageEmail): void {
    localStorage.setItem(this.localStorageNameEmail, JSON.stringify(data));
  }

  public static clearEmailStorage(): void {
    LocalStorageUtil.setEmailStorage(new LocalStorageEmail());
  }

}

export class LocalStorage {
  id!: number;
  name!: string;
  email!: string;
  is_admin!: boolean;
  is_approved!: boolean;
  token!: any
}

export class LocalStorageEmail {
  rememberMeEmail!: string;
}
