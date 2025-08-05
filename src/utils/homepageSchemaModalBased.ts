// ===================================
// HJEMMESIDE SCHEMA - Modal-basert struktur
// ===================================

export const homepageSchemaModalBased = {
  "@context": "https://schema.org",
  "@type": "DanceSchool",
  name: "Urban Studios Kongsvinger",
  alternateName: "Urban Studios",
  description:
    "Profesjonelt dansestudio i Kongsvinger med ballet, hip-hop, jazz, moderne dans og dansekompani for alle aldre og nivåer",
  url: "https://urbanstudios.no",
  logo: "https://urbanstudios.no/logo.svg",
  image: "https://urbanstudios.no/images/hero-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Storgata 42",
    addressLocality: "Kongsvinger",
    postalCode: "2212",
    addressCountry: "NO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "60.1939",
    longitude: "12.0022",
  },
  telephone: "+47 123 45 678",
  email: "post@urbanstudios.no",
  openingHours: ["Mo-Fr 16:00-21:00", "Sa 10:00-16:00"],
  // Prissystem basert på dine faktiske priser
  priceRange: "1300-5100 NOK per semester (15 uker)",
  areaServed: {
    "@type": "City",
    name: "Kongsvinger",
  },

  // ALLE KURS MED RIKTIG PRISSYSTEM
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dansetimer og kurs ved Urban Studios",
    itemListElement: [
      // BARNEDANS (spesialpris)
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Barnedans",
          description: "Barnedans 45 minutter for de yngste danserne",
          url: "https://urbanstudios.no/kurs#barnedans",
          serviceType: "Barnedans",
          duration: "PT45M",
          provider: {
            "@type": "Organization",
            name: "Urban Studios Kongsvinger",
          },
        },
        price: "1300",
        priceCurrency: "NOK",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "1300",
          priceCurrency: "NOK",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: "15",
            unitText: "uker",
          },
          description: "45 minutter dansetimer for barn, 15 uker",
        },
        category: "Barnedans",
        validFrom: "2025-08-01",
        validThrough: "2025-12-31",
      },

      // BALLET
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ballet dansetimer",
          description:
            "Klassisk ballet opplæring for alle aldre og nivåer i Kongsvinger",
          url: "https://urbanstudios.no/kurs#ballet",
          serviceType: "Ballet dans",
          duration: "PT60M",
          provider: {
            "@type": "Organization",
            name: "Urban Studios Kongsvinger",
          },
        },
        price: "1700",
        priceCurrency: "NOK",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "1700",
          priceCurrency: "NOK",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: "15",
            unitText: "uker",
          },
          description: "1 klasse 60 minutter, 15 uker",
        },
        category: "Klassisk dans",
      },

      // HIP-HOP
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Hip-hop dansetimer",
          description:
            "Hip-hop dans og urban styles for alle nivåer i Kongsvinger",
          url: "https://urbanstudios.no/kurs#hip-hop",
          serviceType: "Hip-hop dans",
          duration: "PT60M",
          provider: {
            "@type": "Organization",
            name: "Urban Studios Kongsvinger",
          },
        },
        price: "1700",
        priceCurrency: "NOK",
        category: "Urban dans",
      },

      // JAZZ
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Jazz dans kurs",
          description: "Jazz dans med fokus på teknikk, stil og uttrykk",
          url: "https://urbanstudios.no/kurs#jazz",
          serviceType: "Jazz dans",
          duration: "PT60M",
          provider: {
            "@type": "Organization",
            name: "Urban Studios Kongsvinger",
          },
        },
        price: "1700",
        priceCurrency: "NOK",
        category: "Jazz dans",
      },

      // MODERNE
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Moderne dans",
          description: "Moderne dans og contemporary for kreativ utvikling",
          url: "https://urbanstudios.no/kurs#moderne",
          serviceType: "Moderne dans",
          duration: "PT60M",
          provider: {
            "@type": "Organization",
            name: "Urban Studios Kongsvinger",
          },
        },
        price: "1700",
        priceCurrency: "NOK",
        category: "Moderne dans",
      },

      // KOMPANI
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dansekompani",
          description: "Profesjonell dansegruppe og konkurransedans",
          url: "https://urbanstudios.no/kurs#kompani",
          serviceType: "Dansekompani",
          duration: "PT60M",
          provider: {
            "@type": "Organization",
            name: "Urban Studios Kongsvinger",
          },
        },
        price: "1700",
        priceCurrency: "NOK",
        category: "Konkurransedans",
      },

      // ASPIRANTKOMPANI
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Aspirantkompani",
          description: "Forberedende dansegruppe for unge talenter",
          url: "https://urbanstudios.no/kurs#aspirantkompani",
          serviceType: "Aspirantkompani",
          duration: "PT60M",
          provider: {
            "@type": "Organization",
            name: "Urban Studios Kongsvinger",
          },
        },
        price: "1700",
        priceCurrency: "NOK",
        category: "Ungdomsdans",
      },

      // SHOW
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Show dans",
          description: "Danseshows, opptreden og scenepresentasjon",
          url: "https://urbanstudios.no/kurs#show",
          serviceType: "Show dans",
          duration: "PT60M",
          provider: {
            "@type": "Organization",
            name: "Urban Studios Kongsvinger",
          },
        },
        price: "1700",
        priceCurrency: "NOK",
        category: "Performance dans",
      },

      // STYRKE OG TØY
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Styrke og tøy",
          description:
            "Fysisk trening tilpasset dansere - styrke og fleksibilitet",
          url: "https://urbanstudios.no/kurs#styrke-toy",
          serviceType: "Dansefysikk",
          duration: "PT60M",
          provider: {
            "@type": "Organization",
            name: "Urban Studios Kongsvinger",
          },
        },
        price: "1700",
        priceCurrency: "NOK",
        category: "Fysisk trening",
      },
    ],
  },

  // RABATTORDNINGER OG TILBUD
  offers: [
    {
      "@type": "Offer",
      name: "2 klasser rabatt",
      description: "200 kr rabatt ved påmelding til 2 klasser",
      price: "3400",
      priceCurrency: "NOK",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "3400",
        priceCurrency: "NOK",
        description: "2 klasser à 60 min, 15 uker (200 kr rabatt)",
      },
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        value: "2",
        unitText: "klasser",
      },
    },
    {
      "@type": "Offer",
      name: "3 eller flere klasser rabatt",
      description: "600 kr rabatt ved påmelding til 3 eller flere klasser",
      price: "5100",
      priceCurrency: "NOK",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "5100",
        priceCurrency: "NOK",
        description: "3+ klasser à 60 min, 15 uker (600 kr rabatt)",
      },
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: "3",
        unitText: "klasser",
      },
    },
    {
      "@type": "Offer",
      name: "Familierabatt",
      description:
        "50% rabatt for danser nr 2 som danser 3 eller flere klasser",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "NOK",
        description: "50% rabatt for andre familiemedlem ved 3+ klasser",
      },
      eligibleCustomerType: "Familie",
    },
    {
      "@type": "Offer",
      name: "Klippekort",
      description: "Klippekort for 10 dansetimer",
      price: "1500",
      priceCurrency: "NOK",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "1500",
        priceCurrency: "NOK",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "10",
          unitText: "timer",
        },
      },
    },
    {
      "@type": "Offer",
      name: "Gratis prøvetime",
      description: "Gratis første time for nye deltakere",
      price: "0",
      priceCurrency: "NOK",
      eligibleCustomerType: "Nye kunder",
    },
  ],

  knowsAbout: [
    "Ballet dans Kongsvinger",
    "Hip-hop dans Kongsvinger",
    "Jazz dans Kongsvinger",
    "Moderne dans Kongsvinger",
    "Contemporary dans",
    "Dansekompani Kongsvinger",
    "Aspirantkompani",
    "Show dans",
    "Dansefysikk",
    "Styrke og tøy for dansere",
    "Dansetrening Kongsvinger",
    "Barnedans Kongsvinger",
  ],
};
