const postsDiv = document.getElementById("postari");

const url = new URL(document.location);
let text = url.searchParams.get("text");

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

searchBtn.onclick = function () {
  let text = searchInput.value;

  window.location = "pages/postari.html?text=" + text;
};
searchInput.onkeydown = function (e) {
  if (e.keyCode == 13) {
    let text = searchInput.value;

    window.location = "pages/postari.html?text=" + text;
  }
};

if (text === null) text = "";

text = text.toLowerCase();
searchInput.value = text;

function getLastPosts() {
  postariDb.orderByKey().limitToLast(6).on("value", processSnapshot);
}

function processSnapshot(snapshot) {
  let items = [];
  let data = snapshot.val();

  for (let key in data) {
    let muzee = {};

    muzee.id = key;
    muzee.data = data[key];

    items.push(muzee);
  }
  renderPosts(items);
}
function renderPosts(items) {
  let html = "";

  for (let i = 0; i < items.length; i++) {
    let p = items[i];

    html += `
            <a class="postare" href="pages/postare.html?id=${p.id}">
                  <img src="${p.data.imageOne}">
                  <div class="postare-info">
                      <h4>${p.data.name}</h4>
                      <p>
                        ${p.data.address}
                      </p>
                  </div>
            </a>
            `;
  }

  postsDiv.innerHTML = html;
}
getLastPosts();
