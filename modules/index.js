import { commentsData, fetchComments } from "./comments.js";
import { renderComments } from "./render.js";
import { addComment, handleCommentClick, toggleLike } from "./eventHandlers.js";

document.addEventListener("DOMContentLoaded", async () => {
  await fetchComments();
  renderComments();

  const addButton = document.getElementById("add-comment");
  const commentsList = document.getElementById("comments-list");

  addButton.addEventListener("click", addComment);
  commentsList.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-button")) {
      toggleLike(event);
    } else {
      handleCommentClick(event);
    }
  });
});

