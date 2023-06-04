import { Profile } from "./Profile.js";

function formatDateAndTime(dateString) {
  const date = new Date(dateString);

  // Format date as MM/DD/YYYY
  const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

  // Format time as regular 12-hour format
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${amPm}`;

  return `${formattedDate} ${formattedTime}`;
}
export class Post {
  constructor(data) {
    this.id = data.id;
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.creatorId = data.creatorId
    this.likes = data.likes
    this.likeIds = data.likeIds
    this.creator = new Profile(data.creator)
    this.createdAt = formatDateAndTime(data.createdAt)
    
  }
}
