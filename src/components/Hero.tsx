import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import profileImage from '../assets/profile.jpg';
import cvPdf from '../assets/Mohamad_Bachir_Sidani_CV.pdf';
import { profile, links } from '../data/profile';

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

export default function Hero() {
  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div {...fade(0)} className="mb-10">
          <span className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[color:var(--color-ink-mute)]">
            {profile.currentlyLine}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
          <motion.div {...fade(0.05)} className="order-2 lg:order-1">
            <div className="photo-plate">
              <img
                src={profileImage}
                alt={profile.name}
                className="w-full h-auto block aspect-[4/5] object-cover object-center"
              />
            </div>
          </motion.div>

          <div className="order-1 lg:order-2">
            <motion.h1
              {...fade(0.1)}
              className="font-display text-[2.6rem] sm:text-[3.4rem] md:text-[4.2rem] lg:text-[5rem] xl:text-[5.6rem] leading-[0.96] text-[color:var(--color-ink)]"
              style={{ fontVariationSettings: "'opsz' 144, 'wght' 600" }}
            >
              {profile.name}
            </motion.h1>

            <motion.div {...fade(0.18)}>
              <hr className="rule-red mt-6 mb-6 max-w-[8rem]" />
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-[color:var(--color-ink-mute)] mb-8">
                {profile.title}
              </p>
            </motion.div>

            <motion.p
              {...fade(0.26)}
              className="font-body text-xl md:text-[1.4rem] leading-[1.55] text-[color:var(--color-ink-soft)] max-w-[44ch]"
              style={{ fontVariationSettings: "'opsz' 36, 'wght' 400" }}
            >
              {profile.deck}
            </motion.p>

            <motion.div
              {...fade(0.36)}
              className="font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[color:var(--color-ink-mute)] mt-10 flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              {profile.dateline.map((item, i) => (
                <span key={item} className="flex items-center gap-x-3">
                  {i > 0 ? <span className="text-[color:var(--color-ink-faint)]">/</span> : null}
                  <span>{item}</span>
                </span>
              ))}
            </motion.div>

            <motion.div {...fade(0.46)} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href={cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-resume group inline-flex items-center gap-2.5 px-6 py-3 bg-[color:var(--color-accent-red)] text-[color:var(--color-paper)] hover:bg-[color:var(--color-accent-red-hover)] font-body text-base font-medium"
              >
                <Download
                  size={15}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 ease-out group-hover:translate-y-[2px]"
                />
                <span>Download résumé</span>
              </a>
              <a href={links.email} className="link-quiet font-body text-base">
                Email
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-quiet font-body text-base"
              >
                LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
