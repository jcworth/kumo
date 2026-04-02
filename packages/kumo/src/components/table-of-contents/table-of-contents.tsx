import { forwardRef } from "react";
import { cn } from "../../utils/cn";

/** TableOfContents item state variant definitions. */
export const KUMO_TABLE_OF_CONTENTS_VARIANTS = {
  state: {
    default: {
      classes:
        "text-kumo-subtle hover:bg-kumo-tint hover:text-kumo-default hover:font-medium",
      description: "Inactive section link",
    },
    active: {
      classes: "text-kumo-default font-medium",
      description: "Currently visible / active section",
    },
  },
} as const;

export const KUMO_TABLE_OF_CONTENTS_DEFAULT_VARIANTS = {
  state: "default",
} as const;

export type KumoTableOfContentsState =
  keyof typeof KUMO_TABLE_OF_CONTENTS_VARIANTS.state;

const ITEM_BASE =
  "group relative block truncate rounded-md py-1 pl-5 text-sm no-underline transition-all duration-500";

const INDICATOR_BASE =
  "absolute inset-y-0 left-0.5 w-0.5 rounded-full transition-all duration-200 bg-kumo-brand";

export type TableOfContentsProps = React.HTMLAttributes<HTMLElement>;

const TableOfContentsRoot = forwardRef<HTMLElement, TableOfContentsProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Table of contents"
      className={className}
      {...props}
    />
  ),
);

export type TableOfContentsTitleProps =
  React.HTMLAttributes<HTMLParagraphElement>;

const TableOfContentsTitle = forwardRef<
  HTMLParagraphElement,
  TableOfContentsTitleProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "mb-3 text-xs font-semibold tracking-wide text-kumo-subtle uppercase",
      className,
    )}
    {...props}
  />
));

export type TableOfContentsListProps = React.HTMLAttributes<HTMLDivElement>;

const TableOfContentsList = forwardRef<
  HTMLDivElement,
  TableOfContentsListProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative space-y-1.5 before:absolute before:inset-y-0 before:left-0.5 before:w-px before:bg-kumo-line",
      className,
    )}
    {...props}
  />
));

export interface TableOfContentsItemProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** whether this item represents the currently active section. */
  active?: boolean;
}

const TableOfContentsItem = forwardRef<
  HTMLAnchorElement,
  TableOfContentsItemProps
>(({ active = false, className, children, ...props }, ref) => {
  const stateClasses = active
    ? KUMO_TABLE_OF_CONTENTS_VARIANTS.state.active.classes
    : KUMO_TABLE_OF_CONTENTS_VARIANTS.state.default.classes;

  return (
    <a
      ref={ref}
      aria-current={active ? "true" : undefined}
      className={cn(ITEM_BASE, stateClasses, className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          INDICATOR_BASE,
          active ? "opacity-100" : "opacity-0 group-hover:opacity-60",
        )}
      />
      <span className="block min-w-0 leading-5">{children}</span>
    </a>
  );
});

export interface TableOfContentsGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Label displayed above the group's items. */
  label: string;
  /** URL the group label links to. */
  href?: string;
}

const TableOfContentsGroup = forwardRef<
  HTMLDivElement,
  TableOfContentsGroupProps
>(({ label, href, className, children, ...props }, ref) => (
  <div ref={ref} className={cn("mt-3", className)} {...props}>
    {href ? (
      <a
        href={href}
        className="mb-1.5 block pl-5 text-xs font-medium text-kumo-subtle no-underline hover:text-kumo-default"
      >
        {label}
      </a>
    ) : (
      <p className="mb-1.5 pl-5 text-xs font-medium text-kumo-subtle">
        {label}
      </p>
    )}
    <div className="space-y-1.5 pl-3">{children}</div>
  </div>
));

TableOfContentsRoot.displayName = "TableOfContents";
TableOfContentsTitle.displayName = "TableOfContents.Title";
TableOfContentsList.displayName = "TableOfContents.List";
TableOfContentsItem.displayName = "TableOfContents.Item";
TableOfContentsGroup.displayName = "TableOfContents.Group";

/**
 * TableOfContents — presentational compound component for section navigation.
 *
 * Purely visual; all interaction logic (scroll tracking, active state management)
 * is left to the consumer.
 *
 * @example
 * ```tsx
 * <TableOfContents>
 *   <TableOfContents.Title>On this page</TableOfContents.Title>
 *   <TableOfContents.List>
 *     <TableOfContents.Item href="#intro" active>Introduction</TableOfContents.Item>
 *     <TableOfContents.Group label="Getting Started">
 *       <TableOfContents.Item href="#install">Installation</TableOfContents.Item>
 *       <TableOfContents.Item href="#setup">Setup</TableOfContents.Item>
 *     </TableOfContents.Group>
 *   </TableOfContents.List>
 * </TableOfContents>
 * ```
 */
export const TableOfContents = Object.assign(TableOfContentsRoot, {
  Title: TableOfContentsTitle,
  List: TableOfContentsList,
  Item: TableOfContentsItem,
  Group: TableOfContentsGroup,
});
