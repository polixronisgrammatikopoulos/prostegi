"use client";

/**
 * Πλέγμα Ολοκληρωμένων Πακέτων (σελίδα /paketa).
 *
 * 5 πακέτα (5–20 kW) το ένα δίπλα στο άλλο, με την ίδια 3D εικόνα
 * (χρώματα λογότυπου) και την ένδειξη kW μέσα σε αυτήν. Κάθε κάρτα
 * έχει τιμή (ή «Ρωτήστε τιμή») και κουμπί που ανοίγει αναδιπλούμενη
 * φόρμα — ο πελάτης αφήνει τα στοιχεία του και εξειδικευμένος
 * εκπρόσωπος τον καλεί τηλεφωνικά (χωρίς online πληρωμή).
 */

import { useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  House,
  Layers,
  Loader2,
  PhoneCall,
  Send,
  Sun,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { PAKETA, packagePriceLabel, type PvPackage } from "@/lib/paketa-data";

/* Φόρτωση 3D σκηνής μόνο στον client */
const PackageKw3D = dynamic(() => import("@/components/site/package-kw-3d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#bfe3f7] via-[#fdf3e0] to-[#eef0e0]">
      <Sun className="h-9 w-9 animate-pulse text-[#ffcf7a]" aria-hidden />
    </div>
  ),
});

const CALL_TIMES = [
  { value: "asap", label: "Το συντομότερο δυνατό" },
  { value: "morning", label: "Πρωί (09:00 – 12:00)" },
  { value: "noon", label: "Μεσημέρι (12:00 – 15:00)" },
  { value: "afternoon", label: "Απόγευμα (15:00 – 19:00)" },
];

const TIME_LABEL: Record<string, string> = Object.fromEntries(
  CALL_TIMES.map((t) => [t.value, t.label])
);

/* ---------------- Φόρμα αιτήματος κλήσης ---------------- */

function PackageRequestForm({ pkg }: { pkg: Pick<PvPackage, "name" | "kw" | "kwLabel" | "price"> }) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [time, setTime] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Συμπληρώστε το ονοματεπώνυμό σας";
    if (phone.trim().length < 6) next.phone = "Συμπληρώστε το τηλέφωνό σας";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const messageParts = [
        `Αίτημα κλήσης από εξειδικευμένο εκπρόσωπο για το πακέτο «${pkg.name}»${
          pkg.price !== null ? ` (τιμή καταλόγου: ${packagePriceLabel(pkg as PvPackage)})` : ""
        }.`,
        city.trim() ? `Περιοχή: ${city.trim()}.` : null,
        time ? `Ιδανική ώρα κλήσης: ${TIME_LABEL[time]}.` : null,
        notes.trim() ? `Σχόλια: ${notes.trim()}` : null,
      ].filter(Boolean);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          systemType: `Πακέτο ${pkg.kwLabel}`,
          message: messageParts.join(" "),
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Σφάλμα αποστολής");
      }

      setSubmitted(true);
      toast({
        title: "Το αίτημά σας εστάλη!",
        description: "Εξειδικευμένος εκπρόσωπός μας θα σας καλέσει άμεσα.",
      });
    } catch (err) {
      toast({
        title: "Αποτυχία αποστολής",
        description:
          err instanceof Error
            ? err.message
            : "Προέκυψε σφάλμα. Δοκιμάστε ξανά ή καλέστε μας στο 2310 644 512.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-[#2c7a3e]/25 bg-[#e9f3eb] p-5 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2c7a3e]">
          <CheckCircle2 className="h-6 w-6 text-white" aria-hidden />
        </span>
        <p className="font-heading text-base font-extrabold text-[#256d34]">
          Το αίτημά σας καταχωρήθηκε!
        </p>
        <p className="text-[13px] leading-relaxed text-foreground/70">
          Ο εξειδικευμένος εκπρόσωπός μας θα σας καλέσει άμεσα στο τηλέφωνο
          που δηλώσατε, για να σας δώσει προσφορά ειδικά για το πακέτο{" "}
          <strong className="text-[#256d34]">{pkg.kwLabel}</strong>.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSubmitted(false);
            setName("");
            setPhone("");
            setCity("");
            setTime("");
            setNotes("");
          }}
          className="mt-1 rounded-xl border-[#2c7a3e]/40 text-[13px] font-bold text-[#256d34] hover:bg-[#2c7a3e] hover:text-white"
        >
          Νέο αίτημα
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid min-w-0 gap-3 rounded-2xl border border-border bg-[#faf9f4] p-4">
      <p className="text-[13px] font-semibold leading-snug text-[#0d4c74]">
        Αφήστε τα στοιχεία σας και θα σας καλέσουμε για το πακέτο{" "}
        <span className="text-[#2c7a3e]">{pkg.kwLabel}</span> — χωρίς δέσμευση.
      </p>

      <div className="grid gap-1.5">
        <Label htmlFor={`pr-name-${pkg.kw}`} className="text-[13px] font-bold">
          Ονοματεπώνυμο <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`pr-name-${pkg.kw}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="π.χ. Γιώργος Παπαδόπουλος"
          aria-invalid={!!errors.name}
          className="h-10 rounded-xl bg-white"
        />
        {errors.name && <p className="text-xs font-medium text-destructive">{errors.name}</p>}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor={`pr-phone-${pkg.kw}`} className="text-[13px] font-bold">
          Τηλέφωνο <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`pr-phone-${pkg.kw}`}
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="π.χ. 69XX XXX XXX"
          aria-invalid={!!errors.phone}
          className="h-10 rounded-xl bg-white"
        />
        {errors.phone && <p className="text-xs font-medium text-destructive">{errors.phone}</p>}
      </div>

      <div className="grid min-w-0 gap-3">
        <div className="grid min-w-0 gap-1.5">
          <Label htmlFor={`pr-city-${pkg.kw}`} className="text-[13px] font-bold">
            Πόλη / Περιοχή
          </Label>
          <Input
            id={`pr-city-${pkg.kw}`}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="π.χ. Θεσσαλονίκη"
            className="h-10 rounded-xl bg-white"
          />
        </div>

        <div className="grid min-w-0 gap-1.5">
          <Label htmlFor={`pr-time-${pkg.kw}`} className="text-[13px] font-bold">
            Ιδανική ώρα κλήσης
          </Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger id={`pr-time-${pkg.kw}`} className="h-10 w-full rounded-xl bg-white">
              <SelectValue placeholder="Επιλέξτε…" />
            </SelectTrigger>
            <SelectContent>
              {CALL_TIMES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor={`pr-notes-${pkg.kw}`} className="text-[13px] font-bold">
          Σχόλια
        </Label>
        <Textarea
          id={`pr-notes-${pkg.kw}`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="π.χ. Έχω καταστήμα 200 τ.μ. με ψυγεία…"
          rows={2}
          className="resize-none rounded-xl bg-white"
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="h-11 w-full gap-2 rounded-xl bg-[#2c7a3e] font-heading text-sm font-bold text-white shadow-lg shadow-[#2c7a3e]/25 hover:bg-[#256d34] disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Αποστολή…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden />
            Ζητήστε την Κλήση μας
          </>
        )}
      </Button>
      <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
        Τα στοιχεία σας χρησιμοποιούνται μόνο για την εξυπηρέτηση του αιτήματός σας.
      </p>
    </form>
  );
}

/* ---------------- Κάρτα πακέτου ---------------- */

function PaketaCard({ pkg }: { pkg: PvPackage }) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const AudienceIcon = pkg.audience === "business" ? Building2 : House;

  return (
    <article
      id={pkg.id}
      className={cn(
        "flex h-full min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-lg shadow-[#0d4c74]/6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0d4c74]/12",
        open && "border-[#2c7a3e]/45"
      )}
    >
      {/* 3D εικόνα — ίδια σκηνή για όλα τα πακέτα, kW μέσα στην εικόνα */}
      <div className="bg-sky-scene relative h-[230px] shrink-0 overflow-hidden">
        <PackageKw3D kwLabel={pkg.kwLabel} reduceMotion={!!reduceMotion} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d4c74]/8 via-transparent to-transparent"
        />
        {pkg.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-[#2c7a3e] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-lg">
            {pkg.badge}
          </span>
        )}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0d4c74] shadow-sm backdrop-blur">
          <Layers className="h-3 w-3" aria-hidden />
          3D
        </span>
      </div>

      {/* Περιεχόμενο */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#2c7a3e]">
          Ολοκληρωμένο Πακέτο
        </p>
        <h3 className="mt-1 font-heading text-lg font-extrabold leading-snug text-[#0d4c74]">
          Φωτοβολταϊκό Σύστημα {pkg.kw} kW
        </h3>
        <p className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-muted-foreground">
          <AudienceIcon className="h-3.5 w-3.5 text-[#0d4c74]" aria-hidden />
          {pkg.audienceLabel}
        </p>

        <ul className="mt-3 space-y-1.5">
          {pkg.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-[13px] font-medium leading-snug text-[#17324a]">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#2c7a3e]" aria-hidden />
              {b}
            </li>
          ))}
        </ul>

        {/* Τιμή */}
        <div className="mt-4 border-t border-border pt-3.5">
          {pkg.price !== null ? (
            <>
              <p className="font-heading text-[28px] font-extrabold leading-none text-[#0d4c74]">
                {packagePriceLabel(pkg)}
              </p>
              <p className="mt-1.5 text-[11px] font-medium text-muted-foreground">
                {pkg.priceNote} · με πλήρη εγκατάσταση
              </p>
            </>
          ) : (
            <>
              <p className="font-heading text-[22px] font-extrabold leading-none text-[#2c7a3e]">
                Ρωτήστε τιμή
              </p>
              <p className="mt-1.5 text-[11px] font-medium text-muted-foreground">
                Προσωπική προσφορά από εκπρόσωπό μας
              </p>
            </>
          )}
        </div>

        {/* Αναδιπλούμενη φόρμα κλήσης (expand/collapse με grid-rows) */}
        <div className="mt-auto pt-4">
          <Button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="h-auto min-h-11 w-full gap-1.5 whitespace-normal rounded-xl bg-[#2c7a3e] px-3 py-2 text-center font-heading text-[13px] font-bold leading-tight text-white shadow-lg shadow-[#2c7a3e]/25 hover:bg-[#256d34] sm:text-sm"
          >
            <PhoneCall className="h-4 w-4 shrink-0" aria-hidden />
            <span className="flex-1">{open ? "Κλείσιμο Φόρμας" : "Ζητήστε Κλήση Εκπροσώπου"}</span>
            <ChevronDown
              className={cn("h-4 w-4 shrink-0 transition-transform duration-200", open && "rotate-180")}
              aria-hidden
            />
          </Button>
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out"
            style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            aria-hidden={!open}
            inert={!open}
          >
            <div className="overflow-hidden">
              <div className="pt-3.5">
                <PackageRequestForm pkg={pkg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------- Πλέγμα + λωρίδα «κατά μέτρηση» ---------------- */

export function PaketaGrid() {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {PAKETA.map((pkg) => (
          <PaketaCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      {/* Λωρίδα «κατά μέτρηση» */}
      <div className="mt-6 overflow-hidden rounded-3xl bg-brand-gradient shadow-lg shadow-[#0d4c74]/15">
        <div className="flex flex-col items-start gap-4 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <Wrench className="h-6 w-6 text-white" aria-hidden />
            </span>
            <div>
              <h3 className="font-heading text-lg font-extrabold">
                Άλλη ισχύς; Κατασκευάζουμε και κατά μέτρηση
              </h3>
              <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-white/80">
                25, 30, 50 kW και πάνω — για αγρότες, βιομηχανικές εγκαταστάσεις και
                μεγάλες επιχειρήσεις. Πείτε μας τις ανάγκες σας και θα σχεδιάσουμε το
                σωστό σύστημα, με την ίδια λογική ολοκληρωμένης τιμής.
              </p>
            </div>
          </div>
          <Button
            size="lg"
            className="h-12 shrink-0 rounded-xl bg-white px-6 font-heading text-sm font-bold text-[#256d34] shadow-xl hover:bg-[#f2f0e9]"
            onClick={() =>
              document.getElementById("epikoinonia-strip")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ζητήστε Προσφορά κατά Μέτρηση
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </div>
  );
}
