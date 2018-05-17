import React from 'react';
import { Button, Input, Form, Modal } from 'antd'
import contents from 'routes/Homepage/contents'
import globalMessage from 'helpers/messages'
import { _reserveExperience } from 'services/layout'
import styles from './index.less'

const { formContents } = contents

const FreeTrialModal = ({ form, visible, closeModal }) => {
  const { getFieldDecorator } = form
  const FormItem = Form.Item
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
        closeModal()
        form.resetFields()
      }
    })
  }
  return (
    <Modal
      footer={null}
      visible={visible}
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
        onClick={onSubmit}
      >
        提交
      </Button>
    </Modal>
  )
}

export default Form.create()(FreeTrialModal)