const API_URL = "https://wedev-api.sky.pro/api/v2/nikoloz-kobaliya";
export let commentsData = [];
export let token = null;
export let userName = "";

export async function fetchComments() {
  try {
    const response = await fetch(`${API_URL}/comments`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!response.ok) {
      throw new Error("Ошибка загрузки комментариев. Попробуйте позже.");
    }

    const data = await response.json();

    commentsData = data.comments.map((comment) => ({
      id: comment.id,
      name: comment.author.name,
      date: comment.date,
      text: comment.text,
      likes: comment.likes,
      liked: comment.isLiked,
    }));
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

export async function addNewComment(comment) {
  try {
    const response = await fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: comment.text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 400) {
        throw new Error(errorData.error || "Проверьте корректность данных");
      }
      throw new Error("Серверная ошибка");
    }

    await fetchComments();
  } catch (error) {
    alert(error.message);
    throw error;
  }
}

export async function loginUser({ login, password }) {
  const response = await fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({ login, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Ошибка авторизации");
  }

  const data = await response.json();
  token = data.user.token;
  userName = data.user.name;
}

export async function registerUser({ login, password, name }) {
  const response = await fetch("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({ login, password, name }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Ошибка регистрации");
  }

  const data = await response.json();
  token = data.user.token;
  userName = data.user.name;
}













