import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import styles from './login.module.css';

const Login = ({onLogin, isLogin, firebase}) => {
  const history = useHistory();
  
  useEffect(()=>{
    if(isLogin)
    history.push("/main");
  })

  const onGithubLogin = () => {
    onLogin(true);
    history.push("/main");
  }

  const onGoogleLogin = async () => {
    const loginResult = await firebase.googleLogin();
    console.log(loginResult);
  }

  return (
    <div className={styles.main}>
      <span className={styles.title}>Create your Businesscard!!</span>
      <button onClick={onGithubLogin} className={styles.loginbutton}>Sign in with Github</button>
      <button onClick={onGoogleLogin} className={styles.loginbutton}>Sign in with Google</button>
    </div>
  );
};

export default Login;
