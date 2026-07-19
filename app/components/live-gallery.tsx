"use client";

import { useEffect, useState } from "react";

type Photo = { url: string; pathname: string };

export default function LiveGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    fetch("/api/gallery", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setPhotos(data.photos ?? []))
      .catch(() => setPhotos([]));
  }, []);

  if (!photos.length) return null;

  return (
    <section className="lookbook section" id="lookbook">
      <div className="lookbook-heading">
        <div><p className="eyebrow"><span /> Fresh from the chair</p><h2>The client <em>lookbook.</em></h2></div>
        <p>Uploaded by Rooted In Soul. Real crowns, real texture, real confidence.</p>
      </div>
      <div className="lookbook-grid">
        {photos.map((photo, index) => (
          <figure className={`lookbook-photo lookbook-photo-${(index % 6) + 1}`} key={photo.pathname}>
            {/* Blob URLs are intentionally rendered as managed public gallery media. */}
            <img src={photo.url} alt={`Rooted In Soul client hairstyle ${index + 1}`} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}
