import React from 'react';
import { Form, Input, Row, Col, Radio, Button } from 'antd' 
import name from 'assets/name1.png'
import company from 'assets/company1.png'
import email from 'assets/email.png'
import tel from 'assets/tel.png'
import styles from './index.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group;
const { TextArea } = Input

const formContents = [
  { name: 'name', placeholder: '姓名', icon: name },
  { name: 'email', placeholder: '邮箱', icon: email },
  { name: 'tel', placeholder: '电话', icon: tel },
  { name: 'company', placeholder: '公司', icon: company }
]
class FeedbackAndSuggestions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    
    }
  }

  render() {
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <div className={styles.container}>
        <div className={styles.title}>反馈与建议</div>
        <div className={styles.subTitle}>填写下面的表格，我们会尽快与您联系</div>
        <Row className={styles.formField}>
          <Form>
            {
              formContents.map((formItem) => {
                return (
                  <Col className={styles.formItem} span={12}>
                    <FormItem>
                      {
                        getFieldDecorator(`${formItem.name}`)(
                          <Input
                            prefix={<img alt="" src={formItem.icon} />}
                            placeholder={formItem.placeholder}
                          />
                        )
                      }
                    </FormItem>
                  </Col>
                )
              })
            }
            <Col span={24} className={styles.radioField}>
              <FormItem>
                {
                  getFieldDecorator('type', {
                    initialValue: '0'
                  })(
                    <RadioGroup>
                      <Radio value="0">问题反馈</Radio>
                      <Radio value="1">功能意见</Radio>
                    </RadioGroup>
                  )
                }
              </FormItem>
            </Col>
            <Col span={24} className={styles.textareaField}>
              <FormItem>
                {
                  getFieldDecorator('content')(
                    <TextArea
                      placeholder="请填写您项反馈的问题或建议"
                      className={styles.textarea}
                    />
                  )
                }
              </FormItem>
            </Col>
          </Form>
        </Row>
        <div className={styles.submitButton}>
          <Button type="primary">提交</Button>
        </div>
      </div>
    )
  }
}

export default Form.create()(FeedbackAndSuggestions)

