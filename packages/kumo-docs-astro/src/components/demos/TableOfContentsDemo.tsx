import { useState } from "react";
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

/** Demonstrates using the `render` prop with a custom link component. */
export function TableOfContentsRenderPropDemo() {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <TableOfContents>
        <TableOfContents.List>
          {["Introduction", "Installation", "Usage"].map((text) => (
            <TableOfContents.Item
              key={text}
              render={<button type="button" />}
              onClick={() => setClicked(text)}
              active={text === "Introduction"}
            >
              {text}
            </TableOfContents.Item>
          ))}
        </TableOfContents.List>
      </TableOfContents>
      {clicked && (
        <p className="text-xs text-kumo-subtle">Clicked: {clicked}</p>
      )}
    </div>
  );
}
