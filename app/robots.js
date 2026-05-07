export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],

    sitemap: "https://kayapalat.in/sitemap.xml",

    host: "https://kayapalat.in",
  };
}