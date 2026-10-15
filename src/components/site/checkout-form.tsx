"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Mail,
  NotebookPen,
  Loader2,
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
import { useCart, computeCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/products-data";

/**
 * Φόρμα ολοκλήρωσης παραγγελίας — τηλεφωνική επιβεβαίωση.
 * ΔΕΝ γίνεται καμία πληρωμή: τα στοιχεία αποθηκεύονται και ο πελάτης καλείται.
 */
export function CheckoutForm() {
  const items = useCart((s) => s.items);
  const clearCart = useCart((s) => s.clearCart);
  const { toast } = useToast();

  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [contactTime, setContactTime] = useState("opio-diete");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const { lines, total, savings, count } = computeCart(items);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const payload = {
        name,
        phone,
        email,
        city,
        contactTime,
        notes,
        total,
        savings,
        items: lines.map(({ product, qty }) => ({
          slug: product.slug,
          name: product.name,
          qty,
          price: product.price,
        })),
      };

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Προέκυψε σφάλμα. Δοκιμάστε ξανά.");
      }

      setDone(true);
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Προέκυψε σφάλμα. Δοκιμάστε ξανά.";
      setError(msg);
      toast({ title: "Σφάλμα", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  /* ------- Οθόνη επιτυχίας ------- */
  if (done) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-[#2c7a3e]/25 bg-card px-6 py-14 text-center shadow-lg shadow-[#2c7a3e]/10">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e9f3eb]">
          <CheckCircle2 className="h-10 w-10 text-[#2c7a3e]" aria-hidden />
        </span>
        <h2 className="mt-5 font-heading text-2xl font-extrabold text-[#0d4c74] sm:text-3xl">
          Η παραγγελία σας καταχωρήθηκε!
        </h2>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Ευχαριστούμε, <strong>{name}</strong>! Ένας ειδικός μας θα σας καλέσει στο{" "}
          <strong className="whitespace-nowrap">{phone}</strong> για να επιβεβαιώσει τη
          διαθεσιμότητα, να απαντήσει σε απορίες και να κανονίσουμε την παράδοση.
        </p>
        <div className="mt-6 flex items-center gap-2 rounded-xl bg-[#e9f3eb] px-4 py-3 text-sm font-semibold text-[#256d34]">
          <Clock className="h-4 w-4" aria-hidden />
          Κανονικά καλούμε εντός 2 ωρών εργασίας (Δευ–Παρ 08:00–17:00, Σάβ 08:00–14:00)
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="tel:+302310644512">
            <Button
              size="lg"
              className="h-12 rounded-xl bg-[#0d4c74] px-6 font-heading font-bold text-white shadow-lg hover:bg-[#0a3c5e]"
            >
              <PhoneCall className="mr-2 h-5 w-5" aria-hidden />
              Βιάζεστε; Καλέστε μας
            </Button>
          </a>
          <Link href="/proionta">
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-[#0d4c74]/30 px-6 font-heading font-bold text-[#0d4c74] hover:bg-[#0d4c74] hover:text-white"
            >
              Συνέχεια περιήγησης
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  /* ------- Κενό καλάθι ------- */
  if (mounted && lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-border bg-card px-6 py-14 text-center shadow-sm">
        <h2 className="font-heading text-2xl font-extrabold text-[#0d4c74]">
          Το καλάθι σας είναι άδειο
        </h2>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Προσθέστε πρώτα προϊόντα στον κατάλογο και μετά συμπληρώστε εδώ τα στοιχεία σας.
        </p>
        <Link href="/proionta" className="mt-6">
          <Button
            size="lg"
            className="h-13 rounded-xl bg-[#2c7a3e] px-8 font-heading font-bold text-white shadow-xl hover:bg-[#256d34]"
          >
            Δείτε τα Προϊόντα
          </Button>
        </Link>
      </div>
    );
  }

  /* ------- Φόρμα ------- */
  return (
    <form onSubmit={onSubmit} className="grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]">
      {/* Στοιχεία πελάτη */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <h2 className="font-heading text-xl font-extrabold text-[#0d4c74]">
          Τα Στοιχεία σας
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Συμπληρώστε τα στοιχεία σας και θα σας καλέσουμε για την επιβεβαίωση.
          Δεν απαιτείται κάρτα ούτε προπληρωμή.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="ord-name" className="flex items-center gap-1.5 font-bold text-[#17324a]">
              <User className="h-4 w-4 text-[#2c7a3e]" aria-hidden />
              Ονοματεπώνυμο *
            </Label>
            <Input
              id="ord-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="π.χ. Γιώργος Παπαδόπουλος"
              required
              minLength={2}
              maxLength={120}
              className="h-11 border-input bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ord-phone" className="flex items-center gap-1.5 font-bold text-[#17324a]">
              <PhoneCall className="h-4 w-4 text-[#2c7a3e]" aria-hidden />
              Τηλέφωνο *
            </Label>
            <Input
              id="ord-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="π.χ. 69XXXXXXXX"
              required
              minLength={6}
              maxLength={25}
              pattern="[0-9+\-\s()]+"
              className="h-11 border-input bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ord-email" className="flex items-center gap-1.5 font-bold text-[#17324a]">
              <Mail className="h-4 w-4 text-[#2c7a3e]" aria-hidden />
              Email (προαιρετικό)
            </Label>
            <Input
              id="ord-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.gr"
              maxLength={120}
              className="h-11 border-input bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="ord-city" className="flex items-center gap-1.5 font-bold text-[#17324a]">
              <MapPin className="h-4 w-4 text-[#2c7a3e]" aria-hidden />
              Πόλη / Περιοχή (προαιρετικό)
            </Label>
            <Input
              id="ord-city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="π.χ. Καλαμαριά, Θεσσαλονίκη"
              maxLength={120}
              className="h-11 border-input bg-white"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="ord-time" className="font-bold text-[#17324a]">
              Πότε προτιμάτε να σας καλέσουμε;
            </Label>
            <Select value={contactTime} onValueChange={setContactTime}>
              <SelectTrigger id="ord-time" className="h-11 border-input bg-white">
                <SelectValue placeholder="Επιλέξτε ώρα" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="opio-diete">Όποτε σας βολεύει</SelectItem>
                <SelectItem value="proi">Πρωί (08:00–12:00)</SelectItem>
                <SelectItem value="mesimeri">Μεσημέρι (12:00–15:00)</SelectItem>
                <SelectItem value="apogevma">Απόγευμα (15:00–18:00)</SelectItem>
                <SelectItem value="savvato">Σάββατο πρωί</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="ord-notes" className="flex items-center gap-1.5 font-bold text-[#17324a]">
              <NotebookPen className="h-4 w-4 text-[#2c7a3e]" aria-hidden />
              Σχόλια (προαιρετικό)
            </Label>
            <Textarea
              id="ord-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="π.χ. Με ενδιαφέρει και εγκατάσταση από το συνεργείο σας — έχω κεραμοσκεπή νότια."
              rows={4}
              maxLength={2000}
              className="border-input bg-white"
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="mt-4 rounded-xl bg-[#fbeaea] px-4 py-3 text-sm font-semibold text-[#b3392f]">
            {error}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={submitting || lines.length === 0}
          className="mt-6 h-13 w-full justify-center rounded-xl bg-[#2c7a3e] font-heading text-base font-bold text-white shadow-xl shadow-[#2c7a3e]/25 hover:bg-[#256d34] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
              Αποστολή...
            </>
          ) : (
            "Υποβολή Παραγγελίας — Θα σας Καλέσουμε"
          )}
        </Button>
        <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
          Με την υποβολή συμφωνείτε να επικοινωνήσουμε τηλεφωνικά για την παραγγελία σας.
          Τα στοιχεία σας χρησιμοποιούνται αποκλειστικά για αυτόν τον σκοπό.
        </p>
      </div>

      {/* Σύνοψη παραγγελίας */}
      <aside className="rounded-3xl border border-border bg-card p-6 shadow-lg shadow-[#0d4c74]/5 lg:sticky lg:top-24">
        <h2 className="font-heading text-xl font-extrabold text-[#0d4c74]">
          Η Παραγγελία σας
        </h2>

        <ul className="mt-4 divide-y divide-border">
          {lines.map(({ product, qty, lineTotal }) => (
            <li key={product.slug} className="flex items-start justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#17324a]">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {qty} × {formatPrice(product.price)}
                </p>
              </div>
              <span className="shrink-0 text-sm font-extrabold text-[#0d4c74]">
                {formatPrice(lineTotal)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-2 space-y-2 border-t border-border pt-3 text-sm">
          {savings > 0 && (
            <div className="flex justify-between text-[#b3392f]">
              <dt className="font-semibold">Έκπτωση</dt>
              <dd className="font-extrabold">-{formatPrice(savings)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="font-heading text-base font-extrabold text-[#0d4c74]">Σύνολο ({count} τεμ.)</dt>
            <dd className="font-heading text-2xl font-extrabold text-[#0d4c74]">
              {formatPrice(total)}
            </dd>
          </div>
          <p className="text-xs text-muted-foreground">Τελικές τιμές με ΦΠΑ 24%</p>
        </dl>

        <div className="mt-5 rounded-xl bg-[#e9f3eb] p-4 text-[13px] leading-relaxed text-[#256d34]">
          <strong>Πώς συνεχίζουμε:</strong> ελέγχουμε άμεσα τη διαθεσιμότητα, σας επιβεβαιώνουμε
          την τελική τιμή (συχνά βγαίνει καλύτερη σε συνδυασμούς) και ορίζουμε παράδοση ή
          εγκατάσταση όσο πιο σύντομα γίνεται.
        </div>
      </aside>
    </form>
  );
}
