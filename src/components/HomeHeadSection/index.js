import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd'
import styles from './index.less'

const HomeHeadSection = ({ headSectionContent, showFreeTrialModal }) => {
  return (
    <div
      className={styles.mainIntroduction}
    >
      <div className={styles.title}>{headSectionContent.title}</div>
      <div className={styles.firstLevelContent}>
        {headSectionContent.subTitle}
      </div>
      <div className={styles.secondLevelContent}>
        {headSectionContent.content}
      </div>
      <div className={styles.actionButton}>
        <Button
          onClick={showFreeTrialModal}
        >
          免费试用
        </Button>
      </div>
    </div>
  )
}

export default HomeHeadSection