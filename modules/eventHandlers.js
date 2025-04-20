import { commentsData, addNewComment } from "./comments.js";
import { renderComments, showAddingComment, hideAddingComment } from "./render.js";
import { escapeHTML, decodeHTML } from "./utils.js";

export async function addComment() {
  const commentInput = document.getElementById("comment-text");
  const addButton = document.getElementById("add-comment");
  const text = escapeHTML(commentInput.value.trim());

  if (text.length < 3) {
    alert("Комментарий должен быть не менее 3 символов");
    return;
  }

  showAddingComment();
  addButton.disabled = true;

  try {
    await addNewComment({ text });
    commentInput.value = "";
    renderComments();
  } catch (error) {
    console.error("Ошибка при добавлении комментария:", error);
  } finally {
    hideAddingComment();
    addButton.disabled = false;
  }
}

export function handleCommentClick(event) {
  const commentElement = event.target.closest(".comment");
  const nameInput = document.getElementById("name");
  const commentInput = document.getElementById("comment-text");

  if (commentElement && !event.target.classList.contains("like-button")) {
    const index = commentElement.dataset.index;
    const comment = commentsData[index];
    nameInput.value = `Ответ на ${comment.name}`;
    commentInput.value = `> ${decodeHTML(comment.text)}`;
  }
}

export function toggleLike(event) {
  if (!event.target.classList.contains("like-button")) return;
  const index = event.target.dataset.index;
  const comment = commentsData[index];
  comment.liked = !comment.liked;
  comment.likes += comment.liked ? 1 : -1;
  renderComments();
}






