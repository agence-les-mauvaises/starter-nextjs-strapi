import React from "react";

import { Metadata } from "next";
import { generateMetadataObject } from "@/lib/shared/metadata";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import fetchContentType, {
  ensureIsSingle,
} from "@/lib/strapi/fetchContentType";

// Default Global SEO for pages without them
export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const pageData = ensureIsSingle(
    await fetchContentType(
      "global",
      `&filters[locale][$eq]=${params.locale}&populate=seo.metaImage`,
      true
    )
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const pageData = ensureIsSingle(
    await fetchContentType("global", `filters[locale][$eq]=${locale}`, true)
  );
  return (
    <>
      <Navbar data={pageData.navbar} locale={locale} />
      <div className="flex-1">
      {children}</div>
      <Footer data={pageData.footer} locale={locale} />
    </>
  );
}
