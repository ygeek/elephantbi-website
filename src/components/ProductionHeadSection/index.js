import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd'
import _ from 'lodash'
import styles from './index.less'

const ProductionHeadSection = ({ headSectionContent, showFreeTrialModal }) => {
  return (
    <div
      className={styles.mainIntroduction}
    >
      <div className={styles.title}>{_.get(headSectionContent, 'title', '')}</div>
      <div className={styles.firstLevelContent}>
        {_.get(headSectionContent, 'subTitle', '')}
      </div>
      <div className={styles.secondLevelContent}>
        {_.get(headSectionContent, 'content', '')}
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

export default ProductionHeadSection