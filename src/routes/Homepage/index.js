import React from 'react';
import { connect } from 'dva';
import { Button, Row, Form, Input, Col } from 'antd'
import HomeIntroduceItem from 'components/HomeIntroduceItem'
import Character from 'components/Character'
import Industry from 'components/Industry'
import uuid from 'uuid'
import ReservationExperience from 'components/ReservationExperience'
import HomeHeadSection from 'components/HomeHeadSection'
import styles from './index.less'
import contents from './contents'

const { sectionContents, characterContents, industryContents, formContents } = contents
const headSectionContent = {
  title: 'ElephantBI',
  subTitle: '数据驱动管理，人人都是数据专家',
  content: '通过数据整合，可以提高跨系统数据的统一性、准确性和时效性，更容易获得全面的观点深入洞察数据与精准决策，用数据驱动行为，让数据融入工作的每个环节'
}
const FormItem = Form.Item

const Homepage = ({ dispatch, form }) => {
  const { getFieldDecorator } = form

  const showFreeTrialModal = () => {
    dispatch({ type: 'layout/showFreeTrailModal' })
  }

  return (
    <div className={styles.container}>
      <HomeHeadSection
        headSectionContent={headSectionContent}
        showFreeTrialModal={showFreeTrialModal}
      />
      <div className={styles.homeSections}>
        {
          sectionContents.map((item, index) => {
            return (
              <HomeIntroduceItem
                section={item}
                key={uuid()}
              />
            )
          })
        }
      </div>
      <div className={styles.characters}>
        <div className={styles.title}>角色解决方案</div>
        <div className={styles.characterContents}>
          {
            characterContents.map((item, index) => {
              return (
                <Row key={uuid()}>
                  {
                    item.map(character => (
                      <Character
                        character={character}
                        key={uuid()}
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
            industryContents.map((item, index) => {
              return (
                <Row key={uuid()}>
                  {
                    item.map(industry => (
                      <Industry
                        industry={industry}
                        key={uuid()}
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
      <ReservationExperience
        dispatch={dispatch}
      />
    </div>
  )
}

export default connect()(Form.create()(Homepage))