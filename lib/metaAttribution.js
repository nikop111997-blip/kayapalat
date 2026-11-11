
export function getMetaAttribution() {
  if (typeof document === "undefined") return {};

  const cookies = Object.fromEntries(
    document.cookie.split("; ").filter(Boolean).map((cookie) => {
      const index = cookie.indexOf("=");
      return [
        cookie.slice(0, index),
        decodeURIComponent(cookie.slice(index + 1)),
      ];
    })
  );

  return {
    fbclid: cookies.fbclid || null,
    fbp: cookies._fbp || null,
    fbc: cookies._fbc || null,
  };
}
