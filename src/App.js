import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Main from './components/main/Main';
const App = ({ cloudinary, firebase, AvatarComp, cardsDB }) => {
  const [isLogin, setLogin] = useState({
    state: false
  });
  const loginState = isLogin.state;
  const onLogin = (data) => {
    setLogin(data);
  }

  return (
    <BrowserRouter>
      <div className={`${loginState ? '' : styles.main}`}>
        <div className={`${loginState ? '' : styles.loginwrapper}`}>
          <Header firebase={firebase} isLogin={isLogin} onLogin={onLogin}/>
          <Switch>
            <Route path='/' exact={true}>
              <Login onLogin={onLogin} firebase={firebase} isLogin={isLogin}/>
            </Route>
            <Route path="/main" exact={true}>
              <Main cardsDB={cardsDB} AvatarComp={AvatarComp} cloudinary={cloudinary} isLogin={isLogin}/>
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
