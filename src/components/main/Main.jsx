import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Cardmaker from "../cardmaker/Cardmaker";
import styles from "./main.module.css";

const Main = (isLogin) => {
  const history = useHistory();
  useEffect(()=>{
    if(!isLogin) history.push("/");
  }, []);
  
  return (<div className={styles.main}>
  <div className={styles.left}>
    <Cardmaker />
  </div>
  <div className={styles.right}>
      abc
  </div>
  </div>)
}

export default Main;