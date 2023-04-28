const firebaseConfig = {
  //   copy your firebase config informations
  apiKey: "AIzaSyC6oGLNHP_wYWEqcIqYqT6ucNYvtsXHleA",
  authDomain: "muzee-md.firebaseapp.com",
  databaseURL: "https://muzee-md-default-rtdb.firebaseio.com",
  projectId: "muzee-md",
  storageBucket: "muzee-md.appspot.com",
  messagingSenderId: "369974610633",
  appId: "1:369974610633:web:1c4872acff051665f31b18",
};

function mobileMenu() {
  var x = document.getElementById("navbar");
  if (x.className === "") {
    x.className = "mobile";
  } else {
    x.className = "";
  }
}

const yearElement = document.getElementById("year");

const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const postaretBtn = document.getElementById("postare-btn");
const salutare = document.getElementById("username");

let user = null;
let admins = ["DDLr5dpMsybXMIPbrM16BL0iLml1", "PGj98Wn0nQdW1gi0LhYlMjw0Ltx2", "WBP8m5NgKWYjwYQXDj593vksX772"];

// setam bazele firebase, ne conectam la serviciu
firebase.initializeApp(firebaseConfig);

// referinta la serviciul de autentificare
const auth = firebase.auth();

// alegem providerul de logare -> Google
const provider = new firebase.auth.GoogleAuthProvider();

// referinta la baza de date
const db = firebase.database();

//referinta la colectie de postari din BD
const postariDb = db.ref("lista_muzee");

loginBtn.onclick = function () {
  auth.signInWithPopup(provider).then(function () {
    window.location.reload();
  });
};

logoutBtn.onclick = function () {
  auth.signOut();
  window.location.reload();
};

function isAdmin() {
  let admin;

  if (user == null) return false;

  admin = admins.includes(user.uid); /// true or false

  return admin;
}

auth.onAuthStateChanged(function (fuser) {
  user = fuser;
  if (user != null) {
    //logat in sistem
    logoutBtn.style.display = "block";
    salutare.innerHTML = "Salutare, " + user.displayName;

    if (isAdmin() == true) {
      postaretBtn.style.display = "block";

      // Verificăm dacă utilizatorul se află pe pagina "admin.html"
      if (window.location.href.indexOf("admin.html") > -1) {
        loginBtn.style.display = "none";
      } else {
        loginBtn.style.display = "none";
      }
    } else {
      postaretBtn.style.display = "none";
      loginBtn.style.display = "none";
    }
  } else {
    // nu este logat in sistem
    logoutBtn.style.display = "none";

    // Verificăm dacă utilizatorul se află pe pagina "admin.html"
    if (window.location.href.indexOf("admin.html") > -1) {
      loginBtn.style.display = "block";
    } else {
      loginBtn.style.display = "none";
    }

    postaretBtn.style.display = "none";
  }
  document.querySelector("body").style.display = "block";
});

if (yearElement) {
  let date = new Date();

  yearElement.innerHTML = date.getFullYear() + " ©";
}
