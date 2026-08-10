---
layout: default
title: Home
---

<section class="hero">
  <p class="eyebrow">Trustworthy AI · Data Systems · Cloud Computing</p>
  <h1>Data Transpose Lab</h1>
  <p>
    We conduct AI, big data, and cloud-computing research aimed at transforming
    industries through trustworthy, robust, and practical technology.
  </p>
  <div class="button-row">
    <a class="button primary" href="{{ '/publications/' | relative_url }}">View publications</a>
    <a class="button" href="{{ '/people/' | relative_url }}">Meet the team</a>
  </div>
  <figure class="hero-visual">
    <img src="{{ '/assets/images/branding/dt_main-transparent.png' | relative_url }}" alt="Data Transpose Lab visual connecting large language models and computer vision" width="904" height="1740">
  </figure>
</section>

<section>
  <h2 class="section-title">Research areas</h2>
  <div class="grid">
    <article class="card">
      <svg class="research-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M24 4 40 10v11c0 10-6.6 18.7-16 23C14.6 39.7 8 31 8 21V10l16-6Z"/><path d="m17 24 5 5 10-11"/></svg>
      <h3>Trustworthy AI</h3>
      <p>Model calibration, uncertainty estimation, fairness, adversarial robustness, privacy, interpretability, and explainability.</p>
    </article>
    <article class="card">
      <svg class="research-icon" viewBox="0 0 48 48" aria-hidden="true"><circle cx="10" cy="24" r="4"/><circle cx="24" cy="10" r="4"/><circle cx="38" cy="20" r="4"/><circle cx="29" cy="38" r="4"/><path d="m13 21 8-8m7-1 7 6m1 6-5 10m-6 1L13 27m1-3h20"/></svg>
      <h3>AI and data mining</h3>
      <p>Natural language processing, text mining, causal reasoning, multimodal information fusion, and knowledge discovery from imperfect data.</p>
    </article>
    <article class="card">
      <svg class="research-icon" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 38 19 27l7 6 14-19"/><path d="M31 14h9v9"/><path d="M8 10v28h32"/></svg>
      <h3>Model optimization</h3>
      <p>Efficient training and inference, hyperparameter and optimization methods, transfer learning, meta-learning, and hardware-aware AI.</p>
    </article>
  </div>
</section>

<section class="news-section" aria-labelledby="latest-news-title">
  <div class="news-heading">
    <h2 class="section-title" id="latest-news-title">Latest news</h2>
    <div class="news-controls" aria-label="News carousel controls">
      <button class="news-control" type="button" data-news-previous aria-label="Show previous news item">↑</button>
      <button class="news-control news-pause" type="button" data-news-pause aria-pressed="false">Pause</button>
      <button class="news-control" type="button" data-news-next aria-label="Show next news item">↓</button>
    </div>
  </div>
  <div class="news-drum">
    <div class="news-picker" data-news-carousel tabindex="0" aria-label="Latest news. Scroll vertically or use the arrow keys to select an item.">
      {% for item in site.data.news %}
        <article class="news-item{% if forloop.first %} is-active{% endif %}" data-news-item>
          <div class="news-icon" aria-hidden="true"></div>
          <p class="news-date">{% if item.display_date %}{{ item.display_date }}{% else %}{{ item.date | date: "%B %-d, %Y" }}{% endif %}</p>
          <h2>{{ item.title }}</h2>
          {% if item.logo %}<img class="news-conference-logo" src="{{ item.logo | relative_url }}" alt="{{ item.logo_alt }} conference logo" loading="lazy">{% endif %}
          <p>{{ item.description }}</p>
          {% if item.link %}<a href="{{ item.link }}">Learn more</a>{% endif %}
        </article>
      {% endfor %}
    </div>
  </div>
  <p class="news-position" data-news-position aria-live="polite"></p>
</section>

{% if site.visitor_map_enabled %}
<section class="visitor-section" aria-labelledby="visitor-map-title">
  <div class="visitor-heading">
    <div>
      <p class="eyebrow">Global reach</p>
      <h2 class="section-title" id="visitor-map-title">Visitors around the world</h2>
    </div>
    <p class="visitor-total"><strong data-visitor-total>0</strong><span>total visits</span></p>
  </div>
  <div class="visitor-map" data-visitor-map role="img" aria-label="World map showing aggregated visitor locations and visit counts"></div>
  <p class="visitor-status" data-visitor-status aria-live="polite">Loading aggregated visitor locations…</p>
</section>
{% endif %}

<script>
  (() => {
    const carousel = document.querySelector("[data-news-carousel]");
    if (!carousel) return;

    const originals = [...carousel.querySelectorAll("[data-news-item]")];
    const itemCount = originals.length;
    const cloneItem = (item) => {
      const clone = item.cloneNode(true);
      clone.classList.remove("is-active");
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a").forEach((link) => link.setAttribute("tabindex", "-1"));
      return clone;
    };
    carousel.prepend(...originals.map(cloneItem));
    carousel.append(...originals.map(cloneItem));
    const items = [...carousel.querySelectorAll(".news-item")];
    const previous = document.querySelector("[data-news-previous]");
    const next = document.querySelector("[data-news-next]");
    const pause = document.querySelector("[data-news-pause]");
    const position = document.querySelector("[data-news-position]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let current = itemCount;
    let timer;
    let scrollTimer;
    let isPaused = reduceMotion.matches;

    const updatePosition = () => {
      const logicalIndex = current % itemCount;
      position.textContent = `News ${logicalIndex + 1} of ${itemCount}`;
      items.forEach((item, index) => {
        const active = index === current;
        const distance = index - current;
        item.classList.toggle("is-active", active);
        item.classList.toggle("is-before", distance < 0);
        item.classList.toggle("is-after", distance > 0);
        item.classList.toggle("is-near", Math.abs(distance) === 1);
        item.classList.toggle("is-far", Math.abs(distance) === 2);
        item.setAttribute("aria-current", active ? "true" : "false");
      });
    };

    const show = (index, smooth = true) => {
      current = Math.max(0, Math.min(index, items.length - 1));
      const item = items[current];
      updatePosition();
      carousel.closest(".news-drum").style.setProperty("--news-active-height", `${item.offsetHeight}px`);
      window.requestAnimationFrame(() => {
        const viewport = carousel.getBoundingClientRect();
        const box = item.getBoundingClientRect();
        const offset = box.top + box.height / 2 - (viewport.top + viewport.height / 2);
        carousel.scrollBy({
          top: offset,
          behavior: smooth && !reduceMotion.matches ? "smooth" : "auto",
        });
      });
    };

    const stopTimer = () => window.clearInterval(timer);
    const startTimer = () => {
      stopTimer();
      if (!isPaused && items.length > 1) {
        timer = window.setInterval(() => show(current + 1), 6000);
      }
    };

    const setPaused = (value) => {
      isPaused = value;
      pause.setAttribute("aria-pressed", String(value));
      pause.textContent = value ? "Play" : "Pause";
      startTimer();
    };

    previous.addEventListener("click", () => {
      show(current - 1);
      startTimer();
    });
    next.addEventListener("click", () => {
      show(current + 1);
      startTimer();
    });
    pause.addEventListener("click", () => setPaused(!isPaused));
    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        show(current - 1);
        startTimer();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        show(current + 1);
        startTimer();
      }
    });
    carousel.addEventListener("scroll", () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        const centre = carousel.getBoundingClientRect().top + carousel.clientHeight / 2;
        current = items.reduce((best, item, index) => {
          const box = item.getBoundingClientRect();
          const distance = Math.abs(box.top + box.height / 2 - centre);
          const bestBox = items[best].getBoundingClientRect();
          const bestDistance = Math.abs(bestBox.top + bestBox.height / 2 - centre);
          return distance < bestDistance ? index : best;
        }, 0);
        updatePosition();
        if (current < itemCount || current >= itemCount * 2) {
          const equivalent = current < itemCount ? current + itemCount : current - itemCount;
          window.setTimeout(() => show(equivalent, false), 40);
        }
      }, 80);
    });
    reduceMotion.addEventListener("change", (event) => setPaused(event.matches));

    items.forEach((item, index) => {
      item.addEventListener("click", (event) => {
        if (index !== current && !event.target.closest("a")) show(index);
      });
    });

    show(itemCount, false);
    setPaused(isPaused);
  })();
</script>
