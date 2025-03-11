"use client";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

// Custom hook for advanced carousel configuration
export const useEnhancedCarousel = (options = {}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    ...options,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    scrollTo(selectedIndex);
  }, [scrollTo, selectedIndex]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Setup slides with proper 8/12 + 4/12 layout
  const setupSlidesLayout = useCallback(() => {
    if (!emblaApi) return;

    const slideNodes = emblaApi.slideNodes();
    const currentIndex = emblaApi.selectedScrollSnap();

    // Reset all slides
    slideNodes.forEach((slide) => {
      slide.classList.remove("embla__slide--active", "embla__slide--next");
      slide.style.flex = "0 0 83.333%"; // 10/12 default size (83.333%)
    });

    // Current slide (8/12)
    slideNodes[currentIndex]?.classList.add("embla__slide--active");

    // Next slide (4/12)
    const nextIndex = (currentIndex + 1) % slideNodes.length;
    slideNodes[nextIndex]?.classList.add("embla__slide--next");
  }, [emblaApi]);

  // Initialize
  useEffect(() => {
    if (!emblaApi) return;

    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setupSlidesLayout();
    };

    emblaApi.on("init", onInit);
    emblaApi.on("reInit", onInit);
    emblaApi.on("select", onSelect);
    emblaApi.on("select", setupSlidesLayout);

    onInit();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("select", setupSlidesLayout);
    };
  }, [emblaApi, onSelect, setupSlidesLayout]);

  // Apply tween effect when sliding
  const applyTweenEffect = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.on("scroll", () => {
      // Get current scroll progress
      const progress = emblaApi.scrollProgress();
      const slideNodes = emblaApi.slideNodes();
      const scrollSnaps = emblaApi.scrollSnapList();

      // Apply transforms based on scroll progress
      slideNodes.forEach((slide, index) => {
        const slideProgress = progress - (scrollSnaps[index] || 0);
        const absProgress = Math.abs(slideProgress);

        // Scale effect - items get slightly smaller as they move away
        const scale = 1 - Math.min(absProgress * 0.15, 0.15);

        // Opacity effect - items fade slightly as they move away
        const opacity = 1 - Math.min(absProgress * 0.5, 0.5);

        // Apply transforms
        slide.style.transform = `scale(${scale})`;
        slide.style.opacity = String(opacity);
      });
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    applyTweenEffect();
  }, [emblaApi, applyTweenEffect]);

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    scrollSnaps,
    scrollTo,
  };
};
