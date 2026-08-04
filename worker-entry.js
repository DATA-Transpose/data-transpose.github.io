import nextWorker from "./.open-next/worker.js";

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

function roundedCoordinate(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(number * 10) / 10 : null;
}

export class VisitorCounter {
  constructor(state) {
    this.state = state;
  }

  async fetch(request) {
    const method = request.method.toUpperCase();

    if (method === "POST") {
      const location = await request.json();
      const snapshot = await this.state.storage.transaction(async (storage) => {
        const stats = (await storage.get("stats")) || { total: 0, locations: {} };
        const key = [location.country, location.city, location.latitude, location.longitude].join("|");
        const current = stats.locations[key] || { ...location, count: 0 };
        current.count += 1;
        stats.locations[key] = current;
        stats.total += 1;
        await storage.put("stats", stats);
        return stats;
      });
      return Response.json(snapshot, { headers: JSON_HEADERS });
    }

    const stats = (await this.state.storage.get("stats")) || { total: 0, locations: {} };
    return Response.json(stats, { headers: JSON_HEADERS });
  }
}

async function visitorStats(request, env) {
  if (!env.VISITOR_COUNTER) {
    return Response.json({ error: "Visitor statistics storage is not configured." }, { status: 503, headers: JSON_HEADERS });
  }

  const stub = env.VISITOR_COUNTER.get(env.VISITOR_COUNTER.idFromName("global"));
  if (request.method === "POST") {
    const cf = request.cf || {};
    const location = {
      country: cf.country || "AU",
      city: cf.city || "Adelaide",
      latitude: roundedCoordinate(cf.latitude) ?? -34.9,
      longitude: roundedCoordinate(cf.longitude) ?? 138.6,
    };
    return stub.fetch("https://visitor-counter.internal/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(location),
    });
  }
  return stub.fetch("https://visitor-counter.internal/", { method: "GET" });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/visitor-stats" && (request.method === "GET" || request.method === "POST")) {
      return visitorStats(request, env);
    }
    return nextWorker.fetch(request, env, ctx);
  },
};
