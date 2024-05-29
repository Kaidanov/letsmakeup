document.getElementById("userNameTop").innerText =
  localStorage.getItem("userName");

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
    let userArr = JSON.parse(localStorage.getItem("usernames"));
    let PassArr = JSON.parse(localStorage.getItem("passwords"));
    if (userArr.includes(username) && PassArr.includes(password)) {
      message.textContent = "Correct";
      message.style.color = "green";

      localStorage.setItem("userName", username);
      location.href = "../chatNashlim/home.html";
    } else {
      message.textContent = "Incorrect username or password";
      message.style.color = "red";
    }
  });
document
  .getElementById("signUpForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const S_username = document.getElementById("S_username").value;
    localStorage.setItem("userName", S_username);
    const S_password = document.getElementById("S_password").value;

    //
    //
    const message = document.getElementById("message2");
    if (JSON.parse(localStorage.getItem("passwords")).includes(S_password)) {
      message.textContent =
        "password already exist, please choose a different one";
      message.style.color = "red";
    } else {
      let StringUsernames = localStorage.getItem("usernames");
      let arrUsernames = JSON.parse(StringUsernames);
      arrUsernames.push(S_username);
      StringUsernames = JSON.stringify(arrUsernames);
      localStorage.setItem("usernames", StringUsernames);
      let StringPasswords = localStorage.getItem("passwords");
      let arrPasswords = JSON.parse(StringPasswords);
      arrPasswords.push(S_password);
      StringPasswords = JSON.stringify(arrPasswords);
      localStorage.setItem("passwords", StringPasswords);
      console.log(localStorage.getItem("usernames"));
      console.log(localStorage.getItem("passwords"));
    }
    //
    //
    //

    location.href = "../chatNashlim/home.html";
  });
function signApp() {
  document.getElementById("logIn").style.display = "none";
  document.getElementById("signUp").style.display = "block";
}
function logIn() {
  document.getElementById("signUp").style.display = "none";
  document.getElementById("logIn").style.display = "block";
}
