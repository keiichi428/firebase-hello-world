document.addEventListener('DOMContentLoaded', function () {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
        let app = firebase.app();
        let features = ['auth', 'database', 'messaging', 'storage', 'firestore'].filter(feature => typeof app[feature] === 'function');
        // document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
        init();

    } catch (e) {
        console.error(e);
        // document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
});

const init = () => {


    const
        db = firebase.firestore();

    let
        auth = firebase.auth();

    db.settings({
        timestampsInSnapshots: true
    })

    auth.onAuthStateChanged(user => {
        if (!user) {
            console.error("no user");
            return;
        }

        if (!user.uid) {
            console.error('no uid')
            return;
        }
        db.collection('users').doc(user.uid).get().then(doc => {
            console.log(doc.data());
            window.location = './app.html';
        })

    });

    document.querySelector('.btn-sign-in').addEventListener('click', e => {
        const
            email = document.querySelector('#email').value,
            password = document.querySelector('#password').value,
            message = document.querySelector('.sign-in-message');
        auth.signInWithEmailAndPassword(email, password).catch(error => {
            console.error(error);
            message.innerHTML = error.message
        })
    })
    // ui = new firebaseui.auth.AuthUI(firebase.auth());

    // ui.start('#firebaseui-auth-container', {

    //     signInSuccessUrl: './app.html',
    //     signInOptions: [
    //         firebase.auth.EmailAuthProvider.PROVIDER_ID
    //     ],

    //     credentialHelper: firebaseui.auth.CredentialHelper.NONE
    //     // Other config options...
    // });

}