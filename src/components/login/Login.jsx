import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import styles from './login.module.css';

const Login = ({onLogin, isLogin, firebase}) => {
  const history = useHistory();
  useEffect(()=>{
    firebase.checkLoginState((user) => {
      setuser(user);
    });
    console.log(isLogin);
    if(isLogin.state)
    history.push("/main");
  })

  const setuser = (user) => {
    const { displayName, email, photoURL, uid } = user
    onLogin({
      state: true,
      info: {
        displayName, email, photoURL, uid
      }
    });
  }


  const onGithubLogin = async () => {
    const loginResult = await firebase.githubLogin();
    // history.push("/main");
    console.log(loginResult);
    if(loginResult.type === "success"){
      setuser(loginResult.user);
      // await firebase.createUser(uid, displayName, email, photoURL);
      history.push("/main");
    }
  }

  const onGoogleLogin = async () => {

    const loginResult = await firebase.googleLogin();
    console.log(loginResult);
    if(loginResult.type === "success"){
      setuser(loginResult.user);
      // await firebase.createUser(uid, displayName, email, photoURL);
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
