import React from 'react';
import { Button, Col, Row, Popover, Input } from 'antd'
import QR from 'assets/LOGO 2.png'
import styles from './index.less'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitValue: null,
      visible: false
    }
    this.changeValue = this.changeValue.bind(this)
    this.onVisibleChange = this.onVisibleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeValue(e) {
    this.setState({ submitValue: e.target.value })
  }

  onVisibleChange(visible) {
    this.setState({ visible })
  }

  onSubmit() {
    this.setState({ visible: false })
  }

  render() {
    const loginContent = (
      <div className={styles.loginContent}>
        <div>
          <Input
            placeholder="请输入团队域名"
            addonAfter="elephantbi.com"
            value={this.state.submitValue}
            onChange={this.changeValue}
          />
        </div>
        <div>请输入您的团队登录域名</div>
        <div className={styles.submitButton}>
          <Button
            type="primary"
            onClick={this.onSubmit}
          >
            登录
          </Button>
        </div>
      </div>
    )
  
  
    return (
      <Row className={styles.navigation}>
        <Col span={2}><img alt="" src={QR} /></Col>
        <Col span={6} offset={13}>
          <ul>
            <li>首页</li>
            <li>产品介绍</li>
            <li>服务支持</li>
            <li>关于我们</li>
          </ul>
        </Col>
        <Col span={3} className={styles.actionButton}>
          <Popover
            trigger="click"
            placement="bottom"
            content={loginContent}
            onVisibleChange={this.onVisibleChange}
            visible={this.state.visible}
          >
            <Button>登录</Button>
          </Popover>
          <Button type="primary">免费试用</Button>
        </Col>
      </Row>
    )
  }
}

export default Navigation
