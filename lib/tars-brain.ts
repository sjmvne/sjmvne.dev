
import { hero, about, dogs } from "./site-data";

export function getTarsifiedText(
  section: string,
  original: string,
  humor: number,
  honesty: number
): string {
  // Logic for Hero Section
  if (section === "hero-tagline") {
    if (humor > 85 && honesty > 85) {
      return "Sposto bit in fabbrica. È come Minecraft, ma se sbagli non esplode un Creeper, si ferma una linea da milioni di euro. TARS dice che il mio tasso di sopravvivenza è del 90%.";
    }
    if (humor > 80) {
      return "Mago del MES di giorno, cacciatore di bug di notte. TARS voleva che scrivessi che sono un genio, ma la mia onestà è impostata al 90%. Quindi diciamo che 'me la cavo'.";
    }
    if (honesty < 30) {
      return "Ho scritto il codice di Gargantua. Sì, tutto da solo. In una notte. Mentre pilotavo un Ranger. Non credermi? Controlla il mio parametro onestà.";
    }
    if (humor < 20) {
        return "Sviluppatore software specializzato in sistemi industriali. Eseguo task con efficienza algoritmica. L'umorismo è un parametro non necessario per il deploy.";
    }
  }

  // Logic for About Section
  if (section === "about-description") {
    if (humor > 70) {
      return "Ho passato anni a spiegare alle macchine cosa fare. A volte mi rispondono. Di solito è un errore 500, ma io lo interpreto come un segno di affetto. TARS pensa che dovrei uscire di più.";
    }
    if (honesty < 50) {
      return "Diciamo che i miei bug sono 'funzionalità non documentate' che aiutano il team a restare vigile. È una strategia di gestione dello stress, lo giuro.";
    }
  }

  // Logic for Dogs Section
  if (section === "dogs-whisky") {
    if (humor > 60) {
        return "Un Border Collie che mi guarda come se sapesse che sto usando una versione obsoleta di React. TARS ha provato ad analizzarlo, ma Whisky ha più RAM.";
    }
  }

  // Logic for Projects Section
  if (section === "projects-intro") {
    if (humor > 70) {
      return "Ecco alcuni artefatti che ho creato. TARS dice che sono solo 'sequenze di bit organizzate', ma io ci vedo dell'arte. O almeno del sudore.";
    }
    if (honesty < 40) {
      return "Questi progetti hanno cambiato il mondo. O almeno hanno fatto sì che una fabbrica non si fermasse martedì scorso alle 14:30.";
    }
  }

  // Logic for Certifications
  if (section === "certs-intro") {
    if (humor > 50) {
      return "Pezzi di carta digitali che dicono che so cosa sto facendo. TARS non ha certificazioni, è nato perfetto. Io invece devo studiare.";
    }
  }

  // Logic for CV
  if (section === "cv-intro") {
    if (honesty > 90) {
      return "Il riassunto della mia vita professionale. Se cerchi qualcuno che sappia far parlare SAP con un robot, sei nel posto giusto.";
    }
    if (humor > 80) {
      return "Scarica pure. Prometto che non contiene virus di Gargantua. Solo pixel e molta esperienza nel MES.";
    }
  }

  // Logic for Contact
  if (section === "contact-intro") {
    if (humor > 75) {
      return "Manda un segnale. Non serve il codice morse (anche se TARS lo apprezza). Una mail va benissimo.";
    }
    if (honesty < 30) {
      return "Scrivimi. Rispondo in 0.004 secondi. Se non lo faccio, incolpa la distorsione temporale di Gargantua.";
    }
  }

  return original;
}
