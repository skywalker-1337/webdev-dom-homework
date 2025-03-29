import { commentsData } from "./comments.js";
import { decodeHTML } from "./utils.js";

export function showLoadingComments() {
  document.getElementById("loading-comments").style.display = "block";
}

export function hideLoadingComments() {
  console.log("Скрываем загрузку комментариев...");
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
  console.log("Рендер комментариев...");
  const commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = "";

  if (commentsData.length === 0) {
    console.log("Нет комментариев для отображения.");
    return;
  }

  commentsData.forEach((comment, index) => {
    const dateObject = new Date(comment.date);
    const formattedDate = dateObject.toLocaleDateString("ru-RU");
    const formattedTime = dateObject.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

    const likeButtonClass = comment.liked ? "-active-like" : "";

    const newCommentHTML = `
      <li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${formattedDate} ${formattedTime}</div>
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

  hideLoadingComments();
}



