const API_URL = "https://wedev-api.sky.pro/api/v1/nikoloz-kobaliya/comments";

export let commentsData = [];

export async function fetchComments() {
  console.log("Запрос комментариев отправлен...");
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Ошибка загрузки комментариев");
    }
    const data = await response.json();
    console.log("Ответ API:", data);

    commentsData = data.comments.map((comment) => ({
      name: comment.author.name,
      date: comment.date, 
      text: comment.text,
      likes: comment.likes,
      liked: comment.isLiked,
    }));

    console.log("Загруженные комментарии:", commentsData);
  } catch (error) {
    console.error(error);
    alert("Ошибка загрузки комментариев. Попробуйте позже.");
  }
}

export async function addNewComment(comment) {
  if (!comment.name || !comment.text || comment.name.length < 3 || comment.text.length < 3) {
    throw new Error("Имя и текст должны содержать минимум 3 символа.");
  }

  console.log("Отправка запроса в API:", JSON.stringify({ name: comment.name, text: comment.text }));

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ name: comment.name, text: comment.text }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка API: ${errorData.error}`);
    }

    await fetchComments();
  } catch (error) {
    console.error("Ошибка добавления комментария:", error);
    alert(error.message);
  }
}





