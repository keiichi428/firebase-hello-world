window.addEventListener('load', e => {


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC2sXqBdStsqmGLtqO0K0CBqh-qpiXEvsw",
        authDomain: "helloworld-2018-974bf.firebaseapp.com",
        databaseURL: "https://helloworld-2018-974bf.firebaseio.com",
        projectId: "helloworld-2018-974bf",
        storageBucket: "helloworld-2018-974bf.appspot.com",
        messagingSenderId: "809254167880"
    };
    firebase.initializeApp(config);


    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: 'index.html',
        signInOptions: [
           firebase.auth.EmailAuthProvider.PROVIDER_ID,
           firebase.auth.GoogleAuthProvider.PROVIDER_ID,
           firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
        // Other config options...
    });

    console.log(ui);
    
})