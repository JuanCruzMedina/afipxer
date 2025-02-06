export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Afipxer",
  description: "Convierte tus archivos de ventas de AFIP a CSV en segundos",
  links: {
    github: "https://github.com/JuanCruzMedina/afipxer",
    sponsor: "https://juanmedina.com.ar",
  },
  posthog: {
    errorEventName: "afipxer-error",
  },
};
