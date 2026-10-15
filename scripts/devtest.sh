#!/bin/bash
# Εκκίνηση dev server (αν δεν τρέχει) + smoke tests σε ένα call.
# Χρήση: bash scripts/devtest.sh
cd /home/z/my-project

if ! curl -s -o /dev/null --max-time 3 http://localhost:3000/; then
  echo ">> Starting dev server..."
  nohup bun run dev >> dev.log 2>&1 &
  for i in $(seq 1 30); do
    sleep 2
    if curl -s -o /dev/null --max-time 3 http://localhost:3000/; then
      echo ">> Server ready after $((i*2))s"
      break
    fi
  done
fi

ROUTES=(
  "/"
  "/paketa"
  "/proionta"
  "/proionta/deye-sun-6k-sg04lp1"
  "/proionta/deye-sun-8k-sg04lp1"
  "/proionta/deye-sun-12k-sg04lp3"
  "/proionta/deye-sun-20k-sg04hp3"
  "/proionta/vtac-10kwh-48v"
  "/proionta/deye-se-g5.1-pro"
  "/proionta/deye-hv-rack-16kwh"
  "/proionta/panel-500w-mono"
  "/proionta/panel-700w-topcon"
  "/proionta/package-net-billing-5kwp"
  "/proionta/package-hybrid-10kwp"
  "/proionta/package-pro-30kwp"
  "/proionta/kit-stirigma-keramidi"
  "/proionta/wifi-datalogger-deye"
  "/ypiresies"
  "/kalathi"
  "/oloklirosi-paraggelias"
  "/fotovoltaika"
  "/faq"
  "/etaireia"
  "/epikoinonia"
  "/ypologistis"
)

FAIL=0
for r in "${ROUTES[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 90 "http://localhost:3000$r")
  echo "$code  $r"
  if [ "$code" != "200" ]; then FAIL=1; fi
done

echo "--- SEO ---"
SM=$(curl -s --max-time 30 http://localhost:3000/sitemap.xml)
echo "sitemap urls: $(echo "$SM" | grep -c "<url>")"
echo "$SM" | grep -o "proionta/[a-z0-9-]*" | sort -u | head -20
RB=$(curl -s --max-time 30 http://localhost:3000/robots.txt)
echo "$RB" | grep -E "Disallow" | head -4

exit $FAIL
