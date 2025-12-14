// src/components/enrollment/steps/SummaryStep.tsx
import { useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEnrollment } from "../../../contexts/EnrollmentContext"
import {
  CreditCard,
  ArrowRight,
  ArrowLeft,
  User,
  Users,
  Calendar,
  Mail,
  Phone,
  CheckCircle,
  Edit3,
  UserPlus,
  FileText,
  AlertCircle,
  Shield,
  MapPin,
  Info,
  ExternalLink,
} from "lucide-react"
import ScrollToTop from "@/helpers/ScrollToTop"
import TermsModal from "../../TermsModal"
import { Link } from "react-router-dom"

export default function SummaryStep() {
  const {
    state,
    goToNextStep,
    goToPreviousStep,
    setStep,
    currentPricing,
    isFormValid,
    setTermsAccepted,
  } = useEnrollment()

  const termsAccepted = state.enrollmentData.termsAccepted
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [showTermsError, setShowTermsError] = useState(false)

  const termsSectionRef = useRef<HTMLDivElement | null>(null)

  const handleEditSection = (step: "contact" | "courses") => setStep(step)
  const handleOpenTerms = () => setIsTermsModalOpen(true)

  const handleNext = () => {
    if (!termsAccepted) {
      setShowTermsError(true)
      const el = termsSectionRef.current
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" })
        el.classList.add("animate-shake")
        window.setTimeout(() => el.classList.remove("animate-shake"), 500)
      }
      return
    }
    setShowTermsError(false)
    goToNextStep()
  }

  const handleTermsToggle = (checked: boolean) => {
    setTermsAccepted(checked)
    if (checked) setShowTermsError(false)
  }

  const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--
    return age
  }

  const studentAge = calculateAge(state.enrollmentData.student.birthDate)
  const canProceed = isFormValid && termsAccepted

  // ✅ Unngå "tomt område": rendrer bare boksen hvis det faktisk finnes noe å vise
  const missingItems = useMemo(() => {
    const items: string[] = []

    const { student, guardian, selectedCourses, hasSiblings, siblings } = state.enrollmentData

    if (!student.firstName || !student.lastName || !student.birthDate) {
      items.push("Elevens informasjon er ikke fullstendig")
    }

    // inkluder adressefeltene her også (så det gir mening om noe mangler)
    if (
      !guardian.name ||
      !guardian.email ||
      !guardian.phone ||
      !guardian.address ||
      !guardian.postalCode ||
      !guardian.city
    ) {
      items.push("Kontaktpersonens informasjon er ikke fullstendig")
    }

    if (selectedCourses.length === 0) items.push("Ingen kurs er valgt")
    if (!currentPricing) items.push("Prisberegning mangler")

    if (hasSiblings && siblings.some((s) => !s.firstName.trim() || !s.lastName.trim())) {
      items.push("Søskeninformasjon er ikke fullstendig")
    }

    return items
  }, [state.enrollmentData, currentPricing])

  const showMissingBox = missingItems.length > 0

  const seasonLabel = "Våren 2026"

  return (
    <div className="px-2 py-4 md:p-12">
      <ScrollToTop />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-brand-100 dark:bg-brand-900/30 p-3 rounded-full">
            <CreditCard className="h-6 w-6 text-brand-600 dark:text-brand-400" />
          </div>
        </div>

        {/* ✅ Season badge */}
        <div className="flex items-center justify-center mb-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-montserrat font-semibold
                           bg-brand-50 text-brand-700 border border-brand-200
                           dark:bg-brand-900/20 dark:text-brand-200 dark:border-brand-700/40">
            <CheckCircle className="h-4 w-4" />
            Påmelding gjelder <span className="underline underline-offset-4">{seasonLabel}</span>
          </span>
        </div>

        <h2 className="font-bebas text-bebas-xl text-gray-900 dark:text-white mb-2">Sammendrag</h2>
        <p className="text-gray-600 dark:text-gray-300 font-montserrat">
          Se over informasjonen før du fullfører påmeldingen for <strong>{seasonLabel}</strong>.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Student */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="bg-gradient-to-br from-brand-50/50 to-coral-50/30 dark:from-brand-900/20 dark:to-coral-900/10 p-6 rounded-xl border border-brand-100/50 dark:border-brand-700/30 relative"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">Eleven</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditSection("contact")}
              className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 text-xs absolute right-0 top-0"
            >
              <Edit3 className="h-3 w-3 mr-1" />
              Endre
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Navn
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white">
                {state.enrollmentData.student.firstName} {state.enrollmentData.student.lastName}
              </p>
            </div>
            <div>
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Fødselsdato
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white">
                {new Date(state.enrollmentData.student.birthDate).toLocaleDateString("no-NO")}
              </p>
            </div>
            <div>
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Alder
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white">{studentAge} år</p>
            </div>
          </div>
        </motion.div>

        {/* Søsken (hvis finnes) */}
        {state.enrollmentData.hasSiblings && state.enrollmentData.siblings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="bg-gradient-to-br from-purple-50/50 to-pink-50/30 dark:from-purple-900/20 dark:to-pink-900/10 p-6 rounded-xl border border-purple-100/50 dark:border-purple-700/30 relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <UserPlus className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">
                  Søsken ({state.enrollmentData.siblings.length})
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditSection("contact")}
                className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-xs absolute right-0 top-0"
              >
                <Edit3 className="h-3 w-3 mr-1" />
                Endre
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-purple-600 dark:text-purple-300 font-montserrat mb-3">
                Søskenrabatt aktiveres ved fakturering
              </p>
              {state.enrollmentData.siblings.map((sibling, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-surface-dark/70 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <UserPlus className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="font-montserrat font-medium text-gray-900 dark:text-white">
                      {sibling.firstName} {sibling.lastName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-montserrat">Søsken {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Kontaktperson (✅ inkl adresse) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="bg-gradient-to-br from-magenta-50/50 to-coral-50/30 dark:from-magenta-900/20 dark:to-coral-900/10 p-6 rounded-xl border border-magenta-100/50 dark:border-magenta-700/30 relative"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-magenta-600 dark:text-magenta-400" />
              <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">Kontaktperson</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditSection("contact")}
              className="text-magenta-600 hover:text-magenta-700 dark:text-magenta-400 dark:hover:text-magenta-300 text-xs absolute right-0 top-0"
            >
              <Edit3 className="h-3 w-3 mr-1" />
              Endre
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Navn
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white">{state.enrollmentData.guardian.name}</p>
            </div>
            <div>
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                E-post
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white flex items-center gap-2">
                <Mail className="h-3 w-3 text-gray-500" />
                {state.enrollmentData.guardian.email}
              </p>
            </div>
            <div>
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Telefon
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white flex items-center gap-2">
                <Phone className="h-3 w-3 text-gray-500" />
                {state.enrollmentData.guardian.phone}
              </p>
            </div>

            {/* ✅ Adresse */}
            <div className="md:col-span-3">
              <label className="text-xs font-montserrat font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Adresse
              </label>
              <p className="font-montserrat text-gray-900 dark:text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                {state.enrollmentData.guardian.address},{" "}
                {state.enrollmentData.guardian.postalCode} {state.enrollmentData.guardian.city}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Kurs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white">
                Valgte kurs ({state.enrollmentData.selectedCourses.length}) — {seasonLabel}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditSection("courses")}
              className="text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 text-xs absolute right-0 top-0"
            >
              <Edit3 className="h-3 w-3 mr-1" />
              Endre
            </Button>
          </div>

          <div className="space-y-3">
            {state.enrollmentData.selectedCourses.map((course) => (
              <div
                key={course.$id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-dark-muted rounded-lg border border-gray-100 dark:border-gray-600"
              >
                <div className="flex-1">
                  <h4 className="font-bebas text-bebas-sm text-gray-900 dark:text-white">{course.name}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 font-montserrat mt-1">
                    <span>Alder: {course.age}</span>
                    <span>Instruktør: {course.instructor}</span>
                  </div>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500 ml-4" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ✅ Bare vises hvis det faktisk finnes mangler */}
        {showMissingBox && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-montserrat font-semibold text-red-800 dark:text-red-200 mb-2">
              Noe mangler i påmeldingen:
            </h4>
            <ul className="text-red-600 dark:text-red-300 font-montserrat text-sm space-y-1">
              {missingItems.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ✅ Terms gate + ekstra bindende-info + lenker */}
      <motion.div
        ref={(node) => {
          termsSectionRef.current = node
        }}
        id="terms-checkbox-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
        className={`mt-8 relative overflow-hidden transition-all duration-300 ${
          showTermsError && !termsAccepted ? "ring-2 ring-red-300 dark:ring-red-700" : ""
        }`}
        aria-live="polite"
      >
        <div
          className={`rounded-xl p-6 border ${
            termsAccepted
              ? "bg-gradient-to-r from-green-50/80 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200/50 dark:border-green-700/30"
              : "bg-gradient-to-r from-brand-50/80 to-magenta-50/50 dark:from-brand-900/20 dark:to-magenta-900/20 border-brand-200/50 dark:border-brand-700/30"
          }`}
        >
          <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl ${termsAccepted ? "bg-green-400/10" : "bg-brand-400/10"}`} />

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex items-center h-6">
                <input
                  type="checkbox"
                  id="terms-acceptance"
                  checked={termsAccepted}
                  onChange={(e) => handleTermsToggle(e.target.checked)}
                  className="w-5 h-5 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500 focus:ring-2 cursor-pointer transition-all"
                  aria-invalid={showTermsError && !termsAccepted}
                  aria-describedby="terms-help terms-error"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="terms-acceptance"
                  className="font-montserrat font-semibold text-gray-900 dark:text-white cursor-pointer flex items-center gap-2"
                >
                  <Shield className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                  Jeg bekrefter at jeg har lest og aksepterer betingelsene
                </label>

                <p id="terms-help" className="text-sm text-gray-600 dark:text-gray-300 font-montserrat mt-2">
                  Du må krysse av før du kan fullføre påmeldingen.
                </p>

                {/* ✅ Nytt felt under teksten */}
                <div className="mt-4 p-4 rounded-lg bg-white/70 dark:bg-black/20 border border-brand-200/40 dark:border-brand-700/30">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-brand-600 dark:text-brand-400 mt-0.5" />
                    <div className="text-sm font-montserrat text-gray-700 dark:text-gray-200 space-y-3">
                      <p className="font-semibold">
                        Du er nå i ferd med å søke om plass på ett eller flere av våre 15-ukers kurs ({seasonLabel}).
                      </p>
                      <p>
                        Påmeldingen er bindende fra det tidspunktet du får tildelt plass på kurset.
                      </p>
                      <div className="mt-6 space-y-2 rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-surface-dark-muted">
  {/* gratis prøvetime */}
  <p className="text-sm font-montserrat text-gray-700 dark:text-gray-300 text-left">
  Hvis du ønsker å melde deg på til en gratis prøvetime,&nbsp;
  <a
    href="mailto:kontakt@urbanstudios.no?subject=Påmelding til gratis prøvetime&body=Navn%0AFødselsdato%0ATelefon%0AE-post%0A%0AØnsket klasse(r)%0APreferert tid"
    className="inline-flex items-center gap-1
               font-medium
               text-gray-600 dark:text-gray-400
               hover:text-gray-800 dark:hover:text-gray-200
               underline underline-offset-4 decoration-1
               transition-colors"
    aria-label="Send e-post for påmelding til gratis prøvetime"
  >
    TRYKK HER
    <ExternalLink className="h-4 w-4 opacity-70" />
  </a>
</p>


  {/* kontakt */}
  <p className="text-sm font-montserrat text-gray-700 dark:text-gray-300 text-left">
  Hvis du ønsker å komme i kontakt med oss,&nbsp;
  <Link
    to="/kontakt"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1
               font-medium
               text-gray-600 dark:text-gray-400
               hover:text-gray-800 dark:hover:text-gray-200
               underline underline-offset-4 decoration-1
               transition-colors"
  >
    TRYKK HER
    <ExternalLink className="h-4 w-4 opacity-70" />
  </Link>
</p>


</div>

                      {/* <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <a
                        href="mailto:kontakt@urbanstudios.no?subject=Påmelding%20til%20gratis%20prøvetime&body=Navn%0AFødselsdato%0ATelefon%0AE-post%0A%0AØnsket%20klasse(r)%0APreferert%20tid"
                        className="inline-flex items-center justify-center
                                  px-4 py-2 rounded-full
                                  bg-brand-50 hover:bg-brand-100
                                  text-brand-600
                                  text-sm font-montserrat font-medium
                                  transition-colors duration-200"
                      >
                        Gratis prøvetime
                      </a>

                      <Link
                        to="/kontakt"
                        className="inline-flex items-center gap-2
                                  px-4 py-2 rounded-full
                                  border border-gray-300 dark:border-gray-700
                                  bg-white dark:bg-surface-dark
                                  text-gray-900 dark:text-white
                                  font-montserrat font-medium text-sm
                                  hover:bg-gray-50 dark:hover:bg-surface-dark-muted
                                  transition-colors duration-200"
                      >
                        Kom i kontakt
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* ✅ slutt nytt felt */}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleOpenTerms}
                className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-montserrat font-medium text-sm transition-colors duration-200 cursor-pointer underline decoration-2 underline-offset-4"
              >
                <FileText className="h-4 w-4" />
                Les betingelser og vilkår
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            {!termsAccepted && showTermsError && (
              <motion.div
                id="terms-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-montserrat"
              >
                <AlertCircle className="h-4 w-4" />
                <span>Du må akseptere betingelsene for å fullføre påmeldingen</span>
              </motion.div>
            )}

            {termsAccepted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-montserrat font-medium"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Betingelser akseptert</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
        className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200 dark:border-gray-700"
      >
        <Button
          onClick={goToPreviousStep}
          variant="outline"
          className="px-6 py-3 rounded-full font-montserrat font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tilbake
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className={
            canProceed
              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.01] md:px-8 md:py-3 rounded-full font-semibold font-montserrat text-sm md:text-base transition-all duration-200 flex items-center gap-2"
              : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed md:px-8 md:py-3 rounded-full font-semibold font-montserrat text-sm md:text-base transition-all duration-200 flex items-center gap-2"
          }
        >
          Fullfør påmelding
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>

      <TermsModal open={isTermsModalOpen} onOpenChange={setIsTermsModalOpen} />
    </div>
  )
}
