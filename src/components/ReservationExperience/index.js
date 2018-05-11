import React from 'react';
import { connect } from 'dva';
import { Form, Input, Col, Button } from 'antd'
import contents from 'routes/Homepage/contents'
import styles from './index.less'

const FormItem = Form.Item
const { formContents } = contents

const ReservationExperience = ({ form }) => {
  const { getFieldDecorator } = form

  return (
    <div className={styles.formSection}>
      <div className={styles.title}>预约体验大象BI</div>
      <div className={styles.subTitle}>大象BI团队会尽快跟您联系</div>
      <div className={styles.formContent}>
        <Form>
            {
            formContents.map(item => (
                <Col span={12} className={styles.formItem}>
                <FormItem>
                {
                    getFieldDecorator(`${item.key}`,)(
                    <Input
                        placeholder={item.placeholder}
                        prefix={<img alt="" src={item.icon} className={styles.inputIcon} />}
                    />
                    )
                }
                </FormItem>
            </Col>
            ))
            }
        </Form>
      </div>
      <div className={styles.submitButton}>
        <Button type="primary">提交</Button>
      </div>
    </div>
  )
}

export default Form.create()(ReservationExperience)