import React from 'react';
import { connect } from 'dva';
import styles from './index.less'
import ServiceHeadSection from 'components/ServiceHeadSection'
import ContractInformation from 'components/ContractInformation'
import FeedbackAndSuggestions from 'components/FeedbackAndSuggestions'

const Service = () => {
  return (
    <div className={styles.container}>
      <ServiceHeadSection />
      <ContractInformation />
      <FeedbackAndSuggestions />
    </div>
  )
}

export default Service
