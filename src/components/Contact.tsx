import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Download, Linkedin, MapPin } from 'lucide-react';
import cvPdf from '../assets/Mohamad_Bachir_Sidani_CV.pdf';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center" ref={ref}>
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Let's</span>{' '}
            <span className="gradient-text">Talk</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/40 max-w-xl mx-auto">
            Ready to bring your next project to life? I'd love to hear from you.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="mailto:mohamadbachir.sidani@gmail.com"
            className="group btn-gradient px-10 py-5 rounded-full text-white text-xl font-semibold flex items-center gap-3"
          >
            <Mail size={24} className="group-hover:scale-110 transition-transform relative z-10" />
            <span className="relative z-10">Send Email</span>
          </a>
          <a
            href={cvPdf}
            download
            className="group flex items-center gap-3 px-10 py-5 rounded-full text-white/80 text-xl font-medium border-2 border-white/20 hover:border-purple-500/50 hover:bg-white/5 transition-all"
          >
            <Download size={24} className="group-hover:scale-110 transition-transform" />
            Download CV
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          <a
            href="https://linkedin.com/in/mohamadbachir"
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-4 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all group"
          >
            <Linkedin size={24} className="text-white/60 group-hover:text-purple-300 transition-colors" />
          </a>
          <a
            href="mailto:mohamadbachir.sidani@gmail.com"
            className="relative p-4 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all group"
          >
            <Mail size={24} className="text-white/60 group-hover:text-purple-300 transition-colors" />
          </a>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-2 text-white/30"
        >
          <MapPin size={16} />
          <span>Beirut, Lebanon</span>
          <span className="mx-2">|</span>
          <span>English & Arabic</span>
        </motion.div>

        {/* Footer separator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-24 mb-8"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-white/40 text-sm">
            © 2026 Mohamad Bachir Sidani
          </p>
        </motion.div>
      </div>
    </section>
  );
}
