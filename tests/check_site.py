from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

required_files = [
    "_config.yml",
    "_layouts/default.html",
    "_data/publications.yml",
    "_data/people.yml",
    "_data/news.yml",
    "index.md",
    "publications.md",
    "people.md",
    "about.md",
    "contact.md",
    "README.md",
]

for relative in required_files:
    assert (ROOT / relative).exists(), f"missing {relative}"

for relative in ["index.md", "publications.md", "people.md", "about.md", "contact.md"]:
    text = (ROOT / relative).read_text(encoding="utf-8")
    assert "layout: default" in text, f"missing layout in {relative}"

layout = (ROOT / "_layouts/default.html").read_text(encoding="utf-8")
for link in ["/publications/", "/people/", "/about/", "/contact/"]:
    assert link in layout, f"missing navigation link {link}"

publications = (ROOT / "_data/publications.yml").read_text(encoding="utf-8")
assert "title:" in publications
assert "year:" in publications

people = (ROOT / "_data/people.yml").read_text(encoding="utf-8")
assert "faculty:" in people
assert "phd_students:" in people

print("site structure ok")
