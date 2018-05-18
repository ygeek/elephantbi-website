import React from 'react';
import { Button, Row, Popover, Input, Form } from 'antd'
import { _confirmDomain } from 'services/layout'
import globalMessage from 'helpers/messages'
import QR from 'assets/LOGO 2.png'
import styles from './index.less'

const FormItem = Form.Item

const hoverStyle = {
  fontWeight: 'bold',
  borderBottom: '3px solid #539ef2'
}

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.onVisibleChange = this.onVisibleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onVisibleChange(visible) {
    const { form } = this.props
    form.resetFields()
    this.setState({ visible })
  }

  onSubmit() {
    const { form, dispatch } = this.props
    form.validateFields((errors, values) => {
      if (!errors) {
        async function confirmDomain() {
          const { data, err } = await _confirmDomain(values)
          if (err) {
            globalMessage('error', '网络出现错误，请连接网络后重试')
          }
          if (data) {
            if (data.exists === 1) {
              window.open(`http://${form.getFieldValue('domain')}.elephantbi.com`)
            }
            if (data.exists === 0) {
              form.setFields({
                domain: {
                  value: form.getFieldValue('domain'),
                  errors: [new Error('输入的域名不存在，请重新检查。如果您还没有团队请联系我们申请试用')]
                }
              })
            }
          }
        }
        confirmDomain()
      }
    })
  }

  render() {
    const {
      toHome,
      toProduction,
      toService,
      toAbout,
      form,
      closeModal,
      page,
      showModal,
      setStyle
    } = this.props
    const { getFieldDecorator } = form
    const loginContent = (
      <div className={styles.loginContent}>
        <div>
          <Form>
            <FormItem>
              {
                getFieldDecorator('domain', {
                  rules: [{ required: true, message: '此项是必填的' }]
                })(
                  <Input
                    placeholder="请输入团队域名"
                    addonAfter="elephantbi.com"
                />
                )
              }
            </FormItem>
          </Form>

        </div>
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
        <a href="javascript:scrollTo(0,0);" onClick={() => {
          toHome()
          setStyle('home')
        }}>
          <img alt="" src={QR} />
        </a>
        <span span={3} className={styles.actionButton}>
          <Popover
            trigger="click"
            placement="bottom"
            content={loginContent}
            onVisibleChange={this.onVisibleChange}
            visible={this.state.visible}
          >
            <Button className={styles.login}>登录</Button>
          </Popover>
          <Button
            onClick={showModal}
            className={styles.trialButton}
          >
          免费试用
          </Button>
        </span>
        <ul>
          <li style={ page === 'home' ? hoverStyle : null }>
            <a
              href="javascript:scrollTo(0,0);"
              onClick={() => {
                toHome()
                setStyle('home')
              }}
            >
              首页
            </a>
          </li>
          <li style={ page === 'production' ? hoverStyle : null }>
            <a
              href="javascript:scrollTo(0,0);"
              onClick={() => {
                toProduction()
                setStyle('production')
              }}
            >
              产品介绍
            </a>
          </li>
          <li style={ page === 'service' ? hoverStyle : null }>
            <a
              href="javascript:scrollTo(0,0);"
              onClick={() => {
                toService()
                setStyle('service')
              }}
            >
              服务支持
            </a>
          </li>
          <li style={ page === 'about' ? hoverStyle : null }>
            <a
              href="javascript:scrollTo(0,0);"
              onClick={() => {
                toAbout()
                setStyle('about')
              }}
            >
              关于我们
            </a>
          </li>
        </ul>
      </Row>
    )
  }
}

export default Form.create()(Navigation)
