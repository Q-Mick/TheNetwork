import { Profile } from "./Profile.js";
export class Post {
  constructor(data) {
    this.id = data.id;
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.likes = data.likes
    this.likeIds = data.likeIds
    this.creator = new Profile(data.creator)
    
  }
}
