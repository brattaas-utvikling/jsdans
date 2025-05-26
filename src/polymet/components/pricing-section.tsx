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
          <h2 className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-3">
            Pricing Plans
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Flexible Options for Everyone
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Choose the plan that works best for you, from single classes to
            unlimited monthly passes. No long-term commitments required.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="relative">
          <div className="absolute -top-20 left-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl" />

          <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-coral-400/10 rounded-full blur-3xl" />

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
            Need a custom plan?
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            We offer special rates for families, students, and seniors. Contact
            us to learn more about our discounts and custom packages.
          </p>
        </div>
      </div>
    </section>
  );
}
