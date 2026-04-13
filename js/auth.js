const STORAGE_KEYS = {
  username: "morpho_username",
  password: "morpho_password",
  session: "morpho_logged_in"
};

// Retrieves the stored username and password from localStorage
function getStoredCredentials() {
  return {
    username: localStorage.getItem(STORAGE_KEYS.username),
    password: localStorage.getItem(STORAGE_KEYS.password)
  };
}

// Redirects the browser to the specified page
function redirectTo(page) {
  window.location.href = page;
}

// Attaches click handlers to all logout buttons — clears the session and redirects to login
function attachLogoutHandlers() {
  document.querySelectorAll(".logout-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      localStorage.removeItem(STORAGE_KEYS.session);
      redirectTo("login.html");
    });
  });
}

// Checks if the user is logged in — redirects to login.html if no active session is found
function requireAuth() {
  if (localStorage.getItem(STORAGE_KEYS.session) !== "true") {
    redirectTo("login.html");
  }
}
