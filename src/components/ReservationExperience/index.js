import React from 'react';
import { connect } from 'dva';
import { Form, Input, Col, Button } from 'antd'
import uuid from 'uuid'
import contents from 'routes/Homepage/contents'
import styles from './index.less'

const FormItem = Form.Item
const { formContents } = contents

const ReservationExperience = ({ form, dispatch }) => {
  const { getFieldDecorator } = form
  const onSubmit = () => {
    form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'layout/reserveExperience',
          payload: values
        })
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
          type="primary"
          onClick={onSubmit}
        >
          提交
        </Button>
      </div>
    </div>
  )
}

export default Form.create()(ReservationExperience)