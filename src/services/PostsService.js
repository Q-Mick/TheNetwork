import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { Post } from "../models/Post.js";
class PostsService{
async getPosts(){
    const res = await api.get('api/posts')
    // logger.log("[RES DATA]", res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.previousPage = res.data.newer;
    AppState.nextPage = res.data.older;
    // logger.log(AppState.posts)
    // logger.log(AppState.previousPage, AppState.nextPage)
}
async changePage(url){
    const res = await api.get(url)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.previousPage = res.data.newer;
    AppState.nextPage = res.data.older;
    // logger.log(res.data)
}
async searchPosts(searchTerm){
    const res = await api.get(`api/posts?query=${searchTerm}`)
    logger.log('[SEARCH RESULTS]', res.data)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.previousPage = res.data.newer;
    AppState.nextPage = res.data.older;
}
async getPostById(postId) {
    const res = await api.get(`api/posts/${postId}`)
    // logger.log('[GETTING POST BY ID]', res.data)
    AppState.activePost = new Post(res.data)
    // logger.log('appstate post', AppState.activePost)

}
async getPostsByProfile(id) {
      
    AppState.posts = []
    const res = await api.get('/api/posts/', {
      params:{
        creatorId: id
      }})
    logger.log(res.data)
    AppState.previousPage = res.data.newer;
    AppState.nextPage = res.data.older;
    AppState.posts = res.data.posts.map(p => new Post(p))
    // logger.log(AppState.posts)
}
}

export const postsService = new PostsService();