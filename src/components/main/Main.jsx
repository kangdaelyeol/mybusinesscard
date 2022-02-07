import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Cardmaker from '../cardmaker/Cardmaker';
import styles from './main.module.css';
import MyCard from '../myCard/MyCard';
import CardEditor from '../cardeditor/CardEditor';


// cards id -> Date.now();

const Main = ({isLogin, cloudinary, AvatarComp, cardsDB}) => {
  const [cards, setCards] = useState({});
  
  const history = useHistory();
  // isLogin: state, info
  // info: displayName, email, photoURL, uid

  useEffect(() => {
    if (!isLogin.state) return history.push('/');
    console.log(isLogin);
    const onValueListener = cardsDB.onVal(setCards);
    // onValueListener -> ref off 메서드
    return () => {
      onValueListener();
    }
  },[isLogin, cardsDB]);

  const onChangeCard = async (name, color, description, id, fileName, fileUrl) => {
    const newCards = {};
    const newCard = {name, color, description, id, fileName, fileUrl}
    Object.keys(cards).forEach((key, index) => {
      if(Number(key) !== Number(id)){ // 수정하는 데이터 일치 X
        newCards[key] = {...cards[key]};
      } else { // 일치하면 (key === id)
        newCards[id] = newCard;
      }
    })
    setCards(newCards);
    await cardsDB.setMyCards(isLogin.info.uid, id, newCard);
  }

  const onDeleteCard = (props) => {
    const { id } = props;
    const newCards = {};
    Object.keys(cards).forEach((key, index) => {
      if(Number(key) !== Number(id)){ // 수정하는 데이터 일치 X
        newCards[key] = {...cards[key]};
      }
    })
    setCards(newCards);
  }

  const addCard = (name, color, description, fileName, fileUrl) => {
    const id = Date.now();
    const newCard = {
      name,
      color,
      description,
      id,
      fileName,
      fileUrl
    };

    const newCards = {};
    Object.keys(cards).forEach((key) => {
      newCards[key] = { ...cards[key] };
    });

    newCards[id] = newCard;
    setCards(newCards);
    console.log(newCards);
  };

  
  return (
    <div className={styles.main}>
      <div className={styles.left}>
      {Object.keys(cards).map((key, index) => {
          return <CardEditor onDeleteCard={onDeleteCard} cloudinary={cloudinary} AvatarComp={AvatarComp} onChangeCard={onChangeCard} cardInfo={cards[key]} key={cards[key].id}/>;
        })}
        <Cardmaker AvatarComp={AvatarComp} cloudinary={cloudinary} onSave={addCard} />
      </div>
      <div className={styles.right}>
        {Object.keys(cards).map((key, index) => {
          return <MyCard cardInfo={cards[key]} key={cards[key].id}/>;
        })}
      </div>
    </div>
  );
};

export default Main;
