import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd'
import styles from './index.less';

function IndexPage({ dispatch, example }) {
  const testClick = () => {
    dispatch({ type: 'example/fetch' })
  }
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva">Getting Started</a></li>
      </ul>
      <Button
        onClick={testClick}
      >
        test button
      </Button>
    </div>
  );
}

const mapStateToProps = ({ example }) => ({
  example
})

export default connect(mapStateToProps)(IndexPage);
