import { PRICING_PLANS } from "@/polymet/data/dance-studio-data";
import PricingCard from "@/polymet/components/pricing-card";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-medium text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
            Prismodell
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Fleksible priser for alle behov
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Velg en prismodell som passer deg best.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="relative">
          <div className="absolute -top-20 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />

          <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl" />

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
            {PRICING_PLANS.map((plan) => (
              <PricingCard
                key={plan.id}
                name={plan.name}
                price={plan.price}
                duration={plan.duration}
                features={plan.features}
                popular={plan.popular}
                color={plan.color}
              />
            ))}
          </div>
        </div>

        {/* Additional information */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            Trenger du en mer tilpasset prismodell?
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            We tilby egne spesialmodeller for både yngre og eldre. Ta kontak for et hyggelig tilbud!
          </p>
        </div>
      </div>
    </section>
  );
}
