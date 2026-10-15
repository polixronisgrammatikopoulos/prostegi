"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
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

const SYSTEM_TYPES = [
  { value: "autonomo", label: "Αυτόνομο σύστημα (Off-Grid)" },
  { value: "net-billing", label: "Διασυνδεδεμένο (Net Billing)" },
  { value: "ybridiko", label: "Υβριδικό με μπαταρίες" },
  { value: "epixeirisiako", label: "Επαγγελματική / Αγροτική εγκατάσταση" },
  { value: "allo", label: "Άλλο / Δεν είμαι σίγουρος" },
];

type FormState = {
  name: string;
  phone: string;
  email: string;
  systemType: string;
  message: string;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  email: "",
  systemType: "",
  message: "",
};

export function ContactForm() {
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = "Συμπληρώστε το ονοματεπώνυμό σας";
    if (form.phone.trim().length < 6) next.phone = "Συμπληρώστε το τηλέφωνό σας";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Σφάλμα αποστολής");
      }

      setSubmitted(true);
      setForm(INITIAL);
      toast({
        title: "Το αίτημά σας εστάλη!",
        description: "Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.",
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
      <div className="flex h-full min-h-[420px] flex-col items-center justify-center gap-4 rounded-2xl border border-[#2c7a3e]/25 bg-[#e9f3eb] p-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#2c7a3e]">
          <CheckCircle2 className="h-9 w-9 text-white" aria-hidden />
        </span>
        <h3 className="font-heading text-2xl font-extrabold text-[#256d34]">
          Ευχαριστούμε για το ενδιαφέρον!
        </h3>
        <p className="max-w-md text-[15px] leading-relaxed text-foreground/75">
          Το αίτημά σας καταχωρήθηκε επιτυχώς. Ένας μηχανικός της ProΣτέγη θα
          επικοινωνήσει μαζί σας εντός της επόμενης εργάσιμης ημέρας για τη
          δωρεάν μελέτη σας.
        </p>
        <Button
          variant="outline"
          onClick={() => setSubmitted(false)}
          className="mt-2 rounded-xl border-[#2c7a3e]/40 font-heading font-bold text-[#256d34] hover:bg-[#2c7a3e] hover:text-white"
        >
          Αποστολή νέου αιτήματος
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-xl shadow-[#0d4c74]/5 sm:grid-cols-2 sm:p-8"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="cf-name" className="font-heading font-bold">
          Ονοματεπώνυμο <span className="text-destructive">*</span>
        </Label>
        <Input
          id="cf-name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          placeholder="π.χ. Γιώργος Παπαδόπουλος"
          aria-invalid={!!errors.name}
          className="h-11 rounded-xl"
        />
        {errors.name && <p className="text-xs font-medium text-destructive">{errors.name}</p>}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="cf-phone" className="font-heading font-bold">
          Τηλέφωνο <span className="text-destructive">*</span>
        </Label>
        <Input
          id="cf-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="π.χ. 69XX XXX XXX"
          aria-invalid={!!errors.phone}
          className="h-11 rounded-xl"
        />
        {errors.phone && <p className="text-xs font-medium text-destructive">{errors.phone}</p>}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="cf-email" className="font-heading font-bold">
          Email
        </Label>
        <Input
          id="cf-email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="you@example.gr"
          className="h-11 rounded-xl"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="cf-type" className="font-heading font-bold">
          Ενδιαφέρομαι για
        </Label>
        <Select value={form.systemType} onValueChange={(v) => update("systemType", v)}>
          <SelectTrigger id="cf-type" className="h-11 rounded-xl">
            <SelectValue placeholder="Επιλέξτε τύπο συστήματος" />
          </SelectTrigger>
          <SelectContent>
            {SYSTEM_TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5 sm:col-span-2">
        <Label htmlFor="cf-message" className="font-heading font-bold">
          Μήνυμα
        </Label>
        <Textarea
          id="cf-message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Πείτε μας λίγα λόγια για το ακίνητο/χώρο σας και τις ανάγκες σας σε ενέργεια…"
          rows={5}
          className="resize-none rounded-xl"
        />
      </div>

      <div className="sm:col-span-2">
        <Button
          type="submit"
          disabled={submitting}
          className="h-12 w-full gap-2 rounded-xl bg-[#2c7a3e] font-heading text-base font-bold shadow-lg shadow-[#2c7a3e]/25 hover:bg-[#256d34] disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
              Αποστολή…
            </>
          ) : (
            <>
              <Send className="h-5 w-5" aria-hidden />
              Ζητήστε Δωρεάν Προσφορά
            </>
          )}
        </Button>
        <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
          Τα στοιχεία σας χρησιμοποιούνται αποκλειστικά για την εξυπηρέτηση του
          αιτήματός σας και δεν κοινοποιούνται σε τρίτους.
        </p>
      </div>
    </form>
  );
}
