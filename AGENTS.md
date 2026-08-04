# AGENTS.md

Instructions for AI agents working on this lab website.

## Project

This repository contains a static academic lab website for GitHub Pages.

Use the simplest working change. Prefer editing Markdown and YAML content over changing layouts or CSS.

## Stack

- Jekyll site built with the `github-pages` gem.
- Layouts live in `_layouts/`.
- Site data lives in `_data/`.
- Content pages are Markdown files in the repository root.
- Generated output goes to `_site/` and must not be edited.

## Important files

- `_config.yml`: site title, description, URL, base URL, plugins, and build excludes.
- `_layouts/default.html`: shared page shell and navigation.
- `assets/css/main.css`: site styling.
- `_data/publications.yml`: publication records.
- `_data/people.yml`: lab members.
- `_data/news.yml`: homepage news.
- `index.md`: homepage.
- `publications.md`: publications page.
- `people.md`: people page.
- `about.md`: lab profile.
- `contact.md`: contact details.
- `placeholders.md`: fill-in checklist for missing real content.
- `tests/check_site.py`: smoke test for required files and navigation.

## Content rules

- Keep public-facing text in English unless the maintainer asks for another language.
- Do not invent lab facts, publications, people, emails, URLs, affiliations, or claims.
- If information is missing, add or preserve a clear placeholder and record it in `placeholders.md`.
- Publication records must stay in `_data/publications.yml`.
- People records must stay in `_data/people.yml`.
- News records must stay in `_data/news.yml`.
- Keep dates in `YYYY-MM-DD` format.
- Use `mailto:name@example.edu` for email links in YAML.
- Use `#` only for temporary placeholder links.

## Jekyll/Liquid rules

- Do not indent raw HTML blocks inside Markdown files by four spaces. Kramdown will render them as escaped code blocks.
- Prefer simple Liquid loops over duplicated HTML.
- Keep navigation links in `_layouts/default.html`.
- For a user or organization GitHub Pages repo named `<account>.github.io`, keep `_config.yml` `baseurl: ""`.
- For a project page at `https://<account>.github.io/<repo>/`, set `_config.yml` `baseurl: "/<repo>"`.

## Styling rules

- Keep the design simple, academic, readable, and responsive.
- Use native HTML and CSS. Do not add JavaScript unless a requested feature requires it.
- Preserve keyboard accessibility. Links need visible focus states.
- Do not copy unlicensed code or assets from reference websites.

## Do not edit

- `_site/`
- `vendor/`
- `.bundle/`
- `.jekyll-cache/`
- `Gemfile.lock` unless dependencies change

## Local setup

Install dependencies:

```bash
bundle install
```

Run locally:

```bash
bundle exec jekyll serve
```

Open:

```text
http://127.0.0.1:4000/
```

Build:

```bash
bundle exec jekyll build
```

Smoke test:

```bash
python tests/check_site.py
```

## Verification before finishing

Run these commands from the repository root:

```bash
python tests/check_site.py
bundle exec jekyll build
```

For changes to navigation or links, also inspect generated pages in `_site/` or run a small internal-link check.

For changes to `people.md`, verify the rendered `_site/people/index.html` contains real HTML cards such as:

```html
<article class="person">
```

and does not contain escaped card markup such as:

```html
&lt;article class="person"&gt;
```

## Deployment

Push the repository to GitHub, then enable GitHub Pages:

1. Repository Settings.
2. Pages.
3. Source: Deploy from a branch.
4. Branch: `main`.
5. Folder: `/ root`.

For a personal or organization homepage, name the repository `<account>.github.io`.

## Maintenance workflow

1. Update content in `_data/` or the relevant Markdown page.
2. Run the smoke test and Jekyll build.
3. Preview locally if layout changed.
4. Commit only source files, not generated or vendored files.
