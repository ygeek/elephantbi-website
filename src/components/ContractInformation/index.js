import React from 'react';
import commerce from 'assets/commerce.png'
import tecSupport from 'assets/tecSupport.png'
import complaints from 'assets/complaints.png'
import emailblack from 'assets/email.png'
import telblack from 'assets/tel.png'
import uuid from 'uuid'
import qqblack from 'assets/qq.png'
import timeblack from 'assets/time.png'
import styles from './index.less'

const contractContent = [
  {
    icon: commerce,
    title: '商务咨询',
    lists: [
      { icon: telblack, content: '0411-39551681' },
      { icon: emailblack, content: 'bd@elephantbi.com' }
    ]
  },
  {
    icon: tecSupport,
    title: '技术支持',
    lists: [
      { icon: timeblack, content: '工作日  09:00 ~ 19:00' },
      { icon: qqblack, content: '【待定】12345678' },
      { icon: telblack, content: '0411-39551681' },
      { icon: emailblack, content: 'support@elephantbi.com' }
    ]
  },
  {
    icon: complaints,
    title: '投诉',
    lists: [
      { icon: telblack, content: '总裁办电话 15910603382' }
    ]
  }
]

const ContractInformation = () => {
  return (
    <div className={styles.container}>
      {
        contractContent.map((item) => {
          return (
            <div key={uuid()} className={styles.contractItem}>
              <div><img alt="" src={item.icon}  /></div>
              <div className={styles.title}>{item.title}</div>
              <ul>
                {
                  item.lists.map((item) => {
                    return <li key={uuid()}><img alt="" src={item.icon} /><span>{item.content}</span></li>
                  })
                }
              </ul>
            </div>
          )
        })
      }
    </div>
  )
}

export default ContractInformation