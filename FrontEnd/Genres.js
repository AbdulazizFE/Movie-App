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

function homeGenre() {
    document.body.innerHTML =
        `
    <nav>
    <ul>
    <li><button type="button" id="Home" class = "home" onclick=" home()"> <i class="fa fa-home"></i></button></li>
    <li><button type="button" id="addgenre" onclick=" addgenre()">Add Genre</button></li>
    <li><button type="button" id="deletegenre" onclick=" deletegenre()">Delete Genre </button></li>
    
     <li><button type="button" id="getallgenre" onclick=" getallgenres()">Our Genre </button></li>
    
     <li><button type="button" id="updategenre" onclick=" updategenre()">Update Genre </button></li>
    
    
    </ul>
    </nav>
    `
}

function genre() {
    if (page = Genres) {
        document.body.innerHTML =
            `

    <nav>
    <ul>
    <li> <button type="button" id="Home" class = "home" onclick=" home()"><i class="fa fa-home"></i></button></li>
    <li><button type="button" id="addgenre" onclick=" addgenre()">Add Genre</button></li>
    <li><button type="button" id="deletegenre" onclick=" deletegenre()">Delete Genre </button></li>
    <li><button type="button" id="getallgenre" onclick=" getallgenres()">Our Genre </button></li>
    <li><button type="button" id="updategenre" onclick=" updategenre()">Update Genre </button></li>
    </ul>
    </nav>`
    }
}

//AddGenre
function addgenre() {
    if (page = addgenre) {

        document.body.innerHTML =
            `
        <button type="button" id="Home" class = "back" onclick=" homeGenre()"><i class="fa fa-angle-left">Back</i> </button>
    <div class="form-contanier">
    <form action="" id="Form">
    <h3>Add Genre</h3>
      <div class="container">
          <input type="text"  id="genre" placeholder="Name" required/>
      </div>
      <button type="button" class ="add" onclick = "addGenre()" >Add</button>
    
    </form>
    </div>
    `
    }

}

//AddGenre
function addGenre() {
    let name = document.querySelector("#genre").value;

    if (name == 0) {
        alert("Gener name is required!")
    }

    else {


        fetch('https://localhost:7270/api/Genres/CreateGen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),

            },
            body: JSON.stringify({
                Name: name,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Successful")
            })
            .catch((error) => {

                console.error('Error:', error);

            });
    }
}

//Delete
function deletegenre() {
    if (page = deletegenre) {
        document.body.innerHTML =
            `
    <button type="button" id="Home" class ="back" onclick=" homeGenre()"> <i class="fa fa-angle-left">Back</i></button>
    <div class="form-contanier">
    <form action="" id="Form">
    <h3>Delete Genre</h3>
    
     <div class="container">
     <input type="text" id="genre_id" placeholder="Genre Id" required/>
    </div>
    <button type="button" class = "delete" onclick = "Deletegenre()" ><i class="fa fa-trash"> Delete </i></button>
    
    </form>
    </div>
    `
    }
}

//Delete
async function Deletegenre() {

    let g_id = document.querySelector("#genre_id").value;


    if (g_id == 0) {
        alert("Gener id is required!")
    }

    else {



        await fetch(`https://localhost:7270/api/Genres/id?Id=` + g_id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                alert("Deleted Successful!")

            }).catch((error) => {

                alert('We dont have this id :(', error);

            });
    }

}

//GetAll Genres
function getallgenres() {
    if (page = getallgenre)
        document.body.innerHTML =
            `
    <button type="button" class = "back" onclick = "homeGenre()" ><i class="fa fa-angle-left">Back</i></button>
  
    <button type="button" class = "showAll" onclick = "Getallgenres()" >Show All Genres</button>
    <table Id="Table">
    </table>
    `
}

//GetAll Genres
async function Getallgenres() {

    const api_url =
        "https://localhost:7270/api/Genres";

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
        console.log(data);
        if (response) {
            //hideloader();
        }
        show(data);
    }
    // Calling that async function
    getapi(api_url);

    // Function to hide the loader
    //function hideloader() {
    // document.getElementById('loading').style.display = 'none';
    //}
    // Function to define innerHTML for HTML table
    function show(data) {
        let tab =
            ` <thead>
   <tr>
   <th>ID</th>
   <th>Name</th></br>
   </tr>
   </thead>`;

        // Loop to access all rows
        for (let r of data) {
            tab += `
   <tbody>
   <tr>
   <td>${r.id} </td>
   <td>${r.name}</td></br>
   </tr>
   </tbody>`;
        }
        // Setting innerHTML as tab variable
        document.getElementById("Table").innerHTML = tab;
    }

}

//UpdateGenres
function updategenre() {
    if (page = updategenre) {
        document.body.innerHTML =
            `
    <button type="button" class = "back" onclick = "homeGenre()" ><i class="fa fa-angle-left">Back</i></button>
    <div class="form-contanier">
    <form action="" id="Form">
    <h3>Update Genre</h3>

    <div class="container">
     <input type="text" id="id" placeholder="Genre Id" required/>
    </div>
    
     <div class="container">
   
    <input type="text" id="Name" placeholder="Genre Name" required/>
    </div>
    
    
    <button type="button" class = "update" onclick = "UpdateGenre()" ><i class="fa fa-edit"> Update </i></button>
    
     </form>
    </div>`}

}

//UpdateGenres
function UpdateGenre() {
    let genre_id = document.querySelector("#id").value;
    let name = document.querySelector("#Name").value;


    if (genre_id == 0) {
        alert("The genre id and name is required!")
    }


    else if (name == 0) {
        alert("The genre id and name is required!")
    }

    else {


        fetch('https://localhost:7270/api/Genres/id?Id=' + genre_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('authToken'),
            },
            body: JSON.stringify({
                Name: name,

            }),
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                alert(" Update Successful");

            }).catch((error) => {

                alert('Error:', error);


            });
    }
}


