let nav = document.getElementById("nav-bar");
let currentSession = {};

function init() {
    authenticate();
}

// verifies that the user is logged in
// and stores the session information at the same time
function authenticate() {
	let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			currentSession = JSON.parse(req.responseText);
			console.log(currentSession);
			if (currentSession.loggedin) {
				generateHeader();
			}
            
            
		}
	}
	req.open("GET", `http://localhost:3000/authenticate`);
	// req.open("GET", `https://matt-godfrey-portfolio.herokuapp.com/authenticate`);
	req.setRequestHeader("Accept", "application/json");
	req.send();
}

function generateHeader() {
	let header = document.getElementById("nav-bar");
    let login = document.getElementById("login");
    let register = document.getElementById("register");
    if (register != null) {
        register.remove();
    }
    
    login.setAttribute("href", "../logout");
    login.innerHTML = "Logout";

	let text = document.createElement("p");
	
	text.innerHTML = "Hello, " + currentSession.username + "!";
	text.style.display = "inline";
	header.appendChild(text);
	
}