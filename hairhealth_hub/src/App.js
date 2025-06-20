import React, { useState } from "react";
import MultiStepHairProfileForm from "./MultiStepHairProfileForm";

// PUBLIC_INTERFACE
function Carousel({ items }) {
  const [current, setCurrent] = useState(0);

  // Adjust the visible count for responsiveness if needed
  const visibleCount = 1;

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative bg-white rounded-xl shadow p-5 flex flex-col items-center" style={{ minHeight: 260 }}>
      <h3 className="text-lg font-semibold text-[#4A90E2] mb-2">Trending Hairstyles</h3>
      <div className="flex items-center gap-3 w-full justify-center">
        <button
          aria-label="Prev"
          className="bg-[#50E3C2]/20 text-[#50E3C2] hover:bg-[#50E3C2] hover:text-white rounded-full p-2 transition"
          onClick={prevSlide}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M13 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        {items.slice(current, current + visibleCount).map((item, idx) => (
          <div
            key={item.title}
            className="flex flex-col items-center w-60"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-40 h-32 object-cover rounded-lg mb-2"
              style={{ background: "#F2F6FA" }}
            />
            <div className="text-[#4A90E2] font-medium">{item.title}</div>
            <div className="text-gray-500 text-sm">{item.desc}</div>
          </div>
        ))}
        <button
          aria-label="Next"
          className="bg-[#50E3C2]/20 text-[#50E3C2] hover:bg-[#50E3C2] hover:text-white rounded-full p-2 transition"
          onClick={nextSlide}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M7 15l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
      <div className="flex gap-1 mt-2">
        {items.map((_, i) => (
          <span
            key={i}
            className={`rounded-full w-2 h-2 ${i === current ? "bg-[#F5A623]" : "bg-gray-200"}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function Testimonials({ testimonials }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-10">
      <h3 className="text-lg font-semibold text-[#4A90E2] mb-4">What Users Are Saying</h3>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="bg-[#F2F6FA] rounded-lg px-5 py-4 flex-1 flex flex-col items-center"
          >
            <div className="text-[#4A90E2] text-xl mb-2">“</div>
            <p className="text-gray-800 text-center italic">{t.quote}</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#50E3C2] flex items-center justify-center text-white font-bold text-sm">
                {t.name.slice(0, 1)}
              </div>
              <div className="text-sm font-medium text-[#4A90E2]">{t.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Placeholder data
const carouselData = [
  {
    title: "Sleek Ponytail",
    desc: "A chic look for busy days.",
    img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=400&q=80"
  },
  {
    title: "Natural Curls",
    desc: "Embrace your bounce.",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&q=80"
  },
  {
    title: "Beach Waves",
    desc: "Carefree, sun-kissed routine.",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&q=80"
  }
];

const testimonialsData = [
  {
    quote:
      "Hairfit helped me finally find a hair routine that works for my unique hair type. The recommendations are so on-point!",
    name: "Taylor"
  },
  {
    quote: "My hair has never felt healthier. I love how easy it is to discover new routines on Hairfit!",
    name: "Jordan"
  }
];

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="min-h-screen bg-[#F8FBFD] text-[#222] font-sans">
      <nav className="w-full bg-white shadow-sm fixed top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-[#4A90E2] text-lg select-none">
            <span className="w-2.5 h-2.5 bg-[#4A90E2] rounded-full"></span> Hairfit
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-10 flex flex-col items-center min-h-[86vh]">
        <section className="w-full px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 text-sm rounded-full bg-[#50E3C2] text-white mb-4 font-medium shadow-sm">
              The Modern Way to Haircare
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#222] mb-5 leading-tight">
              Your Hair. Your Routine. <span className="text-[#4A90E2]">Perfected.</span>
            </h1>
            <p className="text-lg text-gray-500 mb-7 font-normal">
              Discover personalized hair routines tailored to your unique needs. Embrace healthy, beautiful hair—made simple.
            </p>
            {/* Multi-step form appears inline instead of finder button. */}
            <div className="flex flex-col items-center w-full mt-6">
              <MultiStepHairProfileForm />
            </div>
          </div>
        </section>

        <section className="w-full max-w-2xl mx-auto mt-12 px-4">
          <Carousel items={carouselData} />
        </section>

        <section className="w-full max-w-3xl mx-auto mt-12 px-4">
          <Testimonials testimonials={testimonialsData} />
        </section>
      </main>

      <footer className="text-center py-5 bg-[#F8FBFD] text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} Hairfit &mdash; All Rights Reserved
      </footer>
    </div>
  );
}

export default App;
