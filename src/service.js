import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  getAuth,
} from 'firebase/auth';
import { useRef } from 'react';

const ENV_params = {
  firebaseAPI_KEY: process.env.REACT_APP_FIREBASEAPIKEY,
};

const PROJECT_ID = 'business-card-maker-21a3d';
// TODO: Replace the following with your app's Firebase project configuration
const CLOUD_NAME = 'dfvqmpyji';
const UPLOAD_PRESET = 'qzlqkpry';

const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

const firebaseConfig = {
  apiKey: ENV_params.firebaseAPI_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_ID}-default-rtdb.firebaseio.com/`,
  projectId: PROJECT_ID,
  messagingSenderId: '637908496727',
  appId: '2:637908496727:web:a4284b4c99e329d5',
  // storageBucket: `${PROJECT_ID}.appspot.com/`,
};
const app = initializeApp(firebaseConfig);

export class firebaseServices {
  googleLogin = async () => {
    const auth = getAuth();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      return {
        type: 'success',
        token,
        user,
      };
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential_1 = GoogleAuthProvider.credentialFromError(error);
      return {
        type: 'error',
        errorCode,
        errorMessage,
        email,
        credential_1,
      };
    }
  };

  githubLogin = async () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // ...
      return {
        type: 'success',
        token,
        user,
      };
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
      return {
        type: 'error',
        errorCode,
        errorMessage,
        email,
        credential,
      };
    }
  };

  signOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  // database function
  createUser = async (uid, username, email, avatarURL) => {
    const db = getDatabase();
    const setResult = await set(ref(db, 'users/' + uid), {
      username,
      email,
      avatarURL,
      cards: null
    });
    const refResult = ref(db, "users/" + uid);
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      console.log("snapshotVal: ", data);
    })
  };
}


export class firebaseDB{
  setMyCards = async (uid, cardID, cardInfo) => {
    const db = getDatabase();
    await set(ref(db, 'users/' + uid + '/' + cardID), cardInfo);
  }

  onVal = (onUpdateCard) => {
    const myAuth = getAuth();
    const db = getDatabase();

    const userId = myAuth.currentUser.uid;
    const userRef = ref(db, 'users/' + userId);
    onValue(userRef, (snapshot) => {
      const snapValue = snapshot.val();
      snapValue && onUpdateCard(snapValue);
    });

    return () => userRef.off();
  }

  getMyCards  = () => {
    const myAuth = getAuth();
    const db = getDatabase();
    const uid = myAuth.currentUser.uid;
    const ref = ref(db, 'users/' + uid + '/');
  }

  removeMyCards = (uid, cardID) => {
    // TO DO -> remove card Logic
    return;
  }
}
// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const files = document.querySelector("[type=file]").files;
//   const formData = new FormData();

//   for (let i = 0; i < files.length; i++) {
//     let file = files[i];
//     formData.append("file", file);
//     formData.append("upload_preset", "docs_upload_example_us_preset");

//     fetch(cloudinaryUrl, {
//       method: "POST",
//       body: formData
//     })
//       .then((response) => {
//         return response.text();
//       })
//       .then((data) => {
//         document.getElementById("data").innerHTML += data;
//       });
//   }
// });

export class cloudinaryService {
  uploadFile = async (files) => {
    const formdata = new FormData();

    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formdata.append('file', file);
      formdata.append('upload_preset', UPLOAD_PRESET);
      for (let k of formdata.keys()) console.log(k);
      for (let v of formdata.values()) console.log(v);
    }

    const fileRes = await axios({
      url: cloudinaryUrl,
      method: 'POST',
      data: formdata,
    });
    console.log(fileRes);
    // const res = await fileRes.json();

    return fileRes.data;
  };
}
