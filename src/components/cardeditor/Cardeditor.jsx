import React, { useRef, useState } from 'react';
import styles from "./cardEditor.module.css";

const CardEditor = ({cloudinary, AvatarComp, onChangeCard, cardInfo}) => {
  const { id, name, description, color } = cardInfo;
  const nameRef = useRef();
  const colorRef = useRef();
  const desRef = useRef();
  const [fileName, setFileName] = useState(cardInfo.fileName);
  const [fileUrl, setFileUrl] = useState(cardInfo.fileUrl);

  const onInput = () => {
    const newName = nameRef.current.value;
    const newColor = colorRef.current.value;
    const newDes = desRef.current.value;
    onChangeCard(newName, newColor, newDes, id, fileName, fileUrl);
  }

  const onFileChange = async (files) => {
    const fileInfo = await cloudinary.uploadFile(files);
    const f_name = fileInfo.original_filename;
    const f_url = fileInfo.url;
    setFileName(f_name); // setState -> async request
    setFileUrl(f_url);  // setState -> async request
    const newName = nameRef.current.value;
    const newColor = colorRef.current.value;
    const newDes = desRef.current.value;
    onChangeCard(newName, newColor, newDes, id, f_name, f_url);
  };


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
          {AvatarComp({ cloudinary, onFileChange, fileName })}
        </div>
      </form>
    </div>
  );
}


export default CardEditor;