import React from "react";
import styles from "./header.module.css";


const Header = ({ isLogin, onLogin, firebase }) => {
  console.log('Header Render');
  const onLogout = () => {
    if(!isLogin.state) return;
    return firebase.signOut().then(() => {
      onLogin({
        state:false
      })
      console.log("Logout success")
    }).catch(e => {
      console.log(e);
      throw new Error("logout Error");
    });
  }


  return (<header className={styles.head}>
    <span className={`${styles.left} ${styles.title}`}>{
      isLogin.state 
      ? <div className={styles.userInfo}>
        <img alt="profile" className={styles.userAvatar} src={isLogin.info.photoURL}></img> 
      </div>
      : ''
    } </span>
    <span className={`${styles.middle} ${styles.title}`}>Create Business Card</span>
    <span className={`${styles.right} ${styles.title}`}>
        {
        isLogin.state
         ? <div onClick={onLogout} className={styles.logoutbtn}>logout</div>
         : ''
        }
    </span>
  </header>)
}
export default Header;