import React, { memo, useRef, useState } from 'react';
import styles from './cardmaker.module.css';

const Cardmaker = memo(
  ({ AvatarComp, onSave, fileUploader }) => {
    const nameRef = useRef();
    const colorRef = useRef();
    const desRef = useRef();
    const mainRef = useRef();
  
  
    const [fileName, setFileName] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
  
    const onFileChange = async (files) => {
      const fileInfo = await fileUploader.uploadFile(files);
      const f_name = fileInfo.original_filename;
      const f_url = fileInfo.url;
      setFileName(f_name);
      setFileUrl(f_url);
    };
  
    // 여기서 새로 생성한 정보만 넘긴다.
    // cardForm의 id는 다른 메서드(onSave)에서 생성하는게 맞다.
    const onSubmit = (e) => {
      e.preventDefault();
  
      const name = nameRef.current.value;
      const color = colorRef.current.value;
      const description = desRef.current.value;
      const saveFileName = fileName ? fileName : '';
      const saveFileUrl = fileUrl ? fileUrl : '';
      
      nameRef.current.value = '';
      desRef.current.value = '';
      // name color des
      onSave({
        name,
        color,
        description,
        fileName: saveFileName,
        fileUrl: saveFileUrl
      });
      setFileName(null);
      setFileUrl(null);
    };
    return (
      <div className={styles.main} ref={mainRef}>
        <h1 className={styles.title}>Card form!</h1>
        <form
          className={styles.form}
          onSubmit={onSubmit}
          encType='multiple/data-form'
        >
          <div className={styles.line}>
            <input
              className={styles.input}
              ref={nameRef}
              type='text'
              name='name'
              id='name'
              placeholder='Name'
            />
            <select
              className={styles.input}
              ref={colorRef}
              name='color'
              id='color'
            >
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
            ></textarea>
          </div>
          <div className={styles.line}>
            <AvatarComp fileName={fileName} onFileChange={onFileChange} />
            <button  className={styles.savebtn}>Save!</button>
          </div>
        </form>
      </div>
    );
  }
);


export default Cardmaker;
