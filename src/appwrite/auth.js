import conf from '../conf/conf.js'
import {Client, Account,Databases, Storage, ID} from 'appwrite'

export class AuthService{

    client = new Client();
    databases;
    account;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)

        this.account = new Account(this.client)
    }

    async createAccount({email, password, name }){
        try {
            
            const userAccount = await this.account.create(ID.unique(), email , password, name)

            if(userAccount){
                
                return this.login({email, password})
            }else{
             return userAccount;
            }

        } catch (error) {
            console.log("error in create appwrite account", error);
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
            
        } catch (error) {
            console.log("error in login appwrite account", error);
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("error in getUSer appwrite account", error);
            
        }
        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions()

        } catch (error) {
            console.log("error in login appwrite account", error);
        
        }
        return null
    }

}

const authService = new AuthService()

export default authService;