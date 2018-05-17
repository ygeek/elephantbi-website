import banner1 from 'assets/banner1.png'
import banner2 from 'assets/banner2.png'
import character1 from 'assets/character1.png'
import character2 from 'assets/character2.png'
import character3 from 'assets/character3.png'
import character4 from 'assets/character4.png'
import name from 'assets/name.png'
import name1 from 'assets/name1.png'
import email from 'assets/email.png'
import tel from 'assets/tel.png'
import company from 'assets/company1.png'
import department from 'assets/department1.png'
import position from 'assets/position1.png'

const sectionContents = [
  {
    title: '集成全部数据',
    subTitle: '大象BI支持几百种数据源连接，您可以从任何私有部署系统，第三方数据源和专有系统中直接导入数据',
    lists: [
      '内部系统数据，包括支持HRM，CRM，ERP，OA，进销存等业务系统',
      '本地数据：Excel/Csv文件也可轻松上传',
      '各种SaaS应用数据',
      '云端服务器数据',
      '公共数据',
      '通过API连接更多数据'
    ],
    type: 0,
    backImg: banner1

  },
  {
    title: '可视化拖拽分析',
    subTitle: '简单的拖拽操作即可支持复杂的数据分析需求，无需任何技术支持，业务人员也可随时随心进行数据分析',
    lists: [
      '简单拖拽，数据图表瞬间生成',
      '图表类型丰富，几十种随意挑选',
      '自由布局，图文混排，数据动向清晰明了',
      '图表联动，数据不再静止，让数据说话'
    ],
    type: 1,
    backImg: banner2
  },
  {
    title: '团队协作',
    subTitle: '数据实时融入团队日常工作，以数据驱动沟通，以数据支持决策，以数据提升效率',
    lists: [
      '多种类，多终端的交互式图表和仪表盘，帮助决策者从容讲述数据背后的线索',
      '深度集成即时沟通工具，帮助全员围绕商业数据分享协作，让数据驱动沟通融入日常工作的方方面面',
      '以数据连接全体成员，打破团队成员见的信息隔阂。帮助团队时刻了解业务关键指标，保持清晰的业务共识'
    ],
    type: 0,
    backImg: banner1
  },
  {
    title: '精细化权限管理',
    subTitle: '面向不同用户和角色，提供精细的数据管控，数据展现千人千面',
    lists: [
      '灵活严谨的用户和角色体系，快速准确的赋予数据权限，兼具效率与安全',
      '提供行列粒度的数据权限控制，确保每一行每一列数据的访问都尽在控制'
    ],
    type: 1,
    backImg: banner2
  },
  {
    title: '移动BI',
    subTitle: '全面支持移动设备，随时随地进行数据查看，图表分析，沟通分享，时刻保持数据零距离',
    lists: [
      '完善的移动交互体验，流畅进行图表缩放，数据钻取联动等操作，任何时候都能够便捷的查看和分析数据',
      '移动设备功能同样强大，全面支持数据分析，图表分享沟通等功能，助力高效移动办公',
      '主动推送关键数据，及时了解关键数据的变化，无论身处何处，都能时刻保持与数据的连接',
      '多种认证机制，设备绑定，加密传输，全面保障移动设备安全访问数据'
    ],
    type: 0,
    backImg: banner1
  },
  {
    title: '数据大屏',
    subTitle: '数据图表自适应各尺寸大屏，动态展示实时状态，让团队掌握业务数据的每一次脉搏',
    lists: [
      '全面支持数据多屏展示，数据大屏，PC显示器，投影仪等，有价值的图表无处不在',
      '实时展示最新数据动态，即使了解关键数据变化。以数据了解企业脉搏，及时预警，时刻激励'
    ],
    type: 1,
    backImg: banner2
  }
]

const characterContents = [
  [{
    avatar: character1,
    name: 'CEO',
    content: '第一时间获得企业全景，无论市场，销售，财务，还是人力部门等，任何时间点的经营状态都能一目了然'
  },
  {
    avatar: character2,
    name: 'HR',
    content: '整合利用考勤，薪酬，招聘，绩效等各模块的数据，发挥他们的战略意义，提升HR管理实质作用'
  },
  {
    avatar: character3,
    name: '财务',
    content: '大象BI自动完成重复性复杂计算，支持财务人员随时随地监控数据，洞察数据，促进企业的可持续盈利与发展'
  }],
  [{
    avatar: character4,
    name: '市场',
    content: '大象BI自动完成重复性复杂计算，支持财务人员随时随地监控数据，洞察数据，促进企业的可持续盈利与发展'
  },
  {
    avatar: character1,
    name: '数据分析师',
    content: '整合企业所有相关数据，通过灵活的可视化分析帮助企业内任何角色分析数据，洞察数据背后的线索，支持决策'
  },
  {
    avatar: character2,
    name: '业务人员',
    content: '大象BI助您整合数据，洞察背后的线索，以数据驱动决策，实施精益化商业运营'
  }],
  [{
    avatar: character3,
    name: 'IT',
    content: '大象BI帮助企业员工自助查询所需数据，让IT工作不再陷入无尽的业务查询需求。数据访问安全可控，数据安全工作高枕无忧'
  },
  {
    avatar: character4,
    name: '销售',
    content: '大象BI帮助您深刻洞察销售数据，以洞察驱动行动，精准分析预测销售机会和风险，大幅提高成单量'
  },
  {
    avatar: character1,
    name: '客户客服',
    content: '大象BI帮助您分析深度挖掘用户行为，提高沟通效率，祝您花更少的时间问询客户需求，节省更多的时间提供有效的服务，以数据驱动提升服务满意度'
  }]
]

const industryContents = [
  [{
    name: '零售与电商',
    content: '利用数据分析实时掌握金销存动态，选择可靠的供应商，指定最合理的销售价格，提升电商网站转化率同时降低退货率'
  },
  {
    name: '金融',
    content: '实时监控数据保证覆盖众多复杂金融指标，依靠数据为客户提供精准保险服务，对关键财务指标预警并实时接受通知'
  },
  {
    name: '教育',
    content: '从重复琐碎工作中解放大脑，知道根据创新的教学方法，跟踪学生动态，提出具有针对性的提升方案'
  }],
  [{
    name: '健康医疗',
    content: '实现繁杂数据整合，提高就医效率，提供数据驱动的的解决方案，实时监控患者生理周期各项指标，轻松提高客户满意度'
  },
  {
    name:'地产行业',
    content: '整合企业复杂数据源，及时分析瞬息万变的房产行情，及时调整营销策略，辅助指定开发方案，各类销售分析促进楼盘回款率'
  },
  {
    name: '制造业',
    content: '整合多业务系统和大型ERP数据互通，合理分配资源降低生产成本，优化生产线管理提升产品质量'
  }],
  [{
    name: '汽车行业',
    content: '多业务系统和大型ERP的数据整合，打破信息孤岛，高效的客户关系管理及供应商合作管理，把握市场价格变化行情调整销售策略'
  },
  {
    name: '酒店与交通',
    content: '轻松了解追踪客户行为，领先竞争对手对购买趋势的预测，提高物流高效率，保证客户满意度'
  },
  {
    name: '高新技术',
    content: '实时跟踪访客数，流量走势，竞争对手策略趋势等关键业务指标，掌握最新科技动向，辅助决策和产品调整方向'
  }],
  [{
    name: '电信行业',
    content: '融合业务、计费、财务、网管、监控等多系统数据，大数据分析辅助决策，用户数据分析防止欺诈等行为，减少客户流失'
  },
  {
    name: '媒体娱乐',
    content: '时刻保持最新状态，对即将发生的事件进行趋势预测，让数据变得可靠实用，数据指导精准营销活动'
  },
  {
    name: '专业服务',
    content: '从重复繁琐的工作中抽身以提升效率，更好的了解客户差异化需求，快速积累成功经验所需的信息，提供更专业的服务'
  }]
]

const formContents = [
  { key: 'name', placeholder: '姓名', icon: name1 },
  { key: 'email', placeholder: '邮箱', icon: email },
  { key: 'mobile', placeholder: '联系电话', icon: tel },
  { key: 'company', placeholder: '公司名称', icon: company },
  { key: 'department', placeholder: '所属部门', icon: department },
  { key: 'title', placeholder: '职位', icon: position }
]

export default { sectionContents, characterContents, industryContents, formContents }