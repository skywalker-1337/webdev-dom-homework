import { commentsData } from "./comments.js";
import { decodeHTML } from "./utils.js";

export function showLoadingComments() {
  document.getElementById("loading-comments").style.display = "block";
}

export function hideLoadingComments() {
  document.getElementById("loading-comments").style.display = "none";
}

export function showAddingComment() {
  document.getElementById("adding-comment").style.display = "block";
  document.getElementById("add-form").style.display = "none";
}

export function hideAddingComment() {
  document.getElementById("adding-comment").style.display = "none";
  document.getElementById("add-form").style.display = "block";
}

export function renderComments() {
  const commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = "";

  commentsData.forEach((comment, index) => {
    const date = new Date(comment.date);
    const dateStr = `${date.toLocaleDateString("ru-RU")} ${date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}`;

    const commentHTML = `
      <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${dateStr}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${decodeHTML(comment.text)}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${comment.liked ? '-active-like' : ''}" data-index="${index}"></button>
          </div>
        </div>
      </li>
    `;
    commentsList.innerHTML += commentHTML;
  });

  hideLoadingComments();
}





