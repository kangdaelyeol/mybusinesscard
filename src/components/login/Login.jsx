import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import styles from './login.module.css';

const Login = ({onLogin, isLogin}) => {
  const history = useHistory();
  
  useEffect(()=>{
    if(isLogin)
    history.push("/main");
  })

  const onButtonClick = () => {
    onLogin(true);
    history.push("/main");
  }

  return (
    <div className={styles.main}>
      <span className={styles.title}>Create your Businesscard!!</span>
      <button onClick={onButtonClick} className={styles.loginbutton}>Sign in with Github</button>
      <button className={styles.loginbutton}>Sign in with Google</button>
    </div>
  );
};

export default Login;
