"use client";
import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 19.076,
    lng: 72.8777,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "Mumbai Node",
  },
  {
    lat: 28.6139,
    lng: 77.209,
    src: "https://assets.aceternity.com/avatars/6.webp",
    label: "New Delhi",
  },
  {
    lat: 40.7128,
    lng: -74.006,
    src: "https://assets.aceternity.com/avatars/1.webp",
    label: "New York Hub",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    src: "https://assets.aceternity.com/avatars/2.webp",
    label: "London",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    src: "https://assets.aceternity.com/avatars/3.webp",
    label: "Tokyo",
  },
  {
    lat: 25.2048,
    lng: 55.2708,
    src: "https://assets.aceternity.com/avatars/10.webp",
    label: "Dubai",
  },
  {
    lat: 1.3521,
    lng: 103.8198,
    src: "https://assets.aceternity.com/avatars/12.webp",
    label: "Singapore",
  },
];

export function Globe3DDemo() {
  return (
    <div className="w-full h-full min-h-[500px] md:min-h-[600px] flex items-center justify-center">
      <Globe3D
        markers={sampleMarkers}
        config={{
          radius: 2,
          showAtmosphere: false,
          showWireframe: false,
          bumpScale: 5,
          autoRotateSpeed: 0.5, 
          enableZoom: false,
          enablePan: false,
          markerSize: 1.0,
          ambientIntensity: 1.2,
          pointLightIntensity: 3.5,
          backgroundColor: null,
        }}
        onMarkerClick={(marker) => {
          
        }}
      />
    </div>
  );
}
