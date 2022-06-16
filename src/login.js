var jwt = localStorage.getItem("jwt");
var con=0;
if (jwt != null) {
    //window.location.href = './index.html'
    document.getElementById("logmint").href = "minting.html";
    document.getElementById("hlogin").style.display = "none";
    document.getElementById("hlogout").style.display ="block";

  }

  if (jwt == null) {
    //window.location.href = './index.html'
    document.getElementById("superlogmint").style.display = "none";
    document.getElementById("logmint").href = "login.html";
    document.getElementById("hlogin").style.display = "block";
    document.getElementById("hlogout").style.display ="none";

  }


function logout() {
  localStorage.removeItem("jwt");
  window.location.href = './index.html'
  document.getElementById("logmint").href = "login.html";
  document.getElementById("hlogin").style.display = "block";
  document.getElementById("hlogout").style.display ="none";

}
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://www.mecallapi.com/api/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "username": username,
    "password": password
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      if (objects['status'] == 'ok') {
        localStorage.setItem("jwt", objects['accessToken']);
        Swal.fire({
          text: objects['message'],
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = './index.html';
          }
        });
      } else {
        Swal.fire({
          text: objects['message'],
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
  return false;
}


function login2() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:9005/login?username=${username}&password=${password}`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "username": username,
    "password": password
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      if (Object.keys( objects ).length != 0) {
        localStorage.setItem("jwt", objects);
        Swal.fire({
          text: "logged in",
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = './index.html';
          }
        });
      } else {
        Swal.fire({
          text: "Failed to log in",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
  return false;
}