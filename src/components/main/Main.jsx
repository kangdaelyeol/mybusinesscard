import React, { useEffect, useState, useCallback } from 'react';
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
    // console.log('Main useEffect!!', isLogin.state);
    if (!isLogin.state) return history.push('/');
    const onValueListener = cardsDB.onVal((cards) => {
      setCards(cards);
    });
    // onValueListener -> ref off 메서드
    return () => {
      onValueListener();
    };
  }, [isLogin, cardsDB, history, cloudinary, AvatarComp]);

  // FileInfo: name, color, description, id, fileName, fileUrl
  const onChangeCard = useCallback(
    (cardInfo) => {
      const newCard = { ...cardInfo };
      cardsDB.setMyCards(newCard);
    },
    [cardsDB],
  );

  const onDeleteCard = useCallback(
    (props) => {
      const { id } = props;
      cardsDB.removeMyCard(id);
    },
    [cardsDB],
  );

  // id는 추가할 떄 만드는게 맞는 것 같다.
  const addCard = useCallback(
    (cardInfo) => {
      const id = Date.now();
      const newCard = {
        ...cardInfo,
        id,
      };
      cardsDB.setMyCards(newCard);
    },
    [cardsDB],
  );
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        {Object.keys(cards).map((key, index) => 
            <CardEditor
              key={key}
              onDeleteCard={onDeleteCard}
              cloudinary={cloudinary}
              AvatarComp={AvatarComp}
              onChangeCard={onChangeCard}
              // firebase RealtimeDB의 데이터를 받기 때문에
              // card자체로 받으면 반드시 props의 값이 달라짐
              // 따라서 반드시 리랜더가 되기 때문에
              // memo를 사용하기 위해서 spread operator사용
              {...cards[key]}
            />
        )}
        <Cardmaker
          AvatarComp={AvatarComp}
          onSave={addCard}
        />
      </div>
      <div className={styles.right}>
        {Object.keys(cards).map((key, index) => {
          return <MyCard key={key} {...cards[key]} />;
        })}
      </div>
    </div>
  );
};

export default Main;
