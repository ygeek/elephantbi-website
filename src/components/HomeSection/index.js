import React from 'react';
import styles from './index.less'

const leftImg = { height: '350px', width: '250px' }
const rightImg = { height: '350px', width: '500px' }

const HomeSection = ({ section }) => {
  const { title, subTitle, lists, type, backImg } = section
  return (
    <div
      className={styles.container}
      style={type === 1 ? { backgroundColor: '#f0f0f0' } : null}
    >
      <div className={styles.title}>{title}</div>
      {
        type === 0 ? (
          <div className={styles.content}>
            <div className={styles.introduceSection}>
              <div className={styles.subTitle}>{subTitle}</div>
              <div className={styles.listContent}>
                <ul>
                  {
                    lists.map(list => (<li>{list}</li>))
                  }
                </ul>
              </div>
            </div>
            <div className={styles.backImgSection}>
              <img alt="" src={backImg} style={type === 0 ? rightImg : leftImg} />
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.backImgSection}>
              <img alt="" src={backImg} style={type === 0 ? rightImg : leftImg} />
            </div>
            <div className={styles.introduceSection}>
              <div className={styles.subTitle}>{subTitle}</div>
              <div className={styles.listContent}>
                <ul>
                  {
                    lists.map(list => (<li>{list}</li>))
                  }
                </ul>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default HomeSection