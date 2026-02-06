"use client";

import { useState } from "react";
import ImageLightbox from "./ImageLightbox";

export default function ProgramGallery({ gallery }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!gallery || gallery.length === 0) return null;

  const openLightbox = (index) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <>
      <div className="bg-gray-50 px-8 md:px-12 lg:px-16 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <span className="w-10 h-1 bg-primary rounded-full"></span>
          Program Gallery
        </h3>
        <div
          className={`grid gap-6 ${
            gallery.length === 1
              ? "md:grid-cols-1 max-w-md mx-auto"
              : gallery.length === 2
                ? "md:grid-cols-2 max-w-2xl mx-auto"
                : "md:grid-cols-3"
          }`}
        >
          {gallery.map((item, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative overflow-hidden rounded-xl shadow-lg aspect-[4/3] cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/50 transition-all duration-300"
              aria-label={`View ${item.caption || `image ${index + 1}`} in lightbox`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Zoom Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 p-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <svg
                    className="w-6 h-6 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
              </div>

              {/* Caption on hover */}
              {item.caption && (
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-semibold text-sm">
                    {item.caption}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={gallery}
        initialIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </>
  );
}
