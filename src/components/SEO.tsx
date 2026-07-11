import { useEffect } from 'react';
import { buildSEOState, setCurrentSEOState, type SEOProps } from '../utils/seo-state';

function setMetaByName(name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function setMetaByProperty(property: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
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

export function SEO(props: SEOProps) {
  const state = buildSEOState(props);

  if (typeof window === 'undefined') {
    setCurrentSEOState(state);
  }

  useEffect(() => {
    document.title = state.title;
    setMetaByName('description', state.description);
    setMetaByName('robots', 'index, follow');
    setCanonical(state.canonicalUrl);
    setMetaByProperty('og:title', state.title);
    setMetaByProperty('og:description', state.description);
    setMetaByProperty('og:url', state.canonicalUrl);
    setMetaByProperty('og:type', state.type);
    setMetaByProperty('og:site_name', 'Ashish Sharma');
    setMetaByName('twitter:card', 'summary');
    setMetaByName('twitter:title', state.title);
    setMetaByName('twitter:description', state.description);
  }, [state.canonicalUrl, state.description, state.title, state.type]);

  return null;
}
