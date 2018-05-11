import React from 'react';
import { Col } from 'antd'
import styles from './index.less'

const Character = ({ character }) => {
  const { avatar, name, content } = character
  return (
    <Col span={8} className={styles.container}>
      <div className={styles.avatar}>
        <img alt="" src={avatar} />
      </div>
      <div className={styles.characterName}>{name}</div>
      <div className={styles.introduction}>{content}</div>
    </Col>
  )
}

export default Character