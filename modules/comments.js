const API_URL = "https://wedev-api.sky.pro/api/v1/nikoloz-kobaliya/comments";

export let commentsData = [];

export function fetchComments() {
  console.log("Запрос комментариев отправлен...");
  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка загрузки комментариев");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Ответ API:", data);
      commentsData = data.comments.map((comment) => ({
        name: comment.author.name,
        date: new Date(comment.date).toLocaleDateString(),
        text: comment.text,
        likes: comment.likes,
        liked: comment.isLiked,
      }));
      console.log("Загруженные комментарии:", commentsData);
    })
    .catch((error) => {
      console.error(error);
      alert("Ошибка загрузки комментариев. Попробуйте позже.");
    });
}

export function addNewComment(comment) {
  if (!comment.name || !comment.text || comment.name.length < 3 || comment.text.length < 3) {
    return Promise.reject(new Error("Имя и текст должны содержать минимум 3 символа."));
  }

  console.log("Отправка запроса в API:", JSON.stringify({ name: comment.name, text: comment.text }));

  return fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ name: comment.name, text: comment.text }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(`Ошибка API: ${errorData.error}`);
        });
      }
      return fetchComments();
    })
    .catch((error) => {
      console.error("Ошибка добавления комментария:", error);
      alert(error.message);
    });
}



