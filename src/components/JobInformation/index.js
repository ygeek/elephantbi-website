import React from 'react';
import { Collapse } from 'antd';
import uuid from 'uuid'
import styles from './index.less'

const { Panel } = Collapse;
const jobContents = [
  {
    title: 'Web后端开发工程师',
    divided: false,
    lists: [
      '本科及以上学历，计算机相关专业；',
      '具有优良的编码风格和习惯；',
      '熟悉基本的数据结构和算法；',
      '有Ruby或Python编程语言基础，了解Ruby on Rails或熟悉Django框架；',
      '熟悉HTTP、TCP/IP协议，RESTful规范；',
      '了解常用的数据库及缓存技术，例如MySQL, Redis等；',
      '日常使用Mac或Linux开发环境，熟悉git、Linux基本命令；',
      '学习能力强，工作积极主动，能承担工作压力。'
    ]
  }, {
    title: 'Web前端开发工程师',
    divided: false,
    lists: [
      '本科及以上学历，计算机相关专业；',
      '具有优良的编码风格和习惯；',
      '熟悉基本的数据结构和算法；',
      '精通JavaScript/ES6、HTML5、CSS3；',
      '熟悉React.js和Redux；',
      '了解常用的数据库及缓存技术，例如MySQL, Redis等；',
      '日常使用Mac或Linux开发环境，熟悉git、Linux基本命令；',
      '学习能力强，工作积极主动，能承担工作压力。'
    ]
  }, {
    title: '产品经理',
    divided: true,
    lists: {
      responsibility: [
        '参与公司项目的产品设计，输出产品原型和文档',
        '与用户沟通，国内外竞品分析，分析各类咨询报告，深刻了解用户的需求；',
        '与设计、研发等部门保持良好的沟通，协同工作，保证产品设计的理念被良好的贯彻执行。'
      ],
      claim: [
        '本科及以上学历；',
        '熟悉各类产品设计的工作和流程；',
        '较强的用户需求判断、引导、控制能力强；',
        '思路敏捷、超强的沟通能力、逻辑分析能力强；',
        '有较强的抗压能力，具有较好的解决问题能力。'
      ]
    }
  }, {
    title: '商务拓展专员',
    divided: true,
    lists: {
      responsibility: [
        '积极拓展新客户，筛选有价值的客户信息，通过电话、邮件、拜访等各种渠道与新客户建立联系，充分了解客户需求并制定销售方案；',
        '跟进并维修现有客户，及时更新公司产品信息，传达企业及品牌文化，分析客户管理问题和需求，并整合公司资源提供建议或产品；',
        '建立客户档案，确保各项信息完整、准确、并做好动态管理；',
        '充分挖掘自身工作潜力，收集一线营销信息、用户意见、当地市场信息、竞争对手信息等，对公司提出参考意见，并树立企业形象；',
        '参与拓展公司的推广渠道及其他合作资源；',
        '对内协助项目推进和落地，参与日常商务合同的准备处理，确保项目满足合同要求；',
        '深入了解行业发展趋势，竞争格局，分析研究公司内外部产品以及研发趋势，形成有洞察力的分析报告，站在市场角度为产品提出需求，与产品经理协同形成解决方案。'
      ],
      claim: [
        '本科及以上学历，专业不限，有计算机相关专业背景者优先；',
        '具备优秀的沟通协作能力和执行管理能力，思维活跃，领悟力强，乐于接受新鲜事物；',
        '较好的书面和语言表达能力；',
        '较强的团队协作精神，心态积极进取，愿意接受挑战，以结果为向导；',
        '在SaaS方向有经验者更佳。'
      ]
    }
  }, {
    title: 'UI设计师',
    divided: true,
    lists: {
      responsibility: [
        '参与公司WEB产品的界面设计、图标设计；',
        '参与各产品团队设计讨论，和开发团队共同创建用户界面，跟踪产品效果，提出设计改善方案；',
        '负责产品前期界面视觉用户研究、设计流行趋势分析。'
      ],
      claim: [
        '本科及以上学历，美术、设计相关专业优先；',
        '相对于把一个icon做到极致逼真，我们更在意设计师对整体框架的把握，相对于把技巧用到极致，我们更在意设计师对整体风格的统一；',
        '我们希望你是一个拥有良好习惯的人，小到像素和自重，大到图层和分组，希望每一个细节都足够认真',
        '对新的设计趋势有足够的敏感度、热爱创意、热爱视觉表现、热爱一切美好的事物；',
        '习惯先动脑，后动手，有较强执行能力；',
        '善于表达和沟通，有较强团队合作意识；',
        '有绘画基础，有良好的审美。'
      ]
    }
  }, {
    title: '运营专员',
    divided: true,
    lists: {
      responsibility: [
        '参与公司互联网产品线上线下整体运营，制定运营策略，方案并组织执行，推动产品商业模式的形成并不断优化；',
        '参与制定公司运营事项决策及发展战略，实现运营管理目标；',
        '参与运营部门的维护，持续优化完善运营制度和业务流程；',
        '统计、分析公司产品数据，提出改进方案，及时调整运营竞争策略；',
        '参与品牌、产品、市场的规划、用户体验、业务流程等的分析和改进，实现公司既定目标；',
        '参与部门的日常管理，建立规范、高效的管理体系及工作流程，建设和发展优秀的人才队伍。'
      ],
      claim: [
        '本科及以上学历；',
        '能组织各个部门进行产品线上线下运营及市场推广工作；',
        '对互联网业务有深刻理解，能敏锐把握移动互联网发展趋势，具备策划能力；',
        '沟通能力强，善于计划、组织并协调相关资源，确保工作顺利实施；',
        '优秀的数据统计分析能力，能从数据中发现问题并提供解决方案；',
        '拥有良好的商业意识和战略意识，具有优秀的管理才能和职业操守，能够承担较大的工作压力。'
      ]
    }
  }, {
    title: '人力资源专员',
    divided: true,
    lists: {
      responsibility: [
        '维护招聘渠道，发布招聘信息并负责部分实习岗位的招聘；',
        '协助策划并实施校招方案（文案专业、海报设计）；',
        '负责统计候选人的信息，电话邀约、cold call、面试安排等；',
        '招聘相关数据分析总结；',
        '员工入职离职手续的办理；',
        '协助组织员工关怀、企业文化活动等。'
      ],
      claim: [
        '本科及以上学历，人力资源、中文、语言类相关专业优先；',
        '自律，做事认真细致，善于沟通，执行力强；',
        '文笔好，有文案及活动策划经验的优先；',
        '乐于接受挑战，想法多，脑洞大；',
        '热爱互联网行业。'
      ]
    }
  }
]

const JobInformation = () => {
  const getPanelContent = (content) => {
    if (!content.divided) {
      return (
        <div>
          <ol>
            {
              content.lists.map(list => (<li key={uuid()}>{list}</li>))
            }
          </ol>
        </div>
      )
    }
    return (
      <div>
        <div>【岗位职责】</div>
        <ol>
          {
            content.lists.responsibility.map(list => <li key={uuid()}>{list}</li>)
          }
        </ol>
        <div>【任职要求】</div>
        <ol>
          {
            content.lists.claim.map(list => (<li key={uuid()}>{list}</li>))
          }
        </ol>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>加入我们</div>
      <div className={styles.subTitle}>请注明应聘岗位，投递简历至 recruit@elephantbi.com</div>
      <div className={styles.content}>
        <Collapse accordion>
          {
            jobContents.map((jobContent, index) => {
              const i = index
              return (
                <Panel header={jobContent.title} key={i}>
                  {
                    getPanelContent(jobContent)
                  }
                </Panel>
              )
            })
          }
        </Collapse>
      </div>
    </div>
  )
}

export default JobInformation
