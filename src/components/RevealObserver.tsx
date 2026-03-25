'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Observe toutes les sections de la page (sauf la première — hero)
 * et ajoute la class `in-view` quand elles entrent dans le viewport.
 * Les grilles avec `.stagger-children` ont leurs enfants stagés en CSS.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -44px 0px' }
    );

    // Petit délai pour laisser la nouvelle page se rendre
    const timer = setTimeout(() => {
      const sections = Array.from(document.querySelectorAll('main > section'));
      sections.forEach((section, index) => {
        if (index === 0) return; // hero déjà visible
        section.classList.add('will-reveal');
        observer.observe(section);
      });
    }, 60);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      // Nettoyage des classes pour la prochaine route
      document.querySelectorAll('main > section.will-reveal').forEach((el) => {
        el.classList.remove('will-reveal', 'in-view');
      });
    };
  }, [pathname]);

  return null;
}
