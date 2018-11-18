window.addEventListener('load', e => {


    // Initialize Firebase
    const
        config = {
            apiKey: "AIzaSyC2sXqBdStsqmGLtqO0K0CBqh-qpiXEvsw",
            authDomain: "helloworld-2018-974bf.firebaseapp.com",
            databaseURL: "https://helloworld-2018-974bf.firebaseio.com",
            projectId: "helloworld-2018-974bf",
            storageBucket: "helloworld-2018-974bf.appspot.com",
            messagingSenderId: "809254167880"
        };

    let
        db

    firebase.initializeApp(config);

    db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    console.log(db)

    firebase.auth().onAuthStateChanged(
        user => {
            const currentUser = firebase.auth().currentUser;
            let currentUserDoc;
            // Check sign-in status
            if (!currentUser) {
                console.error(firebase.auth().currentUser);
                logMeIn();
                return;
            }

            // Check if the current user is whitelisted
            currentUserDoc = db.collection('users').doc(currentUser.uid);

            console.log(currentUserDoc)
        })


});

const logMeIn = () => {
    window.location = './signin.html'
}