import { AES, enc } from 'crypto-js';

export class LocalStorage {

    private static _key = "2476dbd2-57f2-42ca-9cb9-583963f15193";

    public static SetString(key: string, value: string): void{
        if (LocalStorage.isBrowser()) {
            if (localStorage != null) {
                value = AES.encrypt(value, LocalStorage._key).toString();
                localStorage.setItem(key, value);
            }
        }
    }

    public static SetItem(key: string, value: any): void {
        if (LocalStorage.isBrowser()) {
            if (localStorage != null) {
                var asString = JSON.stringify(value);
                asString = AES.encrypt(asString, LocalStorage._key).toString();
                localStorage.setItem(key, asString);
            }
        }
    }

    public static GetString(key: string): string {
        if (LocalStorage.isBrowser()) {
            if (localStorage != null) {
                var value = localStorage.getItem(key);
                if (value != null) {
                    value = AES.decrypt(value, LocalStorage._key).toString(enc.Utf8);
                    return value;
                }
            }
        }

        return '';
    }

    public static GetItem(key: string): any {
        if (LocalStorage.isBrowser()) {
            if (localStorage != null) {
                var value = localStorage.getItem(key);
                if (value != null) {
                    value = AES.decrypt(value, LocalStorage._key).toString( enc.Utf8);
                    try {
                        var asObject = JSON.parse(value);
                        if (asObject != null) {
                            return asObject;
                        }
                    } catch (error) {
                        return value;
                    }
                }
            }
        }

        return null;
    }

    public static removeItem(key: string): void {
        if (LocalStorage.isBrowser()) {
            localStorage.removeItem(key);
        }
    }

    public static removeAllItems(): void {
        if (LocalStorage.isBrowser()) {
            var platformSave = this.GetString('PLATFORM');
            localStorage.clear();
            this.SetString('PLATFORM',platformSave);
        }
    }

    private static isBrowser() {
        try {
            if (localStorage != null) {
                return true;
            }
        } catch (e) {

        }
        return false;
    }
}