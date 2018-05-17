import React from 'react';
import styles from './index.less'

const AboutHeadSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>关于我们</div>
      <div className={styles.content}>
        大象BI是由悦视光合科技（北京）有限公司出品，
        公司专注于企业级互联网产品及云端服务，
        创始成员均来自于百度、网易等一线互联网公司，
        拥有多年知名互联网产品的设计和研发经验。
      </div>
    </div>
  )
}

export default AboutHeadSection