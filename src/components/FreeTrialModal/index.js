import React from 'react';
import { Button, Input, Form, Modal } from 'antd'
import contents from 'routes/Homepage/contents'
import styles from './index.less'

const { formContents } = contents

const FreeTrialModal = ({ form, dispatch }) => {
  const { getFieldDecorator } = form
  const FormItem = Form.Item
  const closeModal = () => {
    dispatch({ type: 'layout/hideFreeTrailModal' })
  }
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
    <Modal
      title="预约体验大象BI"
      okText="确认"
      cancelText="取消"
      visible={true}
      onOk={onSubmit}
      onCancel={closeModal}
    >
      <Form>
        {
          (formContents || []).map(item => (
            <FormItem
              key={item.key}
            >
              {
                getFieldDecorator(`${item.key}`, {
                  rules: [{ required: true, message: '此项是必填的' }]
                })(
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