import { fetchComments, token, userName, loginUser, registerUser } from "./comments.js";
import { renderComments, showLoadingComments } from "./render.js";
import { addComment, handleCommentClick, toggleLike } from "./eventHandlers.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.getElementById("login-button");
  const registerButton = document.getElementById("register-button");
  const logoutButton = document.getElementById("logout-button");
  const authForm = document.getElementById("auth-form");
  const addForm = document.getElementById("add-form");
  const nameInput = document.getElementById("name");

  const checkAuth = () => {
    const savedToken = localStorage.getItem("token");
    const savedUserName = localStorage.getItem("userName");

    if (savedToken && savedUserName) {
      authForm.style.display = "none";
      addForm.style.display = "block";
      document.getElementById("logout-container").style.display = "block";
      nameInput.value = savedUserName;
      showLoadingComments();
      fetchComments().then(renderComments);
    } else {
      authForm.style.display = "block";
      addForm.style.display = "none";
      document.getElementById("logout-container").style.display = "none";
    }
  };

  loginButton.addEventListener("click", async () => {
    const login = document.getElementById("login-input").value;
    const password = document.getElementById("password-input").value;
    try {
      await loginUser({ login, password });
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
      checkAuth();
    } catch (err) {
      alert(err.message);
    }
  });

  registerButton.addEventListener("click", async () => {
    const login = document.getElementById("login-input").value;
    const password = document.getElementById("password-input").value;
    try {
      await registerUser({ login, password, name: login });
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
      checkAuth();
    } catch (err) {
      alert(err.message);
    }
  });

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    checkAuth();
  });

  document.getElementById("add-comment").addEventListener("click", addComment);
  document.getElementById("comments-list").addEventListener("click", toggleLike);
  document.getElementById("comments-list").addEventListener("click", handleCommentClick);

  checkAuth();
});








