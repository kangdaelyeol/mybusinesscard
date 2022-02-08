import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Cardmaker from '../cardmaker/Cardmaker';
import styles from './main.module.css';
import MyCard from '../myCard/MyCard';
import CardEditor from '../cardeditor/CardEditor';

// cards id -> Date.now();

const Main = ({ isLogin, cloudinary, AvatarComp, cardsDB }) => {
  const [cards, setCards] = useState({});

  const history = useHistory();
  // isLogin: state, info
  // info: displayName, email, photoURL, uid

  useEffect(() => {
    console.log('Main useEffect!!', isLogin.state);
    if (!isLogin.state) return history.push('/');
    const onValueListener = cardsDB.onVal((cards) => {
      setCards(cards);
    });
    // onValueListener -> ref off 메서드
    return () => {
      console.log('useEffect callback');
      onValueListener();
    };
  }, [isLogin, cardsDB]);

  const onChangeCard = (name, color, description, id, fileName, fileUrl) => {
    const newCard = { name, color, description, id, fileName, fileUrl };
    return cardsDB.setMyCards(id, newCard);
  };

  const onDeleteCard = (props) => {
    const { id } = props;
    return cardsDB.removeMyCard(id);
  };

  const addCard = (name, color, description, fileName, fileUrl) => {
    const id = Date.now();
    const newCard = {
      name,
      color,
      description,
      id,
      fileName,
      fileUrl,
    };
    return cardsDB.setMyCards(id, newCard);
  };

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        {Object.keys(cards).map((key, index) => {
          return (
            <CardEditor
              onDeleteCard={onDeleteCard}
              cloudinary={cloudinary}
              AvatarComp={AvatarComp}
              onChangeCard={onChangeCard}
              cardInfo={cards[key]}
              key={cards[key].id}
            />
          );
        })}
        <Cardmaker
          AvatarComp={AvatarComp}
          cloudinary={cloudinary}
          onSave={addCard}
        />
      </div>
      <div className={styles.right}>
        {Object.keys(cards).map((key, index) => {
          return <MyCard cardInfo={cards[key]} key={cards[key].id} />;
        })}
      </div>
    </div>
  );
};

export default Main;
