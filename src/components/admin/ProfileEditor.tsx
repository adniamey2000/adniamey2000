"use client";

import Image from "next/image";
import { useState } from "react";
import ImageUploadInput from "./ImageUploadInput";
import { showToast } from "./Toast";

export default function ProfileEditor({
  user,
}: {
  user: { id: number; name: string; email: string; imageUrl: string };
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [imageUrl, setImageUrl] = useState(user.imageUrl);
  const [saving, setSaving] = useState(false);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [changingPw, setChangingPw] = useState(false);

  async function handleProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, imageUrl }),
      });
      if (res.ok) {
        showToast("Profil mis à jour avec succès");
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(data.error ?? "Erreur lors de la mise à jour", "error");
      }
    } catch {
      showToast("Erreur réseau", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPw !== confirmPw) {
      showToast("Les mots de passe ne correspondent pas", "error");
      return;
    }
    if (newPw.length < 6) {
      showToast("Le mot de passe doit faire au moins 6 caractères", "error");
      return;
    }
    setChangingPw(true);
    try {
      const res = await fetch("/api/admin/profile/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      if (res.ok) {
        showToast("Mot de passe modifié avec succès");
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(data.error ?? "Erreur lors du changement de mot de passe", "error");
      }
    } catch {
      showToast("Erreur réseau", "error");
    } finally {
      setChangingPw(false);
    }
  }

  return (
    <div className="space-y-10">
      {/* Photo + infos */}
      <form onSubmit={handleProfile} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-lg font-bold text-ink">Informations personnelles</h2>

        <div className="mt-6 flex items-center gap-5">
          {imageUrl ? (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-primary-soft">
              <Image src={imageUrl} alt="Photo de profil" fill sizes="80px" className="object-cover" />
            </div>
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-soft font-serif text-2xl font-bold text-primary-dark">
              {name.charAt(0).toUpperCase() || "A"}
            </div>
          )}
          <div className="flex-1">
            <ImageUploadInput
              value={imageUrl}
              onChange={setImageUrl}
              label="Photo de profil"
              hint="Image carrée de préférence (JPG, PNG)"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary disabled:opacity-60"
        >
          {saving ? "Enregistrement…" : "Enregistrer"}
        </button>
      </form>

      {/* Mot de passe */}
      <form onSubmit={handlePassword} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-lg font-bold text-ink">Changer le mot de passe</h2>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Mot de passe actuel</label>
            <input
              type="password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Nouveau mot de passe</label>
            <input
              type="password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-primary-dark focus:ring-2 focus:ring-primary-dark/30"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={changingPw}
          className="mt-6 rounded-full bg-primary-dark px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary disabled:opacity-60"
        >
          {changingPw ? "Changement…" : "Changer le mot de passe"}
        </button>
      </form>
    </div>
  );
}
