import React from 'react';
import commerce from 'assets/commerce.png'
import tecSupport from 'assets/tecSupport.png'
import complaints from 'assets/complaints.png'
import emailblack from 'assets/email.png'
import telblack from 'assets/tel.png'
import qqblack from 'assets/qq.png'
import timeblack from 'assets/time.png'
import styles from './index.less'

const ContractInformation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contractItem}>
        <div><img alt="" src={commerce}  /></div>
        <div className={styles.title}>商务咨询</div>
        <ul>
          <li className={styles.commerce}><img alt="" src={telblack} /><span>+86-15910603382</span></li>
          <li className={styles.commerce}><img alt="" src={emailblack} /><span>bd@elephantbi.com</span></li>
        </ul>
      </div>
      <div className={styles.contractItem}>
        <div><img alt="" src={tecSupport}  /></div>
        <div className={styles.title}>技术支持</div>
        <ul>
          <li className={styles.tecSupport}><img alt="" src={timeblack} /><span>工作日  09:00 ~ 19:00</span></li>
          <li className={styles.tecSupport}><img alt="" src={telblack} /><span>0411-39551681</span></li>
          <li className={styles.tecSupport}><img alt="" src={emailblack} /><span>support@elephantbi.com</span></li>
        </ul>
      </div>
      <div className={styles.contractItem}>
        <div><img alt="" src={complaints}  /></div>
        <div className={styles.title}>投诉</div>
        <ul>
          <li className={styles.complaints}><img alt="" src={telblack} /><span>总裁办电话 +86-15801196367</span></li>
        </ul>
      </div>
    </div>
  )
}

export default ContractInformation