const loginView = document.querySelector("#loginView");
const adminView = document.querySelector("#adminView");
const loginForm = document.querySelector("#loginForm");
const logoutButton = document.querySelector("#logoutButton");
const userAvatarButton = document.querySelector("#userAvatarButton");
const userMenu = document.querySelector("#userMenu");
const pageTitle = document.querySelector("#pageTitle");
const toast = document.querySelector("#toast");
const settingsToggle = document.querySelector("[data-settings-toggle]");
const settingsSubmenu = document.querySelector(".settings-submenu");
const usersToggle = document.querySelector("[data-users-toggle]");
const usersSubmenu = document.querySelector(".users-submenu");
const docKbFilter = document.querySelector("#docKbFilter");
const uploadModal = document.querySelector("#uploadModal");
const userModal = document.querySelector("#userModal");
const editUserModal = document.querySelector("#editUserModal");
const customerModal = document.querySelector("#customerModal");
const planModal = document.querySelector("#planModal");
const editPlanModal = document.querySelector("#editPlanModal");
const deleteConfirmModal = document.querySelector("#deleteConfirmModal");
const kbDisableConfirmModal = document.querySelector("#kbDisableConfirmModal");
const kbDeleteConfirmModal = document.querySelector("#kbDeleteConfirmModal");
const modelModal = document.querySelector("#modelModal");
const editModelModal = document.querySelector("#editModelModal");
const expertModal = document.querySelector("#expertModal");
const knowledgeModal = document.querySelector("#knowledgeModal");
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
  settings: "系统设置",
  profile: "个人中心",
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
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

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("is-active", page === targetPage);
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.page === pageId);
  });

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
    if (button.textContent.includes("保存草稿")) {
      showToast("套餐草稿已保存");
    } else if (button.classList.contains("primary-button")) {
      showToast("套餐已保存并上架");
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
    document.querySelector("#editPlanName").value = cells[0].querySelector("strong")?.textContent.trim() || cells[0].textContent.trim();
    document.querySelector("#editPlanPrice").value = cells[2].textContent.trim();
    document.querySelector("#editPlanKb").value = cells[4].textContent.trim();
    document.querySelector("#editPlanSkill").value = cells[5].textContent.trim();
    document.querySelector("#editPlanStatus").value = cells[8].textContent.trim();
    editPlanModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-edit-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    editPlanModal.classList.add("is-hidden");
    if (button.textContent.includes("保存草稿")) {
      showToast("套餐草稿已保存");
    } else if (button.classList.contains("primary-button")) {
      showToast("套餐修改已保存");
    }
  });
});

editPlanModal.addEventListener("click", (event) => {
  if (event.target === editPlanModal) {
    editPlanModal.classList.add("is-hidden");
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

function clearExpertModal() {
  expertModal.querySelector("#expertNameInput").value = "";
  expertModal.querySelector("#expertIntroInput").value = "";
  expertModal.querySelector("#expertTagsInput").value = "";
  expertModal.querySelector("#expertCtaInput").value = "";
  expertModal.querySelector("#expertCategoryInput").value = "";
  expertModal.querySelector("#expertStatusInput").value = "";
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
  const skills = [...row.children[2]?.querySelectorAll(".skill-chip") || []].map((chip) => chip.textContent.trim());
  const knowledgeBases = [...row.children[3]?.querySelectorAll(".kb-chip") || []].map((chip) => chip.textContent.trim());
  const status = row.children[6]?.textContent.trim() || "";
  const detail = expertDetails[name] || {};

  title.textContent = `编辑专家 · ${name}`;
  nameInput.value = name;
  expertModal.querySelector("#expertIntroInput").value = detail.intro || "";
  expertModal.querySelector("#expertTagsInput").value = detail.tags || "";
  setSelectValue(expertModal.querySelector("#expertCategoryInput"), category);
  setSelectValue(expertModal.querySelector("#expertStatusInput"), status === "已上架" ? "上架（立即展示）" : status === "已下架" ? "下架" : status);
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
  const questions = [...expertModal.querySelectorAll("#expertGuideList input")].map((input) => input.value.trim()).filter(Boolean).slice(0, maxGuideQuestions);

  return {
    name: expertModal.querySelector("#expertNameInput").value.trim(),
    category: expertModal.querySelector("#expertCategoryInput").value,
    intro: expertModal.querySelector("#expertIntroInput").value.trim(),
    tags: expertModal.querySelector("#expertTagsInput").value.trim(),
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
  row.children[2].innerHTML = data.skillNames.map((name) => `<span class="skill-chip">${escapeHtml(name)}</span>`).join("");
  row.children[3].innerHTML = data.knowledgeBases.map((name) => `<span class="kb-chip">${escapeHtml(name)}</span>`).join("");
  row.children[4].textContent = data.questions.length;
  row.children[6].innerHTML = `<span class="status ${getExpertStatusClass(data.status)}">${escapeHtml(data.status)}</span>`;
  row.children[7].innerHTML = getExpertActions(data.status);
  row.querySelector("[data-open-edit-expert]")?.addEventListener("click", () => openExpertModal(row));
}

function createExpertRow(data) {
  const row = document.createElement("tr");
  row.innerHTML = `<td><div class="expert-name"><span class="expert-avatar blue"></span><strong>${escapeHtml(data.name)}</strong></div></td><td></td><td></td><td></td><td>${data.questions.length}</td><td>0</td><td></td><td></td>`;
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
    actionGroup.innerHTML = '<button class="mini-button" data-open-upload>上传文档</button><button class="mini-button">启用</button><button class="danger-button" data-open-delete-kb>删除</button>';
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
