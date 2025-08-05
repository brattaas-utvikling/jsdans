
// src/components/enrollment/steps/ConfirmationStep.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useEnrollment } from '@/contexts/EnrollmentContext';
import { createDocument, DATABASE_ID, COLLECTIONS } from '@/lib/appwrite';
import { CheckCircle, AlertTriangle, Loader2, ArrowLeft } from 'lucide-react';
import { formatSmartPrice } from '@/utils/enchancedSmartPricing';
import type { EnrollmentRecord, EnrollmentEmailData } from '@/types/enrollment';

export default function ConfirmationStep() {
  const { state, resetEnrollment, setStep } = useEnrollment();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const submitEnrollment = async () => {
      if (isSubmitting || success) return;

      setIsSubmitting(true);
      setError(null);

      try {
        // Valider at alle nødvendige data er tilstede
        if (
          !state.enrollmentData.student.firstName ||
          !state.enrollmentData.student.lastName ||
          !state.enrollmentData.student.birthDate ||
          !state.enrollmentData.guardian.name ||
          !state.enrollmentData.guardian.email ||
          !state.enrollmentData.guardian.phone ||
          state.enrollmentData.selectedCourses.length === 0 ||
          !state.enrollmentData.pricing
        ) {
          throw new Error('Ufullstendig påmeldingsdata');
        }

        // Beregn alder
        const calculateAge = (birthDate: string): number => {
          const birth = new Date(birthDate);
          const today = new Date();
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
          }
          return age;
        };

        const studentAge = calculateAge(state.enrollmentData.student.birthDate);

        // Forbered EnrollmentRecord
        const enrollmentRecord: EnrollmentRecord = {
          $id: 'unique()', // Appwrite genererer unik ID
          studentFirstName: state.enrollmentData.student.firstName,
          studentLastName: state.enrollmentData.student.lastName,
          studentBirthDate: state.enrollmentData.student.birthDate,
          studentAge,
          guardianName: state.enrollmentData.guardian.name,
          guardianEmail: state.enrollmentData.guardian.email,
          guardianPhone: state.enrollmentData.guardian.phone,
          selectedCourseIds: state.enrollmentData.selectedCourses.map(course => course.$id),
          selectedCourseNames: state.enrollmentData.selectedCourses.map(course => course.name),
          totalPrice: state.enrollmentData.pricing.total,
          originalPrice: state.enrollmentData.pricing.originalPrice,
          discount: state.enrollmentData.pricing.discount,
          packageId: null, // Sett til faktisk packageId hvis tilgjengelig
          packageName: state.enrollmentData.pricing.packageName,
          isSecondDancerInFamily: state.enrollmentData.isSecondDancerInFamily,
          appliedFamilyDiscount: state.enrollmentData.pricing.appliedFamilyDiscount,
          status: 'pending',
          emailSent: false,
          $createdAt: new Date().toISOString(),
          $updatedAt: new Date().toISOString(),
          $collectionId: COLLECTIONS.ENROLLMENTS,
          $databaseId: DATABASE_ID,
          $permissions: [],
        };

        // Lagre student i students collection
        const studentDoc = await createDocument(
          DATABASE_ID,
          COLLECTIONS.STUDENTS,
          'unique()',
          {
            firstName: state.enrollmentData.student.firstName,
            lastName: state.enrollmentData.student.lastName,
            birthDate: state.enrollmentData.student.birthDate,
            age: studentAge,
            guardianEmail: state.enrollmentData.guardian.email, // For å koble til guardian
          }
        );

        // Lagre guardian i guardians collection
        const guardianDoc = await createDocument(
          DATABASE_ID,
          COLLECTIONS.GUARDIANS,
          'unique()',
          {
            name: state.enrollmentData.guardian.name,
            email: state.enrollmentData.guardian.email,
            phone: state.enrollmentData.guardian.phone,
          }
        );

        // Lagre påmelding i enrollments collection
        const enrollmentDoc = await createDocument(
          DATABASE_ID,
          COLLECTIONS.ENROLLMENTS,
          'unique()',
          enrollmentRecord
        );

        // Forbered e-postdata
        const emailData: EnrollmentEmailData = {
          student: state.enrollmentData.student,
          guardian: state.enrollmentData.guardian,
          courses: state.enrollmentData.selectedCourses,
          pricing: state.enrollmentData.pricing,
          enrollmentId: enrollmentDoc.$id,
          submissionDate: new Date().toISOString(),
        };

        // Send e-post via Appwrite Function (eller ekstern tjeneste)
        try {
          const response = await fetch(
            `${import.meta.env.VITE_APPWRITE_ENDPOINT}/functions/execute`,
            {
              method: 'POST',
              headers: {
                'X-Appwrite-Project': import.meta.env.VITE_APPWRITE_PROJECT_ID,
                'X-Appwrite-Key': import.meta.env.VITE_APPWRITE_API_KEY,
              },
              body: JSON.stringify({
                functionId: 'sendEnrollmentEmail',
                data: JSON.stringify({
                  to: 'registrer@urbanstudios.no',
                  subject: `Ny påmelding: ${state.enrollmentData.student.firstName} ${state.enrollmentData.student.lastName}`,
                  body: `
                    Ny påmelding mottatt\n\n
                    Elev: ${state.enrollmentData.student.firstName} ${state.enrollmentData.student.lastName}\n
                    Fødselsdato: ${new Date(state.enrollmentData.student.birthDate).toLocaleDateString('no-NO')}\n
                    Alder: ${studentAge} år\n
                    Foresatt: ${state.enrollmentData.guardian.name}\n
                    E-post: ${state.enrollmentData.guardian.email}\n
                    Telefon: ${state.enrollmentData.guardian.phone}\n
                    Valgte kurs:\n${state.enrollmentData.selectedCourses.map(course => `- ${course.name} (${course.age})`).join('\n')}\n
                    Total pris: ${formatSmartPrice(state.enrollmentData.pricing.total)}\n
                    ${state.enrollmentData.pricing.originalPrice ? `Original pris: ${formatSmartPrice(state.enrollmentData.pricing.originalPrice)}\n` : ''}
                    ${state.enrollmentData.pricing.discount ? `Rabatt: ${formatSmartPrice(state.enrollmentData.pricing.discount)}\n` : ''}
                    ${state.enrollmentData.isSecondDancerInFamily ? `Familierabatt: ${formatSmartPrice(state.enrollmentData.pricing.appliedFamilyDiscount || 0)}\n` : ''}
                    Påmeldings-ID: ${enrollmentDoc.$id}\n
                    Innsendt: ${new Date().toLocaleString('no-NO')}
                  `,
                }),
              }),
            }
          );

          if (!response.ok) throw new Error('Feil ved sending av e-post');
          
          // Oppdater enrollment med emailSent = true
          await updateDocument(
            DATABASE_ID,
            COLLECTIONS.ENROLLMENTS,
            enrollmentDoc.$id,
            { emailSent: true }
          );
        } catch (emailError) {
          console.warn('⚠️ Kunne ikke sende e-post, men påmelding er lagret:', emailError);
          // Fortsett selv om e-post feiler
        }

        setSuccess(true);
        console.log('✅ Påmelding fullført:', enrollmentDoc.$id);
      } catch (err) {
        console.error('🚫 Feil ved innsending av påmelding:', err);
        setError('Kunne ikke fullføre påmeldingen. Prøv igjen senere.');
      } finally {
        setIsSubmitting(false);
      }
    };

    submitEnrollment();
  }, [state.enrollmentData, isSubmitting, success]);

  if (isSubmitting) {
    return (
      <div className="p-8 md:p-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Loader2 className="h-12 w-12 animate-spin text-brand-600 mx-auto mb-4" />
          <h2 className="font-bebas text-bebas-xl text-gray-900 dark:text-white mb-2">
            Fullfører påmelding...
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat">
            Vennligst vent mens vi behandler din påmelding.
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 md:p-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <h2 className="font-bebas text-bebas-xl text-red-800 dark:text-red-200 mb-2">
            Noe gikk galt
          </h2>
          <p className="text-red-600 dark:text-red-300 font-montserrat mb-4">
            {error}
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setStep('summary')}
              variant="outline"
              className="font-montserrat"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Gå tilbake
            </Button>
            <Button
              onClick={() => {
                setError(null);
                setIsSubmitting(false);
                setSuccess(false);
              }}
              className="font-montserrat bg-red-600 hover:bg-red-700 text-white"
            >
              Prøv igjen
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="p-8 md:p-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h2 className="font-bebas text-bebas-xl text-gray-900 dark:text-white mb-2">
            Påmelding fullført!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 font-montserrat mb-6">
            Takk for din påmelding! Du vil motta en bekreftelse på e-post til{' '}
            <strong>{state.enrollmentData.guardian.email}</strong> og til{' '}
            <strong>registrer@urbanstudios.no</strong> med alle detaljer.
          </p>
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
              <h3 className="font-bebas text-bebas-base text-gray-900 dark:text-white mb-2">
                Oppsummering
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-montserrat">
                Elev: {state.enrollmentData.student.firstName} {state.enrollmentData.student.lastName}
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-montserrat">
                Kurs: {state.enrollmentData.selectedCourses.map(course => course.name).join(', ')}
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-montserrat">
                Totalt: {formatSmartPrice(state.enrollmentData.pricing!.total)}
              </p>
              {state.enrollmentData.isSecondDancerInFamily && (
                <p className="text-purple-700 dark:text-purple-400 font-montserrat">
                  Familierabatt: {formatSmartPrice(state.enrollmentData.pricing!.appliedFamilyDiscount || 0)}
                </p>
              )}
            </div>
            <Button
              onClick={resetEnrollment}
              className="font-montserrat bg-brand-600 hover:bg-brand-700 text-white"
            >
              Start ny påmelding
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null; // Should not reach this point
}

const { Client, Functions } = require('appwrite');

module.exports = async function (req, res) {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const functions = new Functions(client);

  const payload = JSON.parse(req.payload);
  const { to, subject, body } = payload.data;

  // Her må du integrere med en e-posttjeneste som SendGrid eller Appwrites egen e-posthåndtering
  // Eksempel med SendGrid:
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: 'no-reply@urbanstudios.no', // Sett opp en verifisert avsender
    subject,
    text: body,
  };

  try {
    await sgMail.send(msg);
    res.json({ success: true, message: 'E-post sendt' });
  } catch (error) {
    console.error('Feil ved sending av e-post:', error);
    res.json({ success: false, error: error.message });
  }
};
