const url = new URL(document.location);
let id = url.searchParams.get("id");

let postareForm = document.getElementById("lista_muzee");

postariDb.child(id).once("value", function (snapshot) {
  let postare = snapshot.val();

  // afișează datele postării în formularul de editare
  postareForm.elements["name"].value = postare.name;
  postareForm.elements["imageOne"].value = postare.imageOne;
  postareForm.elements["imageTwo"].value = postare.imageTwo;
  postareForm.elements["imageThree"].value = postare.imageThree;
  postareForm.elements["address"].value = postare.address;
  postareForm.elements["phoneNumber"].value = postare.phoneNumber;
  postareForm.elements["website"].value = postare.website;
  postareForm.elements["email"].value = postare.email;
  postareForm.elements["hoursOfOperation"].value = postare.hoursOfOperation;
  postareForm.elements["latitude"].value = postare.latitude;
  postareForm.elements["longitude"].value = postare.longitude;
  postareForm.elements["description"].value = postare.description;
});

function updatePost() {
  const name = document.getElementById("name").value;
  const imageOne = document.getElementById("imageOne").value;
  const imageTwo = document.getElementById("imageTwo").value;
  const imageThree = document.getElementById("imageThree").value;
  const address = document.getElementById("address").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const website = document.getElementById("website").value;
  const email = document.getElementById("email").value;
  const hoursOfOperation = document.getElementById("hoursOfOperation").value;
  const description = document.getElementById("description").value;
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;

  const updatedPost = {
    name: name,
    imageOne: imageOne,
    imageTwo: imageTwo,
    imageThree: imageThree,
    address: address,
    phoneNumber: phoneNumber,
    website: website,
    email: email,
    hoursOfOperation: hoursOfOperation,
    description: description,
    latitude: latitude,
    longitude: longitude,
  };

  postariDb
    .child(id)
    .update(updatedPost)
    .then(() => {
      window.location = "postare.html?id=" + id;
    });
}

auth.onAuthStateChanged(function (fuser) {
  if (isAdmin() == false) {
    window.location = "../index.html";
  }
});
