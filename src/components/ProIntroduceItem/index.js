import React from 'react';
import _ from 'lodash'
import styles from './index.less'

const ProIntroduceItem = ({ proIntroduce }) => {
  return (
    <div>
      {
        proIntroduce.type === 0 ? (
          <div className={styles.container}>
            <div className={styles.contentSection}>
              <div className={styles.title}>{_.get(proIntroduce, 'title')}</div>
              <div className={styles.content}>{_.get(proIntroduce, 'content')}</div>
            </div>
            <div className={styles.imgSection}>
              <img alt="" src={proIntroduce.backImg} />
            </div>
          </div>
        ) : (
          <div
            className={styles.container}
            style={{ backgroundColor: '#F6F7FD' }}
          >
            <div className={styles.imgSection}>
              <img alt="" src={proIntroduce.backImg} />
            </div>
            <div className={styles.contentSection}>
              <div className={styles.title}>{_.get(proIntroduce, 'title')}</div>
              <div className={styles.content}>{_.get(proIntroduce, 'content')}</div>
            </div>
          </div>
        )
      }
    </div>

  )
}

export default ProIntroduceItem