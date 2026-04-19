/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';

export default function App() {
  const [email, setEmail] = useState('');
  const videoSectionRef = useRef<HTMLElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start end", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  // Sync scroll to video time
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoElementRef.current) {
      const duration = videoElementRef.current.duration;
      if (duration > 0 && isFinite(duration)) {
        videoElementRef.current.currentTime = latest * duration;
      }
    }
  });

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `/signup?email=${encodeURIComponent(email)}`;
    }
  };

  return (
    <div className="min-h-screen selection:bg-amber-accent selection:text-navy flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-navy/90 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="font-display text-xl font-black text-amber-accent tracking-widest uppercase">
          FirePrep
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-1.5 text-white/70 text-xs font-bold uppercase hover:text-white transition-all duration-300">
            Sign In
          </button>
          <button className="px-5 py-1.5 bg-amber-accent text-navy text-xs font-bold uppercase hover:bg-amber-400 transition-all duration-300">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section - Above the Fold */}
      <section className="relative h-screen min-h-[40rem] flex items-center justify-center overflow-hidden border-b border-white/5 bg-navy">
        {/* Background Grid */}
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 md:px-12 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Column: Content */}
            <div className="space-y-8 mt-12 lg:mt-0">
              <div className="font-mono text-[10px] text-amber-accent/50 tracking-[0.3em] uppercase">
                [ Protocol: Active Preparation ]
              </div>
              
              <h1 className="max-w-2xl leading-none">
                The oral board <br />
                is where you <br />
                <span className="text-amber-accent italic">fail.</span>
              </h1>
              
              <p className="text-lg md:text-xl font-light text-white/70 max-w-xl leading-relaxed">
                Most candidates get eliminated not for lack of skill, but for lack of structured preparation. 
                Simulate panels and get graded against the exact criteria evaluators use.
              </p>
              
              <div className="space-y-4 max-w-md">
                <form onSubmit={handleSignUp} className="flex flex-col sm:flex-row gap-0 border border-white/10 group focus-within:border-amber-accent transition-all duration-300">
                  <input
                    type="email"
                    placeholder="name@fire.gov"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/5 px-6 py-4 focus:outline-none text-white text-base placeholder:text-white/20"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-amber-accent text-navy font-black px-8 py-4 text-base uppercase tracking-widest hover:bg-amber-400 transition-all duration-300"
                  >
                    Sign Up
                  </button>
                </form>
                <div className="flex items-center gap-2 font-mono text-[9px] tracking-widest text-white/30 uppercase">
                  <span className="w-1.5 h-1.5 bg-amber-accent rounded-full animate-pulse" />
                  Live: AI panel simulation ready
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image */}
            <div className="hidden lg:block relative h-[60vh] w-full self-end overflow-hidden">
              <img 
                src="https://rsxtgvhubpuujtdsbvtj.supabase.co/storage/v1/object/public/landing%20page/Screenshot%202026-04-19%20at%209.04.21%20AM.png" 
                alt="Firefighters on scene" 
                className="w-full h-full object-contain"
                style={{
                  maskImage: 'radial-gradient(circle, black 40%, rgba(0,0,0,0.5) 60%, transparent 80%)',
                  WebkitMaskImage: 'radial-gradient(circle, black 40%, rgba(0,0,0,0.5) 60%, transparent 80%)',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskSize: '100% 100%',
                  WebkitMaskSize: '100% 100%',
                  backgroundColor: 'transparent'
                }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 opacity-30">
            <span className="font-mono text-[8px] uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-8 bg-white/20" />
          </div>
        </div>
      </section>

      {/* Section 2: Challenge & Solution - Sleek Card Design */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-navy border-y border-white/5">
        <div className="max-w-[85rem] mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Card: The Challenge */}
          <div className="bg-white/[0.02] border border-white/5 p-10 md:p-14 flex flex-col gap-12 group hover:bg-white/[0.04] transition-all duration-500">
            <h2 className="text-3xl md:text-5xl text-white">The Challenge</h2>
            
            <div className="space-y-10">
              <div className="space-y-3">
                <div className="w-8 h-px bg-red-500/30 group-hover:w-16 transition-all duration-700" />
                <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light">
                  Scoring criteria remain a mystery to most applicants, leaving them guessing what the panel actually wants to hear.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-8 h-px bg-red-500/30 group-hover:w-16 transition-all duration-700" />
                <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light">
                  Objective feedback is rare, often arriving far too late to make any meaningful corrections before the final board.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-8 h-px bg-red-500/30 group-hover:w-16 transition-all duration-700" />
                <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light">
                  Weaknesses are only exposed during the actual interview, where the cost of failure is the loss of a career opportunity.
                </p>
              </div>
            </div>
          </div>

          {/* Card: The Solution */}
          <div className="bg-white/[0.03] border border-amber-accent/20 p-10 md:p-14 flex flex-col gap-12 group hover:bg-white/[0.05] transition-all duration-500 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-accent/5 blur-3xl rounded-full" />
            <h2 className="text-3xl md:text-5xl text-white relative z-10">The Solution</h2>
            
            <div className="space-y-10 relative z-10">
              <div className="space-y-3">
                <div className="w-8 h-px bg-amber-accent/50 group-hover:w-16 transition-all duration-700" />
                <p className="text-lg md:text-xl text-amber-accent leading-relaxed font-light">
                  Responses mapped directly to official departmental rubrics, providing the exact blueprint for successful scoring.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-8 h-px bg-amber-accent/50 group-hover:w-16 transition-all duration-700" />
                <p className="text-lg md:text-xl text-amber-accent leading-relaxed font-light">
                  Instant AI-powered grading provides high-fidelity assessment of your performance in real-time, every session.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-8 h-px bg-amber-accent/50 group-hover:w-16 transition-all duration-700" />
                <p className="text-lg md:text-xl text-amber-accent leading-relaxed font-light">
                  Criterion-level data pinpointing exactly where your answers lose points before you ever sit in front of a live panel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cinematic Break - Direct Video Background with Scroll-Synced Playback */}
      <section 
        ref={videoSectionRef}
        className="relative h-[40vh] min-h-[25rem] w-full overflow-hidden flex items-center justify-center bg-navy"
      >
        <motion.div 
          style={{ scale: videoScale, opacity: videoOpacity }}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black"
        >
          {/* Direct Video Element for Instant Scroll Sync */}
          <video
            ref={videoElementRef}
            src="https://rsxtgvhubpuujtdsbvtj.supabase.co/storage/v1/object/public/landing%20page/Firefly%20use%20the%20attached%20image%20to%20animate%20the%20fire%20and%20smoke%20679058.mp4"
            className="absolute w-full h-full object-cover pointer-events-none opacity-90"
            muted
            playsInline
            preload="auto"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-navy/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/40" />
        
        <div className="relative z-10 max-w-6xl px-8 text-center space-y-6">
          <h2 className="text-white leading-none drop-shadow-2xl">
            THE INTERVIEW <br />
            IS THE <span className="text-amber-accent italic">FINAL</span> <br />
            OBSTACLE.
          </h2>
        </div>
      </section>

      {/* Who It's For - Advanced Cards */}
      <section className="py-24 md:py-32 px-8 md:px-16 flex flex-col lg:flex-row gap-8 bg-navy relative overflow-hidden items-center justify-center">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-accent/5 blur-3xl rounded-full" />
        
        {/* Entry-Level */}
        <div className="relative group p-8 md:p-12 bg-white/[0.02] border border-white/5 hover:border-amber-accent/50 transition-all duration-700 overflow-hidden max-w-xl flex-1">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/10 uppercase">CAT_ENTRY</div>
          <div className="space-y-10">
            <h3 className="text-white group-hover:text-amber-accent transition-colors duration-500">Entry-Level <br />Candidates</h3>
            <ul className="space-y-6">
              <li className="flex gap-4 group/item items-start">
                <span className="text-amber-accent font-mono text-xs pt-1">[01]</span>
                <p className="text-base text-white/60 group-hover/item:text-white transition-colors">You possess skill, but no framework for situational oral board responses.</p>
              </li>
              <li className="flex gap-4 group/item items-start">
                <span className="text-amber-accent font-mono text-xs pt-1">[02]</span>
                <p className="text-base text-white/60 group-hover/item:text-white transition-colors">You are walking into a high-pressure environment without a mechanism to simulate stress.</p>
              </li>
              <li className="flex gap-4 group/item items-start">
                <span className="text-amber-accent font-mono text-xs pt-1">[03]</span>
                <p className="text-base text-white/60 group-hover/item:text-white transition-colors">You need to build confidence that only comes from repeated, graded practice.</p>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Lateral & Promotional */}
        <div className="relative group p-8 md:p-12 bg-white/[0.02] border border-white/5 hover:border-amber-accent/50 transition-all duration-700 overflow-hidden max-w-xl flex-1 h-full">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-white/10 uppercase">CAT_PROM</div>
          <div className="space-y-10">
            <h3 className="text-white group-hover:text-amber-accent transition-colors duration-500">Lateral & <br />Promotional</h3>
            <ul className="space-y-6">
              <li className="flex gap-4 group/item items-start">
                <span className="text-amber-accent font-mono text-xs pt-1">[01]</span>
                <p className="text-base text-white/60 group-hover/item:text-white transition-colors">Years of field experience do not automatically translate to high board scores.</p>
              </li>
              <li className="flex gap-4 group/item items-start">
                <span className="text-amber-accent font-mono text-xs pt-1">[02]</span>
                <p className="text-base text-white/60 group-hover/item:text-white transition-colors">Promotion boards require a technical precision different from operational commands.</p>
              </li>
              <li className="flex gap-4 group/item items-start">
                <span className="text-amber-accent font-mono text-xs pt-1">[03]</span>
                <p className="text-base text-white/60 group-hover/item:text-white transition-colors">The margin for error is non-existent when testing for a specific advancement.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Transformation Bridge - Linking Candidates to CTA */}
      <section className="bg-navy py-16 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-4">
            <div className="text-center md:text-left space-y-1 min-w-[120px]">
              <div className="text-[10px] font-mono text-amber-accent tracking-[0.3em] uppercase opacity-60">Initiation</div>
              <div className="text-white text-lg font-medium uppercase tracking-widest">Application</div>
            </div>
            
            <div className="hidden lg:block h-px w-16 bg-gradient-to-r from-white/0 via-amber-accent/30 to-white/0 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <ChevronRight className="w-3 h-3 text-amber-accent/50" />
              </div>
            </div>
            
            <div className="text-center px-12 py-7 bg-white/[0.02] border border-white/10 backdrop-blur-sm relative group mx-4">
              <div className="absolute -inset-2 bg-amber-accent/5 blur-xl group-hover:bg-amber-accent/10 transition-all duration-700" />
              <div className="relative">
                <div className="text-[10px] font-mono text-amber-accent tracking-[0.3em] uppercase mb-1">Optimization</div>
                <div className="text-white text-2xl font-black uppercase tracking-[0.3em] italic leading-none">FirePrep</div>
              </div>
            </div>

            <div className="hidden lg:block h-px w-16 bg-gradient-to-r from-white/0 via-amber-accent/30 to-white/0 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <ChevronRight className="w-3 h-3 text-amber-accent/50" />
              </div>
            </div>
            
            <div className="text-center md:text-right space-y-1 min-w-[120px]">
              <div className="text-[10px] font-mono text-amber-accent tracking-[0.3em] uppercase opacity-60">Elite Result</div>
              <div className="text-white text-lg font-medium uppercase tracking-widest">Hired</div>
            </div>
          </div>
        </div>
        
        {/* Subtle background text for thematic depth */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
          <span className="text-[15vw] font-black text-white whitespace-nowrap tracking-tighter uppercase">Get Hired</span>
        </div>
      </section>

      {/* Final CTA - The High-Stakes Close */}
      <section className="relative py-24 px-8 text-center bg-surface grid-pattern border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-[10px] text-amber-accent tracking-[0.5em] uppercase block opacity-70">System Ready</span>
            <h2 className="text-white leading-tight">START PREPARING.</h2>
          </div>
          
          <p className="text-lg md:text-xl text-white/40 max-w-md mx-auto italic">
            Free to sign up. No excuses left.
          </p>
          
          <form onSubmit={handleSignUp} className="flex flex-col sm:flex-row gap-0 border border-white/10 max-w-xl mx-auto bg-navy group focus-within:border-amber-accent transition-all duration-500">
            <input
              type="email"
              placeholder="Enter your agency email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent px-6 py-4 focus:outline-none text-white text-base placeholder:text-white/10"
              required
            />
            <button
              type="submit"
              className="bg-amber-accent text-navy font-black px-8 py-4 text-base uppercase tracking-[0.2em] hover:bg-amber-400 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 bg-navy text-xs font-mono tracking-widest text-white/30 uppercase">
        <div className="flex items-center gap-6">
          <span className="text-amber-accent font-bold text-lg font-display">FirePrep</span>
          <span className="hidden md:block w-px h-4 bg-white/10" />
          <span>Established 2026</span>
        </div>
        <div>
          © 2026 FIREPREP — AI SYSTEM v1.0.4
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}} />
    </div>
  );
}
