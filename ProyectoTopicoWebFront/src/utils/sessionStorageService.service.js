import {Crypto} from './Crypto.js';

export class SessionStorageService{
    constructor(){}

    static setItem(key, value){
        const encryptData = Crypto.encryptData(value);
        sessionStorage.setItem(key, encryptData);
    }

    static getItem(key){
        const encryptData = sessionStorage.getItem(key);
        return Crypto.decryptData(encryptData);
    }
}