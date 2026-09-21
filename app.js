/* =====================================================
 * 信用卡申请页面交互逻辑
 * ===================================================== */

/* ---------- 下拉选项 ---------- */
var OPTIONS = {
  cardInUse:      ["民生银行", "工商银行", "中国银行", "农业银行", "邮政银行", "交通银行", "招商银行", "平安银行", "民生银行"],
  bankCardCount:  ["0张", "1张", "2张", "3-5张", "6-10张", "10张以上"],
  maxQuota:       ["5仟以下", "5仟到1万", "1万-3万", "3万-5万", "5万-8万", "8万-10万", "10万-15万", "15万-20万"],
  houseType:      ["无", "租房", "自购有按揭", "自建房屋", "与父母同住", "单位宿舍"],
  socialSecurity: ["有社保", "无社保"],
  carType:        ["无", "全款车", "按揭车"],
  loanStatus:     ["无", "1万以下", "1-3万", "3-5万", "5-10万", "10-20万"],
  loanCount:      ["无", "1笔", "2笔", "3-5笔", "5笔以上"],
  overdue:        ["无", "有"],
  lastApply:      ["从未申请", "3个月内", "3-6个月", "6-12个月", "1年以上"]
};

var financeData = {}; // 第二页选择结果

/* ---------- 工具 ---------- */
function $(sel) { return document.querySelector(sel); }
function $all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

/* =====================================================
 * 第一页：个人资料
 * ===================================================== */

var agreeChecked = false;

var agreeLabel = $(".agree-label");
agreeLabel.addEventListener("click", function () {
  agreeChecked = !agreeChecked;
  agreeLabel.classList.toggle("checked", agreeChecked);
  agreeLabel.classList.remove("agree-error");
});

/* ---------- 用户协议弹窗 ---------- */
var AGREEMENT_TEXT = [
  "《信用卡申请协议",
  "",
  "尊敬的客户：为了维护您的权益，请在签署本授权书前，仔细阅读本授权书各条款关注您的权利、义务。",
  "",
  "个人信息是以电子或者其他方式记录的与已识别或者可识别的自然人有关的各种信息，不包括匿名化处理后的信息。我司深知个人信息对您的重要性，会尽力维护您的个人信息安全，遵循合法、正当、必要、诚信原则开展个人信息处理活动，依法公开处理信息的规则，明示处理信息的目的、方式和范围，严格遵守法律法规、监管规定及与您的相关约定处理您的个人信息，对您的相关信息承担保密责任，依法采取相应的措施保护您的合法权益。",
  "",
  "一、授权事项",
  "",
  "（一）您同意并授权：为向您提供信用卡产品大数据预审及相关服务，我司可基于验证申请人身份、授信预审批、纸质账单打印、贷后管理、账务处理、征信异议处理、个性化分期还款、欠款催收（含委托第三方进行催收）、诉讼/仲裁/调解、风险监测、处理异议及咨询、进行综合统计和研究分析、履行法律法规及监管要求和加强风险管理的目的，在业务办理或履行过程中收集、存储、使用、加工、传输下述您主动提供或因使用产品及相关服务而产生与处理目的直接相关的个人信息，包括：",
  "",
  "1.个人基本资料：姓名、性别、国籍、民族、国家/地区、出生日期、婚姻状况、居住状态。",
  "",
  "2.个人身份信息：证件类型、证件号码、证件有效期、证件地址、证件照片或影印件、签证类型、签证到期日、证件签发次数、通行证号码。",
  "",
  "3.个人教育信息：学历、学籍。",
  "",
  "4.个人联系信息：联系电话（手机号、家庭电话、单位电话）、电子邮箱地址、地址与邮编（邮寄、账单、家庭、单位）、本人向中行客服致电或提供的其他联系方式、联系人信息（姓名、电话、地址）。",
  "",
  "5.个人工作信息：单位名称、单位地址、单位邮编、单位电话、行业分类、职业、经济类型、职务、现职已工作年限、年收入总额。",
  "",
  "6.个人账户信息：卡产品类型、账号、自动还款扣款账号、发卡机构、信用卡卡号、信用卡有效期、发卡日期、账户类型、账户状态、卡户状态、主附卡标识、分期信息、交易信息、账单日、账户余额、催收记录、开户日期、销户日期。",
  "",
  "7.个人资产信息：收入（社保缴纳、税务缴纳、公积金缴纳、代发薪、养老金、企业年金）、金融资产、机动车、房产。",
  "",
  "8.个人借贷信息：申请表信息、个人信用报告、信贷信息、信用评分、诉讼与案件信息、不良信息、逾期信息。",
  "",
  "9.个人位置及设备信息：设备地理位置、设备识别码、网络IP、MAC地址。",
  "",
  "10.个人生物识别信息：人脸、指纹、声纹、面容识别信息。",
  "",
  "11.外籍人士信息：主要海外交易涉及国家或地区、预期月交易规模币种、预期月交易规模、出生地。",
  "",
  "12.个人税收居民身份声明信息：税收居民身份、现居地址、出生地址、税收居民国（地区）、纳税人识别号类型、纳税人识别号。",
  "",
  "二、您的权利",
  "",
  "1.您可以依法向我司查阅或复制个人信息；发现信息不准确、不完整的，有权提出异议并请求中行及时采取更正、补充等必要措施。当您发现我司处理个人信息违反法律、行政法规的规定以及与您约定的，有权请求我司及时删除相关信息，法律法规另有规定的除外。您有权要求我司对个人信息处理规则进行解释说明。您可依法撤回有关您的个人信息授权，但因履行本合同所必需或履行法定义务所必需的信息除外，您撤回的，不影响撤回前基于您同意已进行的个人信息处理活动的效力。",
  "",
  "2.您理解并知悉，为保障安全和高效处理您的问题并及时向您反馈，我司会在验证您的身份后处理您的权利请求。我司只是对你大数据信息做预审，终审制卡需要信息再次提交银行系统，当银行行验证您的身份时，可能会要求您提供相关证据。银行在验证您的身份后，会及时响应您基于上述权利提出的请求，在十五个工作日内或法律法规规定的期限内作出答复及合理解释，若情况复杂可能在三十天内进行回复，并告知您外部纠纷解决途径。",
  "",
  "3.您理解并知悉，我司将在满足法律法规要求以及应对可能争议解决所必需的最短时间内保存您的个人信息。超出保存期限后，我司会对您的个人信息进行删除或者匿名化处理，但法律、行政法规规定的其他情形除外。删除个人信息从技术上难以实现的，我司将停止除储存和采取必要的安全保护措施之外的处理。我司将适用符合业界标准的安全防护措施保护您提供的个人信息，防止数据遭到未经授权的访问、公开披露、使用、修改、损坏或丢失。",
  "",
  "三、其他事项",
  "",
  "1.您保证签署本授权书是您本人的真实意思表示，并承诺所提供的资料、信息真实、准确、完整、合法、有效。",
  "",
  "2.本授权书以数据电文形式订立，自您申请本产品相关页面阅读本授权书并勾选之日起生效，有效期至您本次信用卡业务关系全部结束或您申请信用卡未获批准之日终止，法律、行政法规、监管部门另有规定的除外。",
  "",
  "3.您同意我司基于档案保存等法律法规、监管有关要求保留本授权书及我司已获取您的有关数据信息等资料。对于您同意中行处理的个人信息，我司将按照法律法规、监管要求及与您的约定开展信息处理行为，并采取相应的安全措施保护您的个人信息。",
  "",
  "4.特别提示：如您对我司个人信息处理活动有任何疑问、意见、投诉建议或依法行使您的权利，可通通过拨打客服电话方式进行咨询、反映或行使您的权利。",
  "",
  "5.因本授权书产生的争议和纠纷，您同意采取现行有效的我司信用卡预申请所约定的纠纷解决方式。"
].join("\n");

$("#agreementBody").textContent = AGREEMENT_TEXT;

var modal = $("#agreementModal");

$("#openAgreement").addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  modal.classList.remove("hidden");
  $("#agreementBody").scrollTop = 0;
});

/* 点击"阅读并同意"：勾选协议并关闭弹窗 */
$("#agreeBtn").addEventListener("click", function () {
  agreeChecked = true;
  agreeLabel.classList.add("checked");
  modal.classList.add("hidden");
});

/* 点击遮罩关闭 */
modal.addEventListener("click", function (e) {
  if (e.target === modal) modal.classList.add("hidden");
});

/* ---------- 未勾选协议提示弹窗（div 实现，非 alert） ---------- */
var agreeWarnModal = $("#agreeWarnModal");

function showAgreeWarn() {
  agreeWarnModal.classList.remove("hidden");
}

$("#agreeWarnBtn").addEventListener("click", function () {
  agreeWarnModal.classList.add("hidden");
});

agreeWarnModal.addEventListener("click", function (e) {
  if (e.target === agreeWarnModal) agreeWarnModal.classList.add("hidden");
});

/* ---------- 第一页校验 ---------- */
function markError(fieldEl, on) {
  fieldEl.classList.toggle("error", on);
}

/* =====================================================
 * 身份证号校验（GB 11643 / ISO 7064:1983 MOD 11-2）
 * 校验项：长度与字符、地区编码、出生日期、18 位校验码
 * 返回 { valid: Boolean, reason: String }
 * ===================================================== */
var ID_WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
var ID_CHECK_CODES = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];

function isRealDate(y, m, d) {
  var yy = parseInt(y, 10), mm = parseInt(m, 10), dd = parseInt(d, 10);
  if (isNaN(yy) || isNaN(mm) || isNaN(dd)) return false;
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return false;
  /* 年限合理性：不早于 150 年前、不晚于今天 */
  var now = new Date();
  if (yy < now.getFullYear() - 150 || yy > now.getFullYear()) return false;
  var dt = new Date(yy, mm - 1, dd);
  if (dt.getFullYear() !== yy || dt.getMonth() !== mm - 1 || dt.getDate() !== dd) return false;
  return dt <= now;
}

function validateIdCard(input) {
  var id = String(input == null ? "" : input).trim().toUpperCase();
  if (id === "") return { valid: false, reason: "empty" };

  /* ---- 18 位身份证 ---- */
  if (id.length === 18) {
    if (!/^\d{17}[\dX]$/.test(id)) return { valid: false, reason: "format" };

    /* 地区编码：前两位为省级代码（11-82），前六位不可为全 0 */
    var area = id.slice(0, 6);
    var prov = parseInt(id.slice(0, 2), 10);
    if (area === "000000" || prov < 11 || prov > 82) return { valid: false, reason: "area" };

    /* 出生日期：第 7-14 位 YYYYMMDD */
    if (!isRealDate(id.slice(6, 10), id.slice(10, 12), id.slice(12, 14))) {
      return { valid: false, reason: "birthday" };
    }

    /* 校验码：前 17 位加权求和后对 11 取模 */
    var sum = 0;
    for (var i = 0; i < 17; i++) sum += parseInt(id.charAt(i), 10) * ID_WEIGHTS[i];
    if (ID_CHECK_CODES[sum % 11] !== id.charAt(17)) return { valid: false, reason: "checksum" };

    return { valid: true, reason: "ok" };
  }

  /* ---- 15 位旧版身份证（无校验码） ---- */
  if (id.length === 15) {
    if (!/^\d{15}$/.test(id)) return { valid: false, reason: "format" };
    if (!isRealDate(String(1900 + parseInt(id.slice(6, 8), 10)), id.slice(8, 10), id.slice(10, 12))) {
      return { valid: false, reason: "birthday" };
    }
    return { valid: true, reason: "ok" };
  }

  return { valid: false, reason: "length" };
}

var ID_ERR_TEXT = {
  empty: "请填写您的身份证号码",
  length: "身份证号码应为 15 位或 18 位",
  format: "身份证号码只能包含数字，18 位末位可为 X",
  area: "身份证号码地区编码不正确",
  birthday: "身份证号码中的出生日期不正确",
  checksum: "身份证号码校验位错误，请核对后重新输入"
};

function validateStep1() {
  var ok = true;
  var firstBad = null;
  var fields = [
    { el: $("#name").closest(".field"),    input: $("#name") },
    { el: $("#phone").closest(".field"),   input: $("#phone") },
    { el: $("#idcard").closest(".field"),  input: $("#idcard") },
    { el: $("#address").closest(".field"), input: $("#address") }
  ];

  fields.forEach(function (f) {
    var empty = f.input.value.trim() === "";
    markError(f.el, empty);
    if (empty) { ok = false; if (!firstBad) firstBad = f.input; }
  });

  /* 手机号格式 */
  var phone = $("#phone").value.trim();
  if (phone !== "" && !/^1\d{10}$/.test(phone)) {
    var pf = $("#phone").closest(".field");
    pf.querySelector(".err-msg").textContent = "请填写正确的手机号码";
    markError(pf, true);
    ok = false; if (!firstBad) firstBad = $("#phone");
  }

  /* 身份证号：算法校验（地区码 + 出生日期 + 校验位） */
  var idField = $("#idcard").closest(".field");
  var idMsg = idField.querySelector(".err-msg");
  var idc = $("#idcard").value.trim();
  var idRes = validateIdCard(idc);
  idMsg.textContent = ID_ERR_TEXT[idRes.reason] || ID_ERR_TEXT.format;
  if (!idRes.valid) {
    markError(idField, true);
    ok = false; if (!firstBad) firstBad = $("#idcard");
  }

  if (!agreeChecked) {
    showAgreeWarn();
    agreeLabel.classList.add("agree-error");
    ok = false;
  }

  if (firstBad) firstBad.scrollIntoView({ behavior: "smooth", block: "center" });
  return ok;
}

$("#btnStep1").addEventListener("click", function () {
  if (!validateStep1()) return;
  $("#page1").classList.add("hidden");
  $("#page2").classList.remove("hidden");
  window.scrollTo(0, 0);
});

/* 输入时清除错误态 */
$all("#page1 input").forEach(function (input) {
  input.addEventListener("input", function () {
    markError(input.closest(".field"), false);
  });
});

/* =====================================================
 * 第二页：财务信息（自定义下拉）
 * ===================================================== */

var openDropdown = null;

function closeDropdown() {
  if (openDropdown) {
    openDropdown.field.classList.remove("open");
    openDropdown.menu.remove();
    openDropdown = null;
    document.removeEventListener("click", onDocClick, true);
  }
}

function onDocClick(e) {
  if (openDropdown && !openDropdown.field.contains(e.target)) closeDropdown();
}

$all("#page2 .select-field").forEach(function (fieldEl) {
  var key = fieldEl.getAttribute("data-key");
  var valueEl = fieldEl.querySelector(".select-value");

  fieldEl.querySelector(".select-box").addEventListener("click", function (e) {
    e.stopPropagation();
    var wasOpen = fieldEl.classList.contains("open");
    closeDropdown();
    if (wasOpen) return;

    var menu = document.createElement("div");
    menu.className = "dropdown";
    OPTIONS[key].forEach(function (opt) {
      var item = document.createElement("div");
      item.className = "option" + (financeData[key] === opt ? " selected" : "");
      item.textContent = opt;
      item.addEventListener("click", function () {
        financeData[key] = opt;
        valueEl.textContent = opt;
        valueEl.classList.remove("placeholder");
        markError(fieldEl, false);
        closeDropdown();
      });
      menu.appendChild(item);
    });

    fieldEl.appendChild(menu);
    fieldEl.classList.add("open");
    openDropdown = { field: fieldEl, menu: menu };
    document.addEventListener("click", onDocClick, true);
  });
});

function validateStep2() {
  var ok = true;
  var firstBad = null;
  $all("#page2 .select-field").forEach(function (fieldEl) {
    var key = fieldEl.getAttribute("data-key");
    var empty = !financeData[key];
    markError(fieldEl, empty);
    if (empty) { ok = false; if (!firstBad) firstBad = fieldEl; }
  });
  if (firstBad) firstBad.scrollIntoView({ behavior: "smooth", block: "center" });
  return ok;
}

$("#btnStep2").addEventListener("click", function () {
  if (!validateStep2()) return;
  renderResult();
  $("#page2").classList.add("hidden");
  $("#page3").classList.remove("hidden");
  window.scrollTo(0, 0);
});

/* =====================================================
 * 第三页：额度计算
 *
 * 房产及社保情况      固定    专享
 * 无房               7万     7万5
 * 有按揭房            8万     8万5
 * 有按揭房，有社保     9万     9万5
 * 全款房             10万    10万5
 * 全款房，有社保      11万    11万5
 *
 * 房屋类型映射：自购有按揭 -> 有按揭房；自建房屋 -> 全款房；
 * 其余（无/租房/与父母同住/单位宿舍）-> 无房。
 * 表中未列出的"无房+社保"按同一规律上浮 1 万（8万 / 8万5）。
 * ===================================================== */

var QUOTA_TABLE = {
  "无房":            { fixed: 70000, extra: 75000 },
  "有按揭房":        { fixed: 80000, extra: 85000 },
  "有按揭房，有社保": { fixed: 90000, extra: 95000 },
  "全款房":          { fixed: 100000, extra: 105000 },
  "全款房，有社保":   { fixed: 110000, extra: 115000 }
};

function getHouseCategory(houseType) {
  if (houseType === "自购有按揭") return "有按揭房";
  if (houseType === "自建房屋") return "全款房";
  return "无房";
}

function renderResult() {
  var house = financeData.houseType;
  var social = financeData.socialSecurity;

  /* 防御：切到最后一页但财务信息缺失，直接提示并展示 undefined，
     避免用空数据算出误导性的额度数字 */
  if (!house || !social) {
    alert("数据缺失：尚未填写财务信息（房屋类型 / 社保），无法生成额度，将显示 undefined。");
    $("#quotaFixed").textContent = "undefined";
    $("#quotaExtra").textContent = "undefined";
    return;
  }

  var category = getHouseCategory(house);
  var hasSocial = social === "有社保";

  var key;
  if (category === "有按揭房") {
    key = hasSocial ? "有按揭房，有社保" : "有按揭房";
  } else if (category === "全款房") {
    key = hasSocial ? "全款房，有社保" : "全款房";
  } else {
    key = "无房";
  }

  var quota = QUOTA_TABLE[key];
  if (category === "无房" && hasSocial) {
    /* 表中未列出：按规律上浮 1 万 */
    quota = { fixed: 80000, extra: 85000 };
  }

  $("#quotaFixed").textContent = quota.fixed.toLocaleString();
  $("#quotaExtra").textContent = quota.extra.toLocaleString();
}

/* =====================================================
 * 调试用函数（混淆命名，控制台直接调用）
 *   _0xa7(1|2|3)  -> 直接跳到指定页
 *   _0xb2()       -> 在 1->2->3->1 之间循环切换
 * 跳到最后一页(page3)时会触发上面的数据防御。
 * ===================================================== */
function _0xa7(p) {
  if (typeof p !== "number" || p < 1 || p > 3) return;
  if (p === 3) renderResult(); /* 触发最后一页数据防御 */
  ["page1", "page2", "page3"].forEach(function (id) {
    document.getElementById(id).classList.add("hidden");
  });
  document.getElementById("page" + p).classList.remove("hidden");
  window.scrollTo(0, 0);
}

function _0xb2() {
  var cur = 1;
  [1, 2, 3].forEach(function (n) {
    if (!document.getElementById("page" + n).classList.contains("hidden")) cur = n;
  });
  _0xa7(cur >= 3 ? 1 : cur + 1);
}

/* 暴露到全局，方便控制台调试 */
window._0xa7 = _0xa7;
window._0xb2 = _0xb2;
