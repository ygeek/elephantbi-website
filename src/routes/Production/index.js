import React from 'react';
import { connect } from 'dva';
import ProductionHeadSection from 'components/ProductionHeadSection'
import ReservationExperience from 'components/ReservationExperience'
import ProIntroduceItem from 'components/ProIntroduceItem'
import uuid from 'uuid'
import FreeTrialModal from 'components/FreeTrialModal'
import proIntroduceContent from './contents'
import styles from './index.less'

const headSectionContent = {
  subTitle: '高效数据分析，聚焦团队协作与决策',
  content: '快速多维度的数据整合，灵活、高效的数据分析，多群组的分析结果共享，让团队中人人都是数据分析师，将数据决策覆盖到每一个工作场景'
}

class Production extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
  }

  render() {
    const showFreeTrialModal = () => {
      this.setState({ modalVisible: true })
    }
    const hideFreeTrialModal = () => {
      this.setState({ modalVisible: false })
    }
    return (
      <div className={styles.container}>
        <ProductionHeadSection
          headSectionContent={headSectionContent}
          showFreeTrialModal={showFreeTrialModal}
        />
        {
          proIntroduceContent.map(item => (
            <ProIntroduceItem
              proIntroduce={item}
              key={uuid()}
            />
          ))
        }
        
        <ReservationExperience />

        <FreeTrialModal
          visible={this.state.modalVisible}
          closeModal={hideFreeTrialModal}
        />
      </div>
    )
  }
}

export default Production