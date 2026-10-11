"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ArrowUp } from "lucide-react";

/**
 * Scroll progress bar, plus:
 *  - mobile: a sticky "Let's work together" bar once the hero is passed
 *  - desktop: a back-to-top button
 * Both hide while the contact section is on screen.
 */
export function FloatingActions() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const contact = document.getElementById("contact");
    let obs: IntersectionObserver | undefined;
    if (contact) {
      obs = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting), { threshold: 0.05 });
      obs.observe(contact);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs?.disconnect();
    };
  }, []);

  const show = pastHero && !contactVisible;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-primary to-signal"
      />

      <AnimatePresence>
        {show && (
          <motion.div
            key="mobile-cta"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-x-4 bottom-4 z-50 md:hidden"
          >
            <a href="#contact" className="btn-glow w-full">
              Let&apos;s Work Together
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        )}
        {show && (
          <motion.button
            key="to-top"
            type="button"
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            whileHover={{ y: -3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="glass-strong fixed bottom-8 right-8 z-50 hidden h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
