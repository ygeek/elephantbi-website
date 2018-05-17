import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd'
import styles from './index.less'
import ServiceHeadSection from 'components/ServiceHeadSection'
import ContractInformation from 'components/ContractInformation'
import FeedbackAndSuggestions from 'components/FeedbackAndSuggestions'

class Service extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  render() {
    const toggleLoading = () => {
      const { loading } = this.state
      this.setState({ loading: !loading })
    }

    return (
      <div className={styles.container}>
        <ServiceHeadSection />
        <ContractInformation />
        <Spin spinning={this.state.loading}>
          <FeedbackAndSuggestions
            toggleLoading={toggleLoading}
          />
        </Spin>
      </div>
    )
  }
}

export default Service
