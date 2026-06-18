export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],

    sitemap: "https://www.kayapalat.in/sitemap.xml",

    host: "https://www.kayapalat.in",
  };
}