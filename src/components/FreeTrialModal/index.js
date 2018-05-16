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
      footer={null}
      visible={true}
      className={styles.modalContainer}
      width={500}
      onCancel={closeModal}
    >
      <div className={styles.title}>预约体验大象BI</div>
      <div className={styles.subTitle}>大象BI团队将尽快和您联系</div>
      <Form>
        {
          (formContents || []).map(item => (
            <FormItem
              key={item.key}
              className={styles.formItem}
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
      <Button
        type="primary"
        onClick={onSubmit}
      >
        提交
      </Button>
    </Modal>
  )
}

export default Form.create()(FreeTrialModal)