import { useEffect } from 'react';
import { buildSEOState, setCurrentSEOState, type SEOProps } from '../utils/seo-state';

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = href;
}

function setJsonLd(json: string) {
  let element = document.head.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
  if (!element) {
    element = document.createElement('script');
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = json;
}

/* The server renders every tag (seo-state.getSEOHeadTags); this keeps them in
   step during client-side navigation. */
export function SEO(props: SEOProps) {
  const state = buildSEOState(props);

  if (typeof window === 'undefined') {
    setCurrentSEOState(state);
  }

  const json = JSON.stringify(state.graph);

  useEffect(() => {
    document.title = state.title;
    setMeta('name', 'description', state.description);
    setMeta('name', 'robots', state.robots);
    setCanonical(state.canonicalUrl);
    setMeta('property', 'og:title', state.title);
    setMeta('property', 'og:description', state.description);
    setMeta('property', 'og:url', state.canonicalUrl);
    setMeta('property', 'og:type', state.type);
    setMeta('property', 'og:image', state.image);
    setMeta('name', 'twitter:title', state.title);
    setMeta('name', 'twitter:description', state.description);
    setMeta('name', 'twitter:image', state.image);
    setJsonLd(json);
  }, [state.canonicalUrl, state.description, state.title, state.type, state.robots, state.image, json]);

  return null;
}
