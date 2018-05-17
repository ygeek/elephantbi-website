import React from 'react';
import { connect } from 'dva';
import AboutHeadSection from 'components/AboutHeadSection'
import JobInformation from 'components/JobInformation'
import styles from './index.less'

const About = () => {
  return (
    <div className={styles.container}>
      <AboutHeadSection />
      <div className={styles.introduce}>
        扁平化的管理架构和组织模式，
        通过减少管理层次来建立高效而紧密的团队，
        使每个团队成员都更具有自由度和创造性。
        我们会一直是一家年轻的互联网快公司，
        不断引入硅谷风格的管理方法，
        倡导所有团队成员自下而上的自我驱动精神，
        鼓励每个人的主观能动性，
        保持团队的活力和激情。
      </div>
      <JobInformation />
    </div>
  )
}

export default About
