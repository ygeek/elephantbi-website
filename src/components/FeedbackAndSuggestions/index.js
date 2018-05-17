import React from 'react';
import { Form, Input, Row, Col, Radio, Button } from 'antd' 
import name from 'assets/name1.png'
import company from 'assets/company1.png'
import email from 'assets/email.png'
import uuid from 'uuid'
import { _submitFeedbacks } from 'services/layout'
import globalMessage from 'helpers/messages'
import tel from 'assets/tel.png'
import styles from './index.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group;
const { TextArea } = Input

const formContents = [
  { name: 'name', placeholder: '姓名', icon: name },
  { name: 'email', placeholder: '邮箱', icon: email },
  { name: 'mobile', placeholder: '电话', icon: tel },
  { name: 'company', placeholder: '公司', icon: company }
]
class FeedbackAndSuggestions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    
    }
  }

  render() {
    const { form, toggleLoading } = this.props
    const { getFieldDecorator } = form
    const onSubmit = () => {
      toggleLoading()
      form.validateFields((errors, values) => {
        if (!errors) {
          async function submitFeedbacks() {
            const { type } = values
            const { data, err } = await _submitFeedbacks(values)
            if (err) {
              globalMessage('error', '网络出现错误，请连接网络后重试')
            }
            if (data) {
              toggleLoading()
              if (data.beary_status === 200 || data.ding_status === 200) {
                if (type === '0') {
                  globalMessage('success', '提交成功，您的问题非常重要，我们将会尽快以邮件回复您')
                }
                if (type === '1') {
                  globalMessage('success', '反馈成功，感谢您为我们提供的宝贵意见')
                }
              } else {
                globalMessage('error', '提交失败，请重试')
              }
            }
          }
          submitFeedbacks()
        }
      })
    }

    return (
      <div className={styles.container}>
        <div className={styles.title}>反馈与建议</div>
        <div className={styles.subTitle}>填写下面的表格，我们会尽快与您联系</div>
        <Row className={styles.formField}>
          <Form>
            <Row>
            {
              formContents.map((formItem) => {
                return (
                  <div className={styles.formItem}>
                    <FormItem>
                      {
                        getFieldDecorator(`${formItem.name}`, {
                          rules: [{ required: true, message: '此项是必填的' }]
                        })(
                          <Input
                            prefix={<img alt="" src={formItem.icon} />}
                            placeholder={formItem.placeholder}
                          />
                        )
                      }
                    </FormItem>
                  </div>
                )
              })
            }
            </Row>
            <div className={styles.radioField}>
              <FormItem>
                {
                  getFieldDecorator('type', {
                    rules: [{ required: true, message: '此项是必填的' }],
                    initialValue: '0'
                  })(
                    <RadioGroup>
                      <Radio value="0">问题反馈</Radio>
                      <Radio value="1">功能意见</Radio>
                    </RadioGroup>
                  )
                }
              </FormItem>
            </div>
            <div className={styles.textareaField}>
              <FormItem>
                {
                  getFieldDecorator('content', {
                    rules: [{ required: true, message: '此项是必填的' }]
                  })(
                    <TextArea
                      placeholder="请填写您项反馈的问题或建议"
                      className={styles.textarea}
                    />
                  )
                }
              </FormItem>
            </div>
          </Form>
        </Row>
        <div className={styles.submitButton}>
          <Button
            onClick={onSubmit}
          >
            提交
          </Button>
        </div>
      </div>
    )
  }
}

export default Form.create()(FeedbackAndSuggestions)

