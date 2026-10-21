export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDocument {
  id: string;
  title: string;
  category: 'Legal & Governance' | 'Privacy & Security' | 'Compliance & Notices';
  summary: string;
  sections: LegalSection[];
}

export const LEGAL_DOCUMENTS: Record<string, LegalDocument> = {
  'privacy-policy': {
    id: 'privacy-policy',
    title: 'Privacy Policy & Client-Side Data Architecture',
    category: 'Privacy & Security',
    summary:
      'Haze Browser (com.aryandas.haze) operates on a strict zero-telemetry, local-first architecture. All browsing artifacts and credentials remain on your device.',
    sections: [
      {
        heading: '01. Zero First-Party Telemetry',
        body: [
          'Haze contains no background telemetry daemons, diagnostic beacons, pingbacks, or usage counters. No server logs exist because Haze operates without central user-tracking servers.'
        ]
      },
      {
        heading: '02. Zero Analytics SDKs & Advertising Identifiers',
        body: [
          'The codebase is completely free of Google Firebase Analytics, Adjust, AppsFlyer, Mixpanel, Crashlytics, Facebook Graph SDK, or third-party behavioral profiling code.',
          'Haze never queries the Android Advertising ID (AAID) or hardware serial numbers (IMEI, MAC address, Android ID).'
        ]
      },
      {
        heading: '03. SQLite Local Indexing (HazeDatabase)',
        body: [
          'All user browsing artifacts—including browsing history, custom bookmarks, homepage shortcuts, and search omnibox caches—reside solely in the private application sandbox (/data/user/0/com.aryandas.haze/databases/).'
        ]
      },
      {
        heading: '04. Hardware-Backed AES-256-GCM Vault & Biometric Unlock',
        body: [
          'Web passwords, autofill entries, and credentials are encrypted via HazePasswordVault using hardware-generated keys managed by the AndroidKeyStore. Cryptographic keys never leave the hardware-isolated Trusted Execution Environment (TEE) or StrongBox keymaster.',
          'Stored credentials and private browsing tabs can be locked behind device-level biometric authentication (Fingerprint, Face Unlock, or Device Lock PIN).'
        ]
      },
      {
        heading: '05. Incognito & Ephemeral Session Lifecycle',
        body: [
          'Incognito tabs operate in a dedicated in-memory context completely detached from standard browsing profiles. When the last Incognito tab is closed, in-memory cookies, DOM storage keys, and IndexedDB data are immediately purged from memory.'
        ]
      },
      {
        heading: '06. Cloud Synchronization Boundaries',
        body: [
          'Cloud sync in Haze is entirely opt-in. When enabled via Google Account Authentication (play-services-auth), your browser settings, bookmarks, and custom shortcuts are synchronized directly to your personal Google Cloud / Firebase container. No intermediary proxy or developer-owned relay inspects or relays your synchronized data.',
          'For any privacy or data inquiries, contact the maintainer directly at aryandas.original@gmail.com.'
        ]
      }
    ]
  },
  'terms-of-service': {
    id: 'terms-of-service',
    title: 'End-User Terms of Service & Acceptable Use Policy',
    category: 'Legal & Governance',
    summary:
      'Governs permitted use, security boundaries, and open-source warranty disclaimers for Haze Browser under the Apache License, Version 2.0.',
    sections: [
      {
        heading: '01. Permitted Use',
        body: [
          'Haze Browser is distributed as free, open-source software under the Apache License, Version 2.0. Users are granted permission to install, run, modify, fork, and distribute the application for personal, educational, research, or commercial purposes.'
        ]
      },
      {
        heading: '02. Prohibited Activities',
        body: [
          'Users and redistributors may not use Haze Browser or its native filtering engine to conduct distributed denial-of-service (DDoS) attacks, automated botnet crawling, network flooding, vulnerability probing of unauthorized websites, or malware distribution.'
        ]
      },
      {
        heading: '03. Security Boundaries',
        body: [
          'Haze does not bypass website paywalls, defeat Digital Rights Management (DRM), crack CAPTCHAs, or spoof authentication tokens. Native filtering is strictly limited to blocking invasive advertising, telemetry, and script tracking.'
        ]
      },
      {
        heading: '04. Open-Source Disclaimer (AS-IS)',
        body: [
          'Haze Browser is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE.'
        ]
      }
    ]
  },
  'cookie-storage': {
    id: 'cookie-storage',
    title: 'Cookie, Cache & Web Storage Governance',
    category: 'Privacy & Security',
    summary:
      'How Haze Browser handles first-party session cookies, blocks third-party tracking cookies in native C++17, and enforces strict origin partitioning.',
    sections: [
      {
        heading: '01. First-Party Cookies',
        body: [
          'First-party session and authentication cookies are stored locally on-device to allow persistent logins across web applications (e.g., GitHub, YouTube, Reddit).'
        ]
      },
      {
        heading: '02. Third-Party Tracking Cookies',
        body: [
          'Haze blocks known third-party tracking cookies by default via its native C++17 rule engine (libhazeshield.so), neutralizing cross-site advertising networks before requests resolve.'
        ]
      },
      {
        heading: '03. Origin Partitioning',
        body: [
          'To prevent cross-site identity leakage, Haze enforces strict origin partitioning across localStorage, sessionStorage, IndexedDB, and Service Worker registrations. Tracking scripts cannot correlate your identity across domains.'
        ]
      },
      {
        heading: '04. Cache Eviction (RFC 7234)',
        body: [
          'HTTP caching complies strictly with RFC 7234 cache directives. Cached assets can be flushed on demand via Settings > Clear Browsing Data or automatically configured to evict stale entries under low device storage conditions.'
        ]
      }
    ]
  },
  'security-disclosure': {
    id: 'security-disclosure',
    title: 'Security Architecture & Vulnerability Disclosure',
    category: 'Privacy & Security',
    summary:
      'Details the dual-layer Kotlin and C++17 security perimeter, upstream Chromium CVE backports, and responsible vulnerability reporting procedures.',
    sections: [
      {
        heading: '01. Dual-Layer Security Perimeter',
        body: [
          'Kotlin / Android Runtime: Adheres to Android zero-trust architecture, enforces explicit one-time runtime permissions (RECORD_AUDIO, CAMERA), and blocks cleartext HTTP traffic by default.',
          'Native C++17 Shield (libhazeshield.so): Hardened with -fstack-protector-strong -D_FORTIFY_SOURCE=2 -fPIE -O3, with thread-safe std::shared_mutex synchronization and bounded memory limits.'
        ]
      },
      {
        heading: '02. Upstream Chromium Security Backports',
        body: [
          'High-severity upstream Chromium Common Vulnerabilities and Exposures (CVEs) affecting Blink, V8 sandboxing, and Skia rendering are periodically compiled and integrated into updated releases.'
        ]
      },
      {
        heading: '03. Responsible Vulnerability Disclosure',
        body: [
          'Report suspected security vulnerabilities directly to the maintainer at aryandas.original@gmail.com or via GitHub Private Security Advisories at github.com/aryandas079/Haze.',
          'Please include reproducible test cases, Android OS version, device model, and scrubbed logcat output. Inquiries receive an initial acknowledgment within 48 hours, followed by remediation updates.'
        ]
      }
    ]
  },
  'gdpr-ccpa': {
    id: 'gdpr-ccpa',
    title: 'Regulatory Compliance & Data Subject Rights (GDPR / CCPA)',
    category: 'Compliance & Notices',
    summary:
      'On-device data minimization, instant erasure, CSV credential portability, automatic DNT/GPC headers, and zero third-party subprocessors.',
    sections: [
      {
        heading: '01. Data Minimization',
        body: [
          'Haze never collects, sells, rents, or monetizes personal data. You retain 100% control over all data generated during web browsing.'
        ]
      },
      {
        heading: '02. Right to Erasure ("Forget Me")',
        body: [
          'Instantly delete browsing history, cached web files, saved cookies, site permissions, and encrypted passwords on-device via Settings > Privacy Shield > Clear All Browsing Data, or submit an account deletion inquiry to aryandas.original@gmail.com.'
        ]
      },
      {
        heading: '03. Right to Data Portability',
        body: [
          'Passwords stored in the hardware-backed AndroidKeyStore vault (HazePasswordVault) can be exported to standard CSV format (compatible with Chrome, Bitwarden, Firefox, and 1Password) at any time using biometric authentication.'
        ]
      },
      {
        heading: '04. Global Privacy Controls & Zero Subprocessors',
        body: [
          'Haze automatically transmits the DNT: 1 (Do Not Track) and Sec-GPC: 1 (Global Privacy Control) HTTP headers on all outgoing web requests.',
          'Because Haze operates client-side without proprietary backend servers, there are zero third-party data subprocessors.'
        ]
      }
    ]
  },
  'law-enforcement': {
    id: 'law-enforcement',
    title: 'Law Enforcement Guidelines & Transparency',
    category: 'Compliance & Notices',
    summary:
      'Formal transparency notice regarding the complete absence of developer-accessible user logs, browsing sessions, or encryption keys.',
    sections: [
      {
        heading: '01. Absence of User Data',
        body: [
          'Because Haze Browser does not log, collect, or store user browsing sessions, IP addresses, or device identifiers on remote infrastructure, we possess no user data to produce in response to subpoenas, warrants, court orders, or law enforcement requests.'
        ]
      },
      {
        heading: '02. On-Device Physical Encryption',
        body: [
          'Any data residing on a physical device is encrypted under the device hardware credentials and the Android Keystore system (AES-256-GCM). The maintainer of Haze does not hold encryption keys or backdoors.'
        ]
      }
    ]
  },
  'ip-dmca': {
    id: 'ip-dmca',
    title: 'Intellectual Property, Third-Party Notices & DMCA Policy',
    category: 'Compliance & Notices',
    summary:
      'Apache 2.0 source licensing, open-source software attributions (Chromium, AndroidX, Kotlin, ICU4C), trademark rules, and DMCA notice procedures.',
    sections: [
      {
        heading: '01. Apache 2.0 Open Source Licensing',
        body: [
          'The original application code, Kotlin UI components, CMake configurations, and custom C++17 shield engines are licensed under the Apache License, Version 2.0.'
        ]
      },
      {
        heading: '02. Third-Party Software Attribution',
        body: [
          'The Chromium Project (Blink, V8, Content Shell, JNI_Zero): Copyright (c) The Chromium Authors. Licensed under the BSD 3-Clause License.',
          'Android Jetpack & AndroidX Libraries: Copyright (c) The Android Open Source Project. Licensed under the Apache License, Version 2.0.',
          'Kotlin Standard Library & Coroutines: Copyright (c) JetBrains s.r.o. Licensed under the Apache License, Version 2.0.',
          'ICU4C / Unicode Data Tables: Copyright (c) Unicode, Inc. Licensed under the Unicode License Agreement.'
        ]
      },
      {
        heading: '03. Trademark Guidelines',
        body: [
          'The names "Haze", "Haze Browser", and the associated icon and branding assets are marks belonging to Aryan Das. The Apache 2.0 license grants code rights, but does not grant permission to use project trademarks for downstream branding without permission.'
        ]
      },
      {
        heading: '04. DMCA & Copyright Inquiries',
        body: [
          'Notices regarding copyright infringement or licensing conflicts can be sent directly to aryandas.original@gmail.com or filed through GitHub Issues (github.com/aryandas079/Haze/issues).'
        ]
      }
    ]
  },
  'accessibility': {
    id: 'accessibility',
    title: 'Accessibility & Ergonomic Inclusion Statement',
    category: 'Compliance & Notices',
    summary:
      'WCAG 2.1 conformance, Android TalkBack semantics, 200% dynamic font scaling, true OLED Dark Mode, and bottom-anchored one-handed ergonomics.',
    sections: [
      {
        heading: '01. WCAG 2.1 & TalkBack Screen Reader Compatibility',
        body: [
          'All UI surfaces—including the bottom navigation bar, quick actions pill, tab manager cards, and password dialogs—provide rich, localized contentDescription semantics for Android TalkBack.'
        ]
      },
      {
        heading: '02. Dynamic Typography & True OLED Dark Mode',
        body: [
          'Full support for Android system typography scaling up to 200% without clipped layouts.',
          'Pure #000000 AMOLED high-contrast palette minimizes eye strain in low-light environments and conserves battery life on OLED panels.'
        ]
      },
      {
        heading: '03. One-Handed Mobile Reachability',
        body: [
          'All essential touch targets (address omnibox, search suggestions, tab switcher trigger, voice search, settings menu) are anchored to the bottom of the display for effortless one-handed control.'
        ]
      }
    ]
  },
  'imprint': {
    id: 'imprint',
    title: 'Legal Notice & Imprint',
    category: 'Legal & Governance',
    summary:
      'Official project identification, package metadata, maintainer details, and governing licensing framework for Haze Browser.',
    sections: [
      {
        heading: '01. Project Identification',
        body: [
          'Project Name: Haze Browser',
          'Application Package: com.aryandas.haze',
          'Core Engine: Custom-Compiled Dual-ABI Native Chromium (Blink + V8) & C++17 HazeShieldCore (arm64-v8a | armeabi-v7a)',
          'Platform Support: Android 7.0+ (Min SDK 24, Target SDK 37)'
        ]
      },
      {
        heading: '02. Lead Architect & Maintainer',
        body: [
          'Designed, architected, and maintained by Aryan Das.',
          'Email: aryandas.original@gmail.com',
          'GitHub: https://github.com/aryandas079',
          'LinkedIn: https://linkedin.com/in/iam-aryandas',
          'Instagram: https://instagram.com/iam_aryandas'
        ]
      },
      {
        heading: '03. Repository & Governing License',
        body: [
          'Source Code Repository: https://github.com/aryandas079/Haze',
          'Primary License: Apache License, Version 2.0',
          'Governing Law: Subject to open-source software licensing norms and applicable international intellectual property laws.'
        ]
      }
    ]
  },
  'license': {
    id: 'license',
    title: 'Apache License, Version 2.0',
    category: 'Legal & Governance',
    summary:
      'Official open-source license governing the distribution, modification, and use of Haze Browser.',
    sections: [
      {
        heading: 'Copyright & License Grant',
        body: [
          'Copyright (c) 2026 Aryan Das',
          'Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0',
          'Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.'
        ]
      }
    ]
  }
};

export const FOOTER_SECTIONS = [
  {
    title: 'Privacy & Security',
    links: [
      { id: 'privacy-policy', label: 'Privacy Policy' },
      { id: 'cookie-storage', label: 'Cookie & Web Storage' },
      { id: 'security-disclosure', label: 'Security & Vulnerability' }
    ]
  },
  {
    title: 'Legal & Governance',
    links: [
      { id: 'terms-of-service', label: 'Terms & Acceptable Use' },
      { id: 'license', label: 'Apache 2.0 License' },
      { id: 'imprint', label: 'Legal Notice & Imprint' }
    ]
  },
  {
    title: 'Compliance & Notices',
    links: [
      { id: 'gdpr-ccpa', label: 'GDPR & CCPA Rights' },
      { id: 'law-enforcement', label: 'Law Enforcement Guide' },
      { id: 'ip-dmca', label: 'IP, Notices & DMCA' },
      { id: 'accessibility', label: 'Accessibility Statement' }
    ]
  }
];
