function renderCardList(data) {
  let competitionInfo = document.getElementById("competition-info");
  let matchTeam = document.getElementById("match-team");
  let seasonInfo = document.getElementById("seasson-info");

  // competition info
  competitionInfo.innerHTML = `
        <h3>${data.competition.area.name} Football Competition</h3>
        <h6>Competition Name: ${data.competition.name}</h6>
    `;

  // team card
  let matchTeamHTML = "";
  data.teams.forEach((team) => {
    matchTeamHTML += `
            <div class="card waves-effect">
                <a href="#team" class="black-text link-detail" onclick="handleDetail(${team.id})">
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
                </a>
            </div>
        `;
  });
  matchTeam.innerHTML = matchTeamHTML;

  // seassonInfo Info
  let winner = data.season.winner ? data.season.winner : "-";
  seasonInfo.innerHTML = `
            <div class="card-title">Seasson Info</div>
            <ul class="collection black-text">
                <li class="collection-item">
                    <span class="bold">Current Match Day: </span>
                    <span>${data.season.currentMatchday}</span>
                </li>
                <li class="collection-item">
                    <span class="bold">Match Start Date: </span>
                    <span>${data.season.startDate}</span>
                </li>
                <li class="collection-item">
                    <span class="bold">Match end Date: </span>
                    <span>${data.season.endDate}</span>
                </li>
                <li class="collection-item">
                    <span class="bold">Winner: </span>
                    <span>${winner}</span>
                </li>
            </ul>
    `;
}

function renderSingleCard(data) {
  let squadHTML = `<ul class="collection">`;
  data.squad.forEach((squad) => {
    let position = squad.position ? squad.position : "none";

    squadHTML += `
            <li class="collection-item">
                ${squad.name}
                <span class="waves-effect red accent-3 new badge" data-badge-caption="">${squad.role}</span>
                <span class="waves-effect orange accent-3 new badge" data-badge-caption="">${position}</span>
            </li>
        `;
  });
  squadHTML += "</ul>";

  let teamHTML = "";
  teamHTML = `
        <h3>${data.name}</h3>
            <div class="card waves-effect">
                <div class="card-image">
                    <img src="${data.crestUrl}" alt="Team Image">
                </div>
                <div class="card-content">
                    <div class="card-title">${data.name}</div>
                    <div class="team-info">
                        <span class="bold">Short Name: </span>
                        <span>${data.shortName}</span>
                        <div class="divider separator-1"></div>

                        <span class="bold">Address: </span>
                        <span>${data.address}</span>
                        <div class="divider separator-1"></div>

                        <span class="bold">Club Colors: </span>
                        <span>${data.clubColors}</span>
                        <div class="divider separator-1"></div>

                        <span class="bold">Founded Year: </span>
                        <span>${data.founded}</span>
                        <div class="divider separator-1"></div>

                        <span class="bold">Phone: </span>
                        <span>${data.phone}</span>
                        <div class="divider separator-1"></div>

                        <span class="bold">Venue: </span>
                        <span>${data.venue}</span>
                        <div class="divider separator-1"></div>

                        <span class="bold">Website: </span>
                        <a href="${data.website}" target="_blank">
                            <span class="new badge light-blue darken-1" data-badge-caption="">${data.website}</span>
                        </a>

                        <h5 class="detail-header">${data.name} squad's: </h5>
                        ${squadHTML}
                    </div>
                </div>
            </div>
        `;

  document.getElementById("detail-page").innerHTML = teamHTML;
}
