import { title, subtitle } from "@/components/primitives";
import FileDropZone from "@/components/file-drop-zone";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "blue", size: "xl" })}>
          Afipxer&nbsp;
        </span>
        <br />
        <span className={title()}>
          Normaliza tus archivos de AFIP en segundos
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Rápido, sencillo y al alcance de cualquiera.
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <FileDropZone />
      </div>
    </section>
  );
}
