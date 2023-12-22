function removeLogin() {
  //debugger;
  localStorage.removeItem('cacheCheckLogin');
  this.user = null;
  this.password = '';
  this.isLoggedin = false;
  window.location.href= 'index.html';
}
      
