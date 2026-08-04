---
layout: default
title: Publications
permalink: /publications/
---

# Publications

{% assign publications = site.data.publications %}
{% assign current_year = nil %}
{% for paper in publications %}
{% if paper.year != current_year %}
{% assign current_year = paper.year %}
<h2 class="section-title">{{ current_year }}</h2>
{% endif %}
<article class="publication">
<div class="publication-icon" aria-hidden="true">
<svg viewBox="0 0 44 44"><path d="M12 5h15l5 5v29H12z"/><path d="M27 5v6h6M17 19h12M17 25h12M17 31h8"/></svg>
</div>
<h2>{{ paper.title }}</h2>
<p class="meta">{{ paper.authors }}</p>
<p class="meta">{{ paper.venue }}, {{ paper.year }}</p>
{% if paper.summary %}<p>{{ paper.summary }}</p>{% endif %}
{% if paper.links %}
<div class="link-list" aria-label="Publication links">
{% for link in paper.links %}
{% if link[1] and link[1] != "#" %}
<a href="{{ link[1] }}">{{ link[0] | upcase }}</a>
{% else %}
<span>{{ link[0] | upcase }}</span>
{% endif %}
{% endfor %}
</div>
{% endif %}
</article>
{% endfor %}
