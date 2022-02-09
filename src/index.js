import React, { memo } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { cloudinaryService, firebaseServices, firebaseDB } from './service';
import AvatarInput from './components/avatarInput/AvatarInput';
const cloudinary = new cloudinaryService();
const firebase = new firebaseServices();
const cardsDB = new firebaseDB();

const AvatarComp = memo(props => (<AvatarInput {...props} />));

ReactDOM.render(
  <React.StrictMode>
    <App
      cloudinary={cloudinary}
      firebase={firebase}
      AvatarComp={AvatarComp}
      cardsDB={cardsDB}
    />
  </React.StrictMode>,
  document.getElementById('root'),
);
