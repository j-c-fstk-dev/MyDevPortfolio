import { getContent, type Locale } from "@/data/portfolio";
import { getDictionary } from "@/data/ui";
import { Section } from "./ui";

export default function Services({ lang }: { lang: Locale }) {
  const { services } = getContent(lang);

  return (
    <Section id="services" title={getDictionary(lang).services.title}>
      <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
        {services.map((service) => (
          <div key={service.title} className="border-t-2 border-pine pt-5">
            <h3 className="text-2xl font-bold leading-tight [font-stretch:85%]">{service.title}</h3>
            <p className="mt-3 leading-relaxed text-lichen">{service.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
