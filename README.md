# Lab Website

Static academic lab website for GitHub Pages.

## Local preview

Install Ruby dependencies:

```bash
bundle install
```

Run the site locally:

```bash
bundle exec jekyll serve
```

Open http://127.0.0.1:4000/.

## Update content

Edit these files:

- `_data/publications.yml` for publication records.
- `_data/people.yml` for lab members.
- `_data/news.yml` for homepage news.
- `about.md` and `contact.md` for lab profile and contact details.

## Deploy on GitHub Pages

1. Push this repository to GitHub.
2. Open repository Settings → Pages.
3. Select Deploy from a branch.
4. Select the default branch and root directory.
5. Save and wait for GitHub Pages to publish.

For a user or organization page, name the repository `<account>.github.io`.
