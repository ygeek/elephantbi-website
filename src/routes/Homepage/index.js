import React from 'react';
import { Spin } from 'antd'
import HomeIntroduceItem from 'components/HomeIntroduceItem'
import Character from 'components/Character'
import homeBackImg from 'assets/home.png'
import Industry from 'components/Industry'
import ReservationExperience from 'components/ReservationExperience'
import HomeHeadSection from 'components/HomeHeadSection'
import FreeTrialModal from 'components/FreeTrialModal'
import styles from './index.less'
import contents from './contents'

const { sectionContents, characterContents, industryContents, formContents } = contents
const headSectionContent = {
  backImg: homeBackImg,
  title: 'ElephantBI',
  subTitle: '数据驱动管理，人人都是数据专家',
  content: '通过数据整合，可以提高跨系统数据的统一性、准确性和时效性，更容易获得全面的观点深入洞察数据与精准决策，用数据驱动行为，让数据融入工作的每个环节',
  button: true
}

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      loading: false
    }
  }

  render() {
    const { dispatch } = this.props

    const toggleLoading = () => {
      const { loading } = this.state
      this.setState({ loading: !loading })
    }

    const showFreeTrialModal = () => {
      this.setState({ modalVisible: true })
    }

    const hideFreeTrialModal = () => {
      this.setState({ modalVisible: false })
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
                  <div className={styles.rowCard}>
                    {
                      item.map(character => (
                        <Character
                          character={character}
                        />
                      ))
                    }
                  </div>
                )
              })
            }
          </div>
          <div>
            <button
              type="primary"
              onClick={showFreeTrialModal}
            >
              免费试用
            </button>
          </div>
        </div>
        <div className={styles.industries}>
          <div className={styles.title}>行业解决方案</div>
          <div className={styles.industryContents}>
            {
              industryContents.map((item, index) => {
                return (
                  <div className={styles.rowCard}>
                    {
                      item.map(industry => (
                        <Industry
                          industry={industry}
                        />
                      ))
                    }
                  </div>
                )
              })
            }
          </div>
          <div>
            <button
              type="primary"
              onClick={showFreeTrialModal}
            >
              免费试用
            </button>
          </div>
        </div>
        <Spin spinning={this.state.loading}>
          <ReservationExperience
            toggleLoading={toggleLoading}
          />
        </Spin>
        
        <FreeTrialModal
          visible={this.state.modalVisible}
          closeModal={hideFreeTrialModal}
        />
      </div>
    )
  }
}

export default Homepage