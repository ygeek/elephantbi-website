/*global scrollTo*/
import React from 'react';
import Affix from 'antd/lib/affix'
import email from 'assets/email.png'
import tel from 'assets/tel.png'
import time from 'assets/time.png'
import logo from 'assets/LOGO.png'
import qrcode from 'assets/qrcode.jpg'
import { Link } from 'react-router-dom'
import styles from './index.less'
import Navigation from 'components/Navigation'
import FreeTrialModal from 'components/FreeTrialModal'

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      freeTrailModalVisible: false,
      page: null
    }
  }

  componentWillMount() {
    const href = window.location.href
    const match = href.split('/')
    const matchPage = match[match.length - 1]
    if (matchPage === '') {
      this.setState({ page: 'home' })
    } else {
      this.setState({ page: matchPage })
    }
  }

  render() {
    const { freeTrailModalVisible, page } = this.state
    const { children, layout } = this.props
    const setStyle = (value) => {
      this.setState({ page: value })
      window.scrollTo(0, 0)
    }
    const closeModal = () => {
      this.setState({ freeTrailModalVisible: false })
    }
    const showModal = () => {
      this.setState({ freeTrailModalVisible: true })
    }
    return (
      <div className={styles.container}>
      <Affix>
        <div className={styles.navigation}>
          <Navigation
            page={page}
            closeModal={closeModal}
            showModal={showModal}
            setStyle={setStyle}
          />
        </div>
      </Affix>
        <div className={styles.mainContent}>
          {children}
        </div>
        <div className={styles.buttomSection}>
          <span className={styles.bottomItem}>
            <img alt="" src={logo} className={styles.logo} />
          </span>
          <span className={styles.bottomItem}>
            <ul>
              <li><a href="javascript:void(0)" onClick={() => {
                setStyle('home')
              }}><Link to="/">首页</Link></a></li>
              <li><a href="javascript:void(0)" onClick={() => {
                setStyle('production')
              }}><Link to="/production">产品介绍</Link></a></li>
              <li><a href="javascript:void(0)" onClick={() => {
                setStyle('service')
              }}><Link to="/service">服务介绍</Link></a></li>
              <li><a href="javascript:void(0)" onClick={() => {
                setStyle('about')
              }}><Link to="/about">关于我们</Link></a></li>
            </ul>
          </span>
          <span className={styles.bottomItem}>
            <ul>
              <li>商务咨询</li>
              <li><img alt="" src={tel} /><span>+86-15910603382</span></li>
              <li><img alt="" src={email} /><span>bd@elephantbi.com</span></li>
            </ul>
          </span>
          <span className={styles.bottomItem}>
            <ul>
              <li>技术支持</li>
              <li><img alt="" src={time} /><span>工作日  09:00~19:00</span></li>
              <li><img alt="" src={tel} /><span>0411-39551681</span></li>
              <li><img alt="" src={email} /><span>support@elephantbi.com</span></li>
            </ul>
          </span>
          <span className={`${styles.bottomItem} ${styles.qrcode}`}>
            <div><img alt="" src={qrcode} /></div>
            <div>关注ElephantBI</div>
          </span>
          <div className={styles.caseNumber}>
            辽ICP备18008272号
          </div>
        </div>
        <FreeTrialModal
          visible={freeTrailModalVisible}
          closeModal={closeModal}
        />
      </div>
    )
  }
}

export default Layout
