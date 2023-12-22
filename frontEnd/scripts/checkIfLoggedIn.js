function checkLogIn(){
  const isLoggedIn = localStorage.getItem("cacheCheckLogin");

  //localStorage is stored as a String
  if (isLoggedIn !== 'true') {
    window.location.href = "index.html";
  }
};
checkLogIn();