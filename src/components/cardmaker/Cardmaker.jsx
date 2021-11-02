import React, { useRef } from 'react';
import styles from './cardmaker.module.css';

const Cardmaker = ({ onSave }) => {
  const avatarRef = useRef();
  const nameRef = useRef();
  const colorRef = useRef();
  const desRef = useRef();

  const onFileChange = (e) => {
    console.log(e.target.files[0].name);
    console.log(avatarRef.current.files);
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const color = colorRef.current.value;
    const des = desRef.current.value;
    nameRef.current.value = '';
    desRef.current.value = '';

    // name color des
    onSave(name, color, des);
  };
  return (
    <div className={styles.main}>
      <form
        className={styles.form}
        onSubmit={onSubmit}
        encType='multiple/data-form'
      >
        <div className={styles.line}>
          <input
            ref={nameRef}
            type='text'
            name='name'
            id='name'
            placeholder='Name'
          />
          <select ref={colorRef} name='color' id='color'>
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
          <label className={styles.filelabel} htmlFor='avatar'>
            No File
          </label>
          <input
            onChange={onFileChange}
            ref={avatarRef}
            className={styles.fileinput}
            id='avatar'
            type='file'
            accept='image/*'
          />
          <button className={styles.savebtn}>Save!</button>
        </div>
      </form>
    </div>
  );
};

export default Cardmaker;
