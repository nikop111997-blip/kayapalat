import Link from 'next/link';

export default function BlogHeader() {
  return (
    <section className="relative w-full h-[150px] md:h-[140px] font-manrope flex flex-col justify-center items-center bg-[#FAF8F5] overflow-hidden text-center">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("http://localhost:3000/blog-header.jpg")' }} // <- Replace with your image path
      />

      {/* Black Overlay Layer (50% opacity for contrast) */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Content Container (Title and Breadcrumbs) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 text-base tracking-wide">
          <ol className="flex items-center space-x-2 text-white">
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
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight text-left">
          Our Blogs
        </h1>
        
      </div>
    </section>
  );
}