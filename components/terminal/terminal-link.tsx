"use client";

import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { useTerminalNav } from "@/components/terminal/terminal-transition";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

/**
 * Drop-in replacement for `<Link>` that triggers the
 * terminal `> cd pagename` transition before navigating.
 *
 * Falls back to a normal <a> for external links.
 */
export const TerminalLink = forwardRef<HTMLAnchorElement, Props>(
  function TerminalLink({ href, children, onClick, ...rest }, ref) {
    const nav = useTerminalNav();
    const isInternal = href.startsWith("/");

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (!isInternal) return; // external link — let browser handle
      if (e.metaKey || e.ctrlKey || e.shiftKey) return; // modifier keys
      e.preventDefault();
      nav(href);
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </a>
    );
  }
);
