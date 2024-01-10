function removeLogin() {
  //debugger;
  localStorage.clear();
  this.user = null;
  this.password = '';
  this.isLoggedin = false;
  window.location.href= 'index.html';
};

document.getElementById("exitButton").style.display = "none";

