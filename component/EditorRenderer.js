
import sanitizeHtml from "sanitize-html";
import parse, { domToReact } from "html-react-parser";
import InlineLink from "./InlineLink";

const sanitize = (html) =>
  sanitizeHtml(html || "", {
    allowedTags: [
      "b",
      "i",
      "em",
      "strong",
      "u",
      "mark",
      "a",
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "table",
      "tbody",
      "thead",
      "tr",
      "td",
      "th",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "id"],
    },
  });

// Extract and validate a YouTube embed URL from EditorJS code blocks.
const getYouTubeEmbedUrl = (html) => {
  if (typeof html !== "string" || !html.trim()) {
    return null;
  }

  const match = html.match(
    /<iframe\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/i
  );

  if (!match?.[1]) return null;

  try {
    const url = new URL(match[1]);

    const allowedHosts = [
      "youtube.com",
      "www.youtube.com",
    ];

    if (
      url.protocol !== "https:" ||
      !allowedHosts.includes(url.hostname) ||
      !url.pathname.startsWith("/embed/")
    ) {
      return null;
    }

    // Require a video ID after /embed/.
    const videoId = url.pathname.slice("/embed/".length);

    if (!videoId || videoId.includes("/")) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
};

export default function EditorRenderer({ content }) {
  if (!content?.blocks || !Array.isArray(content.blocks)) {
    return null;
  }

  const headerBlocks = content.blocks.filter(
    (block) => block.type === "header"
  );

  const parseOptions = {
    replace(domNode) {
      if (
        domNode.name === "a" &&
        domNode.attribs?.href
      ) {
        return (
          <InlineLink href={domNode.attribs.href}>
            {domToReact(domNode.children, parseOptions)}
          </InlineLink>
        );
      }
    },
  };

  return (
    <div className="max-w-none text-gray-800">
      {content.blocks.map((block, index) => {
        const sanitizedHTML = block?.data?.text
          ? sanitize(block.data.text)
          : "";

        switch (block.type) {
          case "paragraph":
            return (
              <div
                key={index}
                className="mb-5 text-[17px] leading-8 text-gray-700"
              >
                {parse(sanitizedHTML, parseOptions)}
              </div>
            );

          case "header": {
            const level = Math.min(
              6,
              Math.max(1, Number(block.data?.level) || 2)
            );

            const Tag = `h${level}`;
            const headerIndex = headerBlocks.indexOf(block);

            const classes = {
              1: "text-4xl font-bold mt-10 mb-5 text-gray-900",
              2: "text-3xl font-bold mt-8 mb-4 text-gray-900",
              3: "text-2xl font-semibold mt-7 mb-4 text-gray-900",
              4: "text-xl font-semibold mt-6 mb-3 text-gray-900",
              5: "text-lg font-semibold mt-5 mb-3 text-gray-900",
              6: "text-base font-semibold mt-4 mb-2 text-gray-900",
            };

            return (
              <Tag
                key={index}
                id={`section-${headerIndex}`}
                className={classes[level]}
              >
                {parse(sanitizedHTML, parseOptions)}
              </Tag>
            );
          }

          case "list": {
            const ListTag =
              block.data?.style === "ordered" ? "ol" : "ul";

            const items = Array.isArray(block.data?.items)
              ? block.data.items
              : [];

            return (
              <ListTag
                key={index}
                className={`mb-6 space-y-2 pl-6 text-gray-700 ${
                  block.data?.style === "ordered"
                    ? "list-decimal"
                    : "list-disc"
                }`}
              >
                {items.map((item, itemIndex) => {
                  const itemContent =
                    typeof item === "string"
                      ? item
                      : item?.content || "";

                  return (
                    <li key={itemIndex}>
                      {parse(
                        sanitize(itemContent),
                        parseOptions
                      )}
                    </li>
                  );
                })}
              </ListTag>
            );
          }

          case "image": {
            const imageUrl = block.data?.file?.url;

            if (!imageUrl) return null;

            const fullImageUrl = imageUrl.startsWith("http")
              ? imageUrl
              : `https://images.tiklo.in${imageUrl}`;

            return (
              <figure key={index} className="my-8">
                <img
                  src={fullImageUrl}
                  alt={block.data?.caption || ""}
                  loading="lazy"
                  className="w-full rounded-2xl shadow-sm"
                />

                {block.data?.caption && (
                  <figcaption className="mt-3 text-center text-sm italic text-gray-500">
                    {parse(
                      sanitize(block.data.caption),
                      parseOptions
                    )}
                  </figcaption>
                )}
              </figure>
            );
          }

          case "quote":
            return (
              <blockquote
                key={index}
                className="my-8 rounded-r-xl border-l-4 border-green-600 bg-green-50 px-5 py-4 text-lg italic text-gray-700"
              >
                {parse(sanitizedHTML, parseOptions)}
              </blockquote>
            );

          case "table": {
            const rows = Array.isArray(block.data?.content)
              ? block.data.content
              : [];

            return (
              <div
                key={index}
                className="my-8 overflow-x-auto rounded-2xl border border-gray-200"
              >
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={
                          rowIndex === 0
                            ? "bg-gray-100"
                            : "border-t border-gray-200"
                        }
                      >
                        {(Array.isArray(row) ? row : []).map(
                          (cell, cellIndex) => {
                            const CellTag =
                              rowIndex === 0 ? "th" : "td";

                            return (
                              <CellTag
                                key={cellIndex}
                                className="border-r border-gray-200 px-4 py-3 text-left last:border-r-0"
                              >
                                {parse(
                                  sanitize(cell || ""),
                                  parseOptions
                                )}
                              </CellTag>
                            );
                          }
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          case "linkTool": {
            const link = block.data?.link;

            if (!link) return null;

            return (
              <div key={index} className="my-6">
                <InlineLink href={link}>
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:bg-gray-100">
                    <div className="font-semibold text-gray-900">
                      {block.data?.meta?.title || link}
                    </div>

                    <div className="mt-1 truncate text-sm text-gray-500">
                      {link}
                    </div>
                  </div>
                </InlineLink>
              </div>
            );
          }

          // EditorJS code block containing a YouTube iframe.
          case "code": {
            const embedUrl = getYouTubeEmbedUrl(
              block.data?.code
            );

            if (!embedUrl) return null;

            return (
              <div
                key={index}
                className="my-8 overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-video w-full">
                  <iframe
                    src={embedUrl}
                    title={`YouTube video ${index + 1}`}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
