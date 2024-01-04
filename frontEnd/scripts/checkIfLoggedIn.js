function checkLogIn(){
  const isLoggedIn = localStorage.getItem("cacheCheckLogin");

  //localStorage is stored as a String
  if (isLoggedIn !== 'true') {
    window.location.href = "index.html";
  }
};
checkLogIn();

function removeLogin() {
  //debugger;
  localStorage.removeItem('cacheCheckLogin');
  this.user = null;
  this.password = '';
  this.isLoggedin = false;
  window.location.href= 'index.html';
};