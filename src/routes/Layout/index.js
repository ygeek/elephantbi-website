import React from 'react';
import { connect } from 'dva';
import styles from './index.less'
import Navigation from 'components/Navigation'

const Layout = ({ children }) => {
  return (
    <div>
      <div className={styles.navigation}>
        <Navigation />
      </div>
      <div className={styles.mainContent}>
        {children}
      </div>
    </div>
  )
}

export default connect()(Layout)
