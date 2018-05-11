import React from 'react';
import { connect } from 'dva';
import { Button, Row, Form, Input, Col } from 'antd'
import HomeSection from 'components/HomeSection'
import Character from 'components/Character'
import Industry from 'components/Industry'
import email from 'assets/email.png'
import tel from 'assets/tel.png'
import qq from 'assets/qq.png'
import time from 'assets/time.png'
import logo from 'assets/LOGO.png'
import qrcode from 'assets/qrcode.jpg'
import styles from './index.less'
import contents from './contents'
import FreeTrialModal from './modal/index.js'

const { sectionContents, characterContents, industryContents, formContents } = contents
const FormItem = Form.Item

const Homepage = ({ homepage: modelState, dispatch, form }) => {
  const { getFieldDecorator } = form
  const { freeTrialVisible } = modelState

  const showFreeTrialModal = () => {
    dispatch({ type: 'homepage/showFreeTrailModal' })
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainIntroduction}>
        <div className={styles.title}>EliphantBI</div>
        <div className={styles.firstLevelContent}>
          数据驱动管理，人人都是数据专家
        </div>
        <div className={styles.secondLevelContent}>
          通过数据整合，可以提高跨系统数据的统一性、准确性和时效性，更容易获得全面的观点深入洞察数据与精准决策，用数据驱动行为，让数据融入工作的每个环节
        </div>
        <div className={styles.actionButton}>
          <Button type="primary">免费试用</Button>
        </div>
      </div>
      <div className={styles.homeSections}>
        {
          sectionContents.map(item => (
            <HomeSection
              section={item}
            />
          ))
        }
      </div>
      <div className={styles.characters}>
        <div className={styles.title}>角色解决方案</div>
        <div className={styles.characterContents}>
          {
            characterContents.map((item) => {
              return (
                <Row>
                  {
                    item.map(character => (
                      <Character
                        character={character}
                      />
                    ))
                  }
                </Row>
              )
            })
          }
        </div>
        <div>
          <Button
            type="primary"
            onClick={showFreeTrialModal}
          >
            免费试用
          </Button>
        </div>
      </div>
      <div className={styles.industries}>
        <div className={styles.title}>行业解决方案</div>
        <div>
          {
            industryContents.map((item) => {
              return (
                <Row>
                  {
                    item.map(industry => (
                      <Industry
                        industry={industry}
                      />
                    ))
                  }
                </Row>
              )
            })
          }
        </div>
        <div>
          <Button
            type="primary"
            onClick={showFreeTrialModal}
          >
            免费试用
          </Button>
        </div>
      </div>
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
      <Row className={styles.buttomSection}>
        <Col span={4}>
          <img alt="" src={logo} className={styles.logo} />
        </Col>
        <Col span={5}>
          <ul>
            <li>首页</li>
            <li>产品介绍</li>
            <li>服务介绍</li>
            <li>关于我们</li>
          </ul>
        </Col>
        <Col span={5}>
          <ul>
            <li>商务咨询</li>
            <li><img alt="" src={tel} />0411-39551681</li>
            <li><img alt="" src={email} />bd@elephantbi.com</li>
          </ul>
        </Col>
        <Col span={5}>
          <ul>
            <li>技术支持</li>
            <li><img alt="" src={time} />工作日  09:00~19:00</li>
            <li><img alt="" src={qq} />【待定】12345678</li>
            <li><img alt="" src={tel} />0411-39551681</li>
            <li><img alt="" src={email} />support@elephantbi.com</li>
          </ul>
        </Col>
        <Col span={5} className={styles.qrcode}>
          <div><img alt="" src={qrcode} /></div>
          <div>关注ElephantBI</div>
        </Col>
      </Row>
      {
        freeTrialVisible ? (
          <FreeTrialModal
            dispatch={dispatch}
          />
        ) : null
      }
    </div>
  )
}

const mapStateToProps = ({ homepage }) => ({
  homepage
})

export default connect(mapStateToProps)(Form.create()(Homepage))