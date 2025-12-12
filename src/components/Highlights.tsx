import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { value: 5000, suffix: '+', label: 'App Reviews', detail: '4.8★ rating on App Store' },
  { value: 10, suffix: '+', label: 'Published Apps', detail: 'iOS App Store' },
  { value: 11, suffix: '+', label: 'Years Experience', detail: 'Enterprise & Mobile' },
  { value: 8, suffix: '+', label: 'Engineers Led', detail: 'Scrum Master' },
];

const expertise = [
  {
    title: 'Enterprise Systems',
    description: 'Built CRM platforms from scratch serving global organizations',
    tech: 'Pega CSA/CSSA, Spring Boot, Microservices',
  },
  {
    title: 'iOS App Development',
    description: 'Shipped apps with 5,000+ reviews, telehealth platforms, and SaaS products',
    tech: 'Swift, SwiftUI, StoreKit 2, Firebase',
  },
  {
    title: 'Team Leadership',
    description: 'Led 8-person teams delivering complex projects on time',
    tech: 'Scrum Master, SAFe, Mentorship',
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Highlights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="highlights" className="py-32 relative overflow-hidden">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-white">Track</span>{' '}
            <span className="gradient-text">Record</span>
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto">
            Real projects. Real impact. Real results.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="gradient-border p-8 text-center group hover:bg-white/5 transition-colors"
            >
              <div className="font-bold gradient-text mb-2" style={{ fontSize: 'clamp(2.5rem, 18cqi, 3.5rem)' }}>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-lg font-medium text-white mb-1">{stat.label}</div>
              <div className="text-sm text-white/40">{stat.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* Expertise cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {expertise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all"
            >
              <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                {item.title}
              </h3>
              <p className="text-white/60 mb-4">{item.description}</p>
              <p className="text-sm text-white/30">{item.tech}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-block max-w-3xl">
            <div className="relative">
              <svg className="absolute -top-3 -left-1 w-10 h-10 text-purple-500/20" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z"/>
              </svg>
              <p className="text-2xl md:text-3xl text-white/70 italic font-light leading-relaxed px-6">
                The kind of engineer who makes everyone around him better through clean architecture, clear communication, and a genuine passion for solving hard problems.
              </p>
              <svg className="absolute -bottom-3 -right-1 w-10 h-10 text-purple-500/20 rotate-180" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z"/>
              </svg>
            </div>
            {/* <p className="mt-6 text-white/40 font-medium text-sm">
              — Murex Lebanon
            </p> */}
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </section>
  );
}
