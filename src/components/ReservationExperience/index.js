import React from 'react';
import { connect } from 'dva';
import { Form, Input, Col, Button } from 'antd'
import uuid from 'uuid'
import { _reserveExperience } from 'services/layout'
import globalMessage from 'helpers/messages'
import contents from 'routes/Homepage/contents'
import styles from './index.less'

const FormItem = Form.Item
const { formContents } = contents

const ReservationExperience = ({ form }) => {
  const { getFieldDecorator } = form
  const onSubmit = () => {
    form.validateFields((errors, values) => {
      if (!errors) {
        async function reserveExperience() {
          const { data, err } = await _reserveExperience(values)
          if (err) {
            globalMessage('error', '网络出现错误，请连接网络后重试')
          }
          if (data) {
            if (data.beary_status === 200 || data.ding_status === 200) {
              globalMessage('success', '提交成功，我们将尽快与您取得联系')
            } else {
              globalMessage('error', '提交失败，请重试')
            }
          }
        }
        reserveExperience()
      }
    })
  }
  return (
    <div className={styles.formSection}>
      <div className={styles.title}>预约体验大象BI</div>
      <div className={styles.subTitle}>大象BI团队会尽快跟您联系</div>
      <div className={styles.formContent}>
        <Form>
            {
            formContents.map(item => (
              <div className={styles.formItem}>
                <FormItem>
                {
                    getFieldDecorator(`${item.key}`, {
                      rules: [{ required: true, message: '此项是必填的' }]
                    })(
                    <Input
                        placeholder={item.placeholder}
                        prefix={<img alt="" src={item.icon} className={styles.inputIcon} />}
                    />
                    )
                }
                </FormItem>
              </div>
            ))
            }
        </Form>
      </div>
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

export default Form.create()(ReservationExperience)