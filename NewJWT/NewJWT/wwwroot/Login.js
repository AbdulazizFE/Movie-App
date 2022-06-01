let page = document.getElementById("page");
let SignUp = document.getElementById("SignUp");
let LogIn = document.getElementById("LogIn");

//SignUp
function signup() {
    if (page = SignUp) {
        document.body.innerHTML =
            `
            <nav>
            <ul>
              <li><button type="button" id="SignUp"  onclick=" signup()">Sign Up</button></li>
          
              <li><button type="button" id="LogIn" onclick=" login()">Log In </button></li>
            </ul>
          </nav>
        <div class="form-contanier">
        <form action = "" id="Form">
            <h3>Sign Up</h3>
  
          <div class="container">
            <span class="icon">
                <i class="fa fa-user"></i>
            </span>
            <input type="text"  id= "fullname" placeholder="Full Name" required/>
        </div>
  
            <div class="container">
                <span class="icon">
                    <i class="fa fa-user"></i>
                </span>
                <input type="text" id = "username" placeholder="UserName" required/>
            </div>
  
                <div class="container">
                    <span class="icon">
                        <i class="fa fa-at"></i>
                    </span>
                    <input type="email" id = "email" placeholder="Email" required/>
                </div>
  
                <div class="container">
                    <span class="icon">
                        <i class="fa fa-lock"></i>
                    </span>
                    <input type="password" id= "password" placeholder="Password" required/>
                </div>
  
                <button  type = "button"  class ="submit"  onclick="RegisterUser()" >Sign Up</button>
      
        
        </form>
    </div>
        
        `
    }
}

//RegisterUser
function RegisterUser() {

    let fullname = document.querySelector("#fullname").value;
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    //if (fullname || username || email || password == null) {

    //    console.log("nooooooooooo")
    //}

    if (fullname == 0) { alert(" The FullName is required!") }
    else if
        (username == 0) { alert(" The UserName is required!") }
    else if
        (email == 0) { alert(" The Email is required!") }
    else if
        (password == 0) { alert(" The Password is required!") }
    else {

        fetch('https://localhost:7270/api/Auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            
            },
            body: JSON.stringify({
                FullName: fullname,
                UserName: username,
                Email: email,
                Password: password,
                

            }),
        })


            .then(response => response.json())
            .then(data => {


                console.log(data)
                alert('You rigesterd successfully!')

                document.body.innerHTML = `

  <nav>
        <ul>
          <li><button type="button" id="SignUp"  onclick=" signup()">Sign Up</button></li>
          <li><button type="button" id="LogIn" onclick=" login()">Log In </button></li>
        </ul>
      </nav>

 <div class="form-contanier">
    <form action="" id="Form">
        <h3>Log In</h3>
            <div class="container">
                <span class="icon">
                    <i class="fa fa-at"></i>
                </span>
                <input type="email"  id="email" placeholder="Email"
                required/>
            </div>

            <div class="container">
                <span class="icon">
                    <i class="fa fa-lock"></i>
                </span>
                <input type="password" id="password" placeholder="Password" required/>
            </div>

            <button type="button"  class="submit" onclick = "LoginUser()" >Log In</button>

    </form>
    </div>




`

            }).catch((error) => {

                console.error('Error:', error);

            });
     }
}

//LoginUser
function LoginUser() {

    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;
    let token;

    if
        (email == 0) { alert(" The Email is required!") }
    else if
        (password == 0) { alert(" The Password is required!") }

    

    else {


            fetch('https://localhost:7270/api/Auth/login', {
                method: 'POST',
                headers: {

                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('authToken'),

                },
                body: JSON.stringify({
                    Email: email,
                    Password: password,

                }),
            }).then(response => response.json()).then(data => {


                document.body.innerHTML =
                    `   <nav>
            <ul>
              <li><button type="button" id="LogOut" onclick=" logut()"><i class="fa fa-sign-out">Log Out</i></button></li>
              <li><button type="button" id="Movie" onclick=" movie()">Movies </button></li>
              <li><button type="button" id="Genres" onclick=" genre()">Genres </button></li>
            </ul>
            </nav>

  <div class="container2 project">
      <h1>Vällkomna till vårna app!</h1>
      <div class="overlay"></div>
    </div>
        `
              

                token = data.token;
                localStorage.setItem('authToken', token);

            })

                .catch((error) => {
                    alert('Please check again your Email or Password!')
                    console.log(error);
             

                });

        }
    
}

//LogIn
function login() {
    if (page = LogIn) {
        document.body.innerHTML = `
        <nav>
        <ul>
          <li><button type="button" id="SignUp"  onclick=" signup()">Sign Up</button></li>
          <li><button type="button" id="LogIn" onclick=" login()">Log In </button></li>
        </ul>
      </nav>
    <div class="form-contanier">
    <form action="" id="Form">
        <h3>Log In</h3>
            <div class="container">
                <span class="icon">
                    <i class="fa fa-at"></i>
                </span>
                <input type="email"  id="email" placeholder="Email"
                required/>
            </div>
    
            <div class="container">
                <span class="icon">
                    <i class="fa fa-lock"></i>
                </span>
                <input type="password" id="password" placeholder="Password" required/>
            </div>
   
            <button type="button"  class="submit" onclick = "LoginUser()" >Log In</button>
      
    </form>
    </div>
    `
    }
}

//logut
function logut() {

    let token;
    fetch('https://localhost:7270/api/Auth/logut', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({


        }),
    })
        .then(response => response.json())
        .then(data => {
            document.body.innerHTML =
                `
            <nav>
        <ul>
          <li><button type="button" id="SignUp"  onclick=" signup()">Sign Up</button></li>
          <li><button type="button" id="LogIn" onclick=" login()">Log In </button></li>
        </ul>
      </nav>
    <div class="form-contanier">
    <form action="" id="Form">
        <h3>Log In</h3>
            <div class="container">
                <span class="icon">
                    <i class="fa fa-at"></i>
                </span>
                <input type="email"  id="email" placeholder="Email"/>
            </div>
    
            <div class="container">
                <span class="icon">
                    <i class="fa fa-lock"></i>
                </span>
                <input type="password" id="password" placeholder="Password"/>
            </div>
   
            <button type="button" class = "submit" onclick = "LoginUser()" >Log In</button>
      
    </form>
    </div>
            `
                ;
            console.log(data);

          
            localStorage.removeItem('authToken');

        })
        .catch((error) => {

            console.error('Error:', error);

        });
}














