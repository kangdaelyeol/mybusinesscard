import React from "react";
import styles from "./header.module.css";


const Header = ({ isLogin, onLogin, firebase }) => {
  console.log(isLogin);
  const onLogout = async () => {
    if(!isLogin.state) return;
    const result = await firebase.signOut();
    if(result){
      onLogin({
        state:false
      });

    }
    else{
      console.log(result);
      throw new Error("Logout Error!")
    }
  }
  return (<header className={styles.head}>
    <span className={`${styles.left} ${styles.title}`}>{
      isLogin.state 
      ? <div className={styles.userInfo}>
        <img className={styles.userAvatar} src={isLogin.info.photoURL}></img> 
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