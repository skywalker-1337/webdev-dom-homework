import { fetchComments } from "./comments.js";
import { renderComments, hideLoadingComments } from "./render.js";
import { addComment, handleCommentClick, toggleLike } from "./eventHandlers.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await fetchComments();
    renderComments();
  } catch (error) {
    alert(error.message);
  }
  

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



