/**
 * JSON-LD Structured Data Components for SEO
 * These components inject schema.org structured data into the page.
 */

interface PersonJsonLdProps {
  name?: string;
  url?: string;
  jobTitle?: string;
  sameAs?: string[];
}

export function PersonJsonLd({
  name = "Lukas Gabsi",
  url = "https://gabsii.com",
  jobTitle = "Freelance Developer",
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
    sameAs,
    knowsAbout: [
      "Web Development",
      "Full-Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "SEO"
    ],
    worksFor: {
      "@type": "Organization",
      name: "Gabsii - Digital Innovation & Web Solutions"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface WebSiteJsonLdProps {
  name?: string;
  url?: string;
  description?: string;
}

export function WebSiteJsonLd({
  name = "Gabsii",
  url = "https://gabsii.com",
  description = "Digital Innovation & Web Solutions by Gabsii - Austria-based freelancer specializing in advanced software development and full-stack solutions."
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
    "@type": "Article",
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
      "@type": "Person",
      name: "Lukas Gabsi",
      url: "https://gabsii.com"
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * Combined JSON-LD component for the main layout.
 * Includes Person and WebSite schemas.
 */
export function JsonLd() {
  return (
    <>
      <PersonJsonLd />
      <WebSiteJsonLd />
    </>
  );
}
