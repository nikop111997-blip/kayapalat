import { BabyIcon, Book } from "lucide-react";
import BookingComponent from "./Booking2Comp";

const lifestyleData = [
  {
    id: 1,
    title: "New Moms",
    description:
      "Motherhood brings beautiful changes, but it's important to take care of your own health, energy, and well-being too.",
    image:
      "https://images.pexels.com/photos/6151592/pexels-photo-6151592.jpeg",
    icon: "mom",
    href: "/wellness/new-moms",
  },
  {
    id: 2,
    title: "Homemakers",
    description:
      "You care for everyone at home. Now it's time to focus on yourself, build healthier habits, and make your well-being a priority.",
    image:
      "https://images.pexels.com/photos/39534839/pexels-photo-39534839.jpeg",
    icon: "home",
    href: "/wellness/homemakers",
  },
  {
    id: 3,
    title: "Busy Professionals",
    description:
      "Long working hours and busy schedules shouldn't come at the cost of your health. Find a practical approach to wellness that fits into your professional life.",
    image:
      "https://images.pexels.com/photos/8837155/pexels-photo-8837155.jpeg",
    icon: "briefcase",
    href: "/wellness/professionals",
  },
  {
    id: 4,
    title: "Business Owners",
    description:
      "Balancing business growth with personal well-being can be challenging. Build your energy, focus, and stamina with a wellness approach designed for your unique lifestyle.",
    image:
      "https://images.pexels.com/photos/7581111/pexels-photo-7581111.jpeg",
    icon: "business",
    href: "/wellness/business-owners",
  },
];

function LifestyleIcon({ type }) {
  const common = {
    width: 27,
    height: 27,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    mom: (
      <>
       <BabyIcon size={24} strokeWidth={1.7} />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v12h14V9M9 21v-7h6v7" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
    business: (
      <>
        <path d="M3 21h18M5 21V12h5v9M14 21V6h5v15M14 6l-2-3-2 3" />
        <path d="M7 15h1M7 18h1M16 10h1M16 14h1" />
      </>
    ),
  };

  return <svg {...common}>{icons[type]}</svg>;
}

export default function LifestyleSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#F8F7F4] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      

      <div className="mx-auto w-full max-w-[1400px]">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-5xl text-center">

          <span className="mb-4 inline-block font-[Manrope] text-xs font-extrabold tracking-[0.15em] text-neutral-600 sm:text-sm">
            FOR EVERY LIFE STAGE
          </span>

          <h2 className="font-[Manrope] text-3xl font-bold leading-[1.15] tracking-tight text-black sm:text-4xl lg:text-5xl">
            Every Lifestyle Is Different.
            <br />
            Your Wellness Journey Should Be Too.
          </h2>

          <div className="mx-auto mb-5 mt-3 h-1 w-40 -rotate-1 rounded-full bg-[#FFD200]" />

          <p className="mx-auto max-w-4xl text-sm leading-7 mb-4 text-neutral-700 sm:text-base">
            Whether you're embracing motherhood, managing your home,
            leading a busy career, or running a business, Kayapalat
            offers personalised wellness guidance designed around
            your lifestyle, goals, and everyday challenges.
          </p>
        </div>

        {/* Lifestyle Cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {lifestyleData.map((item) => (
            <article
              key={item.id}
              className="group min-w-0 overflow-hidden rounded-[22px] bg-white shadow-[0_5px_20px_rgba(0,0,0,0.09)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
            >

              {/* Card Image */}
              <div className="relative h-48 overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Card Content */}
              <div className="relative -mt-4 flex flex-col rounded-t-[20px] bg-white px-5 pb-6 pt-5">

                {/* Title and Icon */}
                <div className="flex min-h-[48px] items-center gap-3">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#FFD200]/50 bg-[#FFF8D8] text-black">
                    <LifestyleIcon type={item.icon} />
                  </div>

                  <div className="h-8 w-0.5 shrink-0 bg-[#FFD200]" />

                  <h3 className="font-[Manrope] text-lg font-extrabold leading-tight tracking-tight text-black sm:text-xl">
                    {item.title}
                  </h3>

                </div>

                {/* Description */}
                <p className="mb-5 mt-4 text-sm leading-[1.6] text-neutral-800">
                  {item.description}
                </p>

                {/* CTA */}
               <BookingComponent life={true} />

              </div>
            </article>
          ))}

        </div>
      </div>
    </section>
  );
}
