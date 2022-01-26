import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { cloudinaryService, firebaseServices } from "./service";
import AvatarInput from './components/avatarInput/AvatarInput';
const cloudinary = new cloudinaryService();
const firebase = new firebaseServices();


const AvatarComp = (props) => <AvatarInput {...props} />

ReactDOM.render(
  <React.StrictMode>
    <App cloudinary={cloudinary} firebase={firebase} AvatarComp={AvatarComp}/>
  </React.StrictMode>,
  document.getElementById('root'),
);
