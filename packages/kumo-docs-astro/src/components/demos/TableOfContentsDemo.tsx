import { forwardRef, useState } from "react";
import { TableOfContents } from "@cloudflare/kumo";

const headings = [
  { text: "Introduction" },
  { text: "Installation" },
  { text: "Usage" },
  { text: "API Reference" },
  { text: "Examples" },
];

export function TableOfContentsBasicDemo() {
  return (
    <TableOfContents>
      <TableOfContents.Title>On this page</TableOfContents.Title>
      <TableOfContents.List>
        {headings.map((heading) => (
          <TableOfContents.Item
            key={heading.text}
            active={heading.text === "Usage"}
            className="cursor-pointer"
          >
            {heading.text}
          </TableOfContents.Item>
        ))}
      </TableOfContents.List>
    </TableOfContents>
  );
}

export function TableOfContentsInteractiveDemo() {
  const [active, setActive] = useState("Introduction");

  return (
    <TableOfContents>
      <TableOfContents.Title>On this page</TableOfContents.Title>
      <TableOfContents.List>
        {headings.map((heading) => (
          <TableOfContents.Item
            key={heading.text}
            active={heading.text === active}
            onClick={() => setActive(heading.text)}
            className="cursor-pointer"
          >
            {heading.text}
          </TableOfContents.Item>
        ))}
      </TableOfContents.List>
    </TableOfContents>
  );
}

export function TableOfContentsNoActiveDemo() {
  return (
    <TableOfContents>
      <TableOfContents.Title>On this page</TableOfContents.Title>
      <TableOfContents.List>
        {headings.map((heading) => (
          <TableOfContents.Item key={heading.text} className="cursor-pointer">
            {heading.text}
          </TableOfContents.Item>
        ))}
      </TableOfContents.List>
    </TableOfContents>
  );
}

export function TableOfContentsGroupDemo() {
  return (
    <TableOfContents>
      <TableOfContents.Title>On this page</TableOfContents.Title>
      <TableOfContents.List>
        <TableOfContents.Item active className="cursor-pointer">
          Overview
        </TableOfContents.Item>
        <TableOfContents.Group label="Getting Started">
          <TableOfContents.Item className="cursor-pointer">
            Installation
          </TableOfContents.Item>
          <TableOfContents.Item className="cursor-pointer">
            Configuration
          </TableOfContents.Item>
        </TableOfContents.Group>
        <TableOfContents.Group label="API">
          <TableOfContents.Item className="cursor-pointer">
            Props
          </TableOfContents.Item>
          <TableOfContents.Item className="cursor-pointer">
            Events
          </TableOfContents.Item>
        </TableOfContents.Group>
      </TableOfContents.List>
    </TableOfContents>
  );
}

export function TableOfContentsWithoutTitleDemo() {
  return (
    <TableOfContents>
      <TableOfContents.List>
        {headings.slice(0, 3).map((heading) => (
          <TableOfContents.Item
            key={heading.text}
            active={heading.text === "Introduction"}
            className="cursor-pointer"
          >
            {heading.text}
          </TableOfContents.Item>
        ))}
      </TableOfContents.List>
    </TableOfContents>
  );
}

/**
 * Demonstrates using the `render` prop to integrate with custom link components.
 * Shows default `<a>` behavior alongside a React Router-style custom link.
 */
export function TableOfContentsRenderPropDemo() {
  const [routerNavigation, setRouterNavigation] = useState<string | null>(null);

  // Mock React Router Link component
  const RouterLink = forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement>
  >(({ href, onClick, children, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        setRouterNavigation(href ?? null);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  ));
  RouterLink.displayName = "RouterLink";

  return (
    <div className="flex gap-8">
      {/* Default: uses <a> tag */}
      <div className="flex-1">
        <p className="mb-2 text-xs font-medium text-kumo-subtle">
          Default (anchor tag)
        </p>
        <TableOfContents>
          <TableOfContents.List>
            <TableOfContents.Item href="#intro" active>
              Introduction
            </TableOfContents.Item>
            <TableOfContents.Item href="#install">
              Installation
            </TableOfContents.Item>
          </TableOfContents.List>
        </TableOfContents>
      </div>

      {/* With render prop: uses custom RouterLink */}
      <div className="flex-1">
        <p className="mb-2 text-xs font-medium text-kumo-subtle">
          With render prop (Router)
        </p>
        <TableOfContents>
          <TableOfContents.List>
            <TableOfContents.Item render={<RouterLink />} href="/intro" active>
              Introduction
            </TableOfContents.Item>
            <TableOfContents.Item render={<RouterLink />} href="/install">
              Installation
            </TableOfContents.Item>
          </TableOfContents.List>
        </TableOfContents>
        {routerNavigation && (
          <p className="mt-2 text-xs text-kumo-subtle">
            Router navigated to: <code>{routerNavigation}</code>
          </p>
        )}
      </div>
    </div>
  );
}
