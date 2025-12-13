import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "The Dime Technology | Your Freelance Tech Partner",
    template: "%s | The Dime Technology",
  },
  description:
    "A collective of passionate technologists driving business transformation through innovative technology solutions. Expert freelance services in Web Development, Mobile Apps, DevOps, Cloud Solutions, Security & More.",
  keywords: [
    "freelance technology services",
    "web development",
    "mobile app development",
    "DevOps services",
    "cloud solutions",
    "software development",
    "tech consulting",
    "digital transformation",
    "Nepal tech company",
    "React development",
    "Node.js development",
    "Python development",
    "Java development",
    "database solutions",
    "API development",
    "cybersecurity",
    "UI/UX design",
  ],
  authors: [{ name: "The Dime Technology" }],
  creator: "The Dime Technology",
  publisher: "The Dime Technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://thedimetechnology.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "The Dime Technology | Your Freelance Tech Partner",
    description:
      "Expert freelance technology services driving business transformation. Web Development, Mobile Apps, DevOps, Cloud Solutions & More.",
    url: "https://thedimetechnology.com",
    siteName: "The Dime Technology",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Dime Technology - Your Freelance Tech Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Dime Technology | Your Freelance Tech Partner",
    description:
      "Expert freelance technology services. Web Development, Mobile Apps, DevOps, Cloud Solutions & More.",
    images: ["/og-image.jpg"],
    creator: "@dimetechnology",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "The Dime Technology",
    alternateName: "DimeTech",
    description:
      "A collective of passionate technologists driving business transformation through innovative technology solutions.",
    url: "https://thedimetechnology.com",
    logo: "https://thedimetechnology.com/logo.png",
    image: "https://thedimetechnology.com/og-image.jpg",
    telephone: "+977-9801024024",
    email: "info.thedimetechnology@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Imadol",
      addressLocality: "Lalitpur",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "27.6661",
      longitude: "85.3534",
    },
    sameAs: [
      "https://www.truelancer.com/freelancer/shahidalam7",
      // Add your actual social media URLs here
    ],
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Worldwide",
    },
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "DevOps Services",
      "Cloud Solutions",
      "Software Development",
      "Tech Consulting",
      "Digital Transformation",
      "UI/UX Design",
    ],
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0c111d" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <link rel="canonical" href="https://thedimetechnology.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
