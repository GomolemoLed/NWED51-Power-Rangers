const STORAGE_KEYS = {
  username: "morpho_username",
  password: "morpho_password",
  session: "morpho_logged_in"
};

function getStoredCredentials() {
  return {
    username: localStorage.getItem(STORAGE_KEYS.username),
    password: localStorage.getItem(STORAGE_KEYS.password)
  };
}

function redirectTo(page) {
  window.location.href = page;
}

function attachLogoutHandlers() {
  document.querySelectorAll(".logout-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      localStorage.removeItem(STORAGE_KEYS.session);
      redirectTo("login.html");
    });
  });
}

function requireAuth() {
  if (localStorage.getItem(STORAGE_KEYS.session) !== "true") {
    redirectTo("login.html");
  }
}

function initialiseLoginPage() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const authMessage = document.getElementById("auth-message");
  const showRegisterButton = document.getElementById("show-register-btn");
  const showLoginButton = document.getElementById("show-login-btn");

  if (!loginForm || !registerForm || !authMessage) {
    return;
  }

  if (localStorage.getItem(STORAGE_KEYS.session) === "true") {
    redirectTo("home.html");
    return;
  }

  function setAuthMessage(message, isError = false) {
    authMessage.textContent = message;
    authMessage.style.color = isError ? "#b91c1c" : "#1a3c5c";
  }

  showRegisterButton.addEventListener("click", function () {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    setAuthMessage("");
  });

  showLoginButton.addEventListener("click", function () {
    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    setAuthMessage("");
  });
