import React, { memo, useRef } from 'react';
import styles from './cardeditor.module.css';

const CardEditor = memo(
  ({ id, name, description, color, fileName, onDeleteCard, cloudinary, AvatarComp, onChangeCard }) => {
    const cardInfo = { id, name, description, color, fileName };
    // cardInfo 구분하기 위함

    const nameRef = useRef();
    const colorRef = useRef();
    const desRef = useRef();
    const onInput = (e) => {
      const changeValue = e.currentTarget.value;
      const changeName = e.currentTarget.id;
      onChangeCard({
        ...cardInfo,
        [changeName]: changeValue,
      });
    };

    const onFileChange = async (files) => {
      const fileInfo = await cloudinary.uploadFile(files);
      const newFileName = fileInfo.original_filename;
      const newFileUrl = fileInfo.url;
      onChangeCard({
        ...cardInfo,
        fileName: newFileName,
        fileUrl: newFileUrl,
      });
    };

    const onDeletebtnClick = () => {
      onDeleteCard({ id });
    };

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
            ></textarea>
          </div>
          <div className={styles.line}>
            <AvatarComp
              onFileChange={onFileChange}
              fileName={fileName}
            />
            <div className={styles.deleteBtn} onClick={onDeletebtnClick}>
              delete
            </div>
          </div>
        </form>
      </div>
    );
  },
);

export default CardEditor;
