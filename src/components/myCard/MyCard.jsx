import React from 'react';
import styles from './myCard.module.css';

const MyCard = ({ cardInfo }) => {
  const { name, color, description, id, fileUrl } = cardInfo;
  let formStyle = null;
  const path = fileUrl ? fileUrl :  '../../img/favicon.ico';
  switch (color) {
    case 'black':
      formStyle = styles.form__style__black;
      break;
    case 'pink':
      formStyle = styles.form__style__pink;
      break;
    default:
      throw new Error('form style Error');
  }
  return (
    <div className={styles.main}>
      <div className={`${styles.form} ${formStyle}`}>
        <div className={styles.form__left}>
          <img alt="avatar" src={path} className={styles.avatar} />
        </div>
        <div className={styles.form__right}>
          <span className={styles.name}>{name}</span>
          <span className={styles.description}>{description}</span>
        </div>
      </div>
    </div>
  );
};

export default MyCard;
