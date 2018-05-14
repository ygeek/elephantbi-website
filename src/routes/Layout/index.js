import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd'
import email from 'assets/email.png'
import tel from 'assets/tel.png'
import qq from 'assets/qq.png'
import time from 'assets/time.png'
import logo from 'assets/LOGO.png'
import qrcode from 'assets/qrcode.jpg'
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
      <Row className={styles.buttomSection}>
        <Col span={4}>
          <img alt="" src={logo} className={styles.logo} />
        </Col>
        <Col span={5}>
          <ul>
            <li>首页</li>
            <li>产品介绍</li>
            <li>服务介绍</li>
            <li>关于我们</li>
          </ul>
        </Col>
        <Col span={5}>
          <ul>
            <li>商务咨询</li>
            <li><img alt="" src={tel} /><span>0411-39551681</span></li>
            <li><img alt="" src={email} /><span>bd@elephantbi.com</span></li>
          </ul>
        </Col>
        <Col span={5}>
          <ul>
            <li>技术支持</li>
            <li><img alt="" src={time} /><span>工作日  09:00~19:00</span></li>
            <li><img alt="" src={qq} /><span>【待定】12345678</span></li>
            <li><img alt="" src={tel} /><span>0411-39551681</span></li>
            <li><img alt="" src={email} /><span>support@elephantbi.com</span></li>
          </ul>
        </Col>
        <Col span={5} className={styles.qrcode}>
          <div><img alt="" src={qrcode} /></div>
          <div>关注ElephantBI</div>
        </Col>
      </Row>
    </div>
  )
}

export default connect()(Layout)
