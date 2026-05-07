"use client";
import { useState } from "react";
import {
  Share2,
  Link as LinkIcon,
  Check
} from "lucide-react";

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);

  const shareData = { title, url };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) { console.log("Share failed", err); }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share URLs
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;

  return (
    <div className="flex items-center gap-3">
      {/* Mobile Native Share */}
      <button 
        onClick={handleShare}
        className="md:hidden p-2.5 bg-gray-100 rounded-full hover:bg-green-100 transition-colors text-gray-600 hover:text-green-600"
      >
        <Share2 className="w-4 h-4" />
      </button>

      {/* Desktop Individual Share Buttons */}
      <div className="hidden md:flex items-center gap-2">
        
        {/* WhatsApp */}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-100 rounded-full hover:bg-[#25D366] hover:text-white transition-all text-gray-600">
           <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.63 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>

        {/* X (formerly Twitter) */}
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-all text-gray-600">
           <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
             <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
           </svg>
        </a>

        {/* LinkedIn */}
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-gray-100 rounded-full hover:bg-[#0077b5] hover:text-white transition-all text-gray-600">
           <svg
  className="w-4 h-4 fill-current"
  viewBox="0 0 24 24"
>
  <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.345V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.269 2.37 4.269 5.455v6.286zM5.337 7.433a2.063 2.063 0 110-4.126 2.063 2.063 0 010 4.126zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
</svg>
        </a>

        {/* Copy Link */}
        <button onClick={copyToClipboard} className="p-2.5 bg-gray-100 rounded-full hover:bg-green-100 transition-all text-gray-600 group relative">
           {copied ? <Check className="w-4 h-4 text-green-600" /> : <LinkIcon className="w-4 h-4 group-hover:text-green-600" />}
           {copied && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded">Copied!</span>}
        </button>
        
      </div>
    </div>
  );
}