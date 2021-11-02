import React, { useRef } from 'react';
import styles from "./cardEditor.module.css";

const CardEditor = ({onChangeCard, cardInfo}) => {
  const {id, name, description, color} = cardInfo;
  const avatarRef = useRef();
  const nameRef = useRef();
  const colorRef = useRef();
  const desRef = useRef();

  const onInput = () => {
    const newAvatar = avatarRef.current.value;
    const newName = nameRef.current.value;
    const newColor = colorRef.current.value;
    const newDes = desRef.current.value;
    onChangeCard(newName, newColor, newDes, id);
  }

  return (
    <div className={styles.main}>
      <form
        className={styles.form}
        encType='multiple/data-form'
      >
        <div className={styles.line}>
          <input
            ref={nameRef}
            type='text'
            name='name'
            id='name'
            placeholder='Name'
            onChange={onInput}
            value={name}
          />
          <select value={color} ref={colorRef} name='color' id='color' onChange={onInput}>
            <option value='black'>black</option>
            <option value='pink'>pink</option>
          </select>
        </div>
        <div className={styles.line}>
          <textarea
            ref={desRef}
            className={styles.description}
            name='description'
            id='description'
            rows='3'
            placeholder='description'
            onChange={onInput}
          >{description}</textarea>
        </div>
        <div className={styles.line}>
          <label className={styles.filelabel} htmlFor='avatar'>
            No File
          </label>
          <input
            onChange={onInput}
            ref={avatarRef}
            className={styles.fileinput}
            id='avatar'
            type='file'
            accept='image/*'
          />
        </div>
      </form>
    </div>
  );
}


export default CardEditor;