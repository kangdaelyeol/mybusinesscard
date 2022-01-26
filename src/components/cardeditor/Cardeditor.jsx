import React, { useRef } from 'react';
import styles from './cardEditor.module.css';

const CardEditor = ({ onDeleteCard, cloudinary, AvatarComp, onChangeCard, cardInfo }) => {
  const { id, name, description, color, fileName, fileUrl } = cardInfo;
  const nameRef = useRef();
  const colorRef = useRef();
  const desRef = useRef();

  const onInput = () => {
    const newName = nameRef.current.value;
    const newColor = colorRef.current.value;
    const newDes = desRef.current.value;
    onChangeCard(newName, newColor, newDes, id, fileName, fileUrl);
  };

  const onFileChange = async (files) => {
    const fileInfo = await cloudinary.uploadFile(files);
    const newFileName = fileInfo.original_filename;
    const newFileUrl = fileInfo.url;
    const newName = nameRef.current.value;
    const newColor = colorRef.current.value;
    const newDes = desRef.current.value;
    onChangeCard(newName, newColor, newDes, id, newFileName, newFileUrl);
  };

  const onDeletebtnClick = () => {
    onDeleteCard({id});
  }

  return (
    <div className={styles.main}>
      <form className={styles.form} encType='multiple/data-form'>
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
          <select
            value={color}
            ref={colorRef}
            name='color'
            id='color'
            onChange={onInput}
          >
            <option value='black'>black</option>
            <option value='pink'>pink</option>
          </select>
        </div>
        <div className={`${styles.line} ${styles.textarea__line}`}>
          <textarea
            ref={desRef}
            className={styles.description}
            name='description'
            id='description'
            rows='3'
            placeholder='description'
            onChange={onInput}
            value={description}
          >
          </textarea>
        </div>
        <div className={styles.line}>
          {AvatarComp({ cloudinary, onFileChange, fileName })}
          <div className={styles.deleteBtn} onClick={onDeletebtnClick}>
            delete
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardEditor;
