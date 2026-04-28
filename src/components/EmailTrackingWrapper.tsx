"use client";

import { usePostHog } from "posthog-js/react";
import { useEffect, useRef } from "react";

interface EmailTrackingWrapperProps {
  children: React.ReactNode;
  location: string;
  className?: string;
}

/**
 * Wrapper component that tracks email link clicks and copy events
 * for any mailto links rendered inside it (including dangerouslySetInnerHTML content)
 */
export default function EmailTrackingWrapper({
  children,
  location,
  className,
}: EmailTrackingWrapperProps) {
  const posthog = usePostHog();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track mailto link clicks
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href^="mailto:"]') as HTMLAnchorElement | null;
      
      if (link) {
        const email = link.href.replace("mailto:", "");
        posthog.capture("email_link_clicked", {
          email,
          location,
        });
      }
    };

    // Track when user copies email text
    const handleCopy = () => {
      const selection = window.getSelection()?.toString();
      if (!selection) return;

      // Check for common email patterns in the copied text
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const emails = selection.match(emailRegex);

      if (emails) {
        emails.forEach((email) => {
          posthog.capture("email_copied", {
            email,
            location,
          });
        });
      }
    };

    container.addEventListener("click", handleClick);
    container.addEventListener("copy", handleCopy);

    return () => {
      container.removeEventListener("click", handleClick);
      container.removeEventListener("copy", handleCopy);
    };
  }, [posthog, location]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
