"use client";

import { useEffect } from "react";

/**
 * Replaces the root layout when it fails, so global CSS and fonts are not
 * available — styling is inline and deliberately minimal.
 */
export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
          boxSizing: "border-box",
          background: "#08080a",
          color: "#ffffff",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          textAlign: "center",
        }}
      >
        <title>Something went wrong | Mediaworks 365</title>
        <main style={{ maxWidth: "36rem" }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: "1.25rem" }}>
            Mediaworks <span style={{ color: "#f5ad14" }}>365</span>
          </p>
          <h1 style={{ margin: "1.5rem 0 0", fontSize: "2rem", lineHeight: 1.2 }}>Something went wrong.</h1>
          <p style={{ margin: "1rem 0 0", color: "#b9b9c2", lineHeight: 1.6 }}>
            The site hit an unexpected error. Please try again, or contact us if the problem continues.
          </p>
          {error.digest && (
            <p style={{ margin: "0.75rem 0 0", color: "#8a8a96", fontSize: "0.75rem", fontFamily: "ui-monospace, monospace" }}>
              Reference: {error.digest}
            </p>
          )}
          <div style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => retry()}
              style={{
                minHeight: "3rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "none",
                background: "#f5ad14",
                color: "#08080a",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* Plain anchor on purpose: a full reload is the right recovery when the root layout has failed. */}            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "3rem",
                padding: "0 1.5rem",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#ffffff",
                fontWeight: 600,
                textDecoration: "none",
                boxSizing: "border-box",
              }}
            >
              Contact Us
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
