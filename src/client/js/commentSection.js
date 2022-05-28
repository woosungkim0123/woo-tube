const form = document.getElementById("commentForm");

const videoContainer = document.getElementById("videoContainer");

const handleSubmit = (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  // 객체를 보내면 string으로 만들어버리기 때문에
  // obejct.toString() 이거랑 같은 효과
  if (text === "") {
    return;
  }
  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
};
if (form) {
  form.addEventListener("submit", handleSubmit);
}
