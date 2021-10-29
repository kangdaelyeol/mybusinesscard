import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './app.module.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/Login';
import Main from './components/main/Main';
const App = () => {
  const [isLogin, setLogin] = useState(true);
  const onLogin = (bool) => {
    setLogin(bool);
  }

  return (
    <BrowserRouter>
      <div className={`${isLogin ? '' : styles.main}`}>
        <div className={`${isLogin ? '' : styles.loginwrapper}`}>
          <Header isLogin={isLogin} onLogin={onLogin}/>
          <Switch>
            <Route path='/' exact={true}>
              <Login onLogin={onLogin} isLogin={isLogin}/>
            </Route>
            <Route path="/main" exact={true}>
              <Main isLogin={isLogin}/>
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
