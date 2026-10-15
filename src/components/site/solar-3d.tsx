"use client";

/**
 * Τρισδιάστατη σκηνή εμπνευσμένη από το λογότυπο ProΣτέγη:
 * σπίτι με πράσινη στέγη και φωτοβολταϊκά πάνελ, αυτόνομο πάνελ σε στύλο
 * (όπως στο λογότυπο) και φωτεινός ήλιος με περιστρεφόμενες ακτίνες.
 * Low-poly γεωμετρία χωρίς εξωτερικά assets — γρήγορο φόρτωμα παντού.
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

/* Χρώματα brand (από το λογότυπο) */
const BRAND_GREEN = "#2c7a3e";
const GREEN_DARK = "#22642f";
const GREEN_LIGHT = "#3e9b54";
const WALL_CREAM = "#f7f3e8";
const NAVY_PANEL = "#1b5178";
const NAVY_PANEL_EDGE = "#24618b";
const PANEL_LEG = "#9aa3ab";
const SUN_CORE = "#ffd98a";
const SUN_RAY = "#ffbf56";
const GRASS = "#79bd7c";
const GRASS_INNER = "#8ecb90";
const TRUNK = "#7d6b57";
const WINDOW_GLASS = "#a8d4ec";
const CHIMNEY = "#e6ddc8";

/* ---------------- Φωτοβολταϊκό module (επαναχρησιμοποιήσιμο) ---------------- */

function PVModule({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  w = 1.5,
  h = 1.05,
  elevated = true,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  w?: number;
  h?: number;
  elevated?: boolean;
}) {
  const cols = 3;
  const rows = 2;
  const lift = elevated ? 0.09 : 0;

  const vLines = useMemo(
    () => Array.from({ length: cols - 1 }, (_, i) => (-w / 2) + ((i + 1) * w) / cols),
    [cols, w]
  );
  const hLines = useMemo(
    () => Array.from({ length: rows - 1 }, (_, i) => (-h / 2) + ((i + 1) * h) / rows),
    [rows, h]
  );

  return (
    <group position={position} rotation={rotation}>
      {/* πλαίσιο */}
      <mesh>
        <boxGeometry args={[w, 0.08, h]} />
        <meshStandardMaterial color={NAVY_PANEL_EDGE} metalness={0.45} roughness={0.4} />
      </mesh>
      {/* γυαλί */}
      <mesh position={[0, 0.045 + lift, 0]}>
        <boxGeometry args={[w - 0.09, 0.035, h - 0.09]} />
        <meshStandardMaterial
          color={NAVY_PANEL}
          metalness={0.55}
          roughness={0.22}
          envMapIntensity={1.1}
        />
      </mesh>
      {/* κατακόρυφες γραμμές cells */}
      {vLines.map((x, i) => (
        <mesh key={`v${i}`} position={[x, 0.068 + lift, 0]}>
          <boxGeometry args={[0.022, 0.006, h - 0.09]} />
          <meshStandardMaterial color="#dcebf5" />
        </mesh>
      ))}
      {/* οριζόντιες γραμμές cells */}
      {hLines.map((z, i) => (
        <mesh key={`h${i}`} position={[0, 0.068 + lift, z]}>
          <boxGeometry args={[w - 0.09, 0.006, 0.022]} />
          <meshStandardMaterial color="#dcebf5" />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- Σπίτι με φωτοβολταϊκά στη στέγη ---------------- */

const WALL_H = 2.2;
const HALF_W = 1.7;
const HALF_D = 1.3;
const RIDGE_Y = 3.16;
const ROOF_ANGLE = 0.6; // ~34°

function GableWall({ z }: { z: number }) {
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-HALF_W - 0.06, 0);
    s.lineTo(HALF_W + 0.06, 0);
    s.lineTo(0, RIDGE_Y - WALL_H);
    s.closePath();
    return new THREE.ExtrudeGeometry(s, { depth: 0.16, bevelEnabled: false });
  }, []);

  return (
    <mesh geometry={geo} position={[0, WALL_H, z]}>
      <meshStandardMaterial color={WALL_CREAM} roughness={0.9} />
    </mesh>
  );
}

function House() {
  const slopeMidY = (WALL_H + RIDGE_Y) / 2 + 0.07; // ~2.75
  const slopeMidZ = HALF_D / 2 + 0.1; // ~0.75
  const slopeLen = 1.95;

  return (
    <group>
      {/* κύριος όγκος */}
      <mesh position={[0, WALL_H / 2, 0]}>
        <boxGeometry args={[HALF_W * 2, WALL_H, HALF_D * 2]} />
        <meshStandardMaterial color={WALL_CREAM} roughness={0.9} />
      </mesh>

      {/* αετώματα */}
      <GableWall z={HALF_D - 0.08} />
      <GableWall z={-HALF_D - 0.08} />

      {/* στέγη — δύο πλάγιες κλίσεις */}
      <mesh position={[0, slopeMidY, slopeMidZ]} rotation={[ROOF_ANGLE, 0, 0]}>
        <boxGeometry args={[HALF_W * 2 + 0.45, 0.13, slopeLen]} />
        <meshStandardMaterial color={BRAND_GREEN} roughness={0.5} />
      </mesh>
      <mesh position={[0, slopeMidY, -slopeMidZ]} rotation={[-ROOF_ANGLE, 0, 0]}>
        <boxGeometry args={[HALF_W * 2 + 0.45, 0.13, slopeLen]} />
        <meshStandardMaterial color={GREEN_DARK} roughness={0.5} />
      </mesh>
      {/* καพίδα */}
      <mesh position={[0, RIDGE_Y + 0.1, 0]}>
        <boxGeometry args={[HALF_W * 2 + 0.5, 0.14, 0.36]} />
        <meshStandardMaterial color={GREEN_DARK} roughness={0.5} />
      </mesh>

      {/* καμινάδα */}
      <mesh position={[0.95, RIDGE_Y + 0.28, -0.5]}>
        <boxGeometry args={[0.34, 0.75, 0.34]} />
        <meshStandardMaterial color={CHIMNEY} roughness={0.85} />
      </mesh>
      <mesh position={[0.95, RIDGE_Y + 0.68, -0.5]}>
        <boxGeometry args={[0.42, 0.08, 0.42]} />
        <meshStandardMaterial color={GREEN_DARK} roughness={0.7} />
      </mesh>

      {/* παράθυρα μπροστινής όψης */}
      {[-0.95, 0.95].map((x) => (
        <group key={x}>
          <mesh position={[x, 1.4, HALF_D + 0.02]}>
            <boxGeometry args={[0.64, 0.64, 0.06]} />
            <meshStandardMaterial color="#ffffff" roughness={0.6} />
          </mesh>
          <mesh position={[x, 1.4, HALF_D + 0.06]}>
            <boxGeometry args={[0.5, 0.5, 0.04]} />
            <meshStandardMaterial
              color={WINDOW_GLASS}
              metalness={0.35}
              roughness={0.15}
              envMapIntensity={1.2}
            />
          </mesh>
        </group>
      ))}

      {/* πόρτα */}
      <mesh position={[0, 0.56, HALF_D + 0.03]}>
        <boxGeometry args={[0.6, 1.1, 0.07]} />
        <meshStandardMaterial color={BRAND_GREEN} roughness={0.55} />
      </mesh>
      <mesh position={[0.2, 0.58, HALF_D + 0.09]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial color="#d9b45b" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* παράθυρο πλάγιας όψης (+X) */}
      <group rotation={[0, Math.PI / 2, 0]}>
        <mesh position={[0, 1.35, HALF_W + 0.02]}>
          <boxGeometry args={[0.64, 0.64, 0.06]} />
          <meshStandardMaterial color="#ffffff" roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.35, HALF_W + 0.06]}>
          <boxGeometry args={[0.5, 0.5, 0.04]} />
          <meshStandardMaterial
            color={WINDOW_GLASS}
            metalness={0.35}
            roughness={0.15}
            envMapIntensity={1.2}
          />
        </mesh>
      </group>

      {/* φωτοβολταϊκά πάνελ στη μπροστινή κλίση */}
      <group position={[0, slopeMidY + 0.12, slopeMidZ]} rotation={[ROOF_ANGLE, 0, 0]}>
        <PVModule position={[-0.82, 0, 0]} w={1.5} h={1.05} elevated={false} />
        <PVModule position={[0.82, 0, 0]} w={1.5} h={1.05} elevated={false} />
      </group>
      {/* φωτοβολταϊκά πάνελ στην πίσω κλίση */}
      <group position={[0, slopeMidY + 0.12, -slopeMidZ]} rotation={[-ROOF_ANGLE, 0, 0]}>
        <PVModule position={[-0.82, 0, 0]} w={1.5} h={1.05} elevated={false} />
        <PVModule position={[0.82, 0, 0]} w={1.5} h={1.05} elevated={false} />
      </group>
    </group>
  );
}

/* ---------------- Αυτόνομο πάνελ σε στύλο (όπως στο λογότυπο) ---------------- */

function PolePanel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* στύλος */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.06, 0.09, 1.5, 10]} />
        <meshStandardMaterial color={PANEL_LEG} metalness={0.4} roughness={0.55} />
      </mesh>
      {/* πλατφόρμα + κλιμακωτό πάνελ */}
      <group position={[0, 1.62, 0]} rotation={[-0.5, 0.15, 0]}>
        <PVModule w={1.75} h={1.2} />
      </group>
    </group>
  );
}

/* ---------------- Ήλιος με ακτίνες (όπως στο λογότυπο) ---------------- */

function Sun() {
  const group = useRef<THREE.Group>(null);
  const rays = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.position.y = 4.7 + Math.sin(t * 0.6) * 0.22;
    }
    if (rays.current) {
      rays.current.rotation.z = t * 0.22;
    }
  });

  const rayItems = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i * Math.PI) / 6;
        return {
          key: i,
          position: [Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0] as [
            number,
            number,
            number
          ],
          rotation: angle - Math.PI / 2,
          long: i % 2 === 0,
        };
      }),
    []
  );

  return (
    <group ref={group} position={[-6.6, 5.35, -4.6]}>
      {/* πυρήνας */}
      <mesh>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshBasicMaterial color={SUN_CORE} />
      </mesh>
      {/* ακτίνες */}
      <group ref={rays}>
        {rayItems.map((r) => (
          <mesh key={r.key} position={r.position} rotation={[0, 0, r.rotation]}>
            <boxGeometry args={[0.09, r.long ? 0.62 : 0.4, 0.09]} />
            <meshBasicMaterial color={SUN_RAY} />
          </mesh>
        ))}
      </group>
      {/* halo */}
      <mesh>
        <sphereGeometry args={[1.3, 24, 24]} />
        <meshBasicMaterial color={SUN_CORE} transparent opacity={0.24} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.95, 20, 20]} />
        <meshBasicMaterial color={SUN_CORE} transparent opacity={0.09} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ---------------- Βλάστηση ---------------- */

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

/* ---------------- Τοπίο ---------------- */

function Landscape() {
  return (
    <group>
      <House />
      <PolePanel position={[-3.5, 0, 1.4]} />
      <Tree position={[-5.9, 0, -1.6]} scale={1.1} tone={GREEN_DARK} />
      <Tree position={[5.6, 0, -2.4]} scale={0.95} />
      <Tree position={[6.6, 0, 2.6]} scale={1.2} tone={GREEN_LIGHT} />
      <Tree position={[-6.8, 0, 2.9]} scale={0.85} />
      <Tree position={[-2.4, 0, -4.9]} scale={1.05} tone={GREEN_LIGHT} />
      <Tree position={[3.2, 0, -5.4]} scale={0.8} />
      <Bush position={[-2.35, 0.16, 2.2]} scale={1.15} />
      <Bush position={[2.5, 0.14, 2.35]} scale={0.9} />
      <Bush position={[3.6, 0.12, 0.4]} scale={0.75} />
      <Bush position={[-4.6, 0.12, -0.6]} scale={0.85} />
    </group>
  );
}

/* ---------------- Κάμερα με mouse-parallax ---------------- */

function CameraRig() {
  const target = useMemo(() => new THREE.Vector3(0.3, 1.35, 0), []);

  useFrame((state, delta) => {
    const { camera, pointer } = state;
    const tx = 8.4 + pointer.x * 1.15;
    const ty = 4.9 + pointer.y * 0.6;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 2.2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 2.2, delta);
    camera.lookAt(target);
  });

  return null;
}

/* ---------------- Αργή περιστροφή σκηνής ---------------- */

function SlowRotate({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

/* ---------------- Σκηνή ---------------- */

function Scene({ reduceMotion, lowSpec }: { reduceMotion: boolean; lowSpec: boolean }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <hemisphereLight args={["#ffedcf", "#9fca9e", 0.65]} />
      {/* φως από τον ήλιο (πάνω αριστερά, όπως στο λογότυπο) */}
      <directionalLight position={[-5.5, 6.5, -3.5]} intensity={2.1} color="#ffe3b3" />
      {/* δροσερό fill από την πλευρά της κάμερας */}
      <directionalLight position={[7, 5, 8]} intensity={0.6} color="#d8ecff" />

      {/* περιβάλλον αντανάκλασης για γυαλιστερά πάνελ — μόνο σε ισχυρότερες συσκευές */}
      {!lowSpec && (
        <Environment resolution={64} frames={1}>
          <mesh scale={120}>
            <sphereGeometry args={[1, 24, 24]} />
            <meshBasicMaterial color="#dcedf9" side={THREE.BackSide} />
          </mesh>
          <Lightformer intensity={2.4} color="#ffd9a0" position={[-6, 6, -5]} scale={5} />
          <Lightformer intensity={1.2} color="#ffffff" position={[6, 8, 6]} scale={7} />
          <Lightformer intensity={0.7} color="#9fce7f" position={[0, -6, 0]} scale={9} />
        </Environment>
      )}

      <group position={[0, -0.45, 0]}>
        <SlowRotate>
          {/* γήινο λόφος */}
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[16, 48]} />
            <meshStandardMaterial color={GRASS} roughness={1} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
            <circleGeometry args={[9.8, 48]} />
            <meshStandardMaterial color={GRASS_INNER} roughness={1} />
          </mesh>

          <Landscape />

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

        <Sun />

        <Sparkles
          count={reduceMotion || lowSpec ? 26 : 70}
          scale={[13, 5.5, 13]}
          position={[0, 3, 0]}
          size={2.8}
          speed={reduceMotion ? 0.1 : 0.35}
          color="#ffd27a"
          opacity={0.8}
        />
      </group>

      <CameraRig />
    </>
  );
}

/* ---------------- Canvas export ---------------- */

export default function Solar3DCanvas({ reduceMotion = false }: { reduceMotion?: boolean }) {
  /* Ελαφρύτερη απόδοση σε κινητά/tablet — ομαλό 3D χωρίς κατανάλωση μπαταρίας */
  const [lowSpec] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 820
  );
  /* Παύση του rendering όταν η σκηνή είναι εκτός οθόνης */
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
        camera={{ position: [8.4, 4.9, 10.2], fov: 38 }}
        gl={{
          antialias: !lowSpec,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={paused ? "demand" : "always"}
        performance={{ min: 0.4 }}
        aria-label="Τρισδιάστατη απεικόνιση σπιτιού με φωτοβολταϊκό σύστημα"
        role="img"
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene reduceMotion={reduceMotion} lowSpec={lowSpec} />
        </Suspense>
      </Canvas>
    </div>
  );
}
