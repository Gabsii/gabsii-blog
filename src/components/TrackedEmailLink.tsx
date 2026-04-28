"use client";

import { usePostHog } from "posthog-js/react";
import { useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "~/util/cn";

interface TrackedEmailLinkProps {
  email: string;
  location: string;
  className?: string;
  children?: React.ReactNode;
}

export default function TrackedEmailLink({
  email,
  location,
  className,
  children,
}: TrackedEmailLinkProps) {
  const posthog = usePostHog();
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = useCallback(() => {
    posthog.capture("email_link_clicked", {
      email,
      location,
    });
  }, [posthog, email, location]);

  const handleCopy = useCallback(() => {
    posthog.capture("email_copied", {
      email,
      location,
    });
  }, [posthog, email, location]);

  // Track when user copies the email address via selection
  useEffect(() => {
    const handleDocumentCopy = (event: ClipboardEvent) => {
      const selection = window.getSelection()?.toString();
      // Check if the copied text contains the email
      if (selection?.includes(email)) {
        handleCopy();
      }
    };

    document.addEventListener("copy", handleDocumentCopy);
    return () => document.removeEventListener("copy", handleDocumentCopy);
  }, [email, handleCopy]);

  return (
    <Link
      ref={linkRef}
      href={`mailto:${email}`}
      onClick={handleClick}
      className={cn("hover:underline", className)}
    >
      {children ?? email}
    </Link>
  );
}
