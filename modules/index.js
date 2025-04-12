import { fetchComments, loginUser, userName } from "./comments.js";
import { renderComments, hideLoadingComments } from "./render.js";
import { addComment, handleCommentClick, toggleLike } from "./eventHandlers.js";

document.addEventListener("DOMContentLoaded", async () => {
  const addForm = document.getElementById("add-form");
  const authForm = document.getElementById("auth-form");
  const authLink = document.getElementById("auth-link-container");
  const loginButton = document.getElementById("login-button");
  const commentsList = document.getElementById("comments-list");

  await fetchComments();
  renderComments();

  if (localStorage.getItem("token")) {
    document.getElementById("add-form").style.display = "block";
    document.getElementById("name").value = localStorage.getItem("name");
    document.getElementById("auth-link-container").style.display = "none";
  }

  commentsList.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-button")) {
      toggleLike(event);
    } else {
      handleCommentClick(event);
    }
  });

  document.getElementById("add-comment").addEventListener("click", addComment);

  document.getElementById("auth-link").addEventListener("click", () => {
    authForm.style.display = "block";
    authLink.style.display = "none";
  });

  loginButton.addEventListener("click", async () => {
    const login = document.getElementById("login-input").value.trim();
    const password = document.getElementById("password-input").value.trim();

    if (!login || !password) {
      alert("Введите логин и пароль");
      return;
    }

    try {
      await loginUser({ login, password });
      localStorage.setItem("token", window.token);
      localStorage.setItem("name", window.userName);

      document.getElementById("name").value = window.userName;
      document.getElementById("name").setAttribute("readonly", true);

      authForm.style.display = "none";
      addForm.style.display = "block";
      await fetchComments();
      renderComments();
    } catch (error) {
      alert(error.message);
    }
  });
});




