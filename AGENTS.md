# AGENTS.md

## Project
- Static HTML/CSS/JS coursework site for student 石子卉 (24002120423), intended to run locally/offline. There is no package manager, build, lint, test suite, or CI; verify manually in a browser.
- Two page tiers that resolve assets differently:
  - `24002120423石子卉/` — legacy coursework plus the class index (`index.html`); its `css/` and `font/` are local to this folder.
  - Repository root — newer `iconfont-1.html` … `iconfont-4.html` and shared local vendor assets under `cdn/`.
- `24002120423石子卉/index.html` is the only class index. Root pages' "返回首页" links point to a nonexistent root `index.html`, so they are currently broken; do not create a second index without confirming intent.
- `24002120423石子卉/README.md`, `README.en.md`, and its `.gitignore` are unedited Gitee/Flash Builder templates. `szh_prompt.md` is the real conventions/history log.

## Conventions
- Before executing a user prompt, append to `szh_prompt.md`: timestamp, model, and prompt text. Never overwrite it.
- Since 2026-10-23, project-defined CSS classes, IDs, and JS variables must start with `szh_`. Vendor classes (`fa-*`, `iconfont`, `icon-*`) are the only exception. Legacy student pages predate this rule and are unprefixed; do not mass-rename them.
- Every new HTML page must be linked from `24002120423石子卉/index.html`. The index currently omits `event005.html`, `function_apply.html`, `JS_obj_fun005.html`, and all four root `iconfont-*.html` pages.
- Keep dependencies local: vendor files go under `cdn/`; do not add remote CDN or webfont URLs. Legacy `24002120423石子卉/svg005.html` still loads `at.alicdn.com`; localize it if touched.
- Root `css/flex.css` is an orphan one-line variant of `24002120423石子卉/css/flex.css`; `review_flex.html` uses the student copy, so edit that one.
- `24002120423石子卉/font/` is byte-identical to `cdn/iconfont/`; root pages reference `cdn/iconfont/`, student pages reference `font/`.
- Root icon pages intentionally split techniques: `iconfont-1` Font Awesome font icons, `iconfont-2` Lucide SVG, `iconfont-3` mobile tab bar with font icons, `iconfont-4` mobile tab bar with SVG symbols plus Lucide.
- The visual-design brief for the iconfont pages is `24002120423石子卉/SKILL/frontend-design/SKILL.md` (actual path is `SKILL/`, despite prompts calling it `skills/`).

## Verify
- Open pages directly, e.g. `Start-Process "24002120423石子卉\index.html"` or `Start-Process "iconfont-1.html"`; no dev server is required.
- Recheck relative asset paths after edits because root and student pages resolve from different directories. Also check that no new `http(s)://` dependencies were introduced.
- Git publishes to Gitee `origin/master`; commit/push only when explicitly asked.
- Windows PowerShell 5.1 mangles UTF-8 unless told otherwise: use `-Encoding UTF8` with `Get-Content`/`Set-Content`, quote Chinese/space-containing paths, and URL-encode spaces in HTML links (`data%20Type.html`).

## Security
- `szh_prompt.md` contains a committed Gitee access token. Do not echo or use it; treat it as compromised and recommend rotating it and removing it from history.
