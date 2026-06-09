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

export default function EditorRenderer({ content }) {
  if (!content?.blocks) return null;

  const headerBlocks = content.blocks.filter(
    (b) => b.type === "header"
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
                className="text-[17px] leading-8 text-gray-700 mb-5"
              >
                {parse(sanitizedHTML, parseOptions)}
              </div>
            );

          case "header": {
            const Tag = `h${block.data.level}`;
            const headerIndex =
              headerBlocks.indexOf(block);

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
                className={
                  classes[block.data.level] ||
                  classes[2]
                }
              >
                {parse(sanitizedHTML, parseOptions)}
              </Tag>
            );
          }

          case "list":
            const ListTag =
              block.data.style === "ordered"
                ? "ol"
                : "ul";

            return (
              <ListTag
                key={index}
                className={`pl-6 mb-6 space-y-2 text-gray-700 ${
                  block.data.style === "ordered"
                    ? "list-decimal"
                    : "list-disc"
                }`}
              >
                {block.data.items.map((item, i) => (
                  <li key={i}>
                    {parse(
                      sanitize(
                        item.content || item
                      ),
                      parseOptions
                    )}
                  </li>
                ))}
              </ListTag>
            );

          case "image":
            return (
              <figure
                key={index}
                className="my-8"
              >
                <img
                  src={`https://images.tiklo.in${block.data.file.url}`}
                  alt={
                    block.data.caption || ""
                  }
                  className="w-full rounded-2xl shadow-sm"
                />

                {block.data.caption && (
                  <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                    {parse(
                      sanitize(
                        block.data.caption
                      ),
                      parseOptions
                    )}
                  </figcaption>
                )}
              </figure>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-green-600 bg-green-50 px-5 py-4 my-8 rounded-r-xl italic text-lg text-gray-700"
              >
                {parse(
                  sanitizedHTML,
                  parseOptions
                )}
              </blockquote>
            );

          case "table":
            return (
              <div
                key={index}
                className="overflow-x-auto my-8 rounded-2xl border border-gray-200"
              >
                <table className="w-full border-collapse text-sm">
                  <tbody>
                    {block.data.content.map(
                      (row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={
                            rowIndex === 0
                              ? "bg-gray-100"
                              : "border-t border-gray-200"
                          }
                        >
                          {row.map(
                            (
                              cell,
                              cellIndex
                            ) => {
                              const CellTag =
                                rowIndex === 0
                                  ? "th"
                                  : "td";

                              return (
                                <CellTag
                                  key={
                                    cellIndex
                                  }
                                  className="px-4 py-3 border-r border-gray-200 last:border-r-0 text-left"
                                >
                                  {parse(
                                    sanitize(
                                      cell
                                    ),
                                    parseOptions
                                  )}
                                </CellTag>
                              );
                            }
                          )}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            );

          case "linkTool":
            return (
              <div
                key={index}
                className="my-6"
              >
                <InlineLink
                  href={block.data.link}
                >
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition">
                    <div className="font-semibold text-gray-900">
                      {block.data.meta
                        ?.title ||
                        block.data.link}
                    </div>

                    <div className="text-sm text-gray-500 mt-1 truncate">
                      {block.data.link}
                    </div>
                  </div>
                </InlineLink>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}