import pro1 from 'assets/production/pro1.png'
import pro2 from 'assets/production/pro2.png'
import pro3 from 'assets/production/pro3.png'
import pro4 from 'assets/production/pro4.png'
import pro5 from 'assets/production/pro5.png'
import pro6 from 'assets/production/pro6.png'
import pro7 from 'assets/production/pro7.png'
import pro8 from 'assets/production/pro8.png'
import pro9 from 'assets/production/pro9.png'
import pro10 from 'assets/production/pro10.png'
import pro11 from 'assets/production/pro11.png'
import pro12 from 'assets/production/pro12.png'
import pro13 from 'assets/production/pro13.png'
import pro14 from 'assets/production/pro14.png'
import pro15 from 'assets/production/pro15.png'
import pro16 from 'assets/production/pro16.png'
import pro17 from 'assets/production/pro17.png'
import pro18 from 'assets/production/pro18.png'
import pro19 from 'assets/production/pro19.png'
import pro20 from 'assets/production/pro20.png'
import pro21 from 'assets/production/pro21.png'
import pro22 from 'assets/production/pro22.png'
import pro23 from 'assets/production/pro23.png'
import pro24 from 'assets/production/pro24.png'

const proIntroduceContent = [
  {
    backImg: pro1,
    title: '连接业务系统数据',
    content: '支持包括HRM、CRM、ERP、OA、进销存等业务系统，业务数据一目了然',
    type: 0
  },
  {
    backImg: pro2,
    title: '分析本地数据',
    content: 'Excel/csv文件也可轻松上传分析',
    type: 1
  },
  {
    backImg: pro3,
    title: '连接SaaS应用数据',
    content: '企业SaaS应用一键连接，云端应用数据集成毫无障碍',
    type: 0
  },
  {
    backImg: pro4,
    title: '连接数据库数据',
    content: '支持连接常用关系型数据库，如MySQL、PostgreSQL、Oracle Database等，有效集成企业数据',
    type: 1
  },
  {
    backImg: pro5,
    title: '通过API连接更多数据',
    content: '支持API数据接入，灵活扩展数据集成',
    type: 0
  },
  {
    backImg: pro6,
    title: '大数据稳定支撑',
    content: '强大的并行计算集群，百亿数据，实时查询，轻松处理企业大数据',
    type: 1
  },
  {
    backImg: pro7,
    title: '数据实时刷新',
    content: '实时自动更新数据，方便您对数据的实时掌控，并依此零时差推进业务',
    type: 0
  },
  {
    backImg: pro8,
    title: '多表联合',
    content: '拖拽即可完成多表联合、追加合并数据，重复繁琐的ETL工作也可以如此轻松搞定',
    type: 1
  },
  {
    backImg: pro9,
    title: '拖拽式数据可视化分析',
    content: '简单拖拽，数据图表瞬间生成',
    type: 0
  },
  {
    backImg: pro10,
    title: '丰富的数据可视化展示',
    content: '图表类型丰富，几十种随意挑选',
    type: 1
  },
  {
    backImg: pro11,
    title: '灵动的交互式图表',
    content: '图表联动，数据不再静止，让数据说话。自由布局，图文混排，数据动向清晰明了',
    type: 0
  },
  {
    backImg: pro12,
    title: '强大的数据分析功能',
    content: '广泛支持数据多层钻取、横向钻取、筛选分析对比拆分等操作，深度挖掘数据背后的线索',
    type: 1
  },
  {
    backImg: pro13,
    title: '数据故事',
    content: '多种类、多终端的交互式图表和仪表盘，帮助决策者从容讲述数据背后的线索',
    type: 0
  },
  {
    backImg: pro14,
    title: '数据驱动沟通',
    content: '深度集成即时沟通工具，帮助全员围绕商业数据分享协作，让数据驱动沟通融入日常工作的方方面面',
    type: 1
  },
  {
    backImg: pro15,
    title: '权限体系',
    content: '灵活严谨的用户和角色体系，快速准确的赋予数据权限，兼具效率与安全',
    type: 0
  },
  {
    backImg: pro16,
    title: '精细数据管控',
    content: '提供行列粒度的数据权限控制，确保每一行每一列数据的访问都尽在掌控',
    type: 1
  },
  {
    backImg: pro17,
    title: '流畅的移动设备体验',
    content: '完善的移动交互体验，流畅进行图表缩放、数据钻取联动等操作，任何时候都能够便捷的查看和分析数据',
    type: 0
  },
  {
    backImg: pro18,
    title: '完善的移动设备功能',
    content: '移动设备功能同样强大，全面支持数据分析、图表分享沟通等功能，助力高效移动办公',
    type: 1
  },
  {
    backImg: pro19,
    title: '移动设备数据安全',
    content: '多种认证机制、设备绑定、加密传输，全面保障移动设备安全访问数据',
    type: 0
  },
  {
    backImg: pro20,
    title: '消息推送',
    content: '主动推送关键数据，及时了解关键数据的变化，无论身处何处，都能时刻保持与数据的连接',
    type: 1
  },
  {
    backImg: pro21,
    title: '多屏支持',
    content: '全面支持数据多屏展示，数据大屏、PC显示器、投影仪等，有价值的图表无所不在',
    type: 0
  },
  {
    backImg: pro22,
    title: '实时数据大屏',
    content: '实时展示最新数据动态，及时了解关键数据变化。以数据了解企业脉搏，及时预警，时刻激励',
    type: 1
  },
  {
    backImg: pro23,
    title: '专属服务',
    content: '完善的数据咨询和技术支持服务体系，7X24小时快速响应，为您提供坚实可靠的数据服务',
    type: 0
  },
  {
    backImg: pro24,
    title: '仪表盘',
    content: '聚合企业核心业务数据可视化指标，实时查看全局关键数据，快速洞察业务全局状态',
    type: 1
  }
]

export default proIntroduceContent