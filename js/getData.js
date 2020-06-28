const BASE_URL = "https://api.football-data.org/v2/";

const header = {
  headers: { "X-Auth-Token": "b10d61e879ec4d22a96fb0dc05122582" },
};

function imageUrl(url) {
  return url.replace(/^http:\/\//i, "https://");
}

const fetchApi = function (url) {
  return fetch(url, {
    headers: {
      "X-Auth-Token": "b10d61e879ec4d22a96fb0dc05122582",
    },
  });
};

function status(res) {
  if (res.status !== 200) {
    console.log("Error: ", res.status);
    return Promise.reject(new Error(res.statusText));
  } else {
    return Promise.resolve(res);
  }
}

function json(res) {
  return res.json();
}

function error(res) {
  console.log("Error: ", res);
}

// get all competitions team
function getMatches() {
  if ("caches" in window) {
    caches.match(`${BASE_URL}competitions/2015/teams`).then((res) => {
      if (res) {
        res.json().then((data) => {
          renderCardList(data);
        });
      }
    });
  }

  fetch(`${BASE_URL}competitions/2015/teams`, header)
    .then(status)
    .then(json)
    .then((data) => {
      renderCardList(data);
    })
    .catch(error);
}

// get teams based on ID
function getTeamDetail() {
  return new Promise((resolve, reject) => {
    let id = localStorage.getItem("team_id") || null;
    if (!id) loadPage("home");

    if ("caches" in window) {
      caches.match(`${BASE_URL}teams/${id}`).then((res) => {
        if (res) {
          res.json().then((data) => {
            renderSingleCard(data);
            resolve(data);
          });
        }
      });
    }

    fetch(`${BASE_URL}teams/${id}`, header)
      .then(status)
      .then(json)
      .then((data) => {
        renderSingleCard(data);

        resolve(data);
      })
      .catch(error);
  });
}

// get favorite teams
function getFavoriteTeams() {
  getAll().then((teams) => {
    let favContainer = document.getElementById("favorite-content");
    let teamHTML = "";

    teams.forEach((team) => {
      teamHTML += `
                <div class="card waves-effect">
                    <a href="#team" class="black-text link-detail" onclick="handleDetail(${team.id}, true)">
                        <div class="card-image">
                            <img src="${team.crestUrl}" alt="Team Image">
                        </div>
                        <div class="card-content">
                            <div class="card-title">${team.name}</div>
                            <div class="team-info">
                                <span class="bold">Address: </span>
                                <span>${team.address}</span>
                                <div class="divider separator-1"></div>
                                <span class="bold">Website: </span>
                                <a href="${team.website}" target="_blank">
                                    <span class="new badge light-blue darken-1" data-badge-caption="">${team.website}</span>
                                </a>
                            </div>
                        </div>
                        <div class="card-action">
                            <button class="btn waves-effect waves-light red" onclick="removeFav(${team.id})">
                                <i class="material-icons left">delete</i>
                                Remove Favorite Teams
                            </button>
                        </div>
                    </a>
                </div>
            `;
    });
    favContainer.innerHTML = teamHTML;
  });
}

// get single favorite teams from indexed db
function getFavTeamById() {
  let id = localStorage.getItem("team_id");

  getById(id).then((team) => {
    renderSingleCard(team);
  });
}
