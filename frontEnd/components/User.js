
    import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';

    //const loginButton = document.getElementById('loginButton');


    const loginApp = reactive({
      username: '',
      password: '',
      user: null,
      isLoggedin: false,
      isLoading: false,
      async login() {
        try {
          this.isLoading = true;
          const response = await fetch("https://dummyjson.com/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password
            })
          });
          // Test for error on http response
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          // Async response from server
          //debugger;
          const data = await response.json();
          //console.log(data);

          if (data && data.token) {

            //add to localStorage that user is logged in
            localStorage.setItem('cacheCheckLogin', true);
            


            
            this.user = {
              
              id: data.id,
              username: data.username,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              gender: data.gender,
              image: data.image

            },
              this.isLoggedin = true;
          } else {
            throw new Error("Invalid credentials");
          }

        } catch (error) {
          console.log("Error:", error);
          alert("Failed to Login");

        } finally {
          this.isLoading = false; // Set loading to false when the login process is completed or failed
        }

      },
      logout() {
        localStorage.removeItem('cacheCheckLogin');
        this.user = null;
        this.password = '';
        this.isLoggedin = false;

      }
    });
    createApp({ loginApp }).mount();

  


