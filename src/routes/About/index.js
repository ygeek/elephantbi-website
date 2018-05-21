import React from 'react';
import HomeHeadSection from 'components/HomeHeadSection'
import aboutBackImg from 'assets/about.png'
import JobInformation from 'components/JobInformation'
import styles from './index.less'

const headSectionContent = {
  backImg: aboutBackImg,
  title: '',
  subTitle: '关于我们',
  content: 'ElephantBI是由悦视光合科技（北京）有限公司出品， 公司专注于企业级互联网产品及云端服务， 创始成员均来自于百度、网易等一线互联网公司， 拥有多年知名互联网产品的设计和研发经验。',
  button: false
}

const About = () => {
  return (
    <div className={styles.container}>
      <HomeHeadSection
        headSectionContent={headSectionContent}
      />
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
