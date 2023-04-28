const postareSection = document.getElementById("postare-section");

const url = new URL(document.location);
let id = url.searchParams.get("id");
let postare;

postariDb.child(id).once("value", renderPost);

function renderPost(snapshot) {
  postare = snapshot.val();
  let deleteBtn = "";
  let editBtn = "";
  if (isAdmin() == true) {
    deleteBtn = `<div onclick="deletePost()" class="delete"><i class="fas fa-trash"></i></div>`;
    editBtn = `<div onclick="editPost()" class="edit"><i class="fas fa-edit"></i></div>`;
  }

  let html = `
  
  <div class="postare-full">
          ${deleteBtn}
          ${editBtn}
          </br>
          <h1 class="centered">${postare.name}</h1>
          
          <div class="slideshow-container">
              <div class="slideshow-image">
                <img src="${postare.imageOne}">
              </div>
              <div class="slideshow-image">
                <img src="${postare.imageTwo}">
              </div>
              <div class="slideshow-image">
                <img src="${postare.imageThree}">
              </div>
          </div>  

          <p id="direction">
            <i class="fas fa-location-arrow"></i>
            <span class="stilizare">${postare.address}</span>
          </p>
          <p>
            <i class="fas fa-phone"></i>
            <a class="stilizare" href="tel:${postare.phoneNumber}">${postare.phoneNumber}</a>
          </p>
          <p>
            <i class="fas fa-globe"></i>
            <a class="stilizare" href="${postare.website}" target="_blank">${postare.website}</a>
          </p>
          <p>
            <i class="fas fa-envelope"></i>
            <a class="stilizare" href="mailto:${postare.email}">${postare.email}</a>
          </p>
          <p>
            <i class="fas fa-clock"></i>
            ${postare.hoursOfOperation}
          </p>
          <p>
            ${postare.description}
          </p>
  </div>
  `;
  postareSection.innerHTML = html;

  $(document).ready(function () {
    $(".slideshow-container").slick({
      slidesToShow: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      arrows: false,
      dots: false,
    });
  });

  const directionParagraph = document.getElementById("direction");
  directionParagraph.addEventListener("click", function () {
    const url = `http://maps.google.com/maps?saddr=&daddr=${postare.latitude},${postare.longitude}&z=14&t=m`;
    window.open(url, "_blank"); // deschideți URL-ul într-o nouă fereastră de browser
  });
}

function deletePost() {
  let confirmare = confirm("Sunteti sigur ?");
  if (confirmare == true) {
    postariDb.child(id).remove().then(showPostari);
  }
}
function editPost() {
  window.location = "update.html?id=" + id;
}
function showPostari() {
  window.location = "postari.html";
}
function refresh() {
  window.location.reload();
}
