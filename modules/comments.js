export let commentsData = [
    {
      name: "Глеб Фокин",
      date: "12.02.22 12:18",
      text: "Это будет первый комментарий на этой странице",
      likes: 3,
      liked: false,
    },
    {
      name: "Варвара Н.",
      date: "13.02.22 19:22",
      text: "Мне нравится как оформлена эта страница! ❤",
      likes: 75,
      liked: true,
    },
  ];
  
  export function addNewComment(comment) {
    commentsData.push(comment);
  }
  