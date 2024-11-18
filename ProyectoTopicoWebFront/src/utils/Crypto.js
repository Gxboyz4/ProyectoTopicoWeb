export class Crypto{
    constructor(){}

    static encryptData(data){
        try{
            const encryptData = btoa(JSON.stringify(data));
            return encryptData;
        }catch(error){
            return data;
        }
    }

    static decryptData(data){
        try{
            const decryptData = atob(data);
            return JSON.parse(decryptData);
        }catch(error){
            return data;
        }
    }

}