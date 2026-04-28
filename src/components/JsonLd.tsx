/**
 * JSON-LD Structured Data Components for SEO
 * These components inject schema.org structured data into the page.
 */

// ─── Person ──────────────────────────────────────────────────────────────────

interface PersonJsonLdProps {
  name?: string;
  url?: string;
  jobTitle?: string;
  sameAs?: string[];
}

export function PersonJsonLd({
  name = "Lukas Gabsi",
  url = "https://gabsii.com",
  jobTitle = "Freelance Full-Stack Developer",
  sameAs = [
    "https://www.linkedin.com/in/gabsii/",
    "https://github.com/Gabsii/",
    "https://www.instagram.com/not.gabsi/",
    "https://x.com/G4bsi"
  ]
}: PersonJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    jobTitle,
    description: "Freelance full-stack developer based in Austria, building fast and accessible web products with React, Next.js, and TypeScript.",
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressCountry: "AT",
      addressRegion: "Vorarlberg"
    },
    knowsAbout: [
      "Web Development",
      "Full-Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Payload CMS",
      "Technical SEO",
      "Tailwind CSS"
    ],
    worksFor: {
      "@type": "Organization",
      name: "Gabsii – Digital Innovation & Web Solutions",
      url: "https://gabsii.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── WebSite ──────────────────────────────────────────────────────────────────

interface WebSiteJsonLdProps {
  name?: string;
  url?: string;
  description?: string;
}

export function WebSiteJsonLd({
  name = "Gabsii",
  url = "https://gabsii.com",
  description = "Digital Innovation & Web Solutions by Gabsii – Austria-based freelancer specializing in advanced software development and full-stack solutions."
}: WebSiteJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    author: {
      "@type": "Person",
      name: "Lukas Gabsi"
    },
    inLanguage: ["en", "de"]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Project (CreativeWork) ───────────────────────────────────────────────────

interface ProjectJsonLdProps {
  name: string;
  description?: string;
  url: string;
  image?: string;
  datePublished?: string;
}

export function ProjectJsonLd({
  name,
  description,
  url,
  image,
  datePublished
}: ProjectJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url,
    ...(image && { image }),
    ...(datePublished && { datePublished }),
    author: {
      "@type": "Person",
      name: "Lukas Gabsi"
    },
    creator: {
      "@type": "Person",
      name: "Lukas Gabsi"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── BlogPosting ──────────────────────────────────────────────────────────────

interface ArticleJsonLdProps {
  headline: string;
  description?: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
}

export function ArticleJsonLd({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    ...(image && { image }),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: "Lukas Gabsi",
      url: "https://gabsii.com"
    },
    publisher: {
      "@type": "Organization",
      name: "Gabsii",
      url: "https://gabsii.com",
      logo: {
        "@type": "ImageObject",
        url: "https://gabsii.com/logo-blank-dark.svg"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    isPartOf: {
      "@type": "Blog",
      name: "Gabsii Blog",
      url: "https://gabsii.com/posts"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

/**
 * Renders a BreadcrumbList schema, eligible for SERP breadcrumb display.
 * Pass items in order: Home first, current page last.
 */
export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ─── Service ──────────────────────────────────────────────────────────────────

interface ServiceItem {
  name: string;
  description: string;
  serviceType: string;
}

interface ServiceJsonLdProps {
  services: ServiceItem[];
}

/**
 * Emits one schema.org Service node per offering.
 * Wire in from the services page with resolved translation strings.
 */
export function ServiceJsonLd({ services }: ServiceJsonLdProps) {
  const provider = {
    "@type": "Person",
    name: "Lukas Gabsi",
    url: "https://gabsii.com"
  };

  const nodes = services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider,
    areaServed: {
      "@type": "Place",
      name: "Worldwide"
    },
    url: "https://gabsii.com/services"
  }));

  return (
    <>
      {nodes.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}

// ─── Combined layout schema ───────────────────────────────────────────────────

/**
 * Combined JSON-LD for the root layout.
 * Renders Person + WebSite on every page.
 */
export function JsonLd() {
  return (
    <>
      <PersonJsonLd />
      <WebSiteJsonLd />
    </>
  );
}
