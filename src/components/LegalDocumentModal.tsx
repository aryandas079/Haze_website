import React, { useState } from 'react';
import { X, Check, Copy, ArrowLeft } from 'lucide-react';
import { LEGAL_DOCUMENTS, LegalDocument } from '../data/legalContent';

interface LegalDocumentModalProps {
  documentId: string | null;
  onClose: () => void;
  onSelectDocument: (id: string) => void;
}

export const LegalDocumentModal: React.FC<LegalDocumentModalProps> = ({
  documentId,
  onClose,
  onSelectDocument,
}) => {
  const [copied, setCopied] = useState(false);

  if (!documentId || !LEGAL_DOCUMENTS[documentId]) return null;

  const doc: LegalDocument = LEGAL_DOCUMENTS[documentId];
  const allDocs = Object.values(LEGAL_DOCUMENTS);

  const handleCopyText = () => {
    const fullText = [
      doc.title,
      'Haze Browser (com.aryandas.haze)',
      '',
      doc.summary,
      '',
      ...doc.sections.map((s) => `${s.heading}\n${s.body.join('\n\n')}`),
    ].join('\n\n');

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-neutral-950/50 backdrop-blur-[2px] transition-opacity duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full max-w-4xl flex-col bg-white dark:bg-neutral-950 shadow-2xl border-l border-neutral-200 dark:border-neutral-800 overflow-hidden transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 px-6 py-4 bg-white dark:bg-neutral-950 shrink-0 transition-colors duration-200">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 dark:focus-visible:outline-white whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Return to page"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span className="text-neutral-400 dark:text-neutral-600" aria-hidden="true">/</span>
            <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 truncate">
              {doc.category}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200/80 dark:hover:bg-neutral-800 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Copy policy text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-neutral-950 dark:text-white" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md transition-colors cursor-pointer"
              aria-label="Close document"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Split: Sidebar Policy Switcher + Document Reader */}
        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 flex flex-col shrink-0 max-h-40 md:max-h-none transition-colors duration-200">
            <nav
              aria-label="Haze legal and governance policies"
              className="flex-1 overflow-y-auto p-3 space-y-1"
            >
              {allDocs.map((item) => {
                const isActive = item.id === doc.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectDocument(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                      isActive
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-semibold'
                        : 'text-neutral-700 dark:text-neutral-300 font-medium hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-200/70 dark:hover:bg-neutral-800/80'
                    }`}
                  >
                    <span className="truncate">{item.title}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Policy Content Reader */}
          <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 mb-3">
                <span>Haze Browser</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">com.aryandas.haze</span>
                <span aria-hidden="true">·</span>
                <span>Apache License 2.0</span>
              </div>

              <h1
                id="legal-modal-title"
                className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white mb-4"
              >
                {doc.title}
              </h1>

              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed pb-6 mb-8 border-b border-neutral-200 dark:border-neutral-800">
                {doc.summary}
              </p>

              <div className="space-y-8">
                {doc.sections.map((section, idx) => (
                  <section key={idx} className="space-y-3">
                    <h2 className="font-display text-base sm:text-lg font-semibold text-neutral-950 dark:text-white tracking-tight">
                      {section.heading}
                    </h2>
                    <div className="space-y-3">
                      {section.body.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-sm sm:text-[15px] text-neutral-800 dark:text-neutral-200 leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-600 dark:text-neutral-400">
                <div>
                  <span>Maintained by Aryan Das · </span>
                  <a
                    href="https://github.com/aryandas079/Haze/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-neutral-900 dark:text-white underline underline-offset-4 hover:text-neutral-700 dark:hover:text-neutral-300"
                  >
                    GitHub Issues & Security Advisories
                  </a>
                </div>
                <div className="font-mono text-neutral-600 dark:text-neutral-400">
                  Copyright (c) 2026 Aryan Das
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
