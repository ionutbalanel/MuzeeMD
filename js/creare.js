document.getElementById("lista_muzee").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal("name");
  var imageOne = getElementVal("imageOne");
  var imageTwo = getElementVal("imageTwo");
  var imageThree = getElementVal("imageThree");
  var address = getElementVal("address");
  var phoneNumber = getElementVal("phoneNumber");
  var website = getElementVal("website");
  var email = getElementVal("email");
  var hoursOfOperation = getElementVal("hoursOfOperation");
  var latitude = getElementVal("latitude");
  var longitude = getElementVal("longitude");
  var description = getElementVal("description");

  saveMessages(
    name,
    imageOne,
    imageTwo,
    imageThree,
    address,
    phoneNumber,
    website,
    email,
    hoursOfOperation,
    latitude,
    longitude,
    description
  );

  //   enable alert
  document.querySelector(".alert").style.display = "block";

  //   remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  //   reset the form
  document.getElementById("lista_muzee").reset();
}

const saveMessages = (
  name,
  imageOne,
  imageTwo,
  imageThree,
  address,
  phoneNumber,
  website,
  email,
  hoursOfOperation,
  latitude,
  longitude,
  description
) => {
  const dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");
  const newContactForm = postariDb.child(dateTime);

  newContactForm.set({
    name: name,
    imageOne: imageOne,
    imageTwo: imageTwo,
    imageThree: imageThree,
    address: address,
    phoneNumber: phoneNumber,
    website: website,
    email: email,
    hoursOfOperation: hoursOfOperation,
    latitude: latitude,
    longitude: longitude,
    description: description,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

auth.onAuthStateChanged(function (fuser) {
  if (isAdmin() == false) {
    window.location = "../index.html";
  }
});
