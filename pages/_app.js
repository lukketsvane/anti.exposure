import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import AdventLayout from './../components/AdventLayout';
import LeaveAMessage from './../components/LeaveAMessage'; // Import LeaveAMessage component
import 'nextra-theme-blog/style.css';
import Head from 'next/head';
import '../styles/main.css';


const mdxComponents = {
  AdventLayout,
};

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />; (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <MDXProvider components={mdxComponents}>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  );
}