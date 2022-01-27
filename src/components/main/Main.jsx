import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Cardmaker from '../cardmaker/Cardmaker';
import styles from './main.module.css';
import MyCard from '../myCard/MyCard';
import CardEditor from '../cardeditor/CardEditor';

const Main = ({isLogin, cloudinary, AvatarComp}) => {
  const [cards, setCards] = useState({
    1 : {
      id:1,
      name:"nameSample",
      description: "description",
      color:"black",
      fileName:"",
      fileUrl: ""
    }
  });

  const onChangeCard = (name, color, description, id, fileName, fileUrl) => {
    const newCards = {};
    const newCard = {name, color, description, id, fileName, fileUrl}
    Object.keys(cards).forEach((v, index) => {
      if(index + 1 !== id){
        newCards[index + 1] = {...cards[index + 1]};
      } else {
        newCards[id] = newCard;
      }
    })
    setCards(newCards);
  }

  const onDeleteCard = (props) => {
    const { id } = props;
    let idx = 1;
    const newCards = {};
    Object.keys(cards).forEach((index) => {
      // Array<String>형 -> typeof index => String
      // 해당 id와 일치하지 않으면 복사
      if(Number(index) !== id) {
        newCards[idx] = {
          ...cards[index], // 해당 index 데이터 복사
          id: idx // idx따로 변수 둔거로 변경
        }
        console.log(newCards[idx]);
        idx++; // idx 증가 -> 새롭게 id 세팅
      }
      else return;
    });
    console.log(newCards);
    setCards(newCards);
  }

  const addCard = (name, color, description, fileName, fileUrl) => {
    const id = Object.keys(cards).length + 1;
    const newCard = {
      name,
      color,
      description,
      id,
      fileName,
      fileUrl
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
    if (!isLogin.state) history.push('/');
  }, [isLogin]);

  return (
    <div className={styles.main}>
      <div className={styles.left}>
      {Object.keys(cards).map((v, index) => {
          return <CardEditor onDeleteCard={onDeleteCard} cloudinary={cloudinary} AvatarComp={AvatarComp} onChangeCard={onChangeCard} cardInfo={cards[index + 1]} key={cards[index + 1].id}/>;
        })}
        <Cardmaker AvatarComp={AvatarComp} cloudinary={cloudinary} onSave={addCard} />
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
