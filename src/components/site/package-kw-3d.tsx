"use client";

/**
 * Πανομοιότυπη 3D απεικόνιση «Ολοκληρωμένου Πακέτου» για τη σελίδα /paketa.
 *
 * Και τα 5 πακέτα (5–20 kW) μοιράζονται την ΙΔΙΑ σκηνή — σπίτι με
 * φωτοβολταϊκά πάνελ, μπαταρία, inverter, ήλιος — στα χρώματα του
 * λογότυπου ProΣτέγη. Η μόνη διαφορά είναι η ένδειξη ισχύος (π.χ.
 * «10kW») που εμφανίζεται μέσα στην εικόνα σε αιωρούμενο badge.
 *
 * - Σταθερή κάμερα: όλα τα πακέτα απεικονίζονται από την ίδια γωνία
 * - Badge με CanvasTexture: χύτευση κειμένου χωρίς εξωτερικά fonts
 * - Quality tiers (lowSpec) + IntersectionObserver pause για απόδοση
 */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* Χρώματα brand (ίδια με το λογότυπο) */
const BRAND_GREEN = "#2c7a3e";
const GREEN_DARK = "#22642f";
const GREEN_LIGHT = "#3e9b54";
const WALL_CREAM = "#f7f3e8";
const NAVY = "#0d4c74";
const NAVY_PANEL = "#1b5178";
const NAVY_EDGE = "#24618b";
const METAL = "#9aa3ab";
const SUN_CORE = "#ffd98a";
const SUN_RAY = "#ffbf56";
const GRASS = "#79bd7c";
const GRASS_INNER = "#8ecb90";
const TRUNK = "#7d6b57";
const GLASS = "#a8d4ec";
const BATTERY_FACE = "#e9f3eb";

/* ---------------- Badge kW (CanvasTexture) ---------------- */

function makeKwBadgeTexture(label: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  // κάρτα με στρογγυλεμένες γωνίες
  const x = 16,
    y = 16,
    w = 480,
    h = 224,
    r = 56;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();

  // διαβάθμιση navy → πράσινο (χρώματα λογότυπου)
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, "#0d4c74");
  grad.addColorStop(1, "#2c7a3e");
  ctx.fillStyle = grad;
  ctx.fill();

  // φωτεινό περίγραμμα
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgba(255,255,255,0.92)";
  ctx.stroke();

  // κείμενο ισχύος
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "800 118px Manrope, Arial, sans-serif";
  ctx.fillText(label, canvas.width / 2, canvas.height / 2 + 6);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

function KwBadge({ label, position }: { label: string; position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const texture = useMemo(() => makeKwBadgeTexture(label), [label]);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 1.4) * 0.055;
    ref.current.rotation.z = Math.sin(t * 0.9) * 0.02;
  });

  return (
    <group ref={ref} position={position}>
      {/* πίνακας με το badge */}
      <mesh>
        <planeGeometry args={[1.72, 0.86]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ---------------- Φωτοβολταϊκό module (κάρτα) ---------------- */

function CardPvModule({
  position,
  rotation = [0, 0, 0],
  w = 0.78,
  h = 0.55,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  w?: number;
  h?: number;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[w, 0.05, h]} />
        <meshStandardMaterial color={NAVY_EDGE} metalness={0.45} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[w - 0.05, 0.03, h - 0.05]} />
        <meshStandardMaterial color={NAVY_PANEL} metalness={0.55} roughness={0.22} envMapIntensity={1.1} />
      </mesh>
      {/* 1 διαχωριστική γραμμή */}
      <mesh position={[0, 0.043, 0]}>
        <boxGeometry args={[w - 0.05, 0.005, 0.02]} />
        <meshStandardMaterial color="#dcebf5" />
      </mesh>
      <mesh position={[0, 0.043, 0]}>
        <boxGeometry args={[0.02, 0.005, h - 0.05]} />
        <meshStandardMaterial color="#dcebf5" />
      </mesh>
    </group>
  );
}

/* ---------------- Σπίτι ---------------- */

const WALL_H = 1.55;
const HALF_W = 1.3;
const HALF_D = 0.95;
const RIDGE_Y = 2.25;
const ROOF_ANGLE = 0.62;

function CardHouse() {
  const slopeMidY = (WALL_H + RIDGE_Y) / 2 + 0.05;
  const slopeMidZ = HALF_D / 2 + 0.08;

  return (
    <group position={[-1.05, 0, 0]}>
      {/* όγκος */}
      <mesh position={[0, WALL_H / 2, 0]}>
        <boxGeometry args={[HALF_W * 2, WALL_H, HALF_D * 2]} />
        <meshStandardMaterial color={WALL_CREAM} roughness={0.9} />
      </mesh>

      {/* στέγη */}
      <mesh position={[0, slopeMidY, slopeMidZ]} rotation={[ROOF_ANGLE, 0, 0]}>
        <boxGeometry args={[HALF_W * 2 + 0.34, 0.1, 1.44]} />
        <meshStandardMaterial color={BRAND_GREEN} roughness={0.5} />
      </mesh>
      <mesh position={[0, slopeMidY, -slopeMidZ]} rotation={[-ROOF_ANGLE, 0, 0]}>
        <boxGeometry args={[HALF_W * 2 + 0.34, 0.1, 1.44]} />
        <meshStandardMaterial color={GREEN_DARK} roughness={0.5} />
      </mesh>
      <mesh position={[0, RIDGE_Y + 0.08, 0]}>
        <boxGeometry args={[HALF_W * 2 + 0.4, 0.11, 0.26]} />
        <meshStandardMaterial color={GREEN_DARK} roughness={0.5} />
      </mesh>

      {/* καμινάδα */}
      <mesh position={[0.75, RIDGE_Y + 0.18, -0.3]}>
        <boxGeometry args={[0.22, 0.42, 0.22]} />
        <meshStandardMaterial color="#e6ddc8" roughness={0.85} />
      </mesh>

      {/* παράθυρα */}
      {[-0.68, 0.68].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.95, HALF_D + 0.015]}>
            <boxGeometry args={[0.44, 0.44, 0.05]} />
            <meshStandardMaterial color="#ffffff" roughness={0.6} />
          </mesh>
          <mesh position={[x, 0.95, HALF_D + 0.05]}>
            <boxGeometry args={[0.33, 0.33, 0.04]} />
            <meshStandardMaterial color={GLASS} metalness={0.35} roughness={0.15} envMapIntensity={1.2} />
          </mesh>
        </group>
      ))}

      {/* πόρτα */}
      <mesh position={[0, 0.42, HALF_D + 0.02]}>
        <boxGeometry args={[0.42, 0.82, 0.06]} />
        <meshStandardMaterial color={BRAND_GREEN} roughness={0.55} />
      </mesh>

      {/* πάνελ μπροστινή κλίση */}
      <group position={[0, slopeMidY + 0.09, slopeMidZ]} rotation={[ROOF_ANGLE, 0, 0]}>
        {[-0.84, 0, 0.84].map((x) => (
          <CardPvModule key={x} position={[x, 0, 0]} w={0.76} h={0.56} />
        ))}
      </group>
      {/* πάνελ πίσω κλίση */}
      <group position={[0, slopeMidY + 0.09, -slopeMidZ]} rotation={[-ROOF_ANGLE, 0, 0]}>
        {[-0.42, 0.42].map((x) => (
          <CardPvModule key={x} position={[x, 0, 0]} w={0.76} h={0.56} />
        ))}
      </group>
    </group>
  );
}

/* ---------------- Μπαταρία + Inverter ---------------- */

function CardBattery({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.42, 1.0, 0.26]} />
        <meshStandardMaterial color={BRAND_GREEN} roughness={0.45} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0.55, 0.14]}>
        <boxGeometry args={[0.32, 0.78, 0.02]} />
        <meshStandardMaterial color={BATTERY_FACE} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.78, 0.16]}>
        <boxGeometry args={[0.2, 0.1, 0.015]} />
        <meshStandardMaterial color={NAVY} emissive={NAVY} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.1, 0.28, 0.16]}>
        <sphereGeometry args={[0.024, 8, 8]} />
        <meshStandardMaterial color="#7fe08f" emissive="#57d96c" emissiveIntensity={1.4} />
      </mesh>
      {[-0.15, 0.15].map((x) => (
        <mesh key={x} position={[x, 0.04, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.24]} />
          <meshStandardMaterial color={METAL} metalness={0.4} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function CardInverter({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.4, 0.54, 0.18]} />
        <meshStandardMaterial color="#f2f4f6" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.12, 0.1]}>
        <boxGeometry args={[0.28, 0.2, 0.02]} />
        <meshStandardMaterial color={NAVY} />
      </mesh>
      <mesh position={[0, -0.18, 0.1]}>
        <boxGeometry args={[0.3, 0.07, 0.02]} />
        <meshStandardMaterial color={BRAND_GREEN} />
      </mesh>
    </group>
  );
}

/* ---------------- Ήλιος ---------------- */

function CardSun({ position }: { position: [number, number, number] }) {
  const rays = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (rays.current) rays.current.rotation.z = state.clock.elapsedTime * 0.22;
  });

  const rayItems = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i * Math.PI) / 6;
        return {
          key: i,
          position: [Math.cos(angle) * 0.62, Math.sin(angle) * 0.62, 0] as [number, number, number],
          rotation: angle - Math.PI / 2,
          long: i % 2 === 0,
        };
      }),
    []
  );

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.42, 24, 24]} />
        <meshBasicMaterial color={SUN_CORE} />
      </mesh>
      <group ref={rays}>
        {rayItems.map((r) => (
          <mesh key={r.key} position={r.position} rotation={[0, 0, r.rotation]}>
            <boxGeometry args={[0.05, r.long ? 0.3 : 0.19, 0.05]} />
            <meshBasicMaterial color={SUN_RAY} />
          </mesh>
        ))}
      </group>
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color={SUN_CORE} transparent opacity={0.2} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ---------------- Βλάστηση ---------------- */

function CardTree({ position, scale = 1, tone = BRAND_GREEN }: { position: [number, number, number]; scale?: number; tone?: string }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.56, 6]} />
        <meshStandardMaterial color={TRUNK} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <icosahedronGeometry args={[0.42, 0]} />
        <meshStandardMaterial color={tone} roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0.1, 1.12, 0.06]}>
        <icosahedronGeometry args={[0.24, 0]} />
        <meshStandardMaterial color={tone} roughness={0.85} flatShading />
      </mesh>
    </group>
  );
}

function CardBush({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <mesh position={position} scale={scale}>
      <icosahedronGeometry args={[0.22, 0]} />
      <meshStandardMaterial color={GREEN_LIGHT} roughness={0.9} flatShading />
    </mesh>
  );
}

/* ---------------- Σκηνή κάρτας ---------------- */

function CardScene({
  kwLabel,
  reduceMotion,
  lowSpec,
}: {
  kwLabel: string;
  reduceMotion: boolean;
  lowSpec: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <hemisphereLight args={["#ffedcf", "#9fca9e", 0.65]} />
      <directionalLight position={[-4.5, 5.5, -3]} intensity={2.0} color="#ffe3b3" />
      <directionalLight position={[5.5, 4.5, 6]} intensity={0.65} color="#d8ecff" />

      {!lowSpec && (
        <Environment resolution={64} frames={1}>
          <mesh scale={120}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshBasicMaterial color="#dcedf9" side={THREE.BackSide} />
          </mesh>
          <Lightformer intensity={2.2} color="#ffd9a0" position={[-6, 6, -5]} scale={5} />
          <Lightformer intensity={1.1} color="#ffffff" position={[6, 8, 6]} scale={7} />
          <Lightformer intensity={0.7} color="#9fce7f" position={[0, -6, 0]} scale={9} />
        </Environment>
      )}

      <group position={[0, -0.35, 0]}>
        {/* έδαφος */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[10, 48]} />
          <meshStandardMaterial color={GRASS} roughness={1} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
          <circleGeometry args={[6.2, 48]} />
          <meshStandardMaterial color={GRASS_INNER} roughness={1} />
        </mesh>

        {/* σπίτι + εξοπλισμός */}
        <CardHouse />
        <CardBattery position={[0.75, 0, 0.62]} />
        <CardInverter position={[0.35, 1.15, 1.0]} />

        {/* βλάστηση */}
        <CardTree position={[-3.1, 0, -1.5]} scale={0.95} tone={GREEN_DARK} />
        <CardTree position={[2.9, 0, -1.1]} scale={0.8} />
        <CardTree position={[3.3, 0, 1.1]} scale={0.7} tone={GREEN_LIGHT} />
        <CardBush position={[-2.5, 0.1, 0.95]} scale={0.95} />
        <CardBush position={[1.7, 0.1, 1.25]} scale={0.75} />

        <ContactShadows
          position={[0, 0.03, 0]}
          opacity={0.34}
          scale={14}
          blur={2.2}
          far={3.5}
          resolution={lowSpec ? 128 : 512}
          color="#2f4a33"
        />

        {/* ήλιος */}
        <CardSun position={[-3.15, 3.05, -1.6]} />

        {/* badge με τα κιλοβάτ — μέσα στην εικόνα */}
        <KwBadge label={kwLabel} position={[1.35, 2.5, 0.1]} />

        {!reduceMotion && (
          <Sparkles
            count={lowSpec ? 18 : 36}
            scale={[8, 3.5, 8]}
            position={[0, 2.2, 0]}
            size={2.4}
            speed={0.3}
            color="#ffd27a"
            opacity={0.75}
          />
        )}
      </group>
    </>
  );
}

/* ---------------- Export ---------------- */

export default function PackageKw3D({
  kwLabel,
  reduceMotion = false,
}: {
  kwLabel: string;
  reduceMotion?: boolean;
}) {
  const [lowSpec] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 820
  );
  const holder = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = holder.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const paused = reduceMotion || !visible;

  return (
    <div ref={holder} className="h-full w-full">
      <Canvas
        dpr={lowSpec ? [0.75, 1] : [1, 1.5]}
        camera={{ position: [4.4, 3.15, 6.3], fov: 35 }}
        gl={{
          antialias: !lowSpec,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={paused ? "demand" : "always"}
        performance={{ min: 0.4 }}
        aria-label={`Τρισδιάστατη απεικόνιση πακέτου φωτοβολταϊκού ${kwLabel}`}
        role="img"
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CardScene kwLabel={kwLabel} reduceMotion={reduceMotion} lowSpec={lowSpec} />
        </Suspense>
      </Canvas>
    </div>
  );
}
