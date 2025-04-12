import { commentsData, addNewComment, fetchComments, userName } from "./comments.js";
import { renderComments, showAddingComment, hideAddingComment } from "./render.js";
import { escapeHTML, decodeHTML } from "./utils.js";

export async function addComment() {
  const commentInput = document.getElementById("comment-text");
  const addButton = document.getElementById("add-comment");

  const commentText = escapeHTML(commentInput.value.trim());

  if (commentText.length < 3) {
    alert("Комментарий должен быть не короче 3 символов");
    return;
  }

  const newComment = {
    text: commentText,
    likes: 0,
    liked: false,
  };

  showAddingComment();
  addButton.disabled = true;

  try {
    await addNewComment(newComment);
    commentInput.value = "";
    renderComments();
  } catch (error) {
    console.error("Ошибка добавления комментария:", error);
  } finally {
    hideAddingComment();
    addButton.disabled = false;
  }
}

export function handleCommentClick(event) {
  const nameInput = document.getElementById("name");
  const commentInput = document.getElementById("comment-text");

  const commentElement = event.target.closest(".comment");
  if (commentElement && !event.target.classList.contains("like-button")) {
    const index = commentElement.getAttribute("data-index");
    const comment = commentsData[index];

    nameInput.value = `Ответ на ${comment.name}:`;
    commentInput.value = `> ${decodeHTML(comment.text)}`;
  }
}

export function toggleLike(event) {
  const index = event.target.getAttribute("data-index");
  if (index !== null) {
    const comment = commentsData[index];
    comment.liked = !comment.liked;
    comment.likes = comment.liked ? comment.likes + 1 : comment.likes - 1;
    renderComments();
  }
}




