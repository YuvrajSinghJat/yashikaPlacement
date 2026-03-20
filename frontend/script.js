const API = "http://localhost:5000/api/auth";

function show(msg) {
  document.getElementById("msg").innerText = msg;
}

async function register() {
  try {
    const res = await fetch(`${API}/register`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await res.json();
    show(data.msg);

  } catch (err) {
    show("Error registering");
  }
}

async function login() {
  try {
    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      show("Login successful");
    } else {
      show(data.msg);
    }

  } catch (err) {
    show("Error logging in");
  }
}

async function profile() {
  try {
    const res = await fetch(`${API}/profile`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });

    const data = await res.json();
    show(data.msg);

  } catch (err) {
    show("Error fetching profile");
  }
}