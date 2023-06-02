import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { Post } from "../models/Post.js";
import { Account } from "../models/Account.js";
import { Profile } from "../models/Profile.js";
class ProfileService {
  async getProfileById(id) {
    
    const res = await api.get("api/profiles/" + id);
    AppState.activeProfile = new Profile(res.data);
    logger.log('[ACTIVE PROFILE]', AppState.activeProfile)
  }
}

export const profileService = new ProfileService();
