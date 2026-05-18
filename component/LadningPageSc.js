
import Image from "next/image";
import BookingComponent from "./Booking2Comp";

export default function LandEaml() {


  return (
    <section className="w-full py-20 font-manrope bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center overflow-hidden ">

        {/* LEFT CONTENT */}
        <div className="p-8 md:p-14 order-2">

          {/* Heading */}
          <h1 className="text-[42px] md:text-[48px] leading-[1.1] font-semibold text-black tracking-tight">
            Become 1% Better Every Day
          </h1>

          {/* Description */}
          <p className="mt-5 text-[15px] md:text-[16px] font-semibold leading-[1.7] text-black/70 max-w-xl">
            Join Ajay Sethi and become part of the Kayapalat community built on
            sustainable fitness, mindset, and lifestyle transformation.
            <br />
            Get expert tips, motivation, and proven strategies from India’s
            Fitness Lifestyle Coach straight to your inbox.
          </p>

          {/* Form */}
       

            {/* Label */}
           
            {/* Button */}
            <div className="mt-6">
            <BookingComponent />
            </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center lg:justify-end">

          <div className="relative w-full sm:max-w-[620px] sm:h-[620px] rounded-[34px] overflow-hidden shadowl-lg px-4 sm:px-0">

            {/* IMAGE */}
            <Image
              src="https://framerusercontent.com/images/r2FhVdgJMrYitkn9QiMl0yyQOU.png?width=727&height=826"
              alt="Ajay Sethi"
              fill
              className="w-full h-full object-cover"
            />

            </div>
        </div>
      </div>
    </section>
  );
}