import React from 'react';
import banner1 from 'assets/banner1.png'
import banner2 from 'assets/banner2.png'
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
              <img
                alt=""
                src={banner1}
                style={{ width: '365px', height: '237px' }}
              />
            </div>
          </div>
        ) : (
          <div
            className={styles.container}
            style={{ backgroundColor: '#F6F7FD' }}
          >
            <div className={styles.imgSection}>
              <img
                alt=""
                src={banner2}
                style={{ width: '180px', height: '237px' }}
              />
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