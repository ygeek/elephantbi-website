import React from 'react';
import { Button, Input, Form, Modal } from 'antd'
import contents from '../contents'
import styles from './index.less'

const { formContents } = contents

const FreeTrialModal = ({ form, dispatch }) => {
  const { getFieldDecorator } = form
  const FormItem = Form.Item
  const closeModal = () => {
    dispatch({ type: 'homepage/hideFreeTrailModal' })
  }
  return (
    <Modal
      title="预约体验大象BI"
      okText="确认"
      cancelText="取消"
      visible={true}
      onOk={() => {}}
      onCancel={closeModal}
    >
      <Form>
        {
          (formContents || []).map(item => (
            <FormItem
              key={item.key}
            >
              {
                getFieldDecorator(`${item.key}`)(
                  <Input
                    placeholder={item.placeholder}
                    prefix={<img alt="" src={item.icon} className={styles.inputIcon} />}
                    className={styles.formInput}
                  />
                )
              }
            </FormItem>
          ))
        }
      </Form>
    </Modal>
  )
}

export default Form.create()(FreeTrialModal)