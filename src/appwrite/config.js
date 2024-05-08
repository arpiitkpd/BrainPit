import conf from '../conf/conf.js'
import { Client, Databases, Storage, Query , ID} from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createProfile({name, userName, tag ,userId, bio }){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                userId,
                {
                    name,
                    userName,
                    tag,
                    bio,
                    userId
                }
            )

        } catch (error) {
            console.log("Appwrite serive :: createProfile :: error", error);
        }
    }

    async createPost({title, content, status, featuredImage, userId, department, likes, comment}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content, 
                    status, 
                    featuredImage, 
                    userId, 
                    department, 
                    likes, 
                    comment
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

async getUserById(userId,queries = [Query.equal("userId",userId)]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteProfileCollectionId, queries)
        } catch (error) {
            console.log("Appwrite serive :: getUser :: error", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
           return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("appwrite service :: getPOsts() :: ", error);
            return false;
        }
    }

    async getPost(id){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, id)
        } catch (error) {
            console.log("appwrite service :: getPOst() :: ", error);
            return false;
        }
    }

    async getProfile(id){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteProfileCollectionId, id)
        } catch (error) {
            console.log("appwrite service :: getProfile() :: ", error);
            return false;
        }
    }

    async deletePost(id){
        try {
           await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, id)
           return true;
        } catch (error) {
            console.log("appwrite service :: deletePOst() :: ", error);
            return false
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, department}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    department

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }
    async updateProfile(id ,{name, userName, bio, tag}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                id,
                {
                    name,
                    userName, 
                    bio, 
                    tag
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updateProfie :: error", error);
        }
    }

    async getDeptPost(dept,queries = [Query.equal("department",dept)]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
         } catch (error) {
             console.log("appwrite service :: getDeptPOsts() :: ", error);
             return false;
         }
    }

    async getQueryPost(query, queries=[Query.contains("title", query)]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
         } catch (error) {
             console.log("appwrite service :: getQueryPost() :: ", error);
             return false;
         }
    }
    
    
    // storage services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log("appwrite service :: uploadfile() :: ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
             return true;
        } catch (error) {
            console.log("appwrite service :: deletefile() :: ", error);
            return false;
        }
    }

    
    getFilePreview(fileId){
        console.log(fileId);
            return this.bucket.getFilePreview("661b711d487a7b105c02", fileId)
        }
    


}    


const appwriteService = new Service();

export default appwriteService