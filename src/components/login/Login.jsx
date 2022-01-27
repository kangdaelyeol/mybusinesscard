import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import styles from './login.module.css';

const Login = ({onLogin, isLogin, firebase}) => {
  const history = useHistory();
  
  useEffect(()=>{
    if(isLogin.state)
    history.push("/main");
  })

  const onGithubLogin = async () => {
    const loginResult = await firebase.githubLogin();
    // history.push("/main");
    console.log(loginResult);
  }

  const onGoogleLogin = async () => {
    const loginResult = await firebase.googleLogin();
    console.log(loginResult);
    if(loginResult.type === "success"){
      const { displayName, email, photoURL, uid } = loginResult.user
      onLogin({
        state:true,
        info: {
          displayName, email, photoURL, uid
        }
      });
      history.push("/main");
    }
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
