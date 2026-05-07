"use client";
import { useState, useRef } from "react";
import DOMPurify from "isomorphic-dompurify";
import parse, { domToReact } from "html-react-parser";

// 🔐 Secure sanitizer
const sanitize = (html) =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "b", "i", "em", "strong", "u", "mark", "a", "p", "br", "ul", "ol", "li",
      "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "tbody", "tr", "td"
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "id"],
  });

// --- Link Preview Sub-Component ---
function InlineLinkPreview({ href, children }) {
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef(null);

  const fetchPreview = async () => {
    if (data || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/link-preview?url=${encodeURIComponent(href)}`);
      const json = await res.json();
      setData(json);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      fetchPreview();
    }, 400);
  };

  const handleLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  return (
    <span className="relative inline" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold underline decoration-green-600/30 hover:decoration-green-600 transition-all">
        {children}
      </a>
      {isVisible && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 z-[100] bg-white rounded-xl shadow-2xl border border-gray-100 p-3 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none block">
          {loading && !data && (
             <span className="flex items-center gap-2 py-2 justify-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Unfurling...</span>
          )}
          {data && (
            <span className="flex flex-col gap-2">
              {data.image && <img src={data.image} alt="" className="w-full aspect-video object-cover rounded-lg" />}
              <span className="block space-y-1">
                <span className="block text-[10px] text-green-600 font-black uppercase tracking-widest">{data.domain}</span>
                <span className="block text-sm font-bold text-gray-900 line-clamp-2 leading-tight">{data.title}</span>
              </span>
            </span>
          )}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 border-8 border-transparent border-t-white" />
        </span>
      )}
    </span>
  );
}

// --- Main Renderer ---
export default function EditorRenderer({ content }) {
  if (!content?.blocks) return null;

  const headerBlocks = content.blocks.filter((b) => b.type === "header");

  // Parser options to replace <a> tags with our Preview component
  const parseOptions = {
    replace: (domNode) => {
      if (domNode.name === "a" && domNode.attribs.href) {
        return (
          <InlineLinkPreview href={domNode.attribs.href}>
            {domToReact(domNode.children, parseOptions)}
          </InlineLinkPreview>
        );
      }
    },
  };

  return (
    <div className="max-w-none text-gray-800 space-y-4">
      {content.blocks.map((block, index) => {
        const sanitizedHTML = block.data.text ? sanitize(block.data.text) : "";

        switch (block.type) {
          case "paragraph":
            return (
              <div key={index} className="text-[17px] leading-7 text-gray-700 mb-4">
                {parse(sanitizedHTML, parseOptions)}
              </div>
            );

          case "header":
            const Tag = `h${block.data.level}`;
            const headerIndex = headerBlocks.indexOf(block);
            return (
              <Tag
                key={index}
                id={`section-${headerIndex}`}
                className="text-lg mt-8 mb-3 text-gray-900 tracking-tight leading-tight scroll-mt-24"
              >
                {parse(sanitizedHTML, parseOptions)}
              </Tag>
            );

          case "list":
            const ListTag = block.data.style === "ordered" ? "ol" : "ul";
            return (
              <ListTag key={index} className={`pl-6 mb-5 space-y-2 ${block.data.style === "ordered" ? "list-decimal" : "list-disc"}`}>
                {block.data.items.map((item, i) => (
                  <li key={i} className="text-gray-700">
                    {parse(sanitize(item.content || item), parseOptions)}
                  </li>
                ))}
              </ListTag>
            );

          case "image":
            return (
              <div key={index} className="my-6">
                <img src={`https://images.tiklo.in${block.data.file.url}`} alt={block.data.caption || ""} className="rounded-xl w-full" />
                {block.data.caption && (
                  <p className="text-xs text-gray-400 text-center mt-2 italic">
                    {parse(sanitize(block.data.caption), parseOptions)}
                  </p>
                )}
              </div>
            );

          case "linkTool":
            return (
              <div key={index} className="my-6">
                <InlineLinkPreview href={block.data.link}>
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors">
                    {block.data.meta?.title || block.data.link}
                  </div>
                </InlineLinkPreview>
              </div>
            );

          case "quote":
            return (
              <blockquote key={index} className="border-l-4 border-green-600 bg-green-50/30 pl-5 py-4 my-6 rounded-r-lg italic text-lg">
                {parse(sanitizedHTML, parseOptions)}
              </blockquote>
            );
            case "table":
  return (
    <div
      key={index}
      className="my-6 overflow-x-auto rounded-2xl border border-gray-200"
    >
      <table className="w-full border-collapse text-sm">
        <tbody>
          {block.data.content.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={
                rowIndex === 0
                  ? "bg-gray-100"
                  : "border-t border-gray-200"
              }
            >
              {row.map((cell, cellIndex) => {
                const CellTag =
                  rowIndex === 0 ? "th" : "td";

                return (
                  <CellTag
                    key={cellIndex}
                    className="px-4 py-3 text-left border-r border-gray-200 last:border-r-0"
                  >
                    {parse(
                      sanitize(cell),
                      parseOptions
                    )}
                  </CellTag>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
          default:
            return null;
        }
      })}
    </div>
  );
}