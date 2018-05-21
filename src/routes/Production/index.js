import React from 'react';
import HomeHeadSection from 'components/HomeHeadSection'
import productionBackimg from 'assets/production.png'
import ReservationExperience from 'components/ReservationExperience'
import ProIntroduceItem from 'components/ProIntroduceItem'
import { Spin } from 'antd'
import FreeTrialModal from 'components/FreeTrialModal'
import proIntroduceContent from './contents'
import styles from './index.less'

const headSectionContent = {
  backImg: productionBackimg,
  title: '',
  subTitle: '高效数据分析，聚焦团队协作与决策',
  content: '快速多维度的数据整合，灵活、高效的数据分析，多群组的分析结果共享，让团队中人人都是数据分析师，将数据决策覆盖到每一个工作场景',
  button: true
}

class Production extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      loading: false
    }
  }

  render() {
    const showFreeTrialModal = () => {
      this.setState({ modalVisible: true })
    }
    const hideFreeTrialModal = () => {
      this.setState({ modalVisible: false })
    }
    const toggleLoading = () => {
      const { loading } = this.state
      this.setState({ loading: !loading })
    }
    return (
      <div className={styles.container}>
        <HomeHeadSection
          headSectionContent={headSectionContent}
          showFreeTrialModal={showFreeTrialModal}
        />
        {
          proIntroduceContent.map(item => (
            <ProIntroduceItem
              proIntroduce={item}
            />
          ))
        }
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

export default Production