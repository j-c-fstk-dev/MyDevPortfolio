"use client";

import { useEffect, useState } from "react";

interface BuildingFacadeProps {
  side: "left" | "right";
  scrollProgress: number;
}

export default function BuildingFacade({
  side,
  scrollProgress
}: BuildingFacadeProps) {
  const [windows, setWindows] = useState<
    Array<{id: number;lit: boolean;floor: number;}>>(
    []);

  useEffect(() => {
    // Generate random windows
    const windowArray = [];
    const floors = 20;
    const windowsPerFloor = 3;

    for (let floor = 0; floor < floors; floor++) {
      for (let window = 0; window < windowsPerFloor; window++) {
        windowArray.push({
          id: floor * windowsPerFloor + window,
          lit: Math.random() > 0.7,
          floor: floor
        });
      }
    }
    setWindows(windowArray);
  }, []);

  // Calculate parallax offset based on scroll
  const parallaxOffset = scrollProgress * 50;

  return (
    <div
      className={`building-facade ${side} fixed top-0 w-24 h-screen bg-gradient-to-b from-matrix-medium-gray to-matrix-dark-gray z-10`}
      style={{
        transform: `translateY(${parallaxOffset}px)`,
        [side]: 0,
        borderLeft:
        side === "right" ? "2px solid rgba(0, 255, 0, 0.3)" : "none",
        borderRight:
        side === "left" ? "2px solid rgba(0, 255, 0, 0.3)" : "none"
      }}
      data-oid="xnfwtzj">

      {/* Building windows */}
      <div className="relative h-full" data-oid="wrjohq-">
        {windows.map((window) =>
        <div
          key={window.id}
          className={`absolute w-4 h-3 border border-matrix-primary-green/30 ${
          window.lit ?
          "bg-matrix-primary-green/20 shadow-neon-green" :
          "bg-matrix-black/50"}`
          }
          style={{
            top: `${window.floor * 5 + 2}%`,
            left: `${window.id % 3 * 6 + 2}px`,
            animation: window.lit ?
            "glow-pulse 3s ease-in-out infinite alternate" :
            "none"
          }}
          data-oid="y6nbig5" />

        )}

        {/* Building details */}
        <div className="absolute top-0 left-0 w-full h-full" data-oid="ypcj7sp">
          {/* Vertical lines */}
          {[...Array(3)].map((_, i) =>
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-matrix-primary-green/20"
            style={{ left: `${(i + 1) * 25}%` }}
            data-oid="yu1l803" />

          )}

          {/* Horizontal floor lines */}
          {[...Array(20)].map((_, i) =>
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-matrix-primary-green/10"
            style={{ top: `${i * 5}%` }}
            data-oid="jwi4.z7" />

          )}
        </div>
      </div>

      {/* Side glow effect */}
      <div
        className={`absolute top-0 w-1 h-full bg-gradient-to-b from-matrix-primary-green/50 to-transparent ${
        side === "left" ? "right-0" : "left-0"}`
        }
        style={{
          boxShadow:
          side === "left" ?
          "2px 0 10px rgba(0, 255, 0, 0.3)" :
          "-2px 0 10px rgba(0, 255, 0, 0.3)"
        }}
        data-oid="ga4n.34" />

    </div>);

}