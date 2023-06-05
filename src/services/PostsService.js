import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { Post } from "../models/Post.js";
import Pop from "../utils/Pop.js";
class PostsService {
  async getPosts() {
    const res = await api.get("api/posts");
    logger.log("[RES DATA]", res.data)
    AppState.posts = res.data.posts.map((p) => new Post(p));
    AppState.previousPage = res.data.newer;
    AppState.nextPage = res.data.older;
    // logger.log(AppState.posts);
    // logger.log(AppState.previousPage, AppState.nextPage)
  }
  async changePage(url) {
    const res = await api.get(url);
    AppState.posts = res.data.posts.map((p) => new Post(p));
    AppState.previousPage = res.data.newer;
    AppState.nextPage = res.data.older;
    logger.log(AppState.posts);
  }
  async searchPosts(searchTerm) {
    const res = await api.get(`api/posts?query=${searchTerm}`);
    logger.log("[SEARCH RESULTS BY BODY]", res.data);
    AppState.posts = res.data.posts.map((p) => new Post(p));
    AppState.previousPage = res.data.newer;
    AppState.nextPage = res.data.older;
  }
  async getPostById(postId) {
    const res = await api.get(`api/posts/${postId}`);
    // logger.log('[GETTING POST BY ID]', res.data)
    AppState.activePost = new Post(res.data);
    // logger.log('appstate post', AppState.activePost)
  }
  async getPostsByProfile(id) {
    AppState.posts = [];
    const res = await api.get("/api/posts/", {
      params: {
        creatorId: id,
      },
    });
    // logger.log(res.data)
    AppState.previousPage = res.data.newer;
    AppState.nextPage = res.data.older;
    AppState.posts = res.data.posts.map((p) => new Post(p));
    // logger.log(AppState.posts);
  }
  async toggleLike(id) {
    const res = await api.post(`api/posts/${id}/like`);
    // logger.log(res.data)
    let postIndex = AppState.posts.findIndex((p) => p.id == id);
    AppState.posts.splice(postIndex, 1, new Post(res.data));
  }
  async addPost(postData){
    const res = await api.post(`api/posts`, postData)
    // logger.log(res.data)
    AppState.posts.unshift(new Post(res.data))

  }
  async deletePost(postId) {
    const res = await api.delete(`api/posts/${postId}`)
    logger.log('[DELETING POST]', res.data)
    AppState.posts = AppState.posts.filter(p => p.id != postId)
}
async getVerts(){
  const res = await api.get('api/ads')
  // logger.log(res.data)
  AppState.verts = res.data
  logger.log(AppState.verts)
}

}

export const postsService = new PostsService();
