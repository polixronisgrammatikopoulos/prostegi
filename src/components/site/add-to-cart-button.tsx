"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

/**
 * Κουμπί «Προσθήκη στο Καλάθι» — προσθέτει το προϊόν, δείχνει toast
 * και σύντομη επιβεβαίωση (check) για 1.5s.
 */
export function AddToCartButton({
  slug,
  name,
  qty = 1,
  size = "default",
  className,
  label = "Προσθήκη στο Καλάθι",
}: {
  slug: string;
  name: string;
  qty?: number;
  size?: "sm" | "default" | "lg";
  className?: string;
  label?: string;
}) {
  const addItem = useCart((s) => s.addItem);
  const { toast } = useToast();
  const [added, setAdded] = useState(false);

  const onAdd = () => {
    addItem(slug, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
    toast({
      title: "Προστέθηκε στο καλάθι",
      description: name,
    });
  };

  return (
    <Button
      onClick={onAdd}
      size={size}
      aria-label={`Προσθήκη στο καλάθι: ${name}`}
      className={cn(
        "gap-2 rounded-xl bg-[#2c7a3e] font-heading font-bold text-white shadow-lg shadow-[#2c7a3e]/25 hover:bg-[#256d34]",
        className
      )}
    >
      {added ? (
        <Check className="h-4 w-4" aria-hidden />
      ) : (
        <ShoppingCart className="h-4 w-4" aria-hidden />
      )}
      {added ? "Προστέθηκε!" : label}
    </Button>
  );
}
