import React from 'react';
import NextHead from 'next/head';

const Head = ({ children }: {children: React.ReactNode}) => {
  return (
    <NextHead>
      <html lang="en" />
      <meta name="author" content="Lukas Gabsi (Gabsii)" />
      <meta
        name="description"
        content="Looks like you found my blog. Congratulations! You now can read about any of my adventures in here."
      />
      <meta
        name="keywords"
        content="blog, personal, homepage, webpage, Lukas, Gabsi, Gabsii, EVS, European Volunteering Service, EFD, travel, travelling, Spain"
      />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      {children}
    </NextHead>
  )
}

export default Head
