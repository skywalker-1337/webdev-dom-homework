const API_URL = "https://wedev-api.sky.pro/api/v1/nikoloz-kobaliya/comments";

export let commentsData = [];

export async function fetchComments() {
  console.log("Запрос комментариев отправлен...");
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Ошибка загрузки комментариев. Попробуйте позже.");
    }

    const data = await response.json();

    commentsData = data.comments.map((comment) => ({
      name: comment.author.name,
      date: comment.date, 
      text: comment.text,
      likes: comment.likes,
      liked: comment.isLiked,
    }));
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    } else {
      alert("Ошибка загрузки комментариев. Попробуйте позже.");
    }
    console.error(error);
  }
}

export async function addNewComment(comment) {
  try {
    const response = await fetch(API_URL, {
  method: "POST",
  body: JSON.stringify({
    name: comment.name,
    text: comment.text,
  }),
});

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Ошибка API:", errorData);

      if (response.status === 400) {
        throw new Error(`Ошибка 400: ${errorData.error || "Проверьте корректность введенных данных"}`);
      }

      if (response.status === 500) {
        throw new Error("Сервер сломался, попробуй позже");
      }

      throw new Error(`Ошибка: ${response.status}`);
    }

    await fetchComments();
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      alert("Кажется, у вас сломался интернет, попробуйте позже");
    } else {
      alert(error.message);
    }
    console.error("Ошибка при добавлении комментария:", error);
    throw error;
  }
}









