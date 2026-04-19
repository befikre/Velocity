"use client";
import React, { useRef, useMemo, useState, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { cn } from "@/lib/utils";



export interface GlobeMarker {
  lat: number;
  lng: number;
  src: string;
  label?: string;
  size?: number;
}

export interface Globe3DConfig {
  
  radius?: number;
  
  globeColor?: string;
  
  textureUrl?: string;
  
  bumpMapUrl?: string;
  
  showAtmosphere?: boolean;
  
  atmosphereColor?: string;
  
  atmosphereIntensity?: number;
  
  atmosphereBlur?: number;
  
  bumpScale?: number;
  
  autoRotateSpeed?: number;
  
  enableZoom?: boolean;
  
  enablePan?: boolean;
  
  minDistance?: number;
  
  maxDistance?: number;
  
  initialRotation?: { x: number; y: number };
  
  markerSize?: number;
  
  showWireframe?: boolean;
  
  wireframeColor?: string;
  
  ambientIntensity?: number;
  
  pointLightIntensity?: number;
  
  backgroundColor?: string | null;
}

interface Globe3DProps {
  
  markers?: GlobeMarker[];
  
  config?: Globe3DConfig;
  
  className?: string;
  
  onMarkerClick?: (marker: GlobeMarker) => void;
  
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}



const DEFAULT_EARTH_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg";
const DEFAULT_BUMP_TEXTURE =
  "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";




function latLngToVector3(
  lat: number,
  lng: number,
  radius: number,
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}



interface MarkerProps {
  marker: GlobeMarker;
  radius: number;
  defaultSize: number;
  onClick?: (marker: GlobeMarker) => void;
  onHover?: (marker: GlobeMarker | null) => void;
}

function Marker({
  marker,
  radius,
  defaultSize,
  onClick,
  onHover,
}: MarkerProps) {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const groupRef = useRef<THREE.Group>(null);
  const imageGroupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  
  const surfacePosition = useMemo(() => {
    return latLngToVector3(marker.lat, marker.lng, radius * 1.001);
  }, [marker.lat, marker.lng, radius]);

  
  const topPosition = useMemo(() => {
    return latLngToVector3(marker.lat, marker.lng, radius * 1.18);
  }, [marker.lat, marker.lng, radius]);

  const lineHeight = topPosition.distanceTo(surfacePosition);

  
  useFrame(() => {
    if (!imageGroupRef.current) return;

    
    const worldPos = new THREE.Vector3();
    imageGroupRef.current.getWorldPosition(worldPos);

    
    const markerDirection = worldPos.clone().normalize();

    
    const cameraDirection = camera.position.clone().normalize();

    
    const dot = markerDirection.dot(cameraDirection);

    
    setIsVisible(dot > 0.1);
  });

  const handlePointerEnter = useCallback(() => {
    setHovered(true);
    onHover?.(marker);
  }, [marker, onHover]);

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    onHover?.(null);
  }, [onHover]);

  const handleClick = useCallback(() => {
    onClick?.(marker);
  }, [marker, onClick]);

  
  const { lineCenter, lineQuaternion } = useMemo(() => {
    const center = surfacePosition.clone().lerp(topPosition, 0.5);

    
    const direction = topPosition.clone().sub(surfacePosition).normalize();
    const quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

    return { lineCenter: center, lineQuaternion: quaternion };
  }, [surfacePosition, topPosition]);

  return (
    <group ref={groupRef} visible={isVisible}>
      {}
      <mesh position={lineCenter} quaternion={lineQuaternion}>
        <cylinderGeometry args={[0.003, 0.003, lineHeight, 8]} />
        <meshBasicMaterial
          color={hovered ? "#ffffff" : "#94a3b8"}
          transparent
          opacity={hovered ? 0.9 : 0.6}
        />
      </mesh>

      {}
      <mesh position={surfacePosition} quaternion={lineQuaternion}>
        <coneGeometry args={[0.015, 0.04, 8]} />
        <meshBasicMaterial color={hovered ? "#f97316" : "#ef4444"} />
      </mesh>

      {}
      <group ref={imageGroupRef} position={topPosition}>
        <Html
          transform
          center
          sprite
          distanceFactor={10}
          className="pointer-events-none"
        >
          {}
          <div className="relative flex items-center justify-center">
            {}
            <div className="text-emerald-300 font-bold text-[16px] leading-none drop-shadow-[0_0_8px_rgba(52,211,153,0.9)] z-10 flex items-center justify-center font-mono">
              ₹
            </div>
            
            {}
            <div className="absolute w-6 h-6 border-[1.5px] border-emerald-400/50 rounded-full animate-ping" />
            
            {}
            <div className="absolute w-6 h-6 bg-emerald-500/20 rounded-full blur-[4px]" />
          </div>
        </Html>
      </group>
    </group>
  );
}



interface RotatingGlobeProps {
  config: Required<Globe3DConfig>;
  markers: GlobeMarker[];
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

function RotatingGlobe({
  config,
  markers,
  onMarkerClick,
  onMarkerHover,
}: RotatingGlobeProps) {
  const groupRef = useRef<THREE.Group>(null);

  
  const [worldOutline] = useTexture([
    "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png", 
  ]);

  
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius, 48, 48);
  }, [config.radius]);

  
  const [dotGeometry, setDotGeometry] = useState<THREE.BufferGeometry | null>(null);

  React.useEffect(() => {
    
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "https://unpkg.com/three-globe@2.31.0/example/img/earth-topology.png";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 1024, 512);
      const data = ctx.getImageData(0, 0, 1024, 512).data;

      const points = [];
      const SAMPLES = 10000; 
      const radius = config.radius * 1.002;
      
      for (let i = 0; i < SAMPLES; i++) {
        const phi = Math.acos(-1 + (2 * i) / SAMPLES);
        const theta = Math.sqrt(SAMPLES * Math.PI) * phi;

        
        const u = 1 - (theta / (2 * Math.PI)) % 1;
        const v = phi / Math.PI;
        const x_pixel = Math.floor(u * 1024);
        const y_pixel = Math.floor(v * 512);
        const pixelIndex = (y_pixel * 1024 + x_pixel) * 4;

        
        if (data[pixelIndex] > 40) {
          const x = radius * Math.cos(theta) * Math.sin(phi);
          const y = radius * Math.sin(theta) * Math.sin(phi);
          const z = radius * Math.cos(phi);
          points.push(new THREE.Vector3(x, y, z));
        }
      }
      
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      setDotGeometry(geom);
    };
  }, [config.radius]);

  const wireframeGeometry = useMemo(() => {
    return new THREE.SphereGeometry(config.radius * 1.002, 32, 16);
  }, [config.radius]);

  return (
    <group ref={groupRef}>
      {}
      {dotGeometry && (
        <points geometry={dotGeometry}>
          <pointsMaterial
            color="#10b981"
            size={0.015}
            sizeAttenuation
            transparent
            opacity={0.3}
          />
        </points>
      )}

      {}
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#000000" transparent opacity={0.4} />
      </mesh>

      {}
      {config.showWireframe && (
        <mesh geometry={wireframeGeometry}>
          <meshBasicMaterial
            color={config.wireframeColor}
            wireframe
            transparent
            opacity={0.08}
          />
        </mesh>
      )}

      {}
      {markers.map((marker, index) => (
        <Marker
          key={`marker-${index}-${marker.lat}-${marker.lng}`}
          marker={marker}
          radius={config.radius}
          defaultSize={config.markerSize}
          onClick={onMarkerClick}
          onHover={onMarkerHover}
        />
      ))}

      {}
      <LiquidityArcs radius={config.radius} />
    </group>
  );
}


function LiquidityArcs({ radius }: { radius: number }) {
  const corridors = [
    { start: [40.7128, -74.006], end: [19.076, 72.8777] }, 
    { start: [51.5074, -0.1278], end: [19.076, 72.8777] }, 
    { start: [25.2048, 55.2708], end: [19.076, 72.8777] }, 
    { start: [1.3521, 103.8198], end: [19.076, 72.8777] }, 
  ];

  return (
    <group>
      {corridors.map((c, i) => (
        <Arc
          key={i}
          start={c.start as [number, number]}
          end={c.end as [number, number]}
          radius={radius}
        />
      ))}
    </group>
  );
}

function Arc({ start, end, radius }: { start: [number, number], end: [number, number], radius: number }) {
  const points = useMemo(() => {
    const startVec = latLngToVector3(start[0], start[1], radius);
    const endVec = latLngToVector3(end[0], end[1], radius);
    
    
    const cb = new THREE.Vector3();
    const ab = new THREE.Vector3();
    const normal = new THREE.Vector3();
    
    cb.subVectors(new THREE.Vector3(0,0,0), endVec);
    ab.subVectors(startVec, endVec);
    cb.cross(ab);
    normal.copy(cb).normalize();
    
    
    const mid = startVec.clone().lerp(endVec, 0.5);
    mid.normalize().multiplyScalar(radius * 1.5);
    
    const curve = new THREE.QuadraticBezierCurve3(startVec, mid, endVec);
    return curve.getPoints(50);
  }, [start, end, radius]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.MeshBasicMaterial({ color: "#10b981", transparent: true, opacity: 0.3 }))} />
  );
}



interface AtmosphereProps {
  radius: number;
  color: string;
  intensity: number;
  blur: number;
}

function Atmosphere({ radius, color, intensity, blur }: AtmosphereProps) {
  
  
  const fresnelPower = Math.max(0.5, 5 - blur);

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        atmosphereColor: { value: new THREE.Color(color) },
        intensity: { value: intensity },
        fresnelPower: { value: fresnelPower },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 atmosphereColor;
        uniform float intensity;
        uniform float fresnelPower;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, normalize(-vPosition))), fresnelPower);
          gl_FragColor = vec4(atmosphereColor, fresnel * intensity);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
  }, [color, intensity, fresnelPower]);

  return (
    <mesh scale={[1.12, 1.12, 1.12]}>
      <sphereGeometry args={[radius, 64, 32]} />
      <primitive object={atmosphereMaterial} attach="material" />
    </mesh>
  );
}



interface SceneProps {
  markers: GlobeMarker[];
  config: Required<Globe3DConfig>;
  onMarkerClick?: (marker: GlobeMarker) => void;
  onMarkerHover?: (marker: GlobeMarker | null) => void;
}

function Scene({ markers, config, onMarkerClick, onMarkerHover }: SceneProps) {
  const { camera } = useThree();

  
  React.useEffect(() => {
    camera.position.set(0, 0, config.radius * 3.5);
    camera.lookAt(0, 0, 0);
  }, [camera, config.radius]);

  return (
    <>
      {}
      <ambientLight intensity={config.ambientIntensity} />
      <directionalLight
        position={[config.radius * 5, config.radius * 2, config.radius * 5]}
        intensity={config.pointLightIntensity}
        color="#ffffff"
      />
      <directionalLight
        position={[-config.radius * 3, config.radius, -config.radius * 2]}
        intensity={config.pointLightIntensity * 0.3}
        color="#88ccff"
      />

      {}
      <RotatingGlobe
        config={config}
        markers={markers}
        onMarkerClick={onMarkerClick}
        onMarkerHover={onMarkerHover}
      />

      {}
      {config.showAtmosphere && (
        <Atmosphere
          radius={config.radius}
          color={config.atmosphereColor}
          intensity={config.atmosphereIntensity}
          blur={config.atmosphereBlur}
        />
      )}

      {}
      <OrbitControls
        makeDefault
        enablePan={config.enablePan}
        enableZoom={config.enableZoom}
        minDistance={config.minDistance}
        maxDistance={config.maxDistance}
        rotateSpeed={0.4}
        autoRotate={config.autoRotateSpeed > 0}
        autoRotateSpeed={config.autoRotateSpeed}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}



function LoadingFallback() {
  return (
    <Html center>
      <div className="flex shrink-0 flex-col items-center gap-3">
        <span className="inline-block shrink-0 text-sm text-neutral-400">
          Loading globe...
        </span>
      </div>
    </Html>
  );
}



const defaultConfig: Required<Globe3DConfig> = {
  radius: 2,
  globeColor: "#1a1a2e",
  textureUrl: DEFAULT_EARTH_TEXTURE,
  bumpMapUrl: DEFAULT_BUMP_TEXTURE,
  showAtmosphere: false,
  atmosphereColor: "#4da6ff",
  atmosphereIntensity: 0.5,
  atmosphereBlur: 2,
  bumpScale: 1,
  autoRotateSpeed: 0.3,
  enableZoom: false,
  enablePan: false,
  minDistance: 5,
  maxDistance: 15,
  initialRotation: { x: 0, y: 0 },
  markerSize: 0.06,
  showWireframe: false,
  wireframeColor: "#4a9eff",
  ambientIntensity: 0.6,
  pointLightIntensity: 1.5,
  backgroundColor: null,
};

export function Globe3D({
  markers = [],
  config = {},
  className,
  onMarkerClick,
  onMarkerHover,
}: Globe3DProps) {
  const mergedConfig = useMemo(
    () => ({ ...defaultConfig, ...config }),
    [config],
  );

  return (
    <div className={cn("relative h-[500px] w-full", className)}>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          //@ts-ignore
          precision: "lowp"
        }}
        dpr={1} 
        camera={{
          fov: 45,
          near: 0.1,
          far: 1000,
          position: [0, 0, mergedConfig.radius * 3.5],
        }}
        style={{
          background: mergedConfig.backgroundColor || "transparent",
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <Scene
            markers={markers}
            config={mergedConfig}
            onMarkerClick={onMarkerClick}
            onMarkerHover={onMarkerHover}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Globe3D;
