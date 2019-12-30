import firebase from 'firebase';

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if(!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBGppY-GtgAASTjxXPcZci2Ju4fRmWC8J4",
                authDomain: "chat-app-46eff.firebaseapp.com",
                databaseURL: "https://chat-app-46eff.firebaseio.com",
                projectId: "chat-app-46eff",
                storageBucket: "chat-app-46eff.appspot.com",
                messagingSenderId: "29227490280",
                appId: "1:29227490280:web:558c87188e9b1c79c2a25d",
                measurementId: "G-HKQ9G8XF50"
            })
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val()
        const { key: _id } = message
        const createdAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
            user,
        };
    }

    get = callback => {
        this.db.on('child_added', snapshot => {
            return callback(this.parse(snapshot));
        });
    };

    off() {
        this.db.off();
    }

    get db() {
        return firebase.database().ref('messages');
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();