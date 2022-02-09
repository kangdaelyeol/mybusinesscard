import React, { memo, useRef, useState } from 'react';
import styles from './avatarInput.module.css';


const AvatarInput = memo((props) => {
  console.log("Avatar input Rendering");
  const { fileName, onFileChange } = props;
  const [ loading, setLoading ] = useState(false);
  const btnTitle = fileName ? fileName : "No File";
  const inputRef = useRef();

  const onFileInput = async (e) => {
    setLoading(true);
    const files = inputRef.current.files;

    await onFileChange(files);
    // onFileChange(e)
    setLoading(false);
  }

  const onBtnClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  }

  return (
    <div className={styles.main}>
      <button onClick={onBtnClick} className={styles.avatar__button}> 
        {loading ?
          <div className={styles.loading}> </div>
          : 
          btnTitle}
      </button>
      <input onChange={onFileInput} ref={inputRef} className={styles.avatar__input} type='file' accept='image/*' />
    </div>
  );
});

export default AvatarInput;
