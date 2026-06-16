import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function IBW() {
  const photos = [
    { id: 1, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28395%29.jpg", name: "Achiever One" },
    { id: 2, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28396%29.jpg", name: "Achiever Two" },
    { id: 3, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28398%29.jpg", name: "Achiever Three" },
    { id: 4, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28401%29.jpg", name: "Achiever Four" },
    { id: 5, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28404%29.jpg", name: "Achiever Five" },
    { id: 6, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28405%29.jpg", name: "Achiever Six" },
    { id: 7, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28410%29.jpg", name: "Achiever Seven" },
    { id: 8, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28467%29.jpg", name: "Achiever Eight" },
    { id: 9, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28471%29.jpg", name: "Achiever Nine" },
    { id: 10, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28475%29.jpg", name: "Achiever Ten" },
    { id: 11, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28478%29.jpg", name: "Achiever Eleven" },
    { id: 12, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28453%29.jpg", name: "Achiever Twelve" },
    { id: 13, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28457%29.jpg", name: "Achiever Thirteen" },
    { id: 14, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28458%29.jpg", name: "Achiever Fourteen" },
    { id: 15, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW/2%20%28466%29.jpg", name: "Achiever Fifteen" },
    { id: 16, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1851.jpg", name: "Achiever One" },
    { id: 21, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1846.jpg", name: "Achiever Two" },
    { id: 33, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1842.jpg", name: "Achiever Three" },
    { id: 42, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1839.jpg", name: "Achiever Four" },
    { id: 54, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1837.jpg", name: "Achiever Five" },
    { id: 60, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1834.jpg", name: "Achiever Six" },
    { id: 71, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1827.jpg", name: "Achiever Seven" },
    { id: 85, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1823.jpg", name: "Achiever Eight" },
    { id: 95, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1818.jpg", name: "Achiever Nine" },
    { id: 18, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1813.jpg", name: "Achiever Ten" },
    { id: 19, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1811.jpg", name: "Achiever Eleven" },
    { id: 25, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1809.jpg", name: "Achiever Twelve" },
    { id: 39, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1806.jpg", name: "Achiever Thirteen" },
    { id: 46, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1802.jpg", name: "Achiever Fourteen" },
    { id: 53, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1796.jpg", name: "Achiever Fifteen" },
    
    { id: 850, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1744.jpg", name: "Achiever Eleven" },
    { id: 250, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1773.jpg", name: "Achiever Twelve" },
    { id: 390, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1775.jpg", name: "Achiever Thirteen" },
    { id: 460, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1777.jpg", name: "Achiever Fourteen" },
    { id: 530, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW2/DSC_1779.jpg", name: "Achiever Fifteen" },
     { id: 8500, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1798.jpg", name: "Achiever Eleven" },
    { id: 2500, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1803.jpg", name: "Achiever Twelve" },
    { id: 3900, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1805.jpg", name: "Achiever Thirteen" },
    { id: 4600, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1810.jpg", name: "Achiever Fourteen" },
    { id: 5300, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1818.jpg", name: "Achiever Fifteen" },
     { id: 8501, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1819.jpg", name: "Achiever Eleven" },
    { id: 2501, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1829.jpg", name: "Achiever Twelve" },
    { id: 3901, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1837.jpg", name: "Achiever Thirteen" },
    { id: 4601, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1848.jpg", name: "Achiever Fourteen" },
    { id: 5301, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1885.jpg", name: "Achiever Fifteen" },
     { id: 8502, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1881.jpg", name: "Achiever Eleven" },
    { id: 2502, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1870.jpg", name: "Achiever Twelve" },
    { id: 3902, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1850.jpg", name: "Achiever Thirteen" },
    { id: 4602, src: "https://yjepfzir0vaqgtoy.public.blob.vercel-storage.com/IBW3/DSC_1866.jpg", name: "Achiever Fourteen" },
  ];

  return (
    <section className="w-full min-h-screen px-4 md:px-8 py-20 bg-gray-50/50">
      <div className="max-w-[1700px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-16 mb-16">
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-sm border border-gray-100 mb-6">
              <svg
                className="w-4 h-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>

              <span className="text-sm font-semibold text-gray-800 tracking-wide">
                Testimonials
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[48px] font-bold text-gray-900 leading-[1.1]">
              Idol Body Weight
              <br className="hidden md:block" />
              Achiever
            </h2>
          </div>

          <div className="flex-1 max-w-xl lg:pl-8">
            <p className="text-gray-800 font-semibold text-md leading-relaxed mb-4">
              Kayapalat has helped individuals across the globe enhance their
              health performance and achieve their wellness goals.
            </p>

            <Link href={'/pricing'} className="bg-black hover:bg-[#262627] mt-4 text-white font-semibold py-3.5 px-8 rounded-lg shadow-lg shadow-gray-500/30 transition-all duration-300 hover:-translate-y-1">
              Connect Now
            </Link>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative overflow-hidden rounded-xl h-[340px] bg-white shadow-sm"
            >
              <div className="absolute inset-0 rotate-[-90deg] scale-[1.55]">
                <Image
                  src={photo.src}
                  alt={photo.name}
                  fill
                  sizes="(max-width:768px) 100vw,
                         (max-width:1024px) 50vw,
                         (max-width:1280px) 25vw,
                         20vw"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}