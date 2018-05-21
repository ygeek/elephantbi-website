import React from 'react';
import { Spin } from 'antd'
import HomeHeadSection from 'components/HomeHeadSection'
import serviceBackImg from 'assets/service.png'
import styles from './index.less'
import ContractInformation from 'components/ContractInformation'
import FeedbackAndSuggestions from 'components/FeedbackAndSuggestions'

const headSectionContent = {
  backImg: serviceBackImg,
  title: '',
  subTitle: '服务支持',
  content: 'ElephantBI拥有专业的商务团队和技术支持团队，将为您提供专业的服务',
  button: false
}

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
        <HomeHeadSection
          headSectionContent={headSectionContent}
        />
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
