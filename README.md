# 한국방송비평학회 홈페이지

사단법인 한국방송비평학회(KSBC) 공식 홈페이지 소스입니다. 순수 HTML/CSS/JS로 만든 정적
사이트로, GitHub Pages에 그대로 올려서 사용할 수 있습니다.

## 구성

```
ksbc-website/
├── index.html         홈
├── greeting.html       학회소개 > 학회장인사말
├── about.html          학회소개 > 학회소개(개요)
├── articles.html       학회소개 > 학회정관(전문)
├── organization.html   학회소개 > 학회구성
├── location.html       학회소개 > 오시는 길
├── notices.html        공지사항
├── research.html       연구활동
├── journal.html        학술지
├── board.html          자유게시판
├── archive.html        자료실
├── assets/
│   ├── style.css       공통 디자인
│   └── script.js       목록 렌더링 스크립트
├── data/
│   ├── notices.json     공지사항 글 목록
│   ├── posts.json       자유게시판 글 목록
│   └── archive.json     자료실 파일 목록
└── files/
    └── KSBC-articles-of-association-2026.pdf   정관 원문
```

"학회소개"는 상단 메뉴에서 마우스를 올리면(또는 모바일에서 탭하면) 5개 하위 메뉴가 펼쳐지는
드롭다운 구조입니다. 각 하위 페이지 상단에도 동일한 5개 탭이 있어 하위 페이지 간 이동이
쉽습니다.

### 채워 넣어야 할 임시(placeholder) 내용

다음 세 페이지는 실제 정보가 없어 예시 문구로 채워두었습니다. 배포 전에 실제 내용으로
교체해 주세요.

- `greeting.html` — 학회장 인사말 (현재 임시 초안)
- `organization.html` 하단 "현직 임원 명단" 표 — 실제 회장·부회장·이사·감사 성함
- `location.html` — 실제 주소, 전화번호, 이메일, 지도(iframe)

## 파일명 관련 주의사항 (한글 파일명 다운로드 오류)

정관 PDF 파일명은 원래 한글이었으나(`한국방송비평학회_정관.pdf`), macOS에서 압축을 풀거나
GitHub에 업로드하는 과정에서 한글 자모가 다른 방식으로 인코딩(NFC/NFD)되면서 실제 파일명과
사이트의 링크가 서로 달라져 "업로드는 되는데 다운로드는 실패"하는 문제가 흔히 발생합니다.
이를 방지하기 위해 파일명을 영문(`files/KSBC-articles-of-association-2026.pdf`)으로
바꿔두었습니다.

앞으로 자료실 등에 새 파일을 추가할 때도 파일명은 한글/공백 없이 영문·숫자·하이픈만
사용하시는 것을 권장합니다 (예: `2026-notice.pdf`, `journal-guideline.docx`). 화면에 보이는
제목은 `data/archive.json`의 `title`/`description`에 한글로 자유롭게 쓰면 되고, 실제
`file` 경로만 영문으로 유지하면 됩니다.

## GitHub Pages에 올리는 방법

1. GitHub에서 새 저장소를 만듭니다 (예: `ksbc-homepage`). Public으로 설정합니다.
2. 이 폴더(`ksbc-website`) 안의 모든 파일을 저장소 최상위에 업로드(또는 git push)합니다.
   - GitHub 웹사이트에서 "Add file → Upload files"로 폴더째 드래그해도 됩니다.
   - 또는 터미널에서:
     ```
     cd ksbc-website
     git init
     git add .
     git commit -m "홈페이지 초기 배포"
     git branch -M main
     git remote add origin https://github.com/<계정명>/ksbc-homepage.git
     git push -u origin main
     ```
3. 저장소의 **Settings → Pages** 메뉴로 이동합니다.
4. "Build and deployment" 항목에서 Source를 **Deploy from a branch**로, Branch를
   `main` / `/(root)`로 설정하고 저장합니다.
5. 1~2분 후 `https://<계정명>.github.io/ksbc-homepage/` 주소로 접속하면 홈페이지가
   보입니다.

## 콘텐츠(글) 추가/수정 방법

이 사이트는 서버나 데이터베이스 없이 동작하는 정적 사이트이므로, 방문자가 직접 글을 쓸 수는
없습니다. 대신 관리자가 아래 JSON 파일을 편집해서 새 글을 등록합니다.

### 공지사항 추가하기 (`data/notices.json`)

```json
{
  "id": 3,
  "date": "2026-08-01",
  "category": "학술대회",
  "title": "2026 추계 학술대회 개최 안내",
  "author": "사무국",
  "pinned": false,
  "body": "본문 내용을 여기에 작성합니다. 줄바꿈은 \n 으로 표시합니다."
}
```

위와 같은 형태의 객체를 배열(`[ ]`) 안에 콤마(`,`)로 구분하여 추가한 뒤 GitHub에
커밋/푸시하면 됩니다. `pinned`를 `true`로 하면 목록 맨 위에 "공지" 표시와 함께 고정됩니다.

### 자유게시판 추가하기 (`data/posts.json`)

`notices.json`과 같은 형식이며 `category`, `pinned` 필드는 없어도 됩니다.

### 자료실 추가하기 (`data/archive.json`)

1. 첨부할 파일을 `files/` 폴더에 넣습니다.
2. `data/archive.json`에 아래 형태로 항목을 추가합니다.

```json
{
  "id": 2,
  "date": "2026-08-01",
  "category": "규정",
  "title": "논문 투고 및 심사 규정",
  "description": "학회 학술지 투고를 위한 세부 규정입니다.",
  "file": "files/투고심사규정.pdf"
}
```

## 자유게시판에 Giscus 연동하기 (회원이 직접 글쓰기)

`board.html`에는 [Giscus](https://giscus.app) 댓글창이 이미 삽입되어 있지만, 저장소 정보가
없는 자리표시자(`[ENTER-REPO-HERE]` 등) 상태입니다. 아래 순서대로 실제 값을 채워 넣어야
동작합니다.

1. **저장소를 Public으로 만들고 Discussions 기능을 켭니다.**
   저장소 페이지 → Settings → General → Features 항목에서 **Discussions** 체크박스를
   켭니다. (Giscus는 댓글을 GitHub Discussions에 저장하므로 Private 저장소는 방문자가
   볼 수 없습니다.)
2. **giscus 앱을 저장소에 설치합니다.**
   https://github.com/apps/giscus 로 이동 → **Install** → 방금 만든 저장소를 선택해서
   권한을 부여합니다.
3. **giscus.app에서 설정값을 발급받습니다.**
   https://giscus.app 접속 →
   - Repository 칸에 `계정명/저장소명` 입력 (예: `ksbc/ksbc-homepage`) — 초록색
     체크가 뜨면 정상 연결된 것입니다.
   - Page ↔ Discussions Mapping은 **pathname** 선택을 권장합니다 (페이지별로 댓글이
     자동 분리됩니다).
   - Discussion Category는 **Announcements** 타입 카테고리 선택을 권장합니다 (일반
     방문자가 새 Discussion을 함부로 만들지 못하고, giscus가 필요할 때만 자동 생성).
   - Theme은 사이트와 어울리는 밝은 테마(`Light` 등)를 선택합니다.
4. **발급된 `<script>` 태그를 복사합니다.**
   화면 하단 "Enable giscus" 섹션에 아래와 같은 형태로 실제 값이 채워진 스크립트가
   나타납니다.
   ```html
   <script src="https://giscus.app/client.js"
           data-repo="계정명/저장소명"
           data-repo-id="R_xxxxxxxxxxxx"
           data-category="Announcements"
           data-category-id="DIC_xxxxxxxxxxxx"
           data-mapping="pathname"
           data-strict="0"
           data-reactions-enabled="1"
           data-emit-metadata="0"
           data-input-position="top"
           data-theme="light"
           data-lang="ko"
           crossorigin="anonymous"
           async>
   </script>
   ```
5. **`board.html`의 기존 `<script src="https://giscus.app/client.js" ...>` 블록을
   위에서 복사한 내용으로 통째로 교체**하고 커밋/푸시합니다.

설정이 끝나면 방문자가 GitHub 계정으로 로그인해 댓글(=게시글)을 남길 수 있고, 모든 글은
해당 저장소의 **Discussions** 탭에서도 그대로 확인·관리(삭제, 잠금 등)할 수 있습니다.
회원이 아닌 방문자도 GitHub 계정만 있으면 댓글을 남길 수 있으니, 스팸이 걱정되면 저장소
Settings → Moderation 옵션에서 제한할 수 있습니다.

## 디자인/구조 커스터마이징

- 색상, 폰트 등은 `assets/style.css` 최상단의 `:root` 변수에서 한 번에 바꿀 수 있습니다.
- 메뉴 구조를 바꾸려면 각 HTML 파일의 `<nav class="main-nav">` 부분을 동일하게
  수정해야 합니다 (7개 파일 모두 같은 메뉴를 복사해 두었습니다).
