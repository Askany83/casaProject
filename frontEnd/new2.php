<?php
include_once 'header.php';
?>

  
  <body>
    <div><!-- start login-form panel -->
      <form action="post" action="">
        <div>
          <input
            id="emailLogin"
            type="email"
            placeholder="insert email"
            required
          />
        </div>
        <div>
          <input
            id="passwordLogin"
            type="password"
            placeholder="password"
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div><!-- END login-form panel -->


    <div><!-- START signup-form panel -->
      <p align="center">Don't have an account, signup here</p>
      <form action="post" action="">
          <div>
          <input
            id="nameSignup"
            type="text"
            placeholder="insert your username"
            required
          />
        </div>        
        <div>
          <input
            id="emailSignup"
            type="email"
            placeholder="insert your email"
            required
          />
        </div>
        <div>
          <input
            id="passwordSignup"
            type="password"
            placeholder="Insert your password"
            required
          />
        </div>
        <div>
          <input
            id="passwordsignup"
            type="password"
            placeholder="Insert your password, must equal to the above"
            required
          />
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    </div><!-- END login-form panel -->
  </body>
  
<?php
include_once 'footer.php';
?>
