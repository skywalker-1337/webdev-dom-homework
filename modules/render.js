import { commentsData } from "./comments.js";
import { decodeHTML } from "./utils.js";

export function renderComments() {
  const commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = "";

  commentsData.forEach((comment, index) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const likeButtonClass = comment.liked ? "-active-like" : "";

    const newCommentHTML = `
      <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${currentDate} ${currentTime}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${decodeHTML(comment.text)}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${likeButtonClass}" data-index="${index}"></button>
          </div>
        </div>
      </li>
    `;
    commentsList.innerHTML += newCommentHTML;
  });
}
