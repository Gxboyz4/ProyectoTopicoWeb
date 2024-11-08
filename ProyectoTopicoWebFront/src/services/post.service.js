
import { postsData } from '../data/postsData.js';

export class PostService {
    static getPosts() {
        return Array.isArray(postsData) ? postsData : [];
    }

    static getPostById(postId){
        // HACER PETICION A LA API
        return postsData.find(post => post.id === postId);
    }


}