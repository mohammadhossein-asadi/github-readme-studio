"use client";

import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Network } from "lucide-react";
import { remarkGithubAlerts } from "@/lib/remark-github-alerts";
import { cn } from "@/lib/utils";

/**
 * react-markdown hands every component the raw mdast `node`. Dropping it here
 * keeps it from landing in the DOM as an invalid attribute.
 */
function domProps<T extends { node?: unknown }>({
  ...rest
}: T): Omit<T, "node"> {
  return rest;
}

const components: Components = {
  a(props) {
    const { href, children } = props;
    const external = Boolean(href && /^https?:\/\//.test(href));
    return (
      <a
        {...domProps(props)}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
      >
        {children}
      </a>
    );
  },
  img(props) {
    const { src, alt } = props;
    const isBadge = typeof src === "string" && src.includes("img.shields.io");
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        {...domProps(props)}
        src={typeof src === "string" ? src : undefined}
        alt={alt ?? ""}
        loading="lazy"
        className={cn("max-w-full", isBadge && "badge")}
      />
    );
  },
  input(props) {
    const { type } = props;
    if (type === "checkbox") {
      return <input {...domProps(props)} type="checkbox" readOnly />;
    }
    return <input {...domProps(props)} type={type} />;
  },
  pre(props) {
    const { children } = props;
    const child = Children.only(children) as ReactElement<{
      className?: string;
      children?: ReactNode;
    }>;
    const className = isValidElement(child) ? child.props?.className : undefined;

    if (typeof className === "string" && className.includes("language-mermaid")) {
      return (
        <figure className="md-diagram">
          <figcaption className="md-diagram-caption">
            <Network aria-hidden="true" className="size-3.5" />
            Architecture diagram
          </figcaption>
          <pre>{child.props.children}</pre>
        </figure>
      );
    }

    return <pre {...domProps(props)}>{children}</pre>;
  },
  table(props) {
    const { children } = props;
    return (
      <div className="overflow-x-auto">
        <table {...domProps(props)}>{children}</table>
      </div>
    );
  },
};

export function MarkdownPreview({
  markdown,
  theme = "light",
  width = "desktop",
  className,
}: {
  markdown: string;
  theme?: "light" | "dark";
  width?: "desktop" | "tablet" | "mobile";
  className?: string;
}) {
  const widthClass = {
    desktop: "max-w-none",
    tablet: "max-w-2xl",
    mobile: "max-w-sm",
  }[width];

  return (
    <div
      className={cn(
        "md-preview rounded-lg border px-5 py-5 sm:px-8 sm:py-7",
        widthClass,
        "mx-auto w-full",
        className,
      )}
      data-md-theme={theme}
    >
      <Markdown
        remarkPlugins={[remarkGfm, remarkGithubAlerts]}
        // GitHub renders raw HTML in READMEs (centered badge rows, <details>),
        // so the preview matches the hosted rendering rather than escaping it.
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
