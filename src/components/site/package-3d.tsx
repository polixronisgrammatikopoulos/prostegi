"use client";

/**
 * Τρισδιάστατη σκηνή «Ολοκληρωμένων Πακέτων» για τη σελίδα Υπηρεσίες.
 * Τρεις παραλλαγές με τα χρώματα του λογότυπου:
 *  - net    : Σπίτι + πάνελ στέγης + μπαταρία + στύλος δικτύου (net billing)
 *  - hybrid : Σπίτι + μεγαλύτερη διάταξη πάνελ + τοίχος μπαταριών + inverter
 *  - pro    : Αποθήκη + συστοιχίες πάνελ εδάφους + high voltage rack
 * Χαμηλο-πολυγωνική γεωμετρία χωρίς εξωτερικά assets.
 */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

export type PackageVariant = "net" | "hybrid" | "pro";

/* Χρώματα brand */
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
const BATTERY_CASE = "#2c7a3e";
const BATTERY_FACE = "#e9f3eb";

/* ---------------- Φωτοβολταϊκό module ---------------- */

export function PvModule({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  w = 1.5,
  h = 1.05,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  w?: number;
  h?: number;
}) {
  const cols = 3;
  const rows = 2;

  const vLines = useMemo(
    () => Array.from({ length: cols - 1 }, (_, i) => -w / 2 + ((i + 1) * w) / cols),
    [cols, w]
  );
  const hLines = useMemo(
    () => Array.from({ length: rows - 1 }, (_, i) => -h / 2 + ((i + 1) * h) / rows),
    [rows, h]
  );

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[w, 0.08, h]} />
        <meshStandardMaterial color={NAVY_EDGE} metalness={0.45} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.045, 0]}>
        <boxGeometry args={[w - 0.09, 0.035, h - 0.09]} />
        <meshStandardMaterial color={NAVY_PANEL} metalness={0.55} roughness={0.22} envMapIntensity={1.1} />
      </mesh>
      {vLines.map((x, i) => (
        <mesh key={`v${i}`} position={[x, 0.068, 0]}>
          <boxGeometry args={[0.022, 0.006, h - 0.09]} />
          <meshStandardMaterial color="#dcebf5" />
        </mesh>
      ))}
      {hLines.map((z, i) => (
        <mesh key={`h${i}`} position={[0, 0.068, z]}>
          <boxGeometry args={[w - 0.09, 0.006, 0.022]} />
          <meshStandardMaterial color="#dcebf5" />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- Σπίτι ---------------- */

const WALL_H = 2.1;
const HALF_W = 1.6;
const HALF_D = 1.25;
const RIDGE_Y = 3.0;
const ROOF_ANGLE = 0.6;

function House({
  frontPanels = 3,
  backPanels = 2,
}: {
  frontPanels?: number;
  backPanels?: number;
}) {
  const slopeMidY = (WALL_H + RIDGE_Y) / 2 + 0.07;
  const slopeMidZ = HALF_D / 2 + 0.1;

  const frontXs = useMemo(() => {
    const step = 1.55;
    const start = ((frontPanels - 1) * step) / 2;
    return Array.from({ length: frontPanels }, (_, i) => -start + i * step);
  }, [frontPanels]);

  const backXs = useMemo(() => {
    const step = 1.55;
    const start = ((backPanels - 1) * step) / 2;
    return Array.from({ length: backPanels }, (_, i) => -start + i * step);
  }, [backPanels]);

  return (
    <group position={[-1.2, 0, 0]}>
      {/* όγκος */}
      <mesh position={[0, WALL_H / 2, 0]}>
        <boxGeometry args={[HALF_W * 2, WALL_H, HALF_D * 2]} />
        <meshStandardMaterial color={WALL_CREAM} roughness={0.9} />
      </mesh>

      {/* στέγη */}
      <mesh position={[0, slopeMidY, slopeMidZ]} rotation={[ROOF_ANGLE, 0, 0]}>
        <boxGeometry args={[HALF_W * 2 + 0.4, 0.13, 1.9]} />
        <meshStandardMaterial color={BRAND_GREEN} roughness={0.5} />
      </mesh>
      <mesh position={[0, slopeMidY, -slopeMidZ]} rotation={[-ROOF_ANGLE, 0, 0]}>
        <boxGeometry args={[HALF_W * 2 + 0.4, 0.13, 1.9]} />
        <meshStandardMaterial color={GREEN_DARK} roughness={0.5} />
      </mesh>
      <mesh position={[0, RIDGE_Y + 0.1, 0]}>
        <boxGeometry args={[HALF_W * 2 + 0.46, 0.14, 0.34]} />
        <meshStandardMaterial color={GREEN_DARK} roughness={0.5} />
      </mesh>

      {/* καμινάδα */}
      <mesh position={[0.9, RIDGE_Y + 0.26, -0.45]}>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial color="#e6ddc8" roughness={0.85} />
      </mesh>

      {/* παράθυρα */}
      {[-0.85, 0.85].map((x) => (
        <group key={x}>
          <mesh position={[x, 1.35, HALF_D + 0.02]}>
            <boxGeometry args={[0.58, 0.58, 0.06]} />
            <meshStandardMaterial color="#ffffff" roughness={0.6} />
          </mesh>
          <mesh position={[x, 1.35, HALF_D + 0.06]}>
            <boxGeometry args={[0.44, 0.44, 0.04]} />
            <meshStandardMaterial color={GLASS} metalness={0.35} roughness={0.15} envMapIntensity={1.2} />
          </mesh>
        </group>
      ))}

      {/* πόρτα */}
      <mesh position={[0, 0.55, HALF_D + 0.03]}>
        <boxGeometry args={[0.55, 1.05, 0.07]} />
        <meshStandardMaterial color={BRAND_GREEN} roughness={0.55} />
      </mesh>

      {/* πάνελ μπροστινή κλίση */}
      <group position={[0, slopeMidY + 0.12, slopeMidZ]} rotation={[ROOF_ANGLE, 0, 0]}>
        {frontXs.map((x) => (
          <PvModule key={x} position={[x, 0, 0]} w={1.42} h={1.0} />
        ))}
      </group>
      {/* πάνελ πίσω κλίση */}
      <group position={[0, slopeMidY + 0.12, -slopeMidZ]} rotation={[-ROOF_ANGLE, 0, 0]}>
        {backXs.map((x) => (
          <PvModule key={x} position={[x, 0, 0]} w={1.42} h={1.0} />
        ))}
      </group>
    </group>
  );
}

/* ---------------- Μπαταρία 48V (κρεμαστή/δαπέδου) ---------------- */

function BatteryUnit({
  position,
  tall = false,
}: {
  position: [number, number, number];
  tall?: boolean;
}) {
  const h = tall ? 1.5 : 1.15;
  return (
    <group position={position}>
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[0.62, h, 0.34]} />
        <meshStandardMaterial color={BATTERY_CASE} roughness={0.45} metalness={0.15} />
      </mesh>
      {/* μπροστινή πλάκα + οθόνη */}
      <mesh position={[0, h / 2, 0.18]}>
        <boxGeometry args={[0.5, h - 0.18, 0.02]} />
        <meshStandardMaterial color={BATTERY_FACE} roughness={0.6} />
      </mesh>
      <mesh position={[0, h - 0.28, 0.2]}>
        <boxGeometry args={[0.3, 0.16, 0.015]} />
        <meshStandardMaterial color={NAVY} emissive={NAVY} emissiveIntensity={0.5} />
      </mesh>
      {/* LED κατάστασης */}
      <mesh position={[0.16, 0.35, 0.2]}>
        <sphereGeometry args={[0.032, 10, 10]} />
        <meshStandardMaterial color="#7fe08f" emissive="#57d96c" emissiveIntensity={1.4} />
      </mesh>
      {/* πόδια */}
      {[-0.22, 0.22].map((x) => (
        <mesh key={x} position={[x, 0.05, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.3]} />
          <meshStandardMaterial color={METAL} metalness={0.4} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- Inverter σε τοίχο ---------------- */

function InverterBox({
  position,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.55, 0.75, 0.24]} />
        <meshStandardMaterial color="#f2f4f6" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.18, 0.13]}>
        <boxGeometry args={[0.4, 0.3, 0.02]} />
        <meshStandardMaterial color={NAVY} />
      </mesh>
      <mesh position={[0, -0.24, 0.13]}>
        <boxGeometry args={[0.42, 0.1, 0.02]} />
        <meshStandardMaterial color={BRAND_GREEN} />
      </mesh>
    </group>
  );
}

/* ---------------- Στύλος δικτύου ---------------- */

function UtilityPole({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.07, 0.1, 3.4, 10]} />
        <meshStandardMaterial color="#8d7a63" roughness={0.95} />
      </mesh>
      {/* μπαγιέτες */}
      <mesh position={[0, 3.05, 0]}>
        <boxGeometry args={[1.15, 0.08, 0.08]} />
        <meshStandardMaterial color="#8d7a63" roughness={0.95} />
      </mesh>
      <mesh position={[0, 2.75, 0]}>
        <boxGeometry args={[0.85, 0.07, 0.07]} />
        <meshStandardMaterial color="#8d7a63" roughness={0.95} />
      </mesh>
      {/* μονωτήρες */}
      {[-0.45, 0, 0.45].map((x) => (
        <mesh key={x} position={[x, 3.14, 0]}>
          <cylinderGeometry args={[0.035, 0.05, 0.12, 8]} />
          <meshStandardMaterial color="#e8e6e0" />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- Γραμμή πάνελ εδάφους (αγροτική διάταξη) ---------------- */

function GroundRow({
  position,
  count = 3,
  rotation = 0,
}: {
  position: [number, number, number];
  count?: number;
  rotation?: number;
}) {
  const step = 1.62;
  const start = ((count - 1) * step) / 2;
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {Array.from({ length: count }, (_, i) => (
        <group key={i} position={[-start + i * step, 0, 0]}>
          {/* στηρίγματα */}
          {[-0.55, 0.55].map((x) => (
            <group key={x}>
              <mesh position={[x, 0.28, 0.28]}>
                <boxGeometry args={[0.07, 0.56, 0.07]} />
                <meshStandardMaterial color={METAL} metalness={0.5} roughness={0.5} />
              </mesh>
              <mesh position={[x, 0.5, -0.3]}>
                <boxGeometry args={[0.07, 1.0, 0.07]} />
                <meshStandardMaterial color={METAL} metalness={0.5} roughness={0.5} />
              </mesh>
            </group>
          ))}
          {/* πάνελ */}
          <group position={[0, 1.05, 0]} rotation={[-0.42, 0, 0]}>
            <PvModule w={1.5} h={1.05} />
          </group>
        </group>
      ))}
    </group>
  );
}

/* ---------------- Αποθήκη (επαγγελματικό) ---------------- */

function Warehouse() {
  return (
    <group position={[-2.6, 0, -1.6]}>
      <mesh position={[0, 1.0, 0]}>
        <boxGeometry args={[3.6, 2.0, 2.4]} />
        <meshStandardMaterial color={WALL_CREAM} roughness={0.9} />
      </mesh>
      {/* επίπεδη στέγη */}
      <mesh position={[0, 2.06, 0]}>
        <boxGeometry args={[3.8, 0.14, 2.6]} />
        <meshStandardMaterial color={NAVY} roughness={0.55} />
      </mesh>
      {/* πάνελ στην οροφή */}
      <group position={[0, 2.16, -0.35]} rotation={[0, 0, 0]}>
        {[-1.2, 0, 1.2].map((x) => (
          <PvModule key={x} position={[x, 0, 0]} w={1.35} h={0.95} />
        ))}
      </group>
      {/* πόρτα αποθήκης */}
      <mesh position={[0.9, 0.75, 1.22]}>
        <boxGeometry args={[1.1, 1.5, 0.06]} />
        <meshStandardMaterial color="#c9cfd4" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* πάνελ στην πίσω κλίση */}
      <group position={[0, 2.16, -0.35]} rotation={[0, 0, 0]}>
        {[-1.2, 0, 1.2].map((x) => (
          <PvModule key={x} position={[x, 0, 0]} w={1.35} h={0.95} />
        ))}
      </group>
    </group>
  );
}

/* ---------------- High Voltage Rack ---------------- */

function HVRack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[0.85, 2.1, 0.6]} />
        <meshStandardMaterial color={NAVY} roughness={0.4} metalness={0.25} />
      </mesh>
      {/* modules (συρτάρια) */}
      {[0.35, 0.98, 1.61].map((y) => (
        <mesh key={y} position={[0, y, 0.31]}>
          <boxGeometry args={[0.72, 0.5, 0.03]} />
          <meshStandardMaterial color="#1e3a52" roughness={0.35} />
        </mesh>
      ))}
      {/* LED και ένδειξη */}
      <mesh position={[0, 1.98, 0.31]}>
        <boxGeometry args={[0.5, 0.08, 0.02]} />
        <meshStandardMaterial color="#7fe08f" emissive="#57d96c" emissiveIntensity={1.2} />
      </mesh>
      {/* βάση */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.95, 0.1, 0.7]} />
        <meshStandardMaterial color={METAL} metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

/* ---------------- Δέντρα / θάμνοι ---------------- */

function Tree({
  position,
  scale = 1,
  tone = BRAND_GREEN,
}: {
  position: [number, number, number];
  scale?: number;
  tone?: string;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 0.6, 6]} />
        <meshStandardMaterial color={TRUNK} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <icosahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial color={tone} roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0.12, 1.22, 0.08]}>
        <icosahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial color={tone} roughness={0.85} flatShading />
      </mesh>
    </group>
  );
}

function Bush({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <mesh position={position} scale={scale}>
      <icosahedronGeometry args={[0.28, 0]} />
      <meshStandardMaterial color={GREEN_LIGHT} roughness={0.9} flatShading />
    </mesh>
  );
}

/* ---------------- Ήλιος ---------------- */

function Sun({ position }: { position: [number, number, number] }) {
  const rays = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (rays.current) rays.current.rotation.z = state.clock.elapsedTime * 0.2;
  });

  const rayItems = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i * Math.PI) / 6;
        return {
          key: i,
          position: [Math.cos(angle) * 1.1, Math.sin(angle) * 1.1, 0] as [number, number, number],
          rotation: angle - Math.PI / 2,
          long: i % 2 === 0,
        };
      }),
    []
  );

  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.72, 28, 28]} />
        <meshBasicMaterial color={SUN_CORE} />
      </mesh>
      <group ref={rays}>
        {rayItems.map((r) => (
          <mesh key={r.key} position={r.position} rotation={[0, 0, r.rotation]}>
            <boxGeometry args={[0.07, r.long ? 0.5 : 0.32, 0.07]} />
            <meshBasicMaterial color={SUN_RAY} />
          </mesh>
        ))}
      </group>
      <mesh>
        <sphereGeometry args={[1.0, 20, 20]} />
        <meshBasicMaterial color={SUN_CORE} transparent opacity={0.22} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ---------------- Ομαλή μετάβαση παραλλαγής ---------------- */

function VariantGroup({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const targetScale = active ? 1 : 0.0001;
    const targetY = active ? 0 : -0.4;
    ref.current.scale.x = THREE.MathUtils.damp(ref.current.scale.x, targetScale, 7, delta);
    ref.current.scale.y = THREE.MathUtils.damp(ref.current.scale.y, targetScale, 7, delta);
    ref.current.scale.z = THREE.MathUtils.damp(ref.current.scale.z, targetScale, 7, delta);
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, targetY, 7, delta);
    ref.current.visible = ref.current.scale.x > 0.01;
  });

  return (
    <group ref={ref} scale={active ? 1 : 0.0001} visible={active}>
      {children}
    </group>
  );
}

/* ---------------- Αργή περιστροφή ---------------- */

function SlowRotate({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.045;
  });
  return <group ref={ref}>{children}</group>;
}

/* ---------------- Κάμερα ---------------- */

function CameraRig() {
  const target = useMemo(() => new THREE.Vector3(0.2, 1.15, 0), []);
  useFrame((state, delta) => {
    const { camera, pointer } = state;
    const tx = 8.7 + pointer.x * 1.0;
    const ty = 4.6 + pointer.y * 0.55;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 2.0, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 2.0, delta);
    camera.lookAt(target);
  });
  return null;
}

/* ---------------- Διατάξεις παραλλαγών ---------------- */

function NetLayout() {
  return (
    <group>
      <House frontPanels={3} backPanels={2} />
      {/* μπαταρία δίπλα στο σπίτι */}
      <BatteryUnit position={[1.35, 0, 0.9]} />
      {/* inverter στον τοίχο */}
      <InverterBox position={[0.55, 1.25, 1.3]} />
      {/* στύλος δικτύου με καλώδιο προς το σπίτι */}
      <UtilityPole position={[3.9, 0, 1.9]} />
    </group>
  );
}

function HybridLayout() {
  return (
    <group>
      <House frontPanels={4} backPanels={3} />
      {/* τοίχος μπαταριών: 2 μονάδες */}
      <BatteryUnit position={[1.35, 0, 0.9]} />
      <BatteryUnit position={[2.05, 0, 0.85]} />
      {/* inverter */}
      <InverterBox position={[0.55, 1.25, 1.3]} />
      {/* φόρτιση που «ταξιδεύει» — sparkles χειρίζονται εξωτερικά */}
      <pointLight position={[1.7, 1.0, 0.9]} intensity={0.6} color="#8fe6a1" distance={2.4} />
    </group>
  );
}

function ProLayout() {
  return (
    <group>
      <Warehouse />
      <HVRack position={[0.2, 0, 0.7]} />
      <HVRack position={[1.25, 0, 0.62]} />
      {/* συστοιχίες εδάφους */}
      <GroundRow position={[2.2, 0, -1.4]} count={3} rotation={-0.12} />
      <GroundRow position={[2.35, 0, 0.6]} count={3} rotation={-0.12} />
      <GroundRow position={[2.5, 0, 2.5]} count={3} rotation={-0.12} />
    </group>
  );
}

/* ---------------- Σκηνή ---------------- */

function Scene({
  variant,
  reduceMotion,
  lowSpec,
}: {
  variant: PackageVariant;
  reduceMotion: boolean;
  lowSpec: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#ffedcf", "#9fca9e", 0.6]} />
      <directionalLight position={[-5.5, 6.5, -3.5]} intensity={2.0} color="#ffe3b3" />
      <directionalLight position={[7, 5, 8]} intensity={0.6} color="#d8ecff" />

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

      <group position={[0, -0.45, 0]}>
        <SlowRotate>
          {/* έδαφος */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[15, 48]} />
            <meshStandardMaterial color={GRASS} roughness={1} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
            <circleGeometry args={[9.4, 48]} />
            <meshStandardMaterial color={GRASS_INNER} roughness={1} />
          </mesh>

          {/* παραλλαγές */}
          <VariantGroup active={variant === "net"}>
            <NetLayout />
          </VariantGroup>
          <VariantGroup active={variant === "hybrid"}>
            <HybridLayout />
          </VariantGroup>
          <VariantGroup active={variant === "pro"}>
            <ProLayout />
          </VariantGroup>

          {/* βλάστηση γύρω */}
          <Tree position={[-6.3, 0, -2.2]} scale={1.1} tone={GREEN_DARK} />
          <Tree position={[6.1, 0, -2.6]} scale={0.95} />
          <Tree position={[6.7, 0, 2.4]} scale={1.15} tone={GREEN_LIGHT} />
          <Tree position={[-6.6, 0, 2.7]} scale={0.85} />
          <Tree position={[-2.7, 0, -5.2]} scale={1.05} tone={GREEN_LIGHT} />
          <Tree position={[3.4, 0, -5.6]} scale={0.8} />
          <Bush position={[-4.8, 0.14, 1.1]} scale={1.1} />
          <Bush position={[4.9, 0.12, -0.5]} scale={0.9} />
          <Bush position={[1.4, 0.12, 3.4]} scale={0.8} />

          <ContactShadows
            position={[0, 0.03, 0]}
            opacity={0.34}
            scale={20}
            blur={2.3}
            far={4.5}
            resolution={lowSpec ? 128 : 512}
            color="#2f4a33"
          />
        </SlowRotate>

        <Sun position={[-6.4, 5.1, -4.4]} />

        <Sparkles
          count={reduceMotion || lowSpec ? 24 : 64}
          scale={[12, 5, 12]}
          position={[0, 2.8, 0]}
          size={2.6}
          speed={reduceMotion ? 0.08 : 0.32}
          color="#ffd27a"
          opacity={0.8}
        />
      </group>

      <CameraRig />
    </>
  );
}

/* ---------------- Canvas export (default) ---------------- */

export default function Package3DScene({
  variant,
  reduceMotion = false,
}: {
  variant: PackageVariant;
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
        camera={{ position: [8.7, 4.6, 10.5], fov: 38 }}
        gl={{
          antialias: !lowSpec,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={paused ? "demand" : "always"}
        performance={{ min: 0.4 }}
        aria-label="Τρισδιάστατη απεικόνιση ολοκληρωμένων φωτοβολταϊκών πακέτων"
        role="img"
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene variant={variant} reduceMotion={reduceMotion} lowSpec={lowSpec} />
        </Suspense>
      </Canvas>
    </div>
  );
}
