/** @type {import('next').NextConfig} */
const nextConfig = {
  // ΣΗΜΕΙΩΣΗ: ΔΕΝ χρησιμοποιούμε `output: "standalone"`.
  // Η Vercel διαχειρίζεται το build εγγενώς — το standalone προκαλούσε
  // χαμένα CSS/static assets όταν το deployment δεν έκανε σωστά το copy
  // των αρχείων (.next/static → .next/standalone/.next/).
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // Βελτιστοποίηση εικόνων next/image στην Vercel (sharp είναι ήδη dependency)
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
