import { useEffect } from "react";
import { siteMeta, siteUrl } from "./siteMeta";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

type PageSeoOptions = {
  title?: string;
  description?: string;
  path?: string;
};

export function usePageSeo({ title, description, path = "/" }: PageSeoOptions = {}) {
  useEffect(() => {
    const pageTitle = title ?? siteMeta.title;
    const pageDescription = description ?? siteMeta.description;
    const canonical = `${siteUrl}${path === "/" ? "" : path}`;

    document.title = pageTitle;
    upsertMeta("name", "description", pageDescription);
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", pageDescription);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", siteMeta.legalName);
    upsertMeta("name", "twitter:card", "summary");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", pageDescription);
    upsertCanonical(canonical);
  }, [title, description, path]);
}
