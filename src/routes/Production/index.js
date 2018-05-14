import React from 'react';
import { connect } from 'dva';
import ProductionHeadSection from 'components/ProductionHeadSection'
import ReservationExperience from 'components/ReservationExperience'
import ProIntroduceItem from 'components/ProIntroduceItem'
import proIntroduceContent from './contents'
import styles from './index.less'

const headSectionContent = {
  subTitle: '高效数据分析，聚焦团队协作与决策',
  content: '快速多维度的数据整合，灵活、高效的数据分析，多群组的分析结果共享，让团队中人人都是数据分析师，将数据决策覆盖到每一个工作场景'
}

const Production = ({ dispatch }) => {
  return (
    <div className={styles.container}>
      <ProductionHeadSection headSectionContent={headSectionContent} />
      {
        proIntroduceContent.map(item => (
          <ProIntroduceItem
            proIntroduce={item}
          />
        ))
      }
      
      <ReservationExperience />
    </div>
  )
}

const mapStateToProps = () => ({

})

export default connect(mapStateToProps)(Production) 