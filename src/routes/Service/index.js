import React from 'react';
import { connect } from 'dva';
import styles from './index.less'
import ServiceHeadSection from 'components/ServiceHeadSection'
import ContractInformation from 'components/ContractInformation'
import FeedbackAndSuggestions from 'components/FeedbackAndSuggestions'

const Service = ({ dispatch }) => {
  return (
    <div className={styles.container}>
      <ServiceHeadSection />
      <ContractInformation />
      <FeedbackAndSuggestions
        dispatch={dispatch}
      />
    </div>
  )
}

const mapStateToProps = ({ service }) => ({
  service
})

export default connect(mapStateToProps)(Service)
