import React from 'react';
import { Col } from 'antd'
import avatar from 'assets/industry.png'
import styles from './index.less'

const Industry = ({ industry }) => {
  const { name, content } = industry
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

export default Industry