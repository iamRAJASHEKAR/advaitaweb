import { useEffect, useState } from "react";
import "./HeroSlider.css";
import type { HeroSlide } from "../../comms/types";
import { strings } from "../../comms/strings";

type HeroSliderProps = {
  slides: HeroSlide[];
  onPrimaryCta: () => void;
};

const SLIDE_INTERVAL_MS = 8000;

export function HeroSlider({ slides, onPrimaryCta }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [slides.length, isPaused]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const scrollToProducts = () => {
    document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero shell">
      <div
        className="hero-slider-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            role="button"
            tabIndex={0}
            className={`hero-slide ${index === currentSlide ? "hero-slide--active" : ""}`}
            onClick={scrollToProducts}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                scrollToProducts();
              }
            }}
          >
            <div className="hero-wrapper">
              <div className="hero-image">
                <img src={slide.image} alt={slide.title} />
              </div>
              <div className="hero-content">
                <h1 className="hero__title">{slide.title}</h1>
                <p className="hero__subtitle">{slide.subtitle}</p>
                <div className="hero__cta" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="btn btn--primary btn--lg"
                    onClick={onPrimaryCta}
                  >
                    {strings.hero.primaryCta}
                  </button>
                  <a className="btn btn--outline btn--lg" href="#solutions">
                    {strings.hero.secondaryCta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="hero-controls">
          <button
            className="hero-arrow hero-arrow--prev"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label={strings.hero.ariaPrev}
          >
            ‹
          </button>
          <button
            className="hero-arrow hero-arrow--next"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label={strings.hero.ariaNext}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
