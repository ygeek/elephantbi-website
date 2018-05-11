import React from 'react';
import { connect } from 'dva';
import { Button, Row, Form, Input, Col } from 'antd'
import HomeSection from 'components/HomeSection'
import Character from 'components/Character'
import Industry from 'components/Industry'
import ReservationExperience from 'components/ReservationExperience'
import HeadSection from 'components/HeadSection'
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
const headSectionContent = {
  title: 'EliphantBI',
  subTitle: '数据驱动管理，人人都是数据专家',
  content: '通过数据整合，可以提高跨系统数据的统一性、准确性和时效性，更容易获得全面的观点深入洞察数据与精准决策，用数据驱动行为，让数据融入工作的每个环节'
}
const FormItem = Form.Item

const Homepage = ({ homepage: modelState, dispatch, form }) => {
  const { getFieldDecorator } = form
  const { freeTrialVisible } = modelState

  const showFreeTrialModal = () => {
    dispatch({ type: 'homepage/showFreeTrailModal' })
  }

  return (
    <div className={styles.container}>
      <HeadSection headSectionContent={headSectionContent} />
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
      <ReservationExperience />
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