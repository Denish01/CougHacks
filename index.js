let accountList = document.getElementById("accountList");

function addAccount() {
  let username = document.getElementById("username");
  let password = document.getElementById("password");
  let accountName = document.getElementById("accountName");
  let accountItem = document.createElement("tr");
  if (!username.value.length == 0 && !password.value.length == 0 && !accountName.value.length == 0) {
    let newPassword = "";
    for (let i = 0; i < password.value.length; i++) {
      newPassword += "*";
    }
    accountItem.innerHTML = `<td>${accountName.value}</td><td>${username.value}</td><td>${newPassword}</td>`;
    accountList.appendChild(accountItem);
    let message = document.getElementById("message");
    message.innerHTML = "Account Created Successfully!";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("accountName").value = "";
  } else {
    message.innerHTML = "Invalid!";
  }
}

function logout() {
  // Perform any necessary logout actions here, such as clearing session data or redirecting to a login page
  window.location.href = "login.html"; // Redirect to the login page
}
