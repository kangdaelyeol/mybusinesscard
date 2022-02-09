import React, { memo } from 'react';
import styles from "./footer.module.css";

const Footer = memo(() => {
  console.log("footer Render");
  return (<footer className={styles.footer}>
    <span className={styles.title}>rkdeofuf</span>
  </footer>)
});
 

export default Footer;
