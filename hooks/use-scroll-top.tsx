import { useState, useEffect } from "react";

export const useScrollTop = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll",handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

    return scrolled;
};

// what does this hook do
// this hook returns a boolean value that indicates whether the user has scrolled past a certain threshold
// so we can style the navbar differently when the user has scrolled past a certain point