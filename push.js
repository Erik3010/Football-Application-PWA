var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BLOSXX7Ed-tmyYSDwqFPcl0CKDoVB2Vog_Zl5JajHBYfpQXZbFCbwe_vDrUWphW5j3nxCNxJK1-zEfAoU7cUxbQ",
    "privateKey": "gR1qQWhLVJlO5xyfsc_qeTfomPaxsdsG9BlkTETUdc4"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/c4L4U0PSrXQ:APA91bFyXue2ePAzrHGtU-EmGsE2aNZ4GvfSUkia3qzg1DYgEKUVJfvd5HTHKi5y80Xo77MlNIzgidJpBSi0r2abSjLBUCL7tXGOFOI4VDlZg9lfle8JA3e5tBkW9kNshGk5JNftlAAC",
    "keys": {
        "p256dh": "BCMNsRwy3mt0XUWhxF76MOVdyVTPKeKQLd/UfNxVLqNSJAQ+Ljs87HI7OLwf03VnuMlhV68hKHnYY1ssQUDq+Hk=",
        "auth": "BGHtLgDHgllvhHzlYnkBIw=="
    }
};

let payload = "Ini adalah sebuah Push notification";

let options = {
    gcmAPIKey: '221306486068',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)