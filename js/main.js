// handle detail for card click
function handleDetail(id, save = false) {
  localStorage.setItem("team_id", id);
  localStorage.setItem("team_save", save);

  //   console.log(save);
  if (save === true) {
    document.querySelector("body").setAttribute("data-saved", true);
  } else {
    document.querySelector("body").setAttribute("data-saved", false);
  }

  loadPage("team");
}

// click favorite button
function favoriteClick() {
  let favoriteBtn = document.getElementById("favorite");

  let saved = document.querySelector("body").getAttribute("data-saved");

  if (saved === "true") {
    favoriteBtn.style.display = "none";
    getFavTeamById();
  } else {
    var item = getTeamDetail();
  }

  favoriteBtn.addEventListener("click", () => {
    console.log("click");
    item.then((team) => {
      saveTeam(team);
    });
  });
}

function removeFav(id) {
  deleteFavTeam(id);
  loadPage("favorite");
}

// check service worker
if ("serviceWorker" in navigator) {
  registerServiceWorker();
  reqPermission();
} else {
  console.log("Your browser not support Service Worker");
}

function registerServiceWorker() {
  navigator.serviceWorker
    .register("sw.js")
    .then((reg) => {
      console.log("service worker registration succcess");
      return reg;
    })
    .catch((e) => {
      console.log(`service worker fail to register e`);
    });
}

function reqPermission() {
  if ("Notification" in window) {
    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        console.log("Notifikasi tidak diijinkan");
        return;
      } else if (result === "default") {
        console.log("User tidak memilih persetujuan notifikasi");
        return;
      }

      if ("PushManager" in window) {
        navigator.serviceWorker.getRegistration().then((reg) => {
          reg.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                "BLOSXX7Ed-tmyYSDwqFPcl0CKDoVB2Vog_Zl5JajHBYfpQXZbFCbwe_vDrUWphW5j3nxCNxJK1-zEfAoU7cUxbQ"
              ),
            })
            .then((subscribe) => {
              console.log(
                `Berhasil melakukan subscribe dengan endpoint: ${subscribe.endpoint}`
              );

              console.log(
                "Berhasil melakukan subscribe dengan p256dh key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("p256dh"))
                  )
                )
              );

              console.log(
                "Berhasil melakukan subscribe dengan auth key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("auth"))
                  )
                )
              );
            })
            .catch((err) => {
              console.log(`Tidak dapat melakukan subscribe ${err.message}`);
            });
        });
      }
    });
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
