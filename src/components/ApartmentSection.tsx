"use client";

import { ReactNode } from "react";

interface ApartmentSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  scrollProgress: number;
  sectionIndex: number;
  className?: string;
}

export default function ApartmentSection({
  title,
  subtitle,
  children,
  scrollProgress,
  sectionIndex,
  className = ""
}: ApartmentSectionProps) {
  // Calculate 3D transform based on scroll progress
  const sectionOffset = sectionIndex * 0.2;
  const transformZ = Math.max(0, (scrollProgress - sectionOffset) * 200);
  const rotateX = Math.min(
    15,
    Math.max(-15, (scrollProgress - sectionOffset) * 30)
  );

  const transform = `
        translateZ(${transformZ}px) 
        rotateX(${rotateX}deg) 
        scale(${1 + (scrollProgress - sectionOffset) * 0.1})
    `;

  return (
    <section
      className={`building-section h-screen w-full relative flex items-center justify-center p-8 ${className}`}
      style={{
        transform: transform,
        transformStyle: "preserve-3d"
      }}
      data-oid="uj0cjn9">

      {/* Apartment Interior Background */}
      <div
        className="apartment-interior absolute inset-8 rounded-lg overflow-hidden"
        data-oid="4-exkkz">

        {/* Interior lighting effects */}
        <div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-matrix-primary-green to-transparent opacity-50"
          data-oid="5zv:dlw" />

        <div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-matrix-primary-green to-transparent opacity-50"
          data-oid="oscjm2f" />

        <div
          className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-matrix-primary-green to-transparent opacity-50"
          data-oid="2fha3_8" />

        <div
          className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-matrix-primary-green to-transparent opacity-50"
          data-oid="tas6esl" />


        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
                            linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
                        `,
            backgroundSize: "20px 20px"
          }}
          data-oid="qyzx:3d" />

      </div>

      {/* Content Container */}
      <div
        className="relative z-10 max-w-6xl w-full h-full flex flex-col"
        data-oid="6iqz870">

        {/* Section Header */}
        <div className="text-center mb-12" data-oid="m-4d8iu">
          <div
            className="inline-block pixel-border bg-matrix-black/50 backdrop-blur-matrix px-6 py-3 rounded-lg mb-4"
            data-oid=".wapibi">

            <h2
              className="text-3xl md:text-4xl font-bold text-glow-green font-mono-matrix"
              data-oid="d6p:6ni">

              {title}
            </h2>
          </div>
          {subtitle &&
          <p
            className="text-lg md:text-xl text-matrix-light-gray font-clean"
            data-oid="x_va5ov">

              {subtitle}
            </p>
          }
        </div>

        {/* Section Content */}
        <div
          className="flex-1 flex items-center justify-center"
          data-oid="lz:-bpf">

          {children}
        </div>

        {/* Floor indicator */}
        <div
          className="absolute top-4 right-4 pixel-border bg-matrix-black/80 px-3 py-1 rounded"
          data-oid="c-mubx8">

          <span
            className="font-mono-matrix text-matrix-primary-green text-sm"
            data-oid="6-538or">

            FLOOR {String(sectionIndex + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Apartment number */}
        <div
          className="absolute top-4 left-4 pixel-border bg-matrix-black/80 px-3 py-1 rounded"
          data-oid="6278d2p">

          <span
            className="font-mono-matrix text-matrix-electric-blue text-sm"
            data-oid="8z0cm92">

            APT {String((sectionIndex + 1) * 100 + 1).padStart(4, "0")}
          </span>
        </div>
      </div>

      {/* Depth indicators */}
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-32 bg-gradient-to-b from-matrix-primary-green/50 to-transparent rounded-r-full"
        data-oid="u0-b-l2" />

      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-32 bg-gradient-to-b from-matrix-primary-green/50 to-transparent rounded-l-full"
        data-oid="o14u6_r" />

    </section>);

}