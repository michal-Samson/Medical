const webpush = require('web-push');
const notifier = require('node-notifier');
const ChromeLauncher = require('chrome-launcher');

const vapidKeys = {
    "publicKey": "BDpB7ap5gS_H5OvddRPpnVMUTgNepaR8V2X_MjUiCjHzFzLJY7_-T_3hKskPaBi3HbW2PLTES2KDLIH0V1CWBqs",
    "privateKey": "E1nQ2JEZlF4JVS9DbfJWLoGjF3Q8ymFMhVwoENESttc"
};

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey, vapidKeys.privateKey
);

//const app: Application = express();
module.exports = async (req, res) => {
    console.log(req.body)
    const subscription = req.body;
    var SubscriptionKey = subscription.SubscriptionKey,
        UserName = subscription.UserName;
    var content = "שלום ל" + UserName;
    const sk = JSON.parse(subscription.SubscriptionKey);
    console.log(sk);
    // console.log(sk);
    // console.log(SubscriptionKey);
    switch (subscription.Subject) {
        case "Subscribe": content += " הודעה ראשונית להתחברות ";
            break;
        case "TakeMedicine":
            var TimeToSchedule = subscription.TimeToSchedule,
                MedicineName = subscription.MedicineName,
                Amount = subscription.Amount;
            content += " השעה " + TimeToSchedule + " נטילת תרופה " + MedicineName + Amount;
            break;
        case "FinishMedicine":
            content += " תרופה " + subscription.MedicineName + "עומדת להסתיים "; break;
        default: content += "הודעה ראשונית להתחברות ";
    }


    console.log(content);
    notifier.notify({
        title: 'Medical',
        message: content,
        icon: "C:/Users/Ahuva/Desktop/MedicalProgect/server/assets/medicine.png",
        wait: true,
    });

    notifier.on('click', () => {
        console.log('onclick')
        ChromeLauncher.launch({
            startingUrl: 'http://localhost:8001/home'
        })
    })

    const notificationPayload = {
        "notification": {
            "actions": [{
                "action": "explore",
                "url": "https://www.google.co.il/?hl=iw",
                "title": "הצג התראה"

            }],
            "title": "Medical",
            "body": content,
            "icon": "C:/Users/Ahuva/Desktop/MedicalProgect/server/assets/medicine.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            }

        }
    };

    // 
    try {
        await webpush.sendNotification(sk, JSON.stringify(notificationPayload));
        res.status(200).json({ message: 'MedicineReminder sent successfully.' })
    } catch (err) {
        console.error("Error sending notification, reason: ", err);
        res.sendStatus(500);
    }
}