import { formatPrice, discountPct, type Product } from "@/lib/products-data";
import { cn } from "@/lib/utils";

/**
 * Εμφάνιση τιμής με έκπτωση: η παλιά τιμή εμφανίζεται "σβησμένη"
 * (strikethrough) και το ποσοστό έκπτωσης σε badge.
 */
export function PriceTag({
  product,
  size = "md",
  className,
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const pct = discountPct(product);

  const currentSize =
    size === "lg"
      ? "text-3xl sm:text-4xl"
      : size === "sm"
        ? "text-base"
        : "text-xl";

  const oldSize = size === "lg" ? "text-lg" : size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5", className)}>
      <span className={cn("font-heading font-extrabold tracking-tight text-[#0d4c74]", currentSize)}>
        {formatPrice(product.price)}
      </span>
      {product.oldPrice && pct && (
        <>
          <span
            className={cn(
              "font-semibold text-muted-foreground line-through decoration-[#b3392f] decoration-2",
              oldSize
            )}
            aria-label={`Παλιά τιμή ${formatPrice(product.oldPrice)}`}
          >
            {formatPrice(product.oldPrice)}
          </span>
          <span className="rounded-full bg-[#b3392f] px-2 py-0.5 text-[11px] font-extrabold text-white">
            -{pct}%
          </span>
        </>
      )}
    </div>
  );
}
