import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { cloudinaryService } from "./service";
import AvatarInput from './components/avatarInput/AvatarInput';
const cloudinary = new cloudinaryService();

const AvatarComp = (props) => <AvatarInput {...props} />

ReactDOM.render(
  <React.StrictMode>
    <App cloudinary={cloudinary} AvatarComp={AvatarComp}/>
  </React.StrictMode>,
  document.getElementById('root'),
);
