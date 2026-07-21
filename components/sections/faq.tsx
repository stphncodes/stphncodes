import { ChevronDown } from "lucide-react";

import { faqs } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";

// FAQPage structured data — makes the questions eligible for FAQ rich results.
// Content matches the visible accordion below.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function Faq() {
  return (
    <section id="faq" className="relative py-28 sm:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container">
        <SectionHeading
          eyebrow="08 · FAQ"
          title="Questions, answered"
          description="Everything business owners usually ask before we start. Still unsure? Send a message and I'll reply within 48h."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-16 flex max-w-3xl flex-col gap-4">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} direction="up" delay={i * 0.05}>
              <details className="group glass overflow-hidden rounded-2xl transition-colors duration-300 hover:border-white/20">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-base font-semibold tracking-tight sm:text-lg">
                    {faq.question}
                  </h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-colors group-open:border-primary/40 group-open:text-primary">
                    <ChevronDown className="size-4 transition-transform duration-300 group-open:rotate-180" />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
