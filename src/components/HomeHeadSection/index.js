import React from 'react';
import styles from './index.less'

const HomeHeadSection = ({ headSectionContent, showFreeTrialModal }) => {
  return (
    <div
      className={styles.mainIntroduction}
      style={{ backgroundImage: `url(${headSectionContent.backImg})` }}
    >
      <div className={styles.title}>{headSectionContent.title}</div>
      <div className={styles.firstLevelContent}>
        {headSectionContent.subTitle}
      </div>
      <div className={styles.secondLevelContent}>
        {headSectionContent.content}
      </div>
      <div className={styles.actionButton}>
        {
          headSectionContent.button ? (
            <button
              onClick={showFreeTrialModal}
            >
              免费试用
            </button>
          ) : null
        }
      </div>
    </div>
  )
}

export default HomeHeadSection