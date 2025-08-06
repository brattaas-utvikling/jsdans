// pages/PrivacyPolicyPage.tsx
import { motion } from "framer-motion";
import { Shield, Cookie, Mail, Database, UserCheck, Clock } from "lucide-react";
import ScrollToTop from "@/helpers/ScrollToTop";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-16">
      <ScrollToTop />
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-brand-600 dark:text-brand-400" />
              </div>
            </div>
            <h1 className="font-bebas text-bebas-2xl md:text-bebas-3xl text-gray-900 dark:text-white mb-4">
              Personvernerklæring
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-montserrat">
              Urban Studios AS - Oppdatert januar 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none font-montserrat">
            {/* Introduksjon */}
            <section className="mb-12">
              <h2 className="font-bebas text-bebas-lg text-gray-900 dark:text-white mb-4 flex items-center">
                <UserCheck className="h-6 w-6 text-brand-500 mr-3" />
                Vårt personvernengasjement
              </h2>
              <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-6 border border-brand-200 dark:border-brand-700/30">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Urban Studios AS respekterer ditt personvern og er forpliktet
                  til å beskytte dine personopplysninger. Denne
                  personvernerklæringen forklarer hvordan vi samler inn, bruker
                  og beskytter informasjon når du besøker vår nettside{" "}
                  <strong>urbanstudios.no</strong> eller bruker våre tjenester.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Vi følger EU's personvernforordning (GDPR) og Norges nye
                  ekomlov fra 2025 for bruk av informasjonskapsler.
                </p>
              </div>
            </section>

            {/* Kontaktinformasjon */}
            <section className="mb-12">
              <h2 className="font-bebas text-bebas-lg text-gray-900 dark:text-white mb-4 flex items-center">
                <Mail className="h-6 w-6 text-brand-500 mr-3" />
                Kontaktinformasjon
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Behandlingsansvarlig:</strong> Urban Studios AS
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>Adresse:</strong> [Din adresse]
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>E-post:</strong> personvern@urbanstudios.no
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Telefon:</strong> [Ditt telefonnummer]
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="font-bebas text-bebas-lg text-gray-900 dark:text-white mb-4 flex items-center">
                <Cookie className="h-6 w-6 text-brand-500 mr-3" />
                Informasjonskapsler (Cookies)
              </h2>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-700/30 mb-6">
                <h3 className="font-montserrat-semibold text-amber-800 dark:text-amber-200 mb-3">
                  Nye regler fra 2025
                </h3>
                <p className="text-amber-700 dark:text-amber-300">
                  Fra 1. januar 2025 følger vi Norges oppdaterte ekomlov som
                  krever aktivt samtykke for ikke-nødvendige cookies. Du kan når
                  som helst endre dine cookie-preferanser.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <h4 className="font-montserrat-semibold text-gray-900 dark:text-white mb-3">
                    Nødvendige cookies
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Kreves for grunnleggende funksjonalitet. Kan ikke
                    deaktiveres.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Autentisering og sikkerhet</li>
                    <li>• Språk- og tema-preferanser</li>
                    <li>• Cookie-samtykke status</li>
                  </ul>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <h4 className="font-montserrat-semibold text-gray-900 dark:text-white mb-3">
                    Analyse cookies
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Hjelper oss å forstå hvordan nettsiden brukes.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Google Analytics (anonymisert)</li>
                    <li>• Besøksstatistikk</li>
                    <li>• Feilrapportering</li>
                  </ul>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <h4 className="font-montserrat-semibold text-gray-900 dark:text-white mb-3">
                    Markedsføring cookies
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    For relevante annonser og kampanjesporing.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Facebook Pixel</li>
                    <li>• Google Ads</li>
                    <li>• Retargeting</li>
                  </ul>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <h4 className="font-montserrat-semibold text-gray-900 dark:text-white mb-3">
                    Preferanse cookies
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Husker dine personlige innstillinger.
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Språkvalg</li>
                    <li>• Tema (lys/mørk)</li>
                    <li>• Favoritter</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Personopplysninger */}
            <section className="mb-12">
              <h2 className="font-bebas text-bebas-lg text-gray-900 dark:text-white mb-4 flex items-center">
                <Database className="h-6 w-6 text-brand-500 mr-3" />
                Personopplysninger vi samler inn
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700/30">
                  <h3 className="font-montserrat-semibold text-blue-800 dark:text-blue-200 mb-3">
                    Kontaktskjema
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 mb-3">
                    Når du fyller ut vårt kontaktskjema, samler vi inn:
                  </p>
                  <ul className="text-blue-700 dark:text-blue-300 space-y-1">
                    <li>
                      • <strong>Navn:</strong> For å kunne kontakte deg
                    </li>
                    <li>
                      • <strong>E-postadresse:</strong> For å svare på din
                      henvendelse
                    </li>
                    <li>
                      • <strong>Telefonnummer:</strong> Valgfritt, for raskere
                      kontakt
                    </li>
                    <li>
                      • <strong>Melding:</strong> Innholdet i din henvendelse
                    </li>
                    <li>
                      • <strong>IP-adresse:</strong> For sikkerhet og
                      spam-beskyttelse
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700/30">
                  <h3 className="font-montserrat-semibold text-green-800 dark:text-green-200 mb-3">
                    Kursregistrering
                  </h3>
                  <p className="text-green-700 dark:text-green-300 mb-3">
                    Ved påmelding til kurs samler vi inn:
                  </p>
                  <ul className="text-green-700 dark:text-green-300 space-y-1">
                    <li>
                      • <strong>Fullt navn:</strong> For kursadministrasjon
                    </li>
                    <li>
                      • <strong>Alder/fødselsdato:</strong> For alderstilpassede
                      kurs
                    </li>
                    <li>
                      • <strong>Kontaktinformasjon:</strong> For kommunikasjon
                    </li>
                    <li>
                      • <strong>Helseopplysninger:</strong> Kun hvis relevant
                      for sikkerhet
                    </li>
                    <li>
                      • <strong>Betalingsinformasjon:</strong> For fakturering
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Behandlingsgrunnlag */}
            <section className="mb-12">
              <h2 className="font-bebas text-bebas-lg text-gray-900 dark:text-white mb-6">
                Behandlingsgrunnlag
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700/30">
                  <h3 className="font-montserrat-semibold text-purple-800 dark:text-purple-200 mb-3">
                    Samtykke
                  </h3>
                  <p className="text-purple-700 dark:text-purple-300 text-sm">
                    Du har gitt oss eksplisitt samtykke til å behandle dine
                    personopplysninger for spesifikke formål.
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700/30">
                  <h3 className="font-montserrat-semibold text-orange-800 dark:text-orange-200 mb-3">
                    Kontraktoppfyllelse
                  </h3>
                  <p className="text-orange-700 dark:text-orange-300 text-sm">
                    For å kunne levere våre tjenester og oppfylle våre
                    forpliktelser overfor deg.
                  </p>
                </div>

                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6 border border-teal-200 dark:border-teal-700/30">
                  <h3 className="font-montserrat-semibold text-teal-800 dark:text-teal-200 mb-3">
                    Berettiget interesse
                  </h3>
                  <p className="text-teal-700 dark:text-teal-300 text-sm">
                    For vår forretningsdrift, kundeservice og forbedring av
                    tjenester.
                  </p>
                </div>
              </div>
            </section>

            {/* Dine rettigheter */}
            <section className="mb-12">
              <h2 className="font-bebas text-bebas-lg text-gray-900 dark:text-white mb-4 flex items-center">
                <UserCheck className="h-6 w-6 text-brand-500 mr-3" />
                Dine rettigheter
              </h2>

              <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-6 border border-brand-200 dark:border-brand-700/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-montserrat-semibold text-brand-800 dark:text-brand-200 mb-3">
                      Du har rett til:
                    </h3>
                    <ul className="text-brand-700 dark:text-brand-300 space-y-2">
                      <li>
                        ✓ <strong>Innsyn:</strong> Vite hvilke opplysninger vi
                        har om deg
                      </li>
                      <li>
                        ✓ <strong>Retting:</strong> Få rettet feil i dine
                        opplysninger
                      </li>
                      <li>
                        ✓ <strong>Sletting:</strong> Få slettet dine
                        personopplysninger
                      </li>
                      <li>
                        ✓ <strong>Begrensning:</strong> Begrense behandlingen
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-montserrat-semibold text-brand-800 dark:text-brand-200 mb-3">
                      Og også:
                    </h3>
                    <ul className="text-brand-700 dark:text-brand-300 space-y-2">
                      <li>
                        ✓ <strong>Dataportabilitet:</strong> Få ut dine data
                      </li>
                      <li>
                        ✓ <strong>Motsette seg:</strong> Si nei til behandling
                      </li>
                      <li>
                        ✓ <strong>Trekke samtykke:</strong> Når som helst
                      </li>
                      <li>
                        ✓ <strong>Klage:</strong> Til Datatilsynet
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-brand-200 dark:border-brand-700">
                  <p className="text-brand-700 dark:text-brand-300">
                    <strong>Kontakt oss:</strong> For å utøve dine rettigheter,
                    send e-post til
                    <a
                      href="mailto:personvern@urbanstudios.no"
                      className="underline ml-1"
                    >
                      personvern@urbanstudios.no
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Sikkerhet */}
            <section className="mb-12">
              <h2 className="font-bebas text-bebas-lg text-gray-900 dark:text-white mb-4 flex items-center">
                <Shield className="h-6 w-6 text-brand-500 mr-3" />
                Sikkerhet og lagring
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="font-montserrat-semibold text-gray-900 dark:text-white mb-3">
                    Sikkerhetstiltak
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                    <li>• SSL-kryptering for all dataoverføring</li>
                    <li>• Sikre servere hos Appwrite Cloud</li>
                    <li>• Regelmessige sikkerhetskopier</li>
                    <li>• Tilgangskontroll og logging</li>
                    <li>• Anonymisering av analysdata</li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                  <h3 className="font-montserrat-semibold text-gray-900 dark:text-white mb-3">
                    Lagringstid
                  </h3>
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                    <li>
                      • <strong>Kontaktskjema:</strong> 3 år
                    </li>
                    <li>
                      • <strong>Kursregistrering:</strong> 5 år
                    </li>
                    <li>
                      • <strong>Cookies:</strong> 1-24 måneder
                    </li>
                    <li>
                      • <strong>Analysdata:</strong> 26 måneder
                    </li>
                    <li>
                      • <strong>Markedsføring:</strong> 180 dager
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Databehandlere */}
            <section className="mb-12">
              <h2 className="font-bebas text-bebas-lg text-gray-900 dark:text-white mb-6">
                Databehandlere og tredjepart
              </h2>

              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <h3 className="font-montserrat-semibold text-gray-900 dark:text-white mb-2">
                    Appwrite Cloud (Hosting og database)
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Sikker hosting av våre systemer. GDPR-kompatibel med
                    databehandleravtale.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <h3 className="font-montserrat-semibold text-gray-900 dark:text-white mb-2">
                    Google Analytics (Kun med samtykke)
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Anonymisert analyse av nettstedbruk. Krever ditt eksplisitte
                    samtykke.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                  <h3 className="font-montserrat-semibold text-gray-900 dark:text-white mb-2">
                    E-posttjeneste
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    For automatiske e-poster og kommunikasjon. Norsk leverandør
                    med GDPR-compliance.
                  </p>
                </div>
              </div>
            </section>

            {/* Endringer */}
            <section className="mb-12">
              <h2 className="font-bebas text-bebas-lg text-gray-900 dark:text-white mb-4 flex items-center">
                <Clock className="h-6 w-6 text-brand-500 mr-3" />
                Endringer i personvernerklæringen
              </h2>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Vi kan oppdatere denne personvernerklæringen fra tid til
                  annen. Ved vesentlige endringer vil vi informere deg via
                  tydelig melding på nettsiden.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Siste oppdatering:</strong> Januar 2025
                  <br />
                  <strong>Neste planlagte gjennomgang:</strong> Januar 2026
                </p>
              </div>
            </section>

            {/* Kontakt */}
            <section className="mb-8">
              <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-6 border border-brand-200 dark:border-brand-700/30 text-center">
                <h2 className="font-bebas text-bebas-lg text-brand-800 dark:text-brand-200 mb-4">
                  Spørsmål om personvern?
                </h2>
                <p className="text-brand-700 dark:text-brand-300 mb-6">
                  Har du spørsmål om hvordan vi behandler dine
                  personopplysninger, eller ønsker å utøve dine rettigheter?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:personvern@urbanstudios.no"
                    className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-full font-montserrat-medium transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Kontakt oss
                  </a>
                  <a
                    href="https://www.datatilsynet.no"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-brand-300 text-brand-600 hover:bg-brand-50 px-6 py-3 rounded-full font-montserrat-medium transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                    Datatilsynet
                  </a>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
