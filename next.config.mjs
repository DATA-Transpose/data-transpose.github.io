const routes = ["about", "contact", "people", "publications"];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/static/index.html" },
        ...routes.map((route) => ({
          source: `/${route}`,
          destination: `/static/${route}/index.html`,
        })),
        ...routes.map((route) => ({
          source: `/${route}/`,
          destination: `/static/${route}/index.html`,
        })),
      ],
    };
  },
};

export default nextConfig;
