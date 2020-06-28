document.addEventListener("DOMContentLoaded", () => {
  let sidenav = document.querySelector(".sidenav");

  M.Sidenav.init(sidenav);

  loadNav();
});

function loadNav() {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.querySelectorAll(".right, .sidenav").forEach((el) => {
        el.innerHTML = xhr.responseText;
      });

      document.querySelectorAll(".right a, .sidenav a").forEach((el) => {
        el.addEventListener("click", (e) => {
          // e.preventDefault();

          const sidenav = document.querySelector(".sidenav");
          M.Sidenav.getInstance(sidenav).close();

          const page = e.target.getAttribute("href").substr(1);
          loadPage(page);
        });
      });
    }
  };

  xhr.open("GET", "../components/nav.html");
  xhr.send();
}

let contianer = document.getElementById("container");
let page = window.location.hash.substr(1);
if (page === "") page = "home";
loadPage(page);

function loadPage(page) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        container.innerHTML = xhr.responseText;

        if (page === "home") getMatches();
        else if (page === "team") {
          favoriteClick();
        } else if (page === "favorite") {
          getFavoriteTeams();
        }
      } else if (xhr.status === 404) {
        container.innerHTML = "<h3>Page not Found</h3>";
      } else {
        container.innerHTML = "<h3>Something wrong</h3>";
      }
    }
  };

  xhr.open("GET", `../pages/${page}.html`);
  xhr.send();
}
