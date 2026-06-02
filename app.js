const loginView = document.querySelector("#loginView");
const adminView = document.querySelector("#adminView");
const loginForm = document.querySelector("#loginForm");
const logoutButton = document.querySelector("#logoutButton");
const userAvatarButton = document.querySelector("#userAvatarButton");
const userMenu = document.querySelector("#userMenu");
const pageTitle = document.querySelector("#pageTitle");
const toast = document.querySelector("#toast");
const settingsToggle = document.querySelector("[data-settings-toggle]");
const settingsSubmenu = document.querySelector(".nav-submenu");
const docKbFilter = document.querySelector("#docKbFilter");
const uploadModal = document.querySelector("#uploadModal");
const userModal = document.querySelector("#userModal");
const editUserModal = document.querySelector("#editUserModal");
const planModal = document.querySelector("#planModal");
const editPlanModal = document.querySelector("#editPlanModal");
const deleteConfirmModal = document.querySelector("#deleteConfirmModal");
const modelModal = document.querySelector("#modelModal");
const editModelModal = document.querySelector("#editModelModal");
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

function selectSettingsTab(tab) {
  document.querySelectorAll("[data-settings-tab]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.settingsTab === tab);
  });
  document.querySelectorAll(".settings-detail").forEach((panel) => {
    panel.classList.toggle("is-active", panel.id === `settings-${tab}`);
  });
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

  pageTitle.textContent = pageNames[pageId] || "控制台";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function applyTableFilter(input) {
  const table = document.querySelector(`#${input.dataset.filter}`);
  const keyword = input.value.trim().toLowerCase();

  table.querySelectorAll("tbody tr").forEach((row) => {
    const matchesKeyword = row.textContent.toLowerCase().includes(keyword);
    const matchesKnowledgeBase =
      table.id !== "docTable" || !docKbFilter.value || row.children[1].textContent === docKbFilter.value;

    row.hidden = !matchesKeyword || !matchesKnowledgeBase;
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
    selectSettingsTab(button.dataset.settingsTab);
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

document.querySelectorAll("[data-open-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    planModal.classList.remove("is-hidden");
  });
});

document.querySelectorAll("[data-close-plan]").forEach((button) => {
  button.addEventListener("click", () => {
    planModal.classList.add("is-hidden");
    if (button.classList.contains("primary-button")) {
      showToast("套餐已保存");
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
    document.querySelector("#editPlanName").value = cells[0].textContent;
    document.querySelector("#editPlanPrice").value = cells[1].textContent;
    document.querySelector("#editPlanKb").value = cells[2].textContent;
    document.querySelector("#editPlanSkill").value = cells[3].textContent;
    document.querySelector("#editPlanStatus").value = cells[4].textContent.trim();
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

document.querySelectorAll("[data-open-upload]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const knowledgeBaseName = row?.children[0]?.textContent.trim();
    const targetSelect = uploadModal.querySelector("select");
    if (knowledgeBaseName && targetSelect) {
      targetSelect.value = knowledgeBaseName;
    }
    uploadModal.classList.remove("is-hidden");
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
    const title = button.closest("tr").children[0].textContent;
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
