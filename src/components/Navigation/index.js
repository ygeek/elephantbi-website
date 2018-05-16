import React from 'react';
import { Button, Col, Row, Popover, Input, Form } from 'antd'
import QR from 'assets/LOGO 2.png'
import styles from './index.less'

const FormItem = Form.Item

const hoverStyle = {
  fontWeight: 'bold'
}

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.onVisibleChange = this.onVisibleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.showModal = this.showModal.bind(this)
  }

  onVisibleChange(visible) {
    this.setState({ visible })
  }

  onSubmit() {
    const { form, dispatch } = this.props
    form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'layout/confirmDomain',
          payload: values
        }).then((data) => {
          if (data.exists === 1) {
            window.location.href = `http://${form.getFieldValue('domain')}.elephantbi.com`
          }
          if (data.exists === 0) {
            form.setFields({
              domain: {
                value: form.getFieldValue('domain'),
                errors: [new Error('输入的域名不存在，请重新检查。如果您还没有团队请联系我们申请试用')]
              }
            })
          }
        }).catch((err) => {

        })
      }
    })
  }

  showModal() {
    this.props.dispatch({ type: 'layout/showFreeTrailModal' })
  }

  render() {
    const { dispatch, toHome, toProduction, toService, toAbout, form, page } = this.props
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
        <a href="javascript:void(0);" onClick={toHome}>
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
            <Button>登录</Button>
          </Popover>
          <Button
            type="primary"
            onClick={this.showModal}
          >
          免费试用
          </Button>
        </span>
        <ul>
          <li style={ page === '' ? hoverStyle : null }><a href="javascript:void(0);" onClick={toHome}>首页</a></li>
          <li style={ page === 'production' ? hoverStyle : null }><a href="javascript:void(0);" onClick={toProduction}>产品介绍</a></li>
          <li style={ page === 'service' ? hoverStyle : null }><a href="javascript:void(0);" onClick={toService}>服务支持</a></li>
          <li style={ page === 'about' ? hoverStyle : null }><a href="javascript:void(0);" onClick={toAbout}>关于我们</a></li>
        </ul>
      </Row>
    )
  }
}

export default Form.create()(Navigation)
