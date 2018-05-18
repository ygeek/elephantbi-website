import React from 'react';
import uuid from 'uuid'
import styles from './index.less'

const HomeIntroduceItem = ({ section }) => {
  const { title, subTitle, lists, type, backImg } = section
  return (
    <div
      className={styles.container}
      style={type === 1 ? { backgroundColor: '#F6F7FD' } : null}
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
                    lists.map(list => (<li key={uuid()}>{list}</li>))
                  }
                </ul>
              </div>
            </div>
            <div className={styles.backImgSection}>
              <img alt="" src={backImg} />
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            <div className={styles.backImgSection}>
              <img alt="" src={backImg} />
            </div>
            <div className={styles.introduceSection}>
              <div className={styles.subTitle}>{subTitle}</div>
              <div className={styles.listContent}>
                <ul>
                  {
                    lists.map(list => (<li key={uuid()}>{list}</li>))
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

export default HomeIntroduceItem