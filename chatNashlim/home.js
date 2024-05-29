function chat(value) {
  location.href = "chat.html";

  localStorage.setItem("sideInDiscussion", value);
}
document.getElementById("userNameTop").innerText =
  localStorage.getItem("userName");
