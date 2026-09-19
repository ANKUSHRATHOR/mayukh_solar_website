"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <section id="page-content" className="status-page">
        <div className="shell">
          <div className="section-kicker">SOMETHING WENT WRONG</div>
          <h1>That page didn&apos;t load.</h1>
          <p>
            Please try again. If it keeps happening, call us on{" "}
            <a href="tel:+919782767546">+91 97827 67546</a> — we would rather take your question directly.
          </p>
          <div className="status-actions">
            <button type="button" className="button button-gold" onClick={reset}>
              Try again <RotateCcw />
            </button>
            {/* A full document load, not a client transition: the router state
                is what just failed, so reloading is the safer recovery. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a className="text-link" href="/">Back to home <span>↘</span></a>
          </div>
        </div>
      </section>
    </main>
  );
}
