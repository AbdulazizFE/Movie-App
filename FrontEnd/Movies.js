function home() {
    document.body.innerHTML =
        ` <nav>
    <ul>
    <li><button type="button" id="LogOut" onclick=" logut()"><i class="fa fa-sign-out">Log Out</i></button></li>
    <li><button type="button" id="Movie" onclick=" movie()">Movies </button></li>
    <li><button type="button" id="Genres" onclick=" genre()">Genres </button></li>
    </ul>
    </nav>

 <div class="container2 project">
      <h1>Welcome to our Movie Application!</h1>
      <div class="overlay"></div>
    </div>
`
}

function homeMovie() {
    document.body.innerHTML =
        `
    <nav>
    <ul>
    <li><button type="button" id="home" class = "home" onclick=" home()"><i class="fa fa-home"></i></button></li>
    <li><button type="button" id="addmovie" onclick=" addmovie()">Add Movie</button></li>
    <li><button type="button" id="deletemovie" onclick=" deletemovie()">Delete Movie </button></li>
    
     <li><button type="button" id="getallmovies" onclick=" getallmovies()">Our Movies </button></li>
    
     <li><button type="button" id="updatemovie" onclick=" updatemovie()">Update Movie </button></li>
   

    </ul>
    </nav>`
}

function movie() {
    if (page = Movie) {
        document.body.innerHTML =
            `
    <nav>
    <ul>
    <li><button type="button" id="home"  class = "home" onclick=" home()"><i class="fa fa-home"></i></button></li>
    <li><button type="button" id="addmovie" onclick=" addmovie()">Add Movie</button></li>
    <li><button type="button" id="deletemovie" onclick=" deletemovie()">Delete Movie </button></li>
    
     <li><button type="button" id="getallmovies" onclick=" getallmovies()">Our Movies </button></li>
    
     <li><button type="button" id="updatemovie" onclick=" updatemovie()">Update Movie </button></li>
   
    </ul>
    </nav>

`}
}

//Update 
function updatemovie() {
    if (page = updatemovie) {
        document.body.innerHTML =
            `
    <button type="button" id="home" class ="back" onclick=" homeMovie()"><i class="fa fa-angle-left">Back</i></button>
    <div class="form-contanier">
    <form action="" id="Form">
    <h3>Update Movie</h3>
    
    <div class="container">
     <input type="text" id="mo_id" placeholder="please enter movie id" required />
    </div>
    
     <div class="container">
   
    <input type="text" id="title" placeholder="Movie title" required/>
    </div>
    <div class="container">
    <span class="icon">
 
    </span>
    <input type="text" id= "year" placeholder="Year of movie" required/>
    </div>
    
     <div class="container">
    <span class="icon">
 
    </span>
    <input type="text" id="rate" placeholder="Rating" required />
    </div>
    
     <div class="container">
    <span class="icon">
  
    </span>
    <input type="text" id = "storeline" placeholder="StoreLine" required />
    </div>
    
     <div class="container">
    <span class="icon">
 
    </span>
    <input type="text" id= "genreid" placeholder="genreid"  required/>
    </div>
    
   <button type="button" class = "update" onclick = "UpdateMovie()" > <i class="fa fa-edit"> Update </i></button>
   
    </form>
    </div>`}

}

//Update 
function UpdateMovie() {
    let mo_id = document.querySelector("#mo_id").value;
    let title = document.querySelector("#title").value;
    let year = document.querySelector("#year").value;
    let rate = document.querySelector("#rate").value;
    let storeline = document.querySelector("#storeline").value;
    let generid = document.querySelector("#genreid").value;

    if (mo_id == 0) {
        alert(" The id is required!")
    }
    else if (title == 0) {
        alert(" The title is required!")
    }
    else if (year == 0) {
        alert(" The year is required!")
    }
    else if (rate == 0) {
        alert(" The rate is required!")
    }
    else if (storeline == 0) {
        alert(" The storeline is required!")
    }
    else if (generid == 0) {
        alert(" The genre id is required!")
    }


    else {

        fetch('https://localhost:7270/api/Movies/update?id=' + mo_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            },
            body: JSON.stringify({
                //  Id : id,
                Title: title,
                Year: year,
                Rate: rate,
                StoreLine: storeline,
                GenreId: generid,

            }),
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                //   alert(" Update Successful");

            }).catch((error) => {

                alert('Error:', error);
            });
    }
}

//Delete Movie    
function deletemovie() {
    if (page = deletemovie) {
        document.body.innerHTML =
            `
    <button type="button" id="home" class = "back" onclick=" homeMovie()"><i class="fa fa-angle-left">Back</i></button>
    <div class="form-contanier">
    <form action="" id="Form">
    <h3>Delete Movie</h3>
    
     <div class="container">
     <input type="text" id="movie_id" placeholder="Movie id" required/>
    </div>
    <button type="button" class = "delete" onclick = "deleteMoviee()" ><i class="fa fa-trash">Delete</i></button>
    
    </form>
    </div>
    `
    }
}

//Delete Movie 
async function deleteMoviee() {
    let m_id = document.querySelector("#movie_id").value;

    if (m_id == 0) {
        alert("The Id is required!")
    }

    else {


        await fetch(`https://localhost:7270/api/Movies/id?Id=` + m_id, {

            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                alert("Deleted Successful!");

            }).catch((error) => {

                alert('We dont have this id :(', error);


            });
    }
}

//AddMovie
function addmovie() {
    if (page = addmovie) {
        document.body.innerHTML =
            `
    <button type="button" id="home" class ="back" onclick=" homeMovie()"><i class="fa fa-angle-left">Back</i></button>
    <div class="form-contanier">
  <form action="" id="Form">
      <h3>Add Movie</h3>

      <div class="container">
       
        <input type="text" id="title" placeholder="Title" required/>
    </div>
    <div class="container">
     
      <input type="text"  id= "year" placeholder="Year" required/>
  </div>

      <div class="container">
        
          <input type="text" id = "rate" placeholder="Rate"  required/>
      </div>

          <div class="container">
           
              <input type="text" id = "storeline" placeholder="Storeline" required />
          </div>

          <div class="container">
           
              <input type="text" id= "genreId" placeholder="GenreId" required/>
          </div>

          <button type="button" class ="add" onclick = "addMovie()" >Add</button>
  </form>

</div>
    `}

}

//AddMovie
function addMovie() {

    let title = document.querySelector("#title").value;
    let year = document.querySelector("#year").value;
    let rate = document.querySelector("#rate").value;
    let storeline = document.querySelector("#storeline").value;
    let genreId = document.querySelector("#genreId").value;

    if (title == 0) {
        alert(" The title is required!")
    }
    else if (year == 0) {
        alert(" The year is required!")
    }
    else if (rate == 0) {
        alert(" The rate is required!")
    }

    else if (rate > 10 ) {
        alert("Your rating should be less than 10!")
    }
    else if (storeline == 0) {
        alert(" The storeline is required!")
    }
    else if (genreId == 0) {
        alert(" The genre id is required!")
    }

    else {

        fetch('https://localhost:7270/api/Movies/AddMovie', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            },
            body: JSON.stringify({
                Title: title,
                Year: year,
                Rate: rate,
                Storeline: storeline,
                GenreId: genreId,

            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                alert("Successful!");

            }).catch((error) => {

                alert('Error:', error);


            });
    }
}

//GetAllMovies
function getallmovies() {
    if (page = getallmovies)
        document.body.innerHTML =
            `
    <button type="button" class = "back" onclick = "homeMovie()" ><i class="fa fa-angle-left">Back</i></button>
   
    <button type="button" class = "showAll" onclick = "Getallmovies()" >Show All</button>
    <table Id="Table">
    </table>
    `

}

//GetAllMovies
async function Getallmovies() {


    const api_url =
        "https://localhost:7270/api/Movies";
    // Defining async function
    async function getapi(url) {

        // Storing response
        const response = await fetch(url, {

            headers: {

                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            },
        })

        // Storing data in form of JSON
        var data = await response.json();
        console.log("successful :)", data);
        if (response) {
            //hideloader();
        }
        show(data);
    }
    // Calling that async function
    getapi(api_url);


    function show(data) {
        let tab =
            ` <thead>
    <tr>
    <th>ID</th>
    <th>Title</th>
    <th>Year</th>
    <th>Rate</th>
    <th>Storeline</th>
    <th>Genre Id</th></br>
    <th>Genre Name</th></br>
    </tr>
    </thead>`;

        // Loop to access all rows
        for (let d of data) {
            tab += `
    <tbody>
    <tr>
     <td>${d.id}</td>
    <td>${d.title} </td>
    <td>${d.year}</td>
    <td>${d.rate}</td>
    <td>${d.storeline}</td>
    <td>${d.genreId}</td></br>
    <td>${d.genreName}</td></br>
   
    </tr>
    </tbody>`;
        }
        // Setting innerHTML as tab variable
        document.getElementById("Table").innerHTML = tab;
    }

}
