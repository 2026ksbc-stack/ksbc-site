/*
 * 사단법인 한국방송비평학회 홈페이지 공통 스크립트
 *
 * 공지사항 / 자유게시판 / 자료실 페이지는 각각 /data/*.json 파일을 읽어와
 * 화면에 목록을 렌더링합니다. 새 글을 올리려면 관리자가 해당 JSON 파일에
 * 항목을 하나 추가하고 GitHub에 커밋/푸시하면 됩니다. (자세한 방법은
 * README.md 참고)
 */

async function loadJSON(path) {
  // 캐시 방지: 매번 최신 JSON을 받아오도록 타임스탬프를 붙이고 no-store를 사용합니다.
  const bustedPath = path + (path.includes("?") ? "&" : "?") + "t=" + Date.now();
  const res = await fetch(bustedPath, { cache: "no-store" });
  if (!res.ok) throw new Error("데이터를 불러오지 못했습니다: " + path);
  return res.json();
}

function formatDate(d) {
  return d || "";
}

function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * 목록형 데이터(공지사항/게시판)를 아코디언 형태로 렌더링
 * items: [{id, date, category, title, author, body, pinned}]
 */
function renderAccordionList(containerEl, items, opts = {}) {
  containerEl.innerHTML = "";

  if (!items || items.length === 0) {
    containerEl.innerHTML = '<li class="empty-state">등록된 게시글이 없습니다.</li>';
    return;
  }

  // 최신순 정렬 (pinned 우선)
  const sorted = [...items].sort((a, b) => {
    if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
    return (b.date || "").localeCompare(a.date || "");
  });

  sorted.forEach((item) => {
    const li = document.createElement("li");
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.className = "item-row";

    const titleSpan = document.createElement("span");
    titleSpan.className = "item-title";
    let badgeHtml = "";
    if (item.pinned) badgeHtml += '<span class="badge">공지</span>';
    if (item.category) badgeHtml += '<span class="badge" style="background:#dfe7f2;color:#1e4d8c;">' + escapeHtml(item.category) + "</span>";
    titleSpan.innerHTML = badgeHtml + escapeHtml(item.title);

    const metaSpan = document.createElement("span");
    metaSpan.className = "item-meta";
    metaSpan.textContent = (item.author ? item.author + " · " : "") + formatDate(item.date);

    summary.appendChild(titleSpan);
    summary.appendChild(metaSpan);

    const body = document.createElement("div");
    body.className = "detail-box";
    body.style.marginTop = "0";
    body.style.borderTop = "none";
    body.style.borderRadius = "0 0 8px 8px";
    let bodyHtml = '<div class="detail-body">' + escapeHtml(item.body || "") + "</div>";
    if (item.file) {
      bodyHtml += '<p style="margin-top:14px;"><a class="btn outline" href="' + item.file + '" download>첨부파일 다운로드</a></p>';
    }
    body.innerHTML = bodyHtml;

    details.appendChild(summary);
    details.appendChild(body);
    li.appendChild(details);
    containerEl.appendChild(li);
  });
}

/**
 * 자료실 전용 렌더링 (파일 다운로드 목록)
 * items: [{id, date, category, title, description, file}]
 */
function renderArchiveList(containerEl, items) {
  containerEl.innerHTML = "";
  if (!items || items.length === 0) {
    containerEl.innerHTML = '<li class="empty-state">등록된 자료가 없습니다.</li>';
    return;
  }
  const sorted = [...items].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  sorted.forEach((item) => {
    const li = document.createElement("li");
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.className = "item-row";

    const titleSpan = document.createElement("span");
    titleSpan.className = "item-title";
    let badgeHtml = item.category ? '<span class="badge">' + escapeHtml(item.category) + "</span>" : "";
    titleSpan.innerHTML = badgeHtml + escapeHtml(item.title);

    const metaSpan = document.createElement("span");
    metaSpan.className = "item-meta";
    metaSpan.textContent = formatDate(item.date);

    summary.appendChild(titleSpan);
    summary.appendChild(metaSpan);

    const body = document.createElement("div");
    body.className = "detail-box";
    body.style.marginTop = "0";
    body.style.borderTop = "none";
    body.style.borderRadius = "0 0 8px 8px";
    body.innerHTML =
      '<div class="detail-body">' + escapeHtml(item.description || "") + "</div>" +
      (item.file
        ? '<p style="margin-top:14px;"><a class="btn" href="' + item.file + '" download>파일 다운로드</a></p>'
        : "");

    details.appendChild(summary);
    details.appendChild(body);
    li.appendChild(details);
    containerEl.appendChild(li);
  });
}

/** 홈 화면 등에서 최신 공지 N개만 미리보기 */
function renderPreviewList(containerEl, items, count = 4) {
  containerEl.innerHTML = "";
  if (!items || items.length === 0) {
    containerEl.innerHTML = '<li class="empty-state">등록된 공지사항이 없습니다.</li>';
    return;
  }
  const sorted = [...items].sort((a, b) => {
    if (!!b.pinned !== !!a.pinned) return b.pinned ? 1 : -1;
    return (b.date || "").localeCompare(a.date || "");
  });
  sorted.slice(0, count).forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML =
      '<a class="item-row" href="notices.html">' +
      '<span class="item-title">' +
      (item.pinned ? '<span class="badge">공지</span>' : "") +
      escapeHtml(item.title) +
      "</span>" +
      '<span class="item-meta">' + formatDate(item.date) + "</span>" +
      "</a>";
    containerEl.appendChild(li);
  });
}
