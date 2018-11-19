const
    commentThreadId_default = 'aHR0cHM6Ly9maXJlYmFzZS5nb29nbGUuY29tL2RvY3MvZmlyZXN0b3JlL3F1aWNrc3RhcnQ=',
    commentThreadUrl_default = 'https://firebase.google.com/docs/firestore/quickstart'

let
    db,
    auth,
    whitelist,
    commentThreadUrl = commentThreadUrl_default,
    commentThreadId = window.btoa(commentThreadUrl),
    commentThread



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
        console.log(`Firebase SDK loaded with ${features.join(', ')}`);
        init();

    } catch (e) {
        console.error(e);
        console.log('Error loading the Firebase SDK, check the console.');
    }
});

const init = () => {
    console.log('init')
    db = firebase.firestore();
    auth = firebase.auth();

    db.settings({
        timestampsInSnapshots: true
    });

    initUserAuth();
    initCommentForm();
}

const initUserAuth = () => {
    // Set reference to whitelisted users
    whitelist = db.collection('users');
    // Check if user is whitelisted

    auth.onAuthStateChanged(checkCurrentUserAuth)
    // checkCurrentUserAuth();

    document.querySelector('.sign-out').addEventListener('click', e => {
        evac("signout");
    })
}

const checkCurrentUserAuth = () => {
    if (!auth) {
        console.error("auth not found")
        evac('auth not found');
        return;
    }

    if (!auth.currentUser) {
        console.error('currentUser not found');
        evac('currentUser not found');
        return;
    }

    if (!auth.currentUser.uid) {
        console.error('uid not found');
        evac('uid not found');
        return;
    }

    // Check whitelist
    whitelist.doc(auth.currentUser.uid).get().then(doc => {
        console.log(doc.data());
        loadComments();

    }).catch(error => {
        console.error(error)
    })
}


const loadComments = () => {
    commentThread = db.collection('comments')
        .doc(commentThreadId).collection('default-comments-collection');

    commentThread.get().then(comments => {
        comments.docs.forEach(doc => {
            insertComment(doc);
        })
    })
}

const insertComment = (doc) => {
    const data = doc.data()
    console.log('insertComment')
    console.log(doc);
    const
        comment = document.createElement('li'),
        content = document.createElement('div'),
        header = document.createElement('span'),
        body = document.createElement('p')


    comment.classList.add('card');
    content.classList.add('card-content');
    header.classList.add('card-title');
    body.classList.add('comment-body');
    comment.setAttribute('data-comment-id', doc.id)

    body.innerHTML = data.body;

    // header.innerHTML = data.uid;
    whitelist.doc(data.uid).get().then( user => {
        const avatar = document.createElement('img');
        // avatar.classList.add()
        
        console.log(user.data())
        if(user.data()){
            avatar.src = user.data().avatar;
            header.appendChild(avatar)
        }
    }).catch(error => {
        console.error(error)
    })
    content.appendChild(header);
    content.appendChild(body);
    comment.appendChild(content);

    document.querySelector('.comments-list').appendChild(comment)

}

const evac = options => {
    auth.signOut();
    window.location.replace('./index.html');
}

const initCommentForm = () => {
    const
        textarea = document.querySelector('.new-comment'),
        btn_submit = document.querySelector('.submit-new-comment')

    btn_submit.addEventListener('click', e => {
        e.preventDefault();
        if (textarea.value.length > 1) {
            commentThread.add({
                uid: auth.currentUser.uid,
                body: textarea.value
            }).then( docRef =>{
                console.log(commentThread.get().docs)
            })
        }
    })
}