import React from 'react';
import styles from './index.less'

const Character = ({ character }) => {
  const { avatar, name, content } = character
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <img alt="" src={avatar} />
      </div>
      <div className={styles.characterName}>{name}</div>
      <div className={styles.introduction}>{content}</div>
    </div>
  )
}

export default Character