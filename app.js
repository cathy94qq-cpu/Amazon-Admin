const loginView = document.querySelector("#loginView");
const adminView = document.querySelector("#adminView");
const loginForm = document.querySelector("#loginForm");
const logoutButton = document.querySelector("#logoutButton");
const userAvatarButton = document.querySelector("#userAvatarButton");
const userMenu = document.querySelector("#userMenu");
const pageTitle = document.querySelector("#pageTitle");
const topbar = document.querySelector(".topbar");
const toast = document.querySelector("#toast");
const settingsToggle = document.querySelector("[data-settings-toggle]");
const settingsSubmenu = document.querySelector(".settings-submenu");
const usersToggle = document.querySelector("[data-users-toggle]");
const usersSubmenu = document.querySelector(".users-submenu");
const docKbFilter = document.querySelector("#docKbFilter");
const uploadModal = document.querySelector("#uploadModal");
const roleModal = document.querySelector("#roleModal");
const userModal = document.querySelector("#userModal");
const editUserModal = document.querySelector("#editUserModal");
const customerModal = document.querySelector("#customerModal");
const planModal = document.querySelector("#planModal");
const editPlanModal = document.querySelector("#editPlanModal");
const planUsersModal = document.querySelector("#planUsersModal");
const deleteConfirmModal = document.querySelector("#deleteConfirmModal");
const kbDisableConfirmModal = document.querySelector("#kbDisableConfirmModal");
const kbDeleteConfirmModal = document.querySelector("#kbDeleteConfirmModal");
const modelModal = document.querySelector("#modelModal");
const editModelModal = document.querySelector("#editModelModal");
const expertModal = document.querySelector("#expertModal");
const knowledgeModal = document.querySelector("#knowledgeModal");
const editKnowledgeModal = document.querySelector("#editKnowledgeModal");
const skillModal = document.querySelector("#skillModal");
const addSkillModal = document.querySelector("#addSkillModal");
const editSkillModal = document.querySelector("#editSkillModal");
const docDetailModal = document.querySelector("#docDetailModal");
const issueModals = {
  parse: document.querySelector("#parseIssueModal"),
  rating: document.querySelector("#ratingIssueModal"),
  plan: document.querySelector("#planIssueModal"),
  noChunks: document.querySelector("#noChunksIssueModal"),
  missedAnswers: document.querySelector("#missedAnswersIssueModal"),
  syncDelay: document.querySelector("#syncDelayIssueModal"),
};

const rolePermissions = {
  expert: "可管理知识库，包含删除文档、上传文档、重析文档。",
  ops: "可查看异常数据、性能指标、用户问答评分和任务状态。",
  plan: "可新增、修改、删除套餐，并审核套餐规则变更。",
};

const roleValues = {
  专家角色: "expert",
  运维人员: "ops",
  套餐管理员: "plan",
};

const pageNames = {
  dashboard: "控制台",
  knowledge: "知识库管理",
  experts: "专家管理",
  documents: "文档管理",
  skills: "Skill 管理",
  users: "用户管理",
  ops: "运维指标",
  plans: "套餐管理",
  planDetail: "",
  planSubscribers: "",
  subscriberDetail: "",
  settings: "系统设置",
  profile: "个人中心",
};

const navPageMap = {
  planDetail: "plans",
  planSubscribers: "plans",
  subscriberDetail: "plans",
};

const planUserData = {
  免费版: [
    { avatar: "张三", avatarClass: "blue", name: "张三", email: "zhangsan@corp.com", type: "免费", start: "2026/01/15", expires: "—", usage: 623, limit: 1000, tokenUsage: "10万", tokenLimit: "10万", status: "订阅中", statusClass: "ok" },
  ],
  专业版: [
    { avatar: "张三", avatarClass: "blue", name: "张三", email: "zhangsan@corp.com", type: "年付", start: "2026/01/15", expires: "2027/01/15", usage: 623, limit: 1000, tokenUsage: "5.8万", tokenLimit: "10万", status: "订阅中", statusClass: "ok" },
    { avatar: "李四", avatarClass: "purple", name: "李四", email: "lisi@example.com", type: "月付", start: "2025/11/03", expires: "2026/07/03", usage: 91, limit: 1000, tokenUsage: "0.8万", tokenLimit: "10万", status: "订阅中", statusClass: "ok" },
    { avatar: "王五", avatarClass: "teal", name: "王五", email: "wangwu@mail.cn", type: "年付", start: "2025/06/10", expires: "2026/06/10", expiresNote: "2天后", usage: 988, limit: 1000, tokenUsage: "9.1万", tokenLimit: "10万", status: "订阅中", statusClass: "ok", usageTone: "warn" },
    { avatar: "陈七", avatarClass: "yellow", name: "陈七", email: "chen7@biz.io", type: "月付", start: "2025/08/01", expires: "2026/07/01", usage: 43, limit: 1000, tokenUsage: "10万", tokenLimit: "10万", status: "订阅中", statusClass: "ok", usageAlert: "Token 已耗尽", usageTone: "danger", pending: true },
    { avatar: "林八", avatarClass: "purple", name: "林八", email: "lin8@startup.cn", type: "月付", start: "2026/03/15", expires: "2026/07/15", usage: 1000, limit: 1000, tokenUsage: "6.2万", tokenLimit: "10万", status: "订阅中", statusClass: "ok", usageAlert: "问答已耗尽", usageTone: "danger", pending: true },
    { avatar: "赵六", avatarClass: "red", name: "赵六", email: "zhaoliu@biz.io", type: "月付", start: "2025/03/22", expires: "2026/05/22", usage: null, limit: null, status: "已过期", statusClass: "warn" },
  ],
  Max版: [
    { avatar: "刘洋", avatarClass: "yellow", name: "刘洋", email: "liuyang@trader.com", type: "年付", start: "2025/12/20", expires: "2027/02/18", usage: 892, limit: 5000, status: "订阅中", statusClass: "ok" },
    { avatar: "陈", avatarClass: "green", name: "陈洁", email: "chenjie@market.cn", type: "月付", start: "2026/02/11", expires: "2026/07/11", usage: 1310, limit: 5000, status: "订阅中", statusClass: "ok" },
  ],
  Business版: [
    { avatar: "A", avatarClass: "teal", name: "Amazon Solutions Ltd", email: "Amazon Solutions Co.", type: "年付", start: "2025/08/05", expires: "2027/01/10", usage: 3201, limit: 50000, status: "订阅中", statusClass: "ok" },
    { avatar: "C", avatarClass: "gray", name: "CrossBorder Co.", email: "CrossBorder Co.", type: "月付", start: "2026/01/15", expires: "2026/06/20", usage: 1540, limit: 50000, status: "订阅中", statusClass: "ok" },
  ],
  Enterprise版: [
    { avatar: "企", avatarClass: "teal", name: "Global Seller Group", email: "enterprise@global-seller.com", type: "年付", start: "2026/01/02", expires: "2027/01/02", usage: 0, limit: null, status: "订阅中", statusClass: "ok" },
  ],
};

const subscriberSeedRows = [
  { avatar: "孙", avatarClass: "green", name: "孙九", email: "sunjiu@store.cn", type: "年付", start: "2025/09/18", expires: "2026/09/18", usage: 318, limit: 1000, tokenUsage: "2.4万", tokenLimit: "10万", status: "订阅中", statusClass: "ok" },
  { avatar: "吴", avatarClass: "blue", name: "吴十", email: "wushi@amazoner.cn", type: "月付", start: "2026/02/02", expires: "2026/07/02", usage: 742, limit: 1000, tokenUsage: "4.2万", tokenLimit: "10万", status: "订阅中", statusClass: "ok" },
  { avatar: "周", avatarClass: "teal", name: "周青", email: "zhouqing@seller.net", type: "年付", start: "2025/07/08", expires: "2026/06/18", expiresNote: "9天后", usage: 821, limit: 1000, tokenUsage: "7.6万", tokenLimit: "10万", status: "即将到期", statusClass: "warn", usageTone: "warn" },
  { avatar: "郑", avatarClass: "yellow", name: "郑敏", email: "zhengmin@cross.cn", type: "月付", start: "2026/04/12", expires: "2026/07/12", usage: 112, limit: 1000, tokenUsage: "1.1万", tokenLimit: "10万", status: "订阅中", statusClass: "ok" },
  { avatar: "冯", avatarClass: "purple", name: "冯可", email: "fengke@brand.io", type: "年付", start: "2025/10/20", expires: "2026/10/20", usage: 956, limit: 1000, tokenUsage: "8.9万", tokenLimit: "10万", status: "订阅中", statusClass: "ok", usageTone: "warn" },
  { avatar: "曹", avatarClass: "red", name: "曹然", email: "caoran@shop.cn", type: "月付", start: "2025/12/01", expires: "2026/05/31", usage: null, limit: null, status: "已过期", statusClass: "warn" },
  { avatar: "蒋", avatarClass: "green", name: "蒋一", email: "jiangyi@ops.cn", type: "月付", start: "2026/01/08", expires: "2026/06/08", usage: 64, limit: 1000, tokenUsage: "10万", tokenLimit: "10万", status: "订阅中", statusClass: "ok", usageAlert: "Token 已耗尽", usageTone: "danger", pending: true },
  { avatar: "沈", avatarClass: "blue", name: "沈二", email: "shener@trade.cn", type: "年付", start: "2025/11/11", expires: "2026/11/11", usage: 1000, limit: 1000, tokenUsage: "6.4万", tokenLimit: "10万", status: "订阅中", statusClass: "ok", usageAlert: "问答已耗尽", usageTone: "danger", pending: true },
  { avatar: "韩", avatarClass: "teal", name: "韩三", email: "hansan@corp.cn", type: "月付", start: "2026/03/21", expires: "2026/06/21", expiresNote: "12天后", usage: 407, limit: 1000, tokenUsage: "3.3万", tokenLimit: "10万", status: "即将到期", statusClass: "warn" },
  { avatar: "杨", avatarClass: "yellow", name: "杨四", email: "yangsi@example.com", type: "年付", start: "2026/01/01", expires: "2027/01/01", usage: 514, limit: 1000, tokenUsage: "5.0万", tokenLimit: "10万", status: "订阅中", statusClass: "ok" },
  { avatar: "朱", avatarClass: "purple", name: "朱五", email: "zhuwu@mall.cn", type: "月付", start: "2026/05/06", expires: "2026/07/06", usage: 22, limit: 1000, tokenUsage: "0.3万", tokenLimit: "10万", status: "暂停中", statusClass: "pending" },
  { avatar: "秦", avatarClass: "green", name: "秦六", email: "qinliu@sales.cn", type: "年付", start: "2025/06/30", expires: "2026/06/30", expiresNote: "21天后", usage: 679, limit: 1000, tokenUsage: "6.1万", tokenLimit: "10万", status: "即将到期", statusClass: "warn" },
  { avatar: "许", avatarClass: "blue", name: "许七", email: "xuqi@brand.cn", type: "月付", start: "2026/02/17", expires: "2026/07/17", usage: 235, limit: 1000, tokenUsage: "2.2万", tokenLimit: "10万", status: "订阅中", statusClass: "ok" },
  { avatar: "何", avatarClass: "red", name: "何八", email: "heba@expired.cn", type: "月付", start: "2025/10/03", expires: "2026/04/03", usage: null, limit: null, status: "已过期", statusClass: "warn" },
  { avatar: "吕", avatarClass: "teal", name: "吕九", email: "lvjiu@amazon.cn", type: "年付", start: "2025/12/24", expires: "2026/12/24", usage: 734, limit: 1000, tokenUsage: "7.9万", tokenLimit: "10万", status: "订阅中", statusClass: "ok" },
  { avatar: "施", avatarClass: "yellow", name: "施十", email: "shishi@team.cn", type: "月付", start: "2026/04/01", expires: "2026/07/01", usage: 486, limit: 1000, tokenUsage: "4.8万", tokenLimit: "10万", status: "订阅中", statusClass: "ok" },
  { avatar: "唐", avatarClass: "purple", name: "唐一", email: "tangyi@global.cn", type: "年付", start: "2025/08/15", expires: "2026/08/15", usage: 907, limit: 1000, tokenUsage: "9.5万", tokenLimit: "10万", status: "订阅中", statusClass: "ok", usageTone: "warn" },
  { avatar: "马", avatarClass: "green", name: "马二", email: "maer@biz.cn", type: "月付", start: "2026/03/02", expires: "2026/06/02", usage: null, limit: null, status: "已过期", statusClass: "warn" },
  { avatar: "罗", avatarClass: "blue", name: "罗三", email: "luosan@store.cn", type: "年付", start: "2026/02/28", expires: "2027/02/28", usage: 128, limit: 1000, tokenUsage: "1.7万", tokenLimit: "10万", status: "订阅中", statusClass: "ok" },
  { avatar: "梁", avatarClass: "teal", name: "梁四", email: "liangsi@seller.cn", type: "月付", start: "2026/05/15", expires: "2026/07/15", usage: 58, limit: 1000, tokenUsage: "0.9万", tokenLimit: "10万", status: "暂停中", statusClass: "pending" },
];

function getPlanSubscriberRows(planName) {
  const users = planUserData[planName] || [];
  if (users.length >= 20) return users;
  const existingEmails = new Set(users.map((user) => user.email));
  const fillers = subscriberSeedRows.filter((user) => !existingEmails.has(user.email));
  const rows = [...users, ...fillers].slice(0, 20);
  if (planName !== "免费版") return rows;
  return rows.map((user) => ({
    ...user,
    type: "免费版",
    expires: "—",
    expiresNote: "",
  }));
}

const planModelAccess = {
  专业版: ["核心模型", "增强模型"],
  Max版: ["核心模型", "增强模型", "高级模型"],
  Business版: ["全部模型"],
};

let currentPlanDetailName = "专业版";
let currentSubscriberPlanName = "专业版";

const planDetails = {
  免费版: {
    icon: "🐧",
    iconClass: "",
    subtitle: "入门级运营助手，适合初步体验专家问答与基础运营支持",
    status: "已上架",
    statusClass: "ok",
    badge: "入门体验",
    code: "free",
    level: "1",
    label: "入门级运营助手",
    description: "适合新用户体验基础专家能力，提供核心模型和基础体验专家组，每月 100 次问答额度。",
    monthlyPrice: "免费",
    yearlyPrice: "—",
    yearlySaving: "",
    qaQuota: "100",
    tokenQuota: "5万",
    seat: "1人",
    updated: "2026/06/04",
    subscribers: "1,024",
    growth: "+42",
    monthlyUsers: "1,024",
    yearlyUsers: "0",
    revenue: "¥ 0",
    payMode: "免费",
    qaUsage: "51,320 次",
    qaRate: "51%",
    qaBar: "51%",
    tokenUsage: "1.8 亿",
    tokenRate: "36%",
    tokenBar: "36%",
    trend: "当前用户 1,024 · +4.2%",
    sales: "未开启",
    salesClass: "pending",
    expertGroups: ["基础体验专家组"],
    aiModels: ["核心模型"],
    upgradeFrom: ["—"],
    upgradeTo: ["专业版", "Max版", "Business版"],
    upgradeRules: ["立即生效", "按差价补款"],
  },
  专业版: {
    icon: "⚡",
    iconClass: "accent",
    subtitle: "适合个人专业用户，解锁更多专业专家和更高问答题库",
    status: "已上架",
    statusClass: "ok",
    badge: "最受欢迎",
    code: "pro",
    level: "2",
    label: "进阶级效率专家",
    description: "适合个人专业用户，解锁更多专业专家和更高问答题库。支持核心模型与增强模型，每月 1,000 次问答额度。",
    monthlyPrice: "¥99",
    yearlyPrice: "¥999",
    yearlySaving: "省¥189",
    qaQuota: "1,000",
    tokenQuota: "50万",
    seat: "1人",
    updated: "2026/06/04",
    subscribers: "2,108",
    growth: "+134",
    monthlyUsers: "856",
    yearlyUsers: "1,252",
    revenue: "¥ 309,444",
    payMode: "含年付",
    qaUsage: "738,220 次",
    qaRate: "已使用 35%",
    qaBar: "35%",
    tokenUsage: "8.4 亿",
    tokenRate: "已使用 20%",
    tokenBar: "20%",
    trend: "当前用户 2,108 · +6.4%",
    sales: "未开启",
    salesClass: "pending",
    expertGroups: ["基础体验专家组", "专业专家组"],
    aiModels: ["核心模型", "增强模型"],
    upgradeFrom: ["免费版"],
    upgradeTo: ["Max版", "Business版"],
    upgradeRules: ["立即生效", "按差价补款"],
  },
  Max版: {
    icon: "⚡",
    iconClass: "accent",
    subtitle: "战略级决策顾问，适合高频分析与复杂运营决策",
    status: "已上架",
    statusClass: "ok",
    badge: "高频决策",
    code: "max",
    level: "3",
    label: "战略级决策顾问",
    description: "适合需要高频咨询、深度诊断和复杂决策支持的专业用户。支持核心模型、增强模型和高级模型。",
    monthlyPrice: "¥299",
    yearlyPrice: "¥2999",
    yearlySaving: "省¥589",
    qaQuota: "5,000",
    tokenQuota: "300万",
    seat: "1人",
    updated: "2026/06/03",
    subscribers: "1,536",
    growth: "+87",
    monthlyUsers: "642",
    yearlyUsers: "894",
    revenue: "¥ 726,662",
    payMode: "含年付",
    qaUsage: "1,842,000 次",
    qaRate: "已使用 37%",
    qaBar: "37%",
    tokenUsage: "26.5 亿",
    tokenRate: "已使用 29%",
    tokenBar: "29%",
    trend: "当前用户 1,536 · +5.8%",
    sales: "未开启",
    salesClass: "pending",
    expertGroups: ["基础体验专家组", "专业专家组", "高级专家组"],
    aiModels: ["核心模型", "增强模型", "高级模型"],
    upgradeFrom: ["免费版", "专业版"],
    upgradeTo: ["Business版"],
    upgradeRules: ["立即生效", "按差价补款"],
  },
  Business版: {
    icon: "▦",
    iconClass: "business",
    subtitle: "团队协作与企业级运营，支持多席位和全部模型",
    status: "已上架",
    statusClass: "ok",
    badge: "团队协作",
    code: "business",
    level: "4",
    label: "团队协作·企业级",
    description: "适合跨部门团队使用，提供 5 个席位、全部模型访问、团队级专家组和更高问答及 Token 配额。",
    monthlyPrice: "¥999",
    yearlyPrice: "¥9999",
    yearlySaving: "省¥1989",
    qaQuota: "50,000",
    tokenQuota: "3000万",
    seat: "5人",
    updated: "2026/06/02",
    subscribers: "872",
    growth: "+51",
    monthlyUsers: "318",
    yearlyUsers: "554",
    revenue: "¥ 1,104,882",
    payMode: "含年付",
    qaUsage: "8,962,000 次",
    qaRate: "已使用 18%",
    qaBar: "18%",
    tokenUsage: "112 亿",
    tokenRate: "已使用 25%",
    tokenBar: "25%",
    trend: "当前用户 872 · +7.1%",
    sales: "未开启",
    salesClass: "pending",
    expertGroups: ["基础体验专家组", "专业专家组", "高级专家组"],
    aiModels: ["全部模型"],
    upgradeFrom: ["免费版", "专业版", "Max版"],
    upgradeTo: ["无更高套餐"],
    upgradeRules: ["立即生效", "按差价补款"],
  },
  Enterprise版: {
    icon: "▦",
    iconClass: "business",
    subtitle: "旗舰企业定制方案，适合私有专家、定制知识库和专属服务",
    status: "草稿",
    statusClass: "warn",
    badge: "企业定制",
    code: "enterprise",
    level: "5",
    label: "旗舰企业定制方案",
    description: "适合大型企业定制，问答次数、Token 额度、席位和专家范围均可按项目配置。",
    monthlyPrice: "定制",
    yearlyPrice: "—",
    yearlySaving: "",
    qaQuota: "定制",
    tokenQuota: "定制",
    seat: "custom",
    updated: "2026/06/01",
    subscribers: "202",
    growth: "+8",
    monthlyUsers: "0",
    yearlyUsers: "202",
    revenue: "定制",
    payMode: "合同付",
    qaUsage: "定制",
    qaRate: "按合同统计",
    qaBar: "62%",
    tokenUsage: "定制",
    tokenRate: "按合同统计",
    tokenBar: "44%",
    trend: "当前用户 202 · +3.9%",
    sales: "已开启",
    salesClass: "ok",
    expertGroups: ["基础体验专家组", "专业专家组", "高级专家组", "企业定制专家组"],
    aiModels: ["全部模型"],
    upgradeFrom: ["—"],
    upgradeTo: ["—"],
    upgradeRules: ["企业定制套餐不参与自助升级路径"],
  },
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function syncPlanModelAccess(planName) {
  const enabledModels = planModelAccess[planName] || ["核心模型"];
  editPlanModal.querySelectorAll(".model-pills button").forEach((button) => {
    button.classList.toggle("is-active", enabledModels.includes(button.textContent.trim()));
  });
}

function renderPlanPills(containerId, values, className = "soft-label") {
  const container = document.querySelector(containerId);
  if (!container) return;
  container.innerHTML = values.map((value) => `<span class="${className}">${value}</span>`).join("");
}

function renderPlanDetail(planName) {
  const detail = planDetails[planName] || planDetails["专业版"];
  currentPlanDetailName = planName;
  const icon = document.querySelector("#planDetailIcon");
  icon.textContent = detail.icon;
  icon.className = `plan-icon ${detail.iconClass}`.trim();

  document.querySelector("#planDetailName").textContent = planName;
  document.querySelector("#planDetailSubtitle").textContent = detail.subtitle;
  document.querySelector("#planDetailStatus").textContent = detail.status;
  document.querySelector("#planDetailStatus").className = `status ${detail.statusClass}`;
  document.querySelector("#planDetailBadge").textContent = detail.badge;
  document.querySelector("#planDetailCache").textContent = `缓存: ${detail.code} · 套餐 ${detail.level}`;
  document.querySelector("#planDetailUpdated").textContent = `最后更新 ${detail.updated}`;

  document.querySelector("#planDetailSubscribers").textContent = detail.subscribers;
  document.querySelector("#planDetailGrowth").textContent = detail.growth;
  document.querySelector("#planDetailMonthlyUsers").textContent = detail.monthlyUsers;
  document.querySelector("#planDetailMonthlyPrice").textContent = detail.monthlyPrice === "免费" ? "免费" : `${detail.monthlyPrice}/月`;
  document.querySelector("#planDetailYearlyUsers").textContent = detail.yearlyUsers;
  document.querySelector("#planDetailYearlyPrice").textContent = detail.yearlyPrice === "—" ? "不提供年付" : `${detail.yearlyPrice}/年`;
  document.querySelector("#planDetailRevenue").textContent = detail.revenue;
  document.querySelector("#planDetailPayMode").textContent = detail.payMode;

  document.querySelector("#planInfoName").textContent = planName;
  document.querySelector("#planInfoCode").textContent = detail.code;
  document.querySelector("#planInfoLabel").textContent = detail.label;
  document.querySelector("#planInfoLevel").textContent = detail.level;
  document.querySelector("#planInfoLevelText").textContent = detail.level;
  document.querySelector("#planInfoDescription").textContent = detail.description;

  document.querySelector("#planPriceMonthly").textContent = detail.monthlyPrice;
  document.querySelector("#planPriceYearly").textContent = detail.yearlyPrice;
  document.querySelector("#planYearlySaving").textContent = detail.yearlySaving;
  document.querySelector("#planYearlySaving").hidden = !detail.yearlySaving;
  document.querySelector("#planSalesStatus").textContent = detail.sales;
  document.querySelector("#planSalesStatus").className = `status ${detail.salesClass}`;
  document.querySelector("#planSeatUnit").textContent = detail.seat;

  document.querySelector("#planTrendSummary").textContent = detail.trend;
  document.querySelector("#planUsageDate").textContent = `截至 ${detail.updated}`;
  document.querySelector("#planQaUsage").textContent = detail.qaUsage;
  document.querySelector("#planQaRate").textContent = detail.qaRate;
  document.querySelector("#planQaBar").style.width = detail.qaBar;
  document.querySelector("#planTokenUsage").textContent = detail.tokenUsage;
  document.querySelector("#planTokenRate").textContent = detail.tokenRate;
  document.querySelector("#planTokenBar").style.width = detail.tokenBar;
  document.querySelector("#planQaQuota").textContent = detail.qaQuota;
  document.querySelector("#planTokenQuota").textContent = detail.tokenQuota;

  renderPlanPills("#planExpertGroups", detail.expertGroups, "benefit-chip");
  renderPlanPills("#planAiModels", detail.aiModels, "benefit-chip model");
  renderPlanPills("#planUpgradeFrom", detail.upgradeFrom, "upgrade-pill");
  renderPlanPills("#planUpgradeTo", detail.upgradeTo, "upgrade-pill");
  renderPlanPills("#planUpgradeRules", detail.upgradeRules, "upgrade-pill rule");
}

function renderPlanSubscribers(planName, totalText) {
  const users = getPlanSubscriberRows(planName);
  currentSubscriberPlanName = planName;
  const total = totalText || users.length.toLocaleString();
  const list = document.querySelector("#planSubscribersList");
  document.querySelector("#planSubscribersTitle").textContent = "订阅用户列表";
  document.querySelector("#planSubscribersSubtitle").textContent = `查看 ${planName} 的订阅用户、周期、到期时间与用量。`;
  document.querySelector("#planSubscribersSummary").textContent = `共 ${total} 条，每页 20 条`;
  list.innerHTML = users.length
    ? `<div class="subscriber-page-header">
        <span>用户</span>
        <span>订阅类型</span>
        <span>订阅开始</span>
        <span>到期时间</span>
        <span>本月用量（问答 · Token）</span>
        <span>状态</span>
        <span>操作</span>
      </div>` + users.map((user) => {
      const usageText = user.limit ? `${user.usage.toLocaleString()}/${user.limit.toLocaleString()}` : "—";
      const tokenText = user.tokenUsage && user.tokenLimit ? `${user.tokenUsage}/${user.tokenLimit}` : "—";
      const isTokenExhausted = user.usageAlert === "Token 已耗尽";
      const isQaExhausted = user.usageAlert === "问答已耗尽";
      const progress = isTokenExhausted || isQaExhausted ? 100 : (user.limit ? Math.min(100, Math.round((user.usage / user.limit) * 100)) : 0);
      const tone = user.usageTone || (progress >= 95 ? "warn" : "");
      const isMuted = user.status === "已过期";
      return `
        <article class="subscriber-page-row ${tone ? `is-${tone}` : ""} ${isMuted ? "is-expired" : ""}">
          <div class="subscriber-user"><span class="member-avatar ${user.avatarClass}">${user.avatar}</span><div><strong>${user.name}</strong><small>${user.email}</small></div></div>
          <span>${user.type}</span>
          <span>${user.start}</span>
          <span>${user.expires}${user.expiresNote ? `<small class="expire-note">${user.expiresNote}</small>` : ""}</span>
          <div class="subscriber-page-usage">
            <strong>${progress}%</strong>
            <div class="usage-meter"><i style="width: ${progress}%"></i></div>
            <div class="usage-split">
              <span class="${isQaExhausted ? "is-exhausted" : ""}">问答 ${usageText}${isQaExhausted ? " 已耗尽" : ""}</span>
              <span class="${isTokenExhausted ? "is-exhausted" : ""}">Token ${tokenText}${isTokenExhausted ? " 已耗尽" : ""}</span>
            </div>
          </div>
          <span><span class="status ${user.statusClass}">${user.status}</span></span>
          <button class="mini-button" data-open-subscriber-detail="${user.email}" type="button">查看详情</button>
        </article>
      `;
    }).join("")
    : `<article class="subscriber-page-row empty-row">暂无订阅用户。</article>`;
}

function renderSubscriberDetail(userEmail) {
  const users = getPlanSubscriberRows(currentSubscriberPlanName);
  const user = users.find((item) => item.email === userEmail) || users[0];
  if (!user) return;

  const isTokenExhausted = user.usageAlert === "Token 已耗尽";
  const isQaExhausted = user.usageAlert === "问答已耗尽";
  const isFreePlan = currentSubscriberPlanName === "免费版";
  const usage = user.limit ? user.usage : 0;
  const limit = user.limit || 1000;
  const tokenDisplay = user.tokenUsage && user.tokenLimit ? `${user.tokenUsage} / ${user.tokenLimit}` : "— / —";
  const uidDate = user.start.replaceAll("/", "");
  const planText = isFreePlan ? "免费版" : `${currentSubscriberPlanName} · ${user.type}`;
  const alertTitle = isTokenExhausted
    ? "Token 额度已耗尽，本月问答服务已暂停"
    : isQaExhausted
      ? "问答次数已耗尽，本月问答服务已暂停"
      : user.status === "已过期"
        ? "订阅已过期，请联系用户续费或调整套餐"
        : user.expiresNote
          ? "订阅即将到期，建议提前发送续费提醒"
          : "用户订阅状态正常";
  const alertBody = isTokenExhausted
    ? `本月 Token 用量已达上限，问答次数仍有剩余（${usage.toLocaleString()} / ${limit.toLocaleString()} 次），服务已因 Token 耗尽而暂停。`
    : isQaExhausted
      ? `本月问答次数已达上限（${usage.toLocaleString()} / ${limit.toLocaleString()} 次），Token 仍有余量，建议赠送问答次数或升级套餐。`
      : user.status === "已过期"
        ? `该用户订阅已于 ${user.expires} 到期，目前无法继续使用套餐权益。`
        : user.expiresNote
          ? `该用户订阅将在 ${user.expiresNote} 到期，可提前发送续费通知。`
          : "该用户当前用量与订阅状态正常，可继续跟踪使用情况。";

  document.querySelector("#subscriberDetailAvatar").textContent = user.avatar;
  document.querySelector("#subscriberDetailAvatar").className = `member-avatar ${user.avatarClass}`;
  document.querySelector("#subscriberDetailName").textContent = user.name;
  document.querySelector("#subscriberDetailPlan").textContent = planText;
  document.querySelector("#subscriberDetailRisk").textContent = user.usageAlert || (user.expiresNote ? "即将到期" : "状态正常");
  document.querySelector("#subscriberDetailRisk").className = `status ${user.usageAlert ? "danger" : user.expiresNote ? "warn" : "ok"}`;
  document.querySelector("#subscriberDetailStatus").textContent = user.status;
  document.querySelector("#subscriberDetailStatus").className = `status ${user.statusClass}`;
  document.querySelector("#subscriberDetailMeta").textContent = `UID: U-${uidDate}-0214 · 注册 ${user.start} · 邮箱 ${user.email}`;

  document.querySelector("#subscriberMetricSpend").textContent = isFreePlan ? "¥ 0" : user.type === "年付" ? "¥ 999" : "¥ 990";
  document.querySelector("#subscriberMetricOrders").textContent = isFreePlan ? "免费订阅" : user.type === "年付" ? "共 3 笔订单" : "共 10 笔订单";
  document.querySelector("#subscriberMetricQa").textContent = `${usage.toLocaleString()} / ${limit.toLocaleString()} 次`;
  document.querySelector("#subscriberMetricQaNote").textContent = isQaExhausted ? "已耗尽" : `剩余 ${(limit - usage).toLocaleString()} 次`;
  document.querySelector("#subscriberMetricToken").textContent = tokenDisplay;
  document.querySelector("#subscriberMetricTokenNote").textContent = isTokenExhausted ? "已耗尽 · 服务暂停原因" : "Token 使用正常";
  document.querySelector("#subscriberMetricDays").textContent = user.status === "已过期" ? "已停止" : "313 天";
  document.querySelector("#subscriberMetricSince").textContent = `自 ${user.start} 起`;

  document.querySelector("#subscriberCurrentPlan").textContent = planText;
  document.querySelector("#subscriberCurrentPrice").textContent = isFreePlan ? "免费" : user.type === "年付" ? "¥999 / 年" : "¥99 / 月";
  document.querySelector("#subscriberCurrentRange").textContent = isFreePlan ? "—" : `${user.start} - ${user.expires}`;
  document.querySelector("#subscriberCurrentRenew").textContent = isFreePlan ? "无需续费" : user.status === "已过期" ? "已关闭" : "已开启";
  document.querySelector("#subscriberCurrentOrder").textContent = isFreePlan ? "—" : `ORD-${uidDate.slice(0, 4)}-${uidDate.slice(4, 8)}`;
  document.querySelector("#subscriberCurrentPay").textContent = isFreePlan ? "免费开通" : "微信支付";

  document.querySelector("#subscriberOrderRows").innerHTML = [
    ["ORD-2026-060188", "¥99", "2026/06/01", "已支付", "ok"],
    ["ORD-2026-050231", "¥99", "2026/05/01", "已支付", "ok"],
    ["ORD-2026-040187", "¥99", "2026/04/01", "已支付", "ok"],
    ["REF-2025-110044", "-¥99", "2025/11/08", "已退款", "danger"],
  ].map(([order, amount, time, status, cls]) => `<tr><td>${order}<br><small>${planText}</small></td><td>${amount}</td><td>${time}</td><td><span class="status ${cls}">${status}</span></td></tr>`).join("");

  document.querySelector("#subscriberLogs").innerHTML = [
    [user.usageAlert || "管理员查看用户详情", alertBody, "系统", "2026/06/09 10:20", user.usageAlert ? "danger" : "info"],
    ["Token 用量预警通知已发送", `Token 用量达到 80%，当前 ${tokenDisplay}，自动发送预警邮件。`, "系统", "2026/06/08 16:20", "warn"],
    ["管理员查看用户详情", "admin@winwise.io 查看了该用户订阅详情，备注建议升级套餐。", "管理员", "2026/05/28 10:15", "info"],
    ["完成月付续费", "用户通过微信支付完成续费，订阅延续至下一周期。", "用户", "2026/06/01 09:07", "ok"],
    ["注册并首次订阅", "用户注册账号并订阅当前套餐，来源：微信公众号推广链接。", "用户", `${user.start} 14:30`, "muted"],
  ].map(([title, body, role, time, tone]) => `<article class="${tone}"><strong>${title}<span>${role}</span></strong><p>${body}</p><small>${time}</small></article>`).join("");
}

function getKnowledgeDocRows(name) {
  return [...document.querySelectorAll(`.kb-doc-row[data-parent-kb="${name}"]`)];
}

function getKnowledgeDocPanel(name) {
  return document.querySelector(`.kb-row[data-kb-name="${name}"]`)?.closest(".kb-card")?.querySelector("[data-doc-panel]");
}

function getParentKnowledgeRow(docRow) {
  const cardRow = docRow?.closest(".kb-card")?.querySelector(".kb-row");
  if (cardRow) return cardRow;

  let row = docRow?.previousElementSibling;
  while (row && !row.classList.contains("kb-row")) {
    row = row.previousElementSibling;
  }
  return row;
}

function selectSettingsTab(tab) {
  const activeItem = document.querySelector(`[data-settings-tab="${tab}"]`);
  document.querySelectorAll("[data-settings-tab]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.settingsTab === tab);
  });
  document.querySelectorAll(".settings-detail").forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `settings-${tab}`);
  });
  if (activeItem) pageTitle.textContent = activeItem.textContent.trim();
}

function selectUsersTab(tab) {
  const activeItem = document.querySelector(`[data-users-tab="${tab}"]`);
  document.querySelectorAll("[data-users-tab]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.usersTab === tab);
  });
  document.querySelectorAll(".user-detail").forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `users-${tab}`);
  });
  if (activeItem) pageTitle.textContent = activeItem.textContent.trim();
}

function clearSettingsTabSelection() {
  document.querySelectorAll("[data-settings-tab]").forEach((item) => item.classList.remove("is-active"));
}

function clearUsersTabSelection() {
  document.querySelectorAll("[data-users-tab]").forEach((item) => item.classList.remove("is-active"));
}

function switchPage(pageId) {
  const targetPage = document.querySelector(`#${pageId}`);
  if (!targetPage) return;
  const activeNavPage = navPageMap[pageId] || pageId;

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("is-active", page === targetPage);
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.page === activeNavPage);
  });

  topbar.classList.toggle("is-hidden", ["planDetail", "planSubscribers", "subscriberDetail"].includes(pageId));

  if (pageId !== "settings") {
    clearSettingsTabSelection();
  }

  if (pageId !== "users") {
    clearUsersTabSelection();
  }

  pageTitle.textContent = pageNames[pageId] || "控制台";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function applyTableFilter(input) {
  const target = document.querySelector(`#${input.dataset.filter}`);
  const keyword = input.value.trim().toLowerCase();

  if (input.dataset.filter === "kbList") {
    target.querySelectorAll("[data-kb-card]").forEach((card) => {
      card.hidden = !card.textContent.toLowerCase().includes(keyword);
    });
    return;
  }

  const table = target;
  table.querySelectorAll("tbody tr").forEach((row) => {
    if (table.id === "kbTable" && row.classList.contains("kb-doc-row")) {
      const parentRow = getParentKnowledgeRow(row);
      row.hidden = parentRow?.hidden || row.classList.contains("is-hidden-row");
      return;
    }

    const matchesKeyword = row.textContent.toLowerCase().includes(keyword);
    const matchesKnowledgeBase =
      table.id !== "docTable" || !docKbFilter.value || row.children[1].textContent === docKbFilter.value;

    row.hidden = !matchesKeyword || !matchesKnowledgeBase;

    if (table.id === "kbTable" && row.classList.contains("kb-row")) {
      getKnowledgeDocRows(row.dataset.kbName).forEach((docRow) => {
        docRow.hidden = row.hidden || docRow.classList.contains("is-hidden-row");
      });
    }
  });
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginView.classList.add("is-hidden");
  adminView.classList.remove("is-hidden");
  showToast("登录成功，欢迎进入管理员端");
});

userAvatarButton.addEventListener("click", (event) => {
  event.stopPropagation();
  userMenu.classList.toggle("is-hidden");
});

logoutButton.addEventListener("click", () => {
  userMenu.classList.add("is-hidden");
  adminView.classList.add("is-hidden");
  loginView.classList.remove("is-hidden");
  showToast("已退出登录");
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".user-menu-wrap")) {
    userMenu.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-page], [data-page-link]").forEach((control) => {
  control.addEventListener("click", () => {
    if (control.matches("[data-settings-toggle]")) return;
    if (control.matches("[data-users-toggle]")) return;
    switchPage(control.dataset.page || control.dataset.pageLink);
    userMenu.classList.add("is-hidden");
  });
});

settingsToggle.addEventListener("click", () => {
  const shouldExpand = settingsSubmenu.classList.contains("is-collapsed");
  settingsSubmenu.classList.toggle("is-collapsed", !shouldExpand);
  settingsToggle.setAttribute("aria-expanded", String(shouldExpand));
  if (shouldExpand) {
    switchPage("settings");
    selectSettingsTab("ai");
  }
  userMenu.classList.add("is-hidden");
});

document.querySelectorAll("[data-settings-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    switchPage("settings");
    selectSettingsTab(button.dataset.settingsTab);
  });
});

usersToggle.addEventListener("click", () => {
  const shouldExpand = usersSubmenu.classList.contains("is-collapsed");
  usersSubmenu.classList.toggle("is-collapsed", !shouldExpand);
  usersToggle.setAttribute("aria-expanded", String(shouldExpand));
  if (shouldExpand) {
    switchPage("users");
    selectUsersTab("team");
  }
  userMenu.classList.add("is-hidden");
});

document.querySelectorAll("[data-users-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    switchPage("users");
    selectUsersTab(button.dataset.usersTab);
  });
});

document.querySelectorAll(".temperature-field").forEach((input) => {
  input.addEventListener("input", (event) => {
    if (Number(event.target.value) < 0) {
      event.target.value = 0;
    }
  });
});

document.querySelectorAll("[data-open-model]").forEach((button) => {
  button.addEventListener("click", () => {
    modelModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-model]").forEach((button) => {
  button.addEventListener("click", () => {
    modelModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("模型已添加");
    }
  });
});

modelModal.addEventListener("click", (event) => {
  if (event.target === modelModal) {
    modelModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-edit-model]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest(".model-row");
    const name = row.querySelector("h3").textContent;
    const detail = row.querySelector("p").textContent;
    const [provider = "", purpose = ""] = detail.split("·").map((item) => item.trim());

    document.querySelector("#editModelName").value = name;
    document.querySelector("#editModelProvider").value = provider;
    document.querySelector("#editModelPurpose").value = purpose.replace("Temperature 0.7", "").trim() || "备用模型";
    document.querySelector("#editModelStatus").value = row.querySelector(".status").textContent.trim();
    editModelModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-delete-model]").forEach((button) => {
  button.addEventListener("click", () => {
    showToast("停用模型已删除");
  });
});

document.querySelectorAll("[data-close-edit-model]").forEach((button) => {
  button.addEventListener("click", () => {
    editModelModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("模型配置已保存");
    }
  });
});

editModelModal.addEventListener("click", (event) => {
  if (event.target === editModelModal) {
    editModelModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-role]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const title = roleModal.querySelector("#roleModalTitle");
    if (row) {
      const cells = row.children;
      title.textContent = button.textContent.trim() === "查看" ? "查看角色" : `编辑角色 · ${cells[0].textContent.trim()}`;
      roleModal.querySelector("input").value = cells[0].textContent.trim();
      roleModal.querySelector("textarea").value = cells[2].textContent.trim();
    } else {
      title.textContent = "新增角色";
      roleModal.querySelector("input").value = "";
      roleModal.querySelector("textarea").value = "";
    }
    roleModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-role]").forEach((button) => {
  button.addEventListener("click", () => {
    roleModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("角色配置已保存");
    }
  });
});

roleModal.addEventListener("click", (event) => {
  if (event.target === roleModal) {
    roleModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-user]").forEach((button) => {
  button.addEventListener("click", () => {
    userModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-user]").forEach((button) => {
  button.addEventListener("click", () => {
    userModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("用户已添加");
    }
  });
});

userModal.addEventListener("click", (event) => {
  if (event.target === userModal) {
    userModal.classList.add("is-hidden");
  }
});

document.querySelector("#userRoleSelect").addEventListener("change", (event) => {
  document.querySelector("#rolePermissionText").textContent = rolePermissions[event.target.value];
});

document.querySelectorAll("[data-open-edit-user]").forEach((button) => {
  button.addEventListener("click", () => {
    const cells = button.closest("tr").children;
    const roleValue = roleValues[cells[2].textContent] || "expert";
    const statusText = cells[4].textContent.trim() || button.dataset.userStatus || "启用";

    document.querySelector("#editUserName").value = cells[0].textContent;
    document.querySelector("#editUserEmail").value = cells[1].textContent;
    document.querySelector("#editUserRoleSelect").value = roleValue;
    document.querySelector("#editUserStatus").value = statusText;
    document.querySelector("#editRolePermissionText").textContent = rolePermissions[roleValue];
    document.querySelector("#editUserLastLogin").textContent = statusText === "停用" ? "账号已停用" : "10 分钟前";
    editUserModal.classList.remove("is-hidden");
  });
});

document.querySelector("#editUserRoleSelect").addEventListener("change", (event) => {
  document.querySelector("#editRolePermissionText").textContent = rolePermissions[event.target.value];
});

document.querySelectorAll("[data-close-edit-user]").forEach((button) => {
  button.addEventListener("click", () => {
    editUserModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("用户修改已保存");
    }
  });
});

editUserModal.addEventListener("click", (event) => {
  if (event.target === editUserModal) {
    editUserModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-delete-user]").forEach((button) => {
  button.addEventListener("click", () => {
    showToast("用户已删除");
  });
});

function openCustomerModal(row) {
  const cells = row.children;
  const customerName = cells[0].querySelector("strong")?.textContent.trim() || cells[0].textContent.trim();
  const avatar = cells[0].querySelector(".member-avatar")?.textContent.trim() || "C";
  const contact = cells[1].textContent.trim();
  const plan = cells[2].textContent.trim();
  const expire = cells[3].textContent.trim();
  const usage = cells[4].textContent.trim();
  const registerDate = cells[5].textContent.trim();
  const status = cells[6].textContent.trim();

  document.querySelector("#customerAvatar").textContent = avatar;
  document.querySelector("#customerModalTitle").textContent = `${customerName} · ${contact}`;
  document.querySelector("#customerModalEmail").textContent = customerName === "CrossBorder Co." ? "admin@crossborder.io" : contact;
  document.querySelector("#customerPlanBadge").innerHTML = `<span class="${plan === "Business" ? "skill-chip" : "soft-label"}">${plan}</span>`;
  document.querySelector("#customerExpire").textContent = expire;
  document.querySelector("#customerStatusBadge").innerHTML = `<span class="status ${status === "正常" ? "ok" : "pending"}">${status}</span>`;
  document.querySelector("#customerPlanSelect").value = plan === "免费" ? "免费" : plan;
  document.querySelector("#customerUsageCount").textContent = usage;
  document.querySelector("#customerRegisterDate").textContent = registerDate;
  customerModal.classList.remove("is-hidden");
}

document.querySelectorAll("[data-open-customer]").forEach((button) => {
  button.addEventListener("click", () => openCustomerModal(button.closest("tr")));
});

document.querySelectorAll("[data-close-customer]").forEach((button) => {
  button.addEventListener("click", () => {
    customerModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("客户信息已保存");
    }
  });
});

customerModal.addEventListener("click", (event) => {
  if (event.target === customerModal) {
    customerModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    planModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    planModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("套餐草稿已保存");
    }
  });
});

planModal.addEventListener("click", (event) => {
  if (event.target === planModal) {
    planModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-edit-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    const cells = button.closest("tr").children;
    const planName = cells[0].querySelector("strong")?.textContent.trim() || cells[0].textContent.trim();
    document.querySelector("#editPlanName").value = planName;
    document.querySelector("#editPlanPrice").value = cells[3].textContent.trim();
    document.querySelector("#editPlanKb").value = cells[5].textContent.trim();
    document.querySelector("#editPlanSkill").value = cells[6].textContent.trim();
    document.querySelector("#editPlanStatus").value = cells[10].textContent.trim();
    syncPlanModelAccess(planName);
    editPlanModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-edit-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    editPlanModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("套餐修改已保存");
    }
  });
});

editPlanModal.addEventListener("click", (event) => {
  if (event.target === editPlanModal) {
    editPlanModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-plan-detail]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const planName = row.children[0].querySelector("strong")?.textContent.trim() || row.children[0].textContent.trim();
    renderPlanDetail(planName);
    switchPage("planDetail");
  });
});

document.querySelector("[data-plan-detail-back]")?.addEventListener("click", () => {
  switchPage("plans");
});

document.querySelectorAll("[data-open-plan-subscribers]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const planName = row.children[0].querySelector("strong")?.textContent.trim() || row.children[0].textContent.trim();
    renderPlanSubscribers(planName, button.textContent.trim());
    switchPage("planSubscribers");
  });
});

document.querySelector("[data-plan-subscribers-back]")?.addEventListener("click", () => {
  switchPage("plans");
});

document.querySelector("#planSubscribersList")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-open-subscriber-detail]");
  if (!button) return;
  renderSubscriberDetail(button.dataset.openSubscriberDetail);
  switchPage("subscriberDetail");
});

document.querySelector("[data-subscriber-detail-back]")?.addEventListener("click", () => {
  switchPage("planSubscribers");
});

document.querySelector("[data-open-current-plan-subscribers]")?.addEventListener("click", () => {
  const detail = planDetails[currentPlanDetailName] || planDetails["专业版"];
  renderPlanSubscribers(currentPlanDetailName, detail.subscribers);
  switchPage("planSubscribers");
});

document.querySelector("[data-open-current-plan-subscribers]")?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  const detail = planDetails[currentPlanDetailName] || planDetails["专业版"];
  renderPlanSubscribers(currentPlanDetailName, detail.subscribers);
  switchPage("planSubscribers");
});

document.querySelectorAll("[data-open-plan-users]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const planName = row.children[0].querySelector("strong")?.textContent.trim() || row.children[0].textContent.trim();
    const users = planUserData[planName] || [];
    const tbody = document.querySelector("#planUsersTableBody");
    document.querySelector("#planUsersTitle").textContent = `${planName}订阅用户`;
    document.querySelector("#planUsersSubtitle").textContent = `查看订阅 ${planName} 的用户表。`;
    document.querySelector("#planUsersSummary").textContent = `共 ${users.length || 0} 条，每页 20 条`;
    tbody.innerHTML = users.length
      ? users.map((user) => {
        const progress = user.limit ? Math.min(100, Math.round((user.usage / user.limit) * 100)) : 0;
        const usageText = user.limit ? `问答 ${user.usage.toLocaleString()} / ${user.limit.toLocaleString()}` : "—";
        return `
          <tr>
            <td><div class="subscriber-user"><span class="member-avatar ${user.avatarClass}">${user.avatar}</span><div><strong>${user.name}</strong><small>${user.email}</small></div></div></td>
            <td>${user.type}</td>
            <td>${user.start}</td>
            <td>${user.expires}</td>
            <td><div class="usage-meter"><span>${usageText}</span><i style="width: ${progress}%"></i></div></td>
            <td><span class="status ${user.statusClass}">${user.status}</span></td>
            <td><button class="mini-button" type="button">查看详情</button></td>
          </tr>
        `;
      }).join("")
      : `<tr><td colspan="7">暂无订阅用户。</td></tr>`;
    planUsersModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-plan-users]").forEach((button) => {
  button.addEventListener("click", () => {
    planUsersModal.classList.add("is-hidden");
  });
});

planUsersModal.addEventListener("click", (event) => {
  if (event.target === planUsersModal) {
    planUsersModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-delete-confirm]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#deletePlanName").textContent = button.closest("tr").children[0].textContent;
    deleteConfirmModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-delete-confirm]").forEach((button) => {
  button.addEventListener("click", () => {
    deleteConfirmModal.classList.add("is-hidden");
    if (button.classList.contains("danger-button")) {
      showToast("套餐已删除");
    }
  });
});

deleteConfirmModal.addEventListener("click", (event) => {
  if (event.target === deleteConfirmModal) {
    deleteConfirmModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-expert]").forEach((button) => {
  button.addEventListener("click", () => {
    openExpertModal();
  });
});

document.querySelectorAll("[data-open-edit-expert]").forEach((button) => {
  button.addEventListener("click", () => {
    openExpertModal(button.closest("tr"));
  });
});

let currentExpertRow = null;
const maxGuideQuestions = 3;

const expertDetails = {
  店铺运营顾问: {
    intro: "精通亚马逊 A9 算法和店铺日常运营，提供全链路运营策略支持。",
    tags: "账号健康, BSR 优化, FBA 库存管理",
    questions: ["我的店铺 IPI 分数持续下降，怎么改善？", "如何制定旺季备货计划以避免断货？", "店铺被警告侵权，第一步应该怎么处理？"],
  },
  选品分析专家: {
    intro: "结合类目趋势、销量结构和利润空间，帮助团队筛选高潜力商品。",
    tags: "选品机会, 竞品分析, 利润测算",
    questions: ["哪些细分类目更适合新品切入？", "如何判断一个商品是否值得开发？", "竞品评价里有哪些机会点？"],
  },
  广告投放专家: {
    intro: "诊断广告结构、关键词表现和 ACOS 异常，输出可执行优化建议。",
    tags: "ACOS, 关键词, 预算分配",
    questions: ["广告 ACOS 突然升高该怎么排查？", "哪些关键词应该降价或否定？", "预算应该优先给哪些广告组？"],
  },
  "Listing 优化师": {
    intro: "优化标题、五点描述和转化素材，提升自然排名与页面转化。",
    tags: "标题优化, 五点描述, 转化率",
    questions: ["Listing 标题怎样兼顾关键词和可读性？", "五点描述应该突出哪些卖点？"],
  },
  合规法务顾问: {
    intro: "识别专利、商标和平台政策风险，辅助处理侵权预警与申诉准备。",
    tags: "专利检索, 商标风险, 合规申诉",
    questions: ["收到侵权警告后第一步做什么？", "如何判断产品是否有外观专利风险？"],
  },
  数据分析师: {
    intro: "解读运营报表和异常数据，定位增长瓶颈与风险指标。",
    tags: "报表解读, 异常定位, 指标复盘",
    questions: [],
  },
};

const skillMeta = {
  "广告 ACOS 诊断（运营诊断）": {
    title: "广告 ACOS 诊断",
    desc: "分析广告数据，诊断 ACOS 异常并给出降本建议，支持多轮追问。",
    kb: ["expert"],
  },
  "选品机会分析（数据分析）": {
    title: "选品机会分析",
    desc: "识别品类趋势、竞品差异和潜在利润空间，辅助新品开发。",
    kb: ["expert"],
  },
  "专利侵权规避（文档分析）": {
    title: "专利侵权规避",
    desc: "结合专利知识库识别侵权风险，生成规避建议和查询方向。",
    kb: ["patent", "expert"],
  },
  "数据报告解读（数据分析）": {
    title: "数据报告解读",
    desc: "读取运营数据报告，归纳异常指标、趋势变化和复盘建议。",
    kb: ["expert"],
  },
};

function setSelectValue(select, value) {
  if (!select) return;
  const option = [...select.options].find((item) => item.textContent.trim() === value || item.value === value);
  select.value = option?.value || "";
}

function renderExpertGroup(group) {
  const selectedGroup = Array.isArray(group) ? group[0] || "" : group || "";
  expertModal.querySelectorAll("#expertGroupPicker input").forEach((input) => {
    input.checked = input.value === selectedGroup;
  });
}

function clearExpertModal() {
  expertModal.querySelector("#expertNameInput").value = "";
  expertModal.querySelector("#expertIntroInput").value = "";
  expertModal.querySelector("#expertTagsInput").value = "";
  expertModal.querySelector("#expertCtaInput").value = "";
  expertModal.querySelector("#expertCategoryInput").value = "";
  expertModal.querySelector("#expertStatusInput").value = "";
  renderExpertGroup("");
  renderExpertSkillChips([]);
  renderExpertKbChips([]);
  renderGuideQuestions([]);
}

function openExpertModal(row) {
  clearExpertModal();
  const title = expertModal.querySelector("#expertModalTitle");
  const nameInput = expertModal.querySelector("#expertNameInput");
  currentExpertRow = row || null;

  if (!row) {
    title.textContent = "新建专家";
    expertModal.classList.remove("is-hidden");
    return;
  }

  const name = row.querySelector(".expert-name strong")?.textContent.trim() || "";
  const category = row.children[1]?.textContent.trim() || "";
  const expertGroup = row.children[2]?.querySelector(".soft-label")?.textContent.trim() || "";
  const skills = [...row.children[3]?.querySelectorAll(".skill-chip") || []].map((chip) => chip.textContent.trim());
  const knowledgeBases = [...row.children[4]?.querySelectorAll(".kb-chip") || []].map((chip) => chip.textContent.trim());
  const status = row.children[7]?.textContent.trim() || "";
  const detail = expertDetails[name] || {};

  title.textContent = `编辑专家 · ${name}`;
  nameInput.value = name;
  expertModal.querySelector("#expertIntroInput").value = detail.intro || "";
  expertModal.querySelector("#expertTagsInput").value = detail.tags || "";
  setSelectValue(expertModal.querySelector("#expertCategoryInput"), category);
  setSelectValue(expertModal.querySelector("#expertStatusInput"), status === "已上架" ? "上架（立即展示）" : status === "已下架" ? "下架" : status);
  renderExpertGroup(expertGroup);
  renderExpertSkillChips(skills);
  renderExpertKbChips(knowledgeBases);
  renderGuideQuestions(detail.questions || []);
  expertModal.classList.remove("is-hidden");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function getExpertFormData() {
  const statusValue = expertModal.querySelector("#expertStatusInput").value;
  const status = statusValue === "上架（立即展示）" ? "已上架" : statusValue === "下架" ? "已下架" : statusValue;
  const skillNames = [...expertModal.querySelectorAll("#expertSkillPicker .skill-chip")].map((chip) => chip.firstChild.textContent.trim());
  const knowledgeBases = [...expertModal.querySelectorAll("#expertKbPicker .kb-chip")].map((chip) => chip.firstChild.textContent.trim());
  const expertGroup = expertModal.querySelector("#expertGroupPicker input:checked")?.value || "";
  const questions = [...expertModal.querySelectorAll("#expertGuideList input")].map((input) => input.value.trim()).filter(Boolean).slice(0, maxGuideQuestions);

  return {
    name: expertModal.querySelector("#expertNameInput").value.trim(),
    category: expertModal.querySelector("#expertCategoryInput").value,
    intro: expertModal.querySelector("#expertIntroInput").value.trim(),
    tags: expertModal.querySelector("#expertTagsInput").value.trim(),
    expertGroup,
    skillNames,
    knowledgeBases,
    questions,
    status,
  };
}

function getExpertStatusClass(status) {
  if (status === "已上架") return "ok";
  if (status === "草稿") return "warn";
  return "pending";
}

function getExpertActions(status) {
  const mainAction = status === "已上架" ? "下架" : "上架";
  const deleteButton = status === "已上架" ? "" : '<button class="danger-button" type="button">删除</button>';
  return `<div class="action-group"><button class="mini-button" data-open-edit-expert type="button">编辑</button><button class="mini-button">${mainAction}</button>${deleteButton}</div>`;
}

function updateExpertRow(row, data) {
  row.children[0].querySelector("strong").textContent = data.name;
  row.children[1].textContent = data.category;
  row.children[2].innerHTML = `<div class="expert-group-tags">${data.expertGroup ? `<span class="soft-label">${escapeHtml(data.expertGroup)}</span>` : ""}</div>`;
  row.children[3].innerHTML = data.skillNames.map((name) => `<span class="skill-chip">${escapeHtml(name)}</span>`).join("");
  row.children[4].innerHTML = data.knowledgeBases.map((name) => `<span class="kb-chip">${escapeHtml(name)}</span>`).join("");
  row.children[5].textContent = data.questions.length;
  row.children[7].innerHTML = `<span class="status ${getExpertStatusClass(data.status)}">${escapeHtml(data.status)}</span>`;
  row.children[8].innerHTML = getExpertActions(data.status);
  row.querySelector("[data-open-edit-expert]")?.addEventListener("click", () => openExpertModal(row));
}

function createExpertRow(data) {
  const row = document.createElement("tr");
  row.innerHTML = `<td><div class="expert-name"><span class="expert-avatar blue"></span><strong>${escapeHtml(data.name)}</strong></div></td><td></td><td></td><td></td><td></td><td>${data.questions.length}</td><td>0</td><td></td><td></td>`;
  updateExpertRow(row, data);
  return row;
}

function saveExpertModal() {
  const data = getExpertFormData();
  if (!data.name || !data.category || !data.status) {
    showToast("请补充专家名称、分类和状态");
    return false;
  }
  if (data.skillNames.length < 1) {
    showToast("请至少绑定 1 个 Skill");
    return false;
  }
  if (data.knowledgeBases.length < 1) {
    showToast("请至少绑定 1 个知识库");
    return false;
  }

  expertDetails[data.name] = {
    intro: data.intro,
    tags: data.tags,
    questions: data.questions,
  };

  if (currentExpertRow) {
    updateExpertRow(currentExpertRow, data);
  } else {
    document.querySelector("#expertTable tbody").appendChild(createExpertRow(data));
  }
  return true;
}

function getSkillValueByTitle(title) {
  return Object.keys(skillMeta).find((item) => skillMeta[item].title === title || item.startsWith(title)) || "";
}

function renderExpertSkillChips(names) {
  const picker = expertModal.querySelector("#expertSkillPicker");
  const addButton = picker.querySelector("[data-add-expert-skill]");
  picker.querySelectorAll(".skill-chip").forEach((chip) => chip.remove());
  [...new Set(names.filter(Boolean))].forEach((name) => {
    const title = skillMeta[name]?.title || skillMeta[getSkillValueByTitle(name)]?.title || name;
    const chip = document.createElement("span");
    chip.className = "skill-chip removable";
    chip.innerHTML = `${title} <button type="button" data-remove-expert-skill>×</button>`;
    picker.insertBefore(chip, addButton);
  });
  renderExpertSkillPreview();
}

function renderExpertSkillPreview() {
  const preview = expertModal.querySelector("#expertSkillPreview");
  const names = [...expertModal.querySelectorAll("#expertSkillPicker .skill-chip")].map((chip) => chip.firstChild.textContent.trim());
  if (!names.length) {
    preview.classList.add("is-hidden");
    preview.innerHTML = "";
    return;
  }

  preview.classList.remove("is-hidden");
  preview.innerHTML = names.map((name) => {
    const meta = skillMeta[getSkillValueByTitle(name)];
    if (!meta) return "";
    return `<article class="skill-preview-item"><strong>${meta.title} <span class="status ok">启用</span></strong><p>${meta.desc}</p><small>已绑定知识库：${meta.kb.map((kbName) => `<span class="kb-chip">${kbName}</span>`).join("")}</small></article>`;
  }).join("");
}

function addExpertSkill() {
  const picker = expertModal.querySelector("#expertSkillPicker");
  if (picker.querySelector("select")) return;
  const select = document.createElement("select");
  select.innerHTML = `<option value="">选择 Skill</option>${Object.keys(skillMeta).map((name) => `<option>${name}</option>`).join("")}`;
  picker.insertBefore(select, picker.querySelector("[data-add-expert-skill]"));
  select.focus();
  select.addEventListener("change", () => {
    const current = [...picker.querySelectorAll(".skill-chip")].map((chip) => chip.firstChild.textContent.trim());
    const title = skillMeta[select.value]?.title;
    if (title && !current.includes(title)) {
      renderExpertSkillChips([...current, title]);
    }
    select.remove();
  });
}

function renderExpertKbChips(names) {
  const picker = expertModal.querySelector("#expertKbPicker");
  const addButton = picker.querySelector("[data-add-expert-kb]");
  picker.querySelectorAll(".kb-chip").forEach((chip) => chip.remove());
  [...new Set(names.filter(Boolean))].forEach((name) => {
    const chip = document.createElement("span");
    chip.className = "kb-chip removable";
    chip.innerHTML = `${name} <button type="button" data-remove-expert-kb>×</button>`;
    picker.insertBefore(chip, addButton);
  });
}

function addExpertKnowledgeBase() {
  const picker = expertModal.querySelector("#expertKbPicker");
  if (picker.querySelector("select")) return;
  const select = document.createElement("select");
  select.innerHTML = '<option value="">选择知识库</option><option>expert</option><option>faq</option><option>patent</option><option>ops_runbook</option>';
  picker.insertBefore(select, picker.querySelector("[data-add-expert-kb]"));
  select.focus();
  select.addEventListener("change", () => {
    const current = [...picker.querySelectorAll(".kb-chip")].map((chip) => chip.firstChild.textContent.trim());
    if (select.value && !current.includes(select.value)) {
      renderExpertKbChips([...current, select.value]);
    }
    select.remove();
  });
}

function renderGuideQuestions(questions) {
  const list = expertModal.querySelector("#expertGuideList");
  list.innerHTML = "";
  questions.slice(0, maxGuideQuestions).forEach((question) => addGuideQuestion(question));
  updateGuideQuestionButton();
}

function addGuideQuestion(value = "") {
  const list = expertModal.querySelector("#expertGuideList");
  if (list.querySelectorAll("article").length >= maxGuideQuestions) {
    showToast(`最多添加 ${maxGuideQuestions} 个引导问题`);
    updateGuideQuestionButton();
    return;
  }
  const item = document.createElement("article");
  item.innerHTML = `<input value="${value.replace(/"/g, "&quot;")}" placeholder="输入引导问题" /><button type="button" data-remove-guide-question>×</button>`;
  list.appendChild(item);
  item.querySelector("input").focus();
  updateGuideQuestionButton();
}

function updateGuideQuestionButton() {
  const button = expertModal.querySelector("[data-add-guide-question]");
  const count = expertModal.querySelectorAll("#expertGuideList article").length;
  button.disabled = count >= maxGuideQuestions;
  button.textContent = count >= maxGuideQuestions ? `最多 ${maxGuideQuestions} 个引导问题` : "+ 添加引导问题";
}

expertModal.querySelector("[data-add-expert-skill]")?.addEventListener("click", addExpertSkill);

expertModal.querySelector("[data-add-expert-kb]")?.addEventListener("click", addExpertKnowledgeBase);

expertModal.querySelector("[data-add-guide-question]")?.addEventListener("click", () => addGuideQuestion());

expertModal.addEventListener("click", (event) => {
  if (event.target.matches("[data-remove-expert-kb]")) {
    event.target.closest(".kb-chip")?.remove();
  }
  if (event.target.matches("[data-remove-expert-skill]")) {
    event.target.closest(".skill-chip")?.remove();
    renderExpertSkillPreview();
  }
  if (event.target.matches("[data-remove-guide-question]")) {
    event.target.closest("article")?.remove();
    updateGuideQuestionButton();
  }
});

document.querySelectorAll("[data-close-expert]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("primary-button") && !saveExpertModal()) {
      return;
    }
    expertModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("专家配置已保存");
    }
  });
});

expertModal?.addEventListener("click", (event) => {
  if (event.target === expertModal) {
    expertModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-issue]").forEach((button) => {
  button.addEventListener("click", () => {
    issueModals[button.dataset.openIssue]?.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-issue]").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal-backdrop");
    modal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("待处理事项已更新");
    }
  });
});

Object.values(issueModals).forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("is-hidden");
    }
  });
});

document.querySelectorAll("[data-open-knowledge]").forEach((button) => {
  button.addEventListener("click", () => {
    knowledgeModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-knowledge]").forEach((button) => {
  button.addEventListener("click", () => {
    knowledgeModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("知识库已创建，状态为待启用");
    }
  });
});

knowledgeModal.addEventListener("click", (event) => {
  if (event.target === knowledgeModal) {
    knowledgeModal.classList.add("is-hidden");
  }
});

let editingKnowledgeBase = null;

function openEditKnowledgeBase(row) {
  editingKnowledgeBase = row;
  document.querySelector("#editKbName").value = row?.dataset.kbName || "";
  document.querySelector("#editKbDescription").value = row?.querySelector(".kb-card-main p")?.textContent.trim() || "";
  editKnowledgeModal.classList.remove("is-hidden");
}

document.querySelectorAll("[data-open-edit-kb]").forEach((button) => {
  button.addEventListener("click", () => openEditKnowledgeBase(button.closest(".kb-row")));
});

document.querySelectorAll("[data-close-edit-kb]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("primary-button") && editingKnowledgeBase) {
      const nextName = document.querySelector("#editKbName").value.trim();
      const nextDescription = document.querySelector("#editKbDescription").value.trim();
      if (nextName) {
        const oldName = editingKnowledgeBase.dataset.kbName;
        editingKnowledgeBase.dataset.kbName = nextName;
        editingKnowledgeBase.querySelector(".kb-card-title strong").textContent = nextName;
        editingKnowledgeBase.querySelector("[data-toggle-kb]")?.setAttribute("aria-label", `展开 ${nextName} 文档`);
        editingKnowledgeBase.closest(".kb-card")?.querySelectorAll(".kb-doc-row").forEach((docRow) => {
          if (docRow.dataset.parentKb === oldName) docRow.dataset.parentKb = nextName;
        });
        uploadModal.querySelectorAll("select option").forEach((option) => {
          if (option.value === oldName || option.textContent.trim() === oldName) {
            option.value = nextName;
            option.textContent = nextName;
          }
        });
      }
      if (nextDescription) {
        editingKnowledgeBase.querySelector(".kb-card-main p").textContent = nextDescription;
      }
      showToast("知识库信息已保存");
    }
    editKnowledgeModal.classList.add("is-hidden");
  });
});

editKnowledgeModal.addEventListener("click", (event) => {
  if (event.target === editKnowledgeModal) {
    editKnowledgeModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-toggle-kb]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest(".kb-row");
    const card = row?.closest(".kb-card");
    const docPanel = card?.querySelector("[data-doc-panel]");
    const shouldHide = !docPanel?.classList.contains("is-hidden-row");
    docPanel?.classList.toggle("is-hidden-row", shouldHide);
    card?.classList.toggle("is-expanded", !shouldHide);
    button.textContent = shouldHide ? "›" : "⌄";
    button.setAttribute("aria-label", `${shouldHide ? "展开" : "收起"} ${row?.dataset.kbName || ""} 文档`);
  });
});

document.querySelectorAll("[data-open-upload]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest(".kb-row") || button.closest("tr");
    const knowledgeBaseName = row?.dataset.kbName || row?.children[0]?.textContent.trim();
    const targetSelect = uploadModal.querySelector("select");
    if (knowledgeBaseName && targetSelect) {
      targetSelect.value = knowledgeBaseName;
    }
    uploadModal.classList.remove("is-hidden");
  });
});

let pendingKnowledgeBase = null;

document.querySelectorAll("[data-open-disable-kb]").forEach((button) => {
  button.addEventListener("click", () => {
    pendingKnowledgeBase = button.closest(".kb-row");
    document.querySelector("#disableKbName").textContent = pendingKnowledgeBase?.dataset.kbName || "当前知识库";
    kbDisableConfirmModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-disable-kb]").forEach((button) => {
  button.addEventListener("click", () => {
    kbDisableConfirmModal.classList.add("is-hidden");
  });
});

document.querySelector("[data-confirm-disable-kb]")?.addEventListener("click", () => {
  if (pendingKnowledgeBase) {
    const disabledRow = pendingKnowledgeBase;
    const status = pendingKnowledgeBase.querySelector(".status");
    const actionGroup = pendingKnowledgeBase.querySelector(".action-group");
    status.textContent = "已停用";
    status.className = "status pending";
    actionGroup.innerHTML = '<button class="mini-button" data-open-edit-kb>编辑</button><button class="mini-button" data-open-upload>上传文档</button><button class="mini-button">启用</button><button class="danger-button" data-open-delete-kb>删除</button>';
    actionGroup.querySelector("[data-open-edit-kb]").addEventListener("click", () => openEditKnowledgeBase(disabledRow));
    actionGroup.querySelector("[data-open-upload]").addEventListener("click", () => {
      const targetSelect = uploadModal.querySelector("select");
      if (targetSelect) targetSelect.value = disabledRow.dataset.kbName;
      uploadModal.classList.remove("is-hidden");
    });
    actionGroup.querySelector("[data-open-delete-kb]").addEventListener("click", () => openDeleteKnowledgeBase(disabledRow));
    showToast(`${disabledRow.dataset.kbName} 已停用`);
  }
  kbDisableConfirmModal.classList.add("is-hidden");
});

function openDeleteKnowledgeBase(row) {
  const statusText = row?.querySelector(".status")?.textContent.trim();
  if (statusText === "生效中" || statusText === "启用") {
    showToast("启用状态的知识库需要先停用后才能删除");
    return;
  }
  pendingKnowledgeBase = row;
  document.querySelector("#deleteKbName").textContent = row?.dataset.kbName || "当前知识库";
  kbDeleteConfirmModal.classList.remove("is-hidden");
}

document.querySelectorAll("[data-open-delete-kb]").forEach((button) => {
  button.addEventListener("click", () => openDeleteKnowledgeBase(button.closest(".kb-row")));
});

document.querySelectorAll("[data-close-delete-kb]").forEach((button) => {
  button.addEventListener("click", () => {
    kbDeleteConfirmModal.classList.add("is-hidden");
  });
});

document.querySelector("[data-confirm-delete-kb]")?.addEventListener("click", () => {
  if (pendingKnowledgeBase) {
    const name = pendingKnowledgeBase.dataset.kbName;
    pendingKnowledgeBase.closest(".kb-card")?.remove();
    showToast(`${name} 已删除`);
  }
  kbDeleteConfirmModal.classList.add("is-hidden");
});

[kbDisableConfirmModal, kbDeleteConfirmModal].forEach((modal) => {
  modal?.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.add("is-hidden");
    }
  });
});

document.querySelectorAll("[data-close-upload]").forEach((button) => {
  button.addEventListener("click", () => {
    uploadModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("文档已加入上传队列");
    }
  });
});

uploadModal.addEventListener("click", (event) => {
  if (event.target === uploadModal) {
    uploadModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-skill]").forEach((button) => {
  button.addEventListener("click", () => {
    skillModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-skill]").forEach((button) => {
  button.addEventListener("click", () => {
    skillModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("Skill 已上传");
    }
  });
});

skillModal.addEventListener("click", (event) => {
  if (event.target === skillModal) {
    skillModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-add-skill]").forEach((button) => {
  button.addEventListener("click", () => {
    addSkillModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-add-skill]").forEach((button) => {
  button.addEventListener("click", () => {
    addSkillModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("Skill 已保存");
    }
  });
});

addSkillModal.addEventListener("click", (event) => {
  if (event.target === addSkillModal) {
    addSkillModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-edit-skill]").forEach((button) => {
  button.addEventListener("click", () => {
    editSkillModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-edit-skill]").forEach((button) => {
  button.addEventListener("click", () => {
    editSkillModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("Skill 修改已保存");
    }
  });
});

editSkillModal.addEventListener("click", (event) => {
  if (event.target === editSkillModal) {
    editSkillModal.classList.add("is-hidden");
  }
});

document.querySelectorAll("[data-open-kb-doc]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest(".kb-doc-row");
    const cells = row.children;
    const docTitle = cells[0]?.querySelector("strong")?.textContent.trim() || "文档详情";
    const parentRow = getParentKnowledgeRow(row);
    const status = cells[2]?.querySelector(".status");
    document.querySelector("#docDetailTitle").textContent = docTitle;
    document.querySelector("#docDetailSubtitle").textContent = `查看 ${parentRow?.dataset.kbName || "expert"} 知识库中的文档处理详情`;
    document.querySelector("#docDetailKb").textContent = parentRow?.dataset.kbName || "expert";
    document.querySelector("#docDetailParse").textContent = status?.textContent === "同步中" ? "processing" : status?.textContent === "失败" ? "failed" : "ready";
    document.querySelector("#docDetailStatus").textContent = status?.textContent || "已同步";
    document.querySelector("#docDetailStatus").className = status?.className || "status ok";
    document.querySelector("#docDetailChunks").textContent = cells[3]?.textContent.replace("块", "").trim() || "0";
    document.querySelector("#docDetailUpdated").textContent = cells[1]?.textContent.trim().replace(/\s+/g, " ") || "2026/05/29 09:12";
    docDetailModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-open-doc-detail]").forEach((button) => {
  button.addEventListener("click", () => {
    const cells = button.closest("tr").children;
    document.querySelector("#docDetailTitle").textContent = cells[0].textContent;
    document.querySelector("#docDetailSubtitle").textContent = `查看 ${cells[1].textContent} 知识库中的文档处理详情`;
    document.querySelector("#docDetailKb").textContent = cells[1].textContent;
    document.querySelector("#docDetailParse").textContent = cells[2].textContent;
    document.querySelector("#docDetailStatus").textContent = cells[3].textContent;
    document.querySelector("#docDetailStatus").className = cells[3].querySelector(".status")?.className || "status";
    document.querySelector("#docDetailChunks").textContent = cells[4].textContent;
    document.querySelector("#docDetailUpdated").textContent = cells[5].textContent;
    docDetailModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-doc-detail]").forEach((button) => {
  button.addEventListener("click", () => {
    docDetailModal.classList.add("is-hidden");
  });
});

document.querySelectorAll("[data-download-doc]").forEach((button) => {
  button.addEventListener("click", () => {
    const docRowTitle = button.closest(".kb-doc-row")?.querySelector(".kb-doc-title strong")?.textContent.trim();
    const articleTitle = button.closest("article")?.querySelector("h3")?.childNodes[0]?.textContent.trim();
    const tableTitle = button.closest("tr")?.children[0]?.textContent;
    const title = docRowTitle || articleTitle || tableTitle || "文档";
    showToast(`${title} 已开始下载`);
  });
});

docDetailModal.addEventListener("click", (event) => {
  if (event.target === docDetailModal) {
    docDetailModal.classList.add("is-hidden");
  }
});

document.querySelector("#fileInput").addEventListener("change", (event) => {
  const count = event.target.files.length;
  document.querySelector("#fileLabel").textContent = count ? `已选择 ${count} 个文件` : "选择或拖入文档";
});

document.querySelectorAll("[data-filter]").forEach((input) => {
  input.addEventListener("input", () => applyTableFilter(input));
});

docKbFilter.addEventListener("change", () => {
  const docSearchInput = document.querySelector('[data-filter="docTable"]');
  if (docSearchInput) {
    applyTableFilter(docSearchInput);
  }
});
