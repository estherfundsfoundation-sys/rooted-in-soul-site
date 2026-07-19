"use client";

import { upload } from "@vercel/blob/client";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/site-content";

const emptyContent: SiteContent = { announcement: "", squareBookingUrl: "", bookingRules: [], services: [] };

export default function StudioClient({ signedIn }: { signedIn: boolean }) {
  const [ready, setReady] = useState(signedIn);
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [content, setContent] = useState<SiteContent>(emptyContent);
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    if (!ready) return;
    fetch("/api/site-content", { cache: "no-store" }).then((response) => response.json()).then((data) => { setContent(data); setContentLoaded(true); });
  }, [ready]);

  async function signIn(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("");
    const response = await fetch("/api/studio/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
    const data = await response.json(); setBusy(false);
    if (!response.ok) return setMessage(data.error ?? "Sign-in failed.");
    setReady(true); setPassword("");
  }

  async function uploadPhotos(event: React.FormEvent) {
    event.preventDefault();
    if (!files.length) return setMessage("Choose at least one photo.");
    setBusy(true); setMessage(`Uploading ${files.length} photo${files.length === 1 ? "" : "s"}…`);
    try {
      for (const file of files) await upload(`rooted-gallery/${file.name}`, file, { access: "public", handleUploadUrl: "/api/gallery/upload", multipart: true });
      setFiles([]); setMessage("Your photos are live in the lookbook.");
      const input = document.getElementById("studio-files") as HTMLInputElement | null; if (input) input.value = "";
    } catch (error) { setMessage(error instanceof Error ? error.message : "The upload did not finish."); }
    finally { setBusy(false); }
  }

  async function saveContent(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setMessage("Saving website updates…");
    const response = await fetch("/api/site-content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    const data = await response.json(); setBusy(false);
    if (!response.ok) return setMessage(data.error ?? "The updates did not save.");
    setContent(data.content); setMessage("Website updated. Your changes are live.");
  }

  function updateService(index: number, field: "title" | "description" | "price", value: string) {
    setContent((current) => ({ ...current, services: current.services.map((service, serviceIndex) => serviceIndex === index ? { ...service, [field]: value } : service) }));
  }

  if (!ready) return (
    <form className="studio-card" onSubmit={signIn}>
      <span className="studio-kicker">PRIVATE HAIRSTYLIST ACCESS</span><h1>Enter the studio.</h1><p>Use the Rooted In Soul stylist password to manage photos, services, prices, policies, and booking.</p>
      <label htmlFor="studio-password">Stylist password</label><input id="studio-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
      <button disabled={busy}>{busy ? "Opening…" : "Open stylist studio"}</button>{message && <p className="studio-message">{message}</p>}
    </form>
  );

  return (
    <div className="studio-dashboard">
      <div className="studio-welcome"><span className="studio-kicker">ROOTED IN SOUL STYLIST STUDIO</span><h1>Your website,<br /><em>in your hands.</em></h1><p>Update the lookbook, menu, pricing, policies, and booking link from any phone or computer.</p></div>

      <form className="studio-card studio-panel" onSubmit={uploadPhotos}>
        <span className="studio-kicker">01 / CLIENT LOOKBOOK</span><h2>Publish hair photos.</h2><p>Choose finished hair photos from your phone. They appear automatically on the public website.</p>
        <label className="studio-drop" htmlFor="studio-files"><strong>Choose hair photos</strong><span>JPG, PNG, WEBP, HEIC · multiple photos welcome</span></label>
        <input id="studio-files" className="studio-file-input" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" multiple onChange={(event) => setFiles(Array.from(event.target.files ?? []))} />
        {files.length > 0 && <p className="studio-selection">{files.length} photo{files.length === 1 ? "" : "s"} selected</p>}
        <button disabled={busy}>{busy ? "Uploading…" : "Publish to lookbook"}</button>
      </form>

      {contentLoaded && <form className="studio-card studio-panel studio-content-panel" onSubmit={saveContent}>
        <span className="studio-kicker">02 / WEBSITE DETAILS</span><h2>Update booking &amp; services.</h2>
        <label htmlFor="announcement">Client announcement</label><textarea id="announcement" value={content.announcement} onChange={(event) => setContent({ ...content, announcement: event.target.value })} placeholder="Example: August books are now open!" />
        <label htmlFor="square-url">Square booking link</label><input id="square-url" type="url" value={content.squareBookingUrl} onChange={(event) => setContent({ ...content, squareBookingUrl: event.target.value })} placeholder="https://squareup.com/appointments/..." />

        <div className="studio-subhead"><span>Services &amp; pricing</span><button type="button" onClick={() => setContent({ ...content, services: [...content.services, { title: "New service", description: "", price: "" }] })}>+ Add service</button></div>
        <div className="studio-services">{content.services.map((service, index) => <div className="studio-service" key={`${index}-${service.title}`}><input aria-label={`Service ${index + 1} name`} value={service.title} onChange={(event) => updateService(index, "title", event.target.value)} placeholder="Service name" /><input aria-label={`Service ${index + 1} price`} value={service.price} onChange={(event) => updateService(index, "price", event.target.value)} placeholder="Price or starting price" /><textarea aria-label={`Service ${index + 1} description`} value={service.description} onChange={(event) => updateService(index, "description", event.target.value)} placeholder="Short service description" /><button type="button" className="studio-remove" onClick={() => setContent({ ...content, services: content.services.filter((_, serviceIndex) => serviceIndex !== index) })}>Remove</button></div>)}</div>

        <div className="studio-subhead"><span>Booking rules</span><button type="button" onClick={() => setContent({ ...content, bookingRules: [...content.bookingRules, ""] })}>+ Add rule</button></div>
        <div className="studio-rules">{content.bookingRules.map((rule, index) => <div key={index}><textarea aria-label={`Booking rule ${index + 1}`} value={rule} onChange={(event) => setContent({ ...content, bookingRules: content.bookingRules.map((item, ruleIndex) => ruleIndex === index ? event.target.value : item) })} placeholder="Booking, deposit, lateness, or cancellation rule" /><button type="button" className="studio-remove" onClick={() => setContent({ ...content, bookingRules: content.bookingRules.filter((_, ruleIndex) => ruleIndex !== index) })}>Remove</button></div>)}</div>
        <button disabled={busy}>{busy ? "Saving…" : "Publish website updates"}</button>
      </form>}

      {message && <p className="studio-global-message">{message}</p>}
      <a className="studio-site-link studio-view-site" href="/">View public website ↗</a>
    </div>
  );
}
