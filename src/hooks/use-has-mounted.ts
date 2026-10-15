"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Ανιχνεύει αν το component έχει γίνει hydrate στον client.
 * Χρήσιμο για στοιχεία που εξαρτώνται από localStorage (καλάθι),
 * ώστε να αποφεύγεται hydration mismatch χωρίς setState σε effect.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
