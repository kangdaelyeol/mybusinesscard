import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { cloudinaryService } from "./service";

const cloudinary = new cloudinaryService();

ReactDOM.render(
  <React.StrictMode>
    <App cloudinary={cloudinary}/>
  </React.StrictMode>,
  document.getElementById('root'),
);
