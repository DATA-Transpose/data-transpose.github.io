---
layout: default
title: People
permalink: /people/
---

# People

<p class="page-intro">Meet the researchers and students working across trustworthy AI, machine learning, and data systems.</p>
<p class="people-sort-note">Sorted alphabetically by last name (A–Z) within each group.</p>

{% assign groups = "faculty:Faculty,phd_students:PhD Students,masters_students:Master's Students,undergraduate_students:Undergraduate Students,alumni:Alumni" | split: "," %}
{% for group in groups %}
{% assign parts = group | split: ":" %}
{% assign key = parts[0] %}
{% assign label = parts[1] %}
{% assign people = site.data.people[key] | sort: "sort_name" %}
{% if people and people.size > 0 %}
<section class="people-section people-section-{{ key }}" aria-labelledby="people-{{ key }}">
<h2 class="section-title" id="people-{{ key }}">{{ label }}</h2>
<div class="people-grid people-grid-{{ key }}">
{% for person in people %}
<article class="person person-{{ person.name | slugify }}">
<div class="person-media">
{% if person.image %}
<img class="person-photo" src="{{ person.image | relative_url }}" alt="Portrait of {{ person.name }}" width="430" height="430" loading="lazy">
{% else %}
<div class="person-avatar" aria-hidden="true">{{ person.name | slice: 0 }}</div>
{% endif %}
</div>
<div class="person-content">
<p class="person-role">{{ person.role }}</p>
<h3>{{ person.name }}</h3>
{% if person.affiliation %}<p class="person-affiliation">{{ person.affiliation }}</p>{% endif %}
{% if person.location %}<p class="person-location">{{ person.location }}</p>{% endif %}
{% if person.interests %}<p class="person-interests"><strong>Research</strong>{{ person.interests }}</p>{% endif %}
{% if person.bio %}<p class="person-bio">{{ person.bio }}</p>{% endif %}
{% if person.links %}
<nav class="link-list person-links" aria-label="Links for {{ person.name }}">
{% for link in person.links %}
{% if link[1] and link[1] != "#" %}
<a href="{{ link[1] }}">{{ link[0] | capitalize }}</a>
{% endif %}
{% endfor %}
</nav>
{% endif %}
</div>
</article>
{% endfor %}
</div>
</section>
{% endif %}
{% endfor %}
