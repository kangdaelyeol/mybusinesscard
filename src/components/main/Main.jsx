import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Cardmaker from '../cardmaker/Cardmaker';
import styles from './main.module.css';
import MyCard from '../myCard/MyCard';
import CardEditor from '../cardeditor/CardEditor';

const Main = ({isLogin, cloudinary}) => {
  const [cards, setCards] = useState({
    1 : {
      id:1,
      name:"nameSample",
      description: "description",
      color:"black"
    }
  });

  const onChangeCard = (name, color, description, id) => {
    const newCards = {};
    const newCard = {name, color, description, id}
    Object.keys(cards).forEach((v, index) => {
      if(index + 1 !== id){
        newCards[index + 1] = {...cards[index + 1]};
      } else {
        newCards[id] = newCard;
      }
    })
    setCards(newCards);
  }

  const addCard = (name, color, description) => {
    const id = Object.keys(cards).length + 1;
    const newCard = {
      name,
      color,
      description,
      id,
    };

    const newCards = {};
    Object.keys(cards).forEach((index) => {
      newCards[index] = { ...cards[index] };
    });

    newCards[id] = newCard;
    setCards(newCards);
    console.log(newCards);
  };

  const history = useHistory();
  useEffect(() => {
    if (!isLogin) history.push('/');
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.left}>
      {Object.keys(cards).map((v, index) => {
          return <CardEditor onChangeCard={onChangeCard} cardInfo={cards[index + 1]} key={cards[index + 1].id}/>;
        })}
        <Cardmaker cloudinary={cloudinary} onSave={addCard} />
      </div>
      <div className={styles.right}>
        {Object.keys(cards).map((v, index) => {
          return <MyCard cardInfo={cards[index + 1]} key={cards[index + 1].id}/>;
        })}
      </div>
    </div>
  );
};

export default Main;
