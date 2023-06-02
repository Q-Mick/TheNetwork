export class Profile {
    constructor(data) {
      this.id = data.id;
      this.email = data.email
      this.name = data.name
      this.bio = data.bio
      this.coverImg = data.coverImg
      this.picture = data.picture
      this.github = data.github
      this.linkedIn = data.linkedIn
      this.resume = data.resume
      this.class = data.class
      this.graduated = data.graduated
      // TODO add additional properties if needed
    }
  }