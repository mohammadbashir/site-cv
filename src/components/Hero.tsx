import { motion } from 'framer-motion';
import { ArrowDown, FileText } from 'lucide-react';
import profileImage from '../assets/profile.jpg';
import cvPdf from '../assets/Mohamad_Bachir_Sidani_CV.pdf';

export default function Hero() {
  return (
    <section className="min-h-screen md:h-screen flex flex-col justify-center relative overflow-hidden bg-grid pt-24 pb-16 md:pt-0 md:pb-0">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-16">
          {/* Photo with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative flex-shrink-0"
          >
            <div className="relative">
              {/* Glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-full opacity-60"
                style={{
                  background: 'conic-gradient(from 0deg, #667eea, #764ba2, #6B8DD6, #8E37D7, #667eea)',
                  filter: 'blur(20px)',
                }}
              />
              <div className="relative w-[220px] h-[220px] sm:w-[240px] sm:h-[240px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-2 border-white/10">
                <img
                  src={profileImage}
                  alt="Mohamad Bachir Sidani"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="text-center lg:text-left flex-1">
            {/* Main headline - NAME FIRST */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight"
            >
              <span className="text-white">Mohamad Bachir</span>
              <br />
              <span className="gradient-text">Sidani</span>
            </motion.h1>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-xl md:text-2xl text-white/70 mb-6 font-medium"
            >
              Senior Software Engineer & Scrum Master
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/50 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              <span className="text-white/80">Pega architect at Murex</span> serving global financial institutions.
              <span className="text-white/80"> iOS tech lead</span> with 10+ published apps spanning government and consumer markets.
              <span className="text-white/80"> Scrum Master</span> transforming team velocity and delivery excellence.
            </motion.p>

            {/* Key highlights - impactful buzzwords */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10"
            >
              {[
                '10 Years at Murex',
                '11 Years iOS Lead',
                'Scaled Scrum Master',
                'PEGA System Architect',
                'Enterprise FinTech',
                '10+ Published Apps',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                href="#contact"
                className="btn-gradient px-7 py-3 rounded-full text-white text-base font-semibold relative z-10"
              >
                <span className="relative z-10">Get in Touch</span>
              </a>
              <a
                href={cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-7 py-3 rounded-full text-white/80 text-base font-medium border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
              >
                <FileText size={18} className="group-hover:scale-110 transition-transform" />
                Download CV
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - moved outside main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.a
          href="#highlights"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  );
}
