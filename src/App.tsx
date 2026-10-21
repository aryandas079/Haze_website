/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  Download,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Smartphone,
  ArrowUp,
} from 'lucide-react';
import { FOOTER_SECTIONS } from './data/legalContent';
import { LegalDocumentModal } from './components/LegalDocumentModal';

const AUTHOR_LINKS = [
  {
    label: 'GitHub Repository',
    href: 'https://github.com/aryandas079/Haze',
  },
  {
    label: 'Issue Tracker',
    href: 'https://github.com/aryandas079/Haze/issues',
  },
  {
    label: 'GitHub (@aryandas079)',
    href: 'https://github.com/aryandas079',
  },
  {
    label: 'LinkedIn (Aryan Das)',
    href: 'https://linkedin.com/in/iam-aryandas',
  },
  {
    label: 'Instagram (@iam_aryandas)',
    href: 'https://instagram.com/iam_aryandas',
  },
];

const CORE_FEATURES = [
  {
    index: '01',
    title: 'Privacy-First',
    icon: ShieldCheck,
    description:
      'Engineered with a native C++17 threat-filtering core (libhazeshield.so), canvas and WebGL anti-fingerprinting, tracking parameter sanitization, and a hardware-backed AES-256-GCM password vault with zero first-party telemetry.',
    specs: ['C++17 HazeShieldCore', 'AES-256-GCM Vault', 'Zero Telemetry'],
  },
  {
    index: '02',
    title: 'Ultra-Fast Engine',
    icon: Zap,
    description:
      'Powered by a standalone custom-compiled dual-ABI Native Chromium runtime (Blink + V8 snapshots) with direct JNI_Zero dispatch, native HTTP/3 multiplexing, and zero-polling 60 FPS RenderThread hardware composition.',
    specs: ['Blink + V8 Snapshots', 'JNI_Zero Bridge', 'arm64 & armeabi-v7a'],
  },
  {
    index: '03',
    title: 'Minimalist Design',
    icon: Smartphone,
    description:
      'Built for one-handed reachability with a distraction-free viewport, bottom-anchored hybrid local/live autocomplete omnibox, lockscreen Notification Media Controller, floating mini-player, and true OLED dark mode.',
    specs: ['Bottom-Anchored UI', 'MediaSession Center', 'True OLED Dark'],
  },
];

const STAGGER_DELAY_CLASSES = [
  'delay-75',
  'delay-150',
  'delay-200',
  'delay-300',
];

function HazeLogo({ className = 'w-8 h-8' }: { className?: string }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Haze Browser emblem"
      >
        <path
          d="M10 32C20 23 38 17 50 18"
          className="stroke-neutral-900 dark:stroke-white"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M13 40C23 31 41 25 53 26"
          className="stroke-neutral-500 dark:stroke-neutral-400"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M16 48C26 39 44 33 55 34"
          className="stroke-neutral-300 dark:stroke-neutral-600"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <img
      src="/assets/aistudio/logo_20afc45f.png"
      alt="Haze Browser Logo"
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className={`${className} object-contain mix-blend-multiply dark:invert dark:mix-blend-screen select-none`}
    />
  );
}

export default function App() {
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('haze_theme');
      if (saved === 'dark' || saved === 'light') {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('haze_theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore localStorage restrictions
    }
  }, [isDark]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDocId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setFooterVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFooterVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const revealBase =
    'transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0';
  const revealState = footerVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-3';

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
      {/* Header: Showing the Haze logo and name + Dark Mode toggle */}
      <header className="w-full border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors duration-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-8">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveDocId(null);
              handleScrollToTop();
            }}
            className="inline-flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 dark:focus-visible:outline-white whitespace-nowrap shrink-0"
            aria-label="Haze Home"
          >
            <HazeLogo className="w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-150 group-hover:scale-[1.03]" />
            <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
              Haze
            </span>
          </a>

          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-950 dark:hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-neutral-200" aria-hidden="true" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-neutral-700" aria-hidden="true" />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area: Centered Hero Section + 3-Column Features Section */}
      <main id="top" className="flex-1 w-full">
        {/* Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 flex flex-col items-center text-center"
        >
          {/* Centered Haze Logo */}
          <div className="mb-8 sm:mb-10">
            <HazeLogo className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto" />
          </div>

          {/* Welcoming Tagline */}
          <h1
            id="hero-heading"
            className="font-display text-3xl sm:text-5xl lg:text-[56px] font-semibold tracking-tight text-neutral-950 dark:text-white leading-[1.1] max-w-3xl"
          >
            The ultra-fast, minimalist, and privacy-hardened browser for Android.
          </h1>

          <p className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-2xl">
            Powered by a custom-compiled dual-ABI Native Chromium Engine (Blink + V8), C++17 native threat filtering, system Notification Media Controller, and hardware-backed credential encryption.
          </p>

          {/* Primary Call-to-Action & Source Link */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
            <a
              href="https://github.com/aryandas079/Haze/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white whitespace-nowrap shrink-0"
            >
              <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Download for Android</span>
            </a>

            <a
              href="https://github.com/aryandas079/Haze"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 text-sm font-medium rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-950 dark:hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white whitespace-nowrap shrink-0"
            >
              <span>View on GitHub</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>

          {/* Unboxed Build Metadata */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <span>Universal APK</span>
            <span aria-hidden="true">·</span>
            <span>arm64-v8a &amp; armeabi-v7a</span>
            <span aria-hidden="true">·</span>
            <span>Android 7.0+ (Min SDK 24)</span>
            <span aria-hidden="true">·</span>
            <span>Apache 2.0</span>
          </div>
        </section>

        {/* Responsive 3-Column Features Section */}
        <section
          aria-labelledby="features-heading"
          className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pb-20 sm:pb-28"
        >
          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-12 sm:pt-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
              <div>
                <h2
                  id="features-heading"
                  className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white"
                >
                  Core Browser Architecture
                </h2>
                <p className="mt-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300 max-w-xl">
                  Built from the ground up with standalone native binaries rather than a thin system WebView wrapper.
                </p>
              </div>
              <span className="text-xs font-mono text-neutral-600 dark:text-neutral-400 shrink-0">
                com.aryandas.haze · Target SDK 37
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {CORE_FEATURES.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <article
                    key={feature.title}
                    className="flex flex-col justify-between p-6 sm:p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-200"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div className="w-10 h-10 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex items-center justify-center text-neutral-900 dark:text-white">
                          <IconComponent className="w-5 h-5" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-xs font-medium text-neutral-500 dark:text-neutral-400 tabular-nums">
                          {feature.index}
                        </span>
                      </div>

                      <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-neutral-950 dark:text-white mb-3">
                        {feature.title}
                      </h3>

                      <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-neutral-200/80 dark:border-neutral-800/80 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                      {feature.specs.map((spec, sIdx) => (
                        <React.Fragment key={spec}>
                          <span>{spec}</span>
                          {sIdx < feature.specs.length - 1 && (
                            <span className="text-neutral-400 dark:text-neutral-600" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer: Authentic Haze Browser Legal, Governance, Trust & Author Directory */}
      <footer
        ref={footerRef}
        aria-label="Haze Browser legal, governance, and author information"
        className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 transition-colors duration-200"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 border-b border-neutral-200 dark:border-neutral-800">
            {/* Project Overview Column */}
            <div
              className={`sm:col-span-2 lg:col-span-4 space-y-3 pr-0 lg:pr-8 ${revealBase} ${revealState}`}
            >
              <div className="inline-flex items-center gap-2.5">
                <HazeLogo className="w-7 h-7" />
                <span className="font-display text-lg font-semibold tracking-tight text-neutral-950 dark:text-white">
                  Haze Browser
                </span>
              </div>
              <p className="text-xs sm:text-[13px] text-neutral-700 dark:text-neutral-300 leading-relaxed max-w-sm">
                The ultra-fast, minimalist, and privacy-hardened Chromium web browser for Android. Powered by a custom-compiled dual-ABI Native Chromium Engine (Blink + V8) and C++17 native threat filtering.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 font-mono">
                <span>com.aryandas.haze</span>
                <span className="text-neutral-500 dark:text-neutral-500" aria-hidden="true">·</span>
                <span>arm64-v8a / armeabi-v7a</span>
                <span className="text-neutral-500 dark:text-neutral-500" aria-hidden="true">·</span>
                <span>Android 7.0+</span>
              </div>
            </div>

            {/* Legal, Governance & Trust Policy Columns */}
            <div className="sm:col-span-2 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {FOOTER_SECTIONS.map((section, idx) => (
                <div
                  key={section.title}
                  className={`space-y-3 ${revealBase} ${STAGGER_DELAY_CLASSES[idx] ?? 'delay-150'} ${revealState}`}
                >
                  <h2 className="font-display text-xs font-semibold tracking-tight text-neutral-950 dark:text-white">
                    {section.title}
                  </h2>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.id}>
                        <button
                          type="button"
                          onClick={() => setActiveDocId(link.id)}
                          className="text-left text-xs sm:text-[13px] font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white cursor-pointer"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Author & Community Column */}
              <div
                className={`space-y-3 ${revealBase} ${STAGGER_DELAY_CLASSES[3]} ${revealState}`}
              >
                <h2 className="font-display text-xs font-semibold tracking-tight text-neutral-950 dark:text-white">
                  Author & Community
                </h2>
                <ul className="space-y-2.5">
                  {AUTHOR_LINKS.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs sm:text-[13px] font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright, License & Quick Policy Access */}
          <div
            className={`pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-neutral-700 dark:text-neutral-300 ${revealBase} delay-300 ${revealState}`}
          >
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <span className="font-semibold text-neutral-900 dark:text-white">
                Copyright (c) 2026 Aryan Das.
              </span>
              <span className="text-neutral-500" aria-hidden="true">·</span>
              <span className="text-neutral-700 dark:text-neutral-300">
                Licensed under the Apache License, Version 2.0.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300">
              <button
                type="button"
                onClick={() => setActiveDocId('privacy-policy')}
                className="hover:text-neutral-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                Privacy Policy
              </button>
              <span className="text-neutral-500" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setActiveDocId('terms-of-service')}
                className="hover:text-neutral-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                Terms of Service
              </button>
              <span className="text-neutral-500" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setActiveDocId('cookie-storage')}
                className="hover:text-neutral-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                Cookie & Storage
              </button>
              <span className="text-neutral-500" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setActiveDocId('security-disclosure')}
                className="hover:text-neutral-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                Security
              </button>
              <span className="text-neutral-500" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setActiveDocId('imprint')}
                className="hover:text-neutral-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                Imprint
              </button>
              <span className="text-neutral-500" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setActiveDocId('license')}
                className="hover:text-neutral-950 dark:hover:text-white hover:underline underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
              >
                Apache 2.0 License
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll to Top Button (Appears after scrolling > 500px) */}
      <button
        type="button"
        onClick={handleScrollToTop}
        tabIndex={showScrollTop ? 0 : -1}
        aria-hidden={!showScrollTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-neutral-800 dark:border-neutral-200 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-medium shadow-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white transition-all duration-200 ease-out motion-reduce:transition-none whitespace-nowrap shrink-0 cursor-pointer ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">Top</span>
      </button>

      {/* Slide-Over Modal for Reading Legal, Governance & Trust Policies */}
      <LegalDocumentModal
        documentId={activeDocId}
        onClose={() => setActiveDocId(null)}
        onSelectDocument={(id) => setActiveDocId(id)}
      />
    </div>
  );
}
