import React from "react";
import styles from "./cardmaker.module.css";

const Cardmaker = ()=> {

  const onSubmit = (e) => {
    e.preventDefault();
  }
 return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.line}>
          <input type="text" name="name" id="name" placeholder="Name" />
          <select name="color" id="color">
            <option value="black">black</option>
            <option value="pink">pink</option>
          </select>
        </div>
        <div className={styles.line}>
          <textarea className={styles.description} name="description" id="description" rows="3" placeholder="description"></textarea>
        </div>
        <div className={styles.line}>
          <label className={styles.filelabel} for="avatar">No File</label>
          <input className={styles.fileinput} id="avatar" type="file" accept="*/image" />
          <button className={styles.savebtn}>Save!</button>
        </div>
      </form>
    </div>
 ) 
}

export default Cardmaker;