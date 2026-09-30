import Link from 'next/link';

export default function BlogHeader() {
  return (
    <section className="relative w-full h-[150px] md:h-[90px] font-manrope flex flex-col justify-center items-center bg-[#FAF8F5] dark:bg-neutral-900 overflow-hidden text-center">

      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0 bg-cover object-contain object-top bg-center opacity-25"
        style={{ backgroundImage: 'url("/blog.jpg")' }} // <- Replace with your image path
      />

      {/* Dark overlay so the white text is readable (change /55 to make it lighter or darker) */}
      <div className="absolute inset-0 z-10 bg-black/0" />

      {/* Content Container (Title and Breadcrumbs) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6">

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-0 text-base tracking-wide">
          <ol className="flex items-center space-x-2 text-black">
            <li className="opacity-80">
              <Link href="/" className="hover:underline transition-all">Home</Link>
            </li>
            <span className="opacity-80">/</span>
            <li className="font-semibold" aria-current="page">
              Blogs
            </li>
          </ol>
        </nav>

        {/* Page Title */}
        <h1 className="text-3xl md:text-2xl font-bold text-black tracking-tight text-left">
          Kayapalat Blogs
        </h1>

      </div>
    </section>
  );
}