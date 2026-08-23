"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";
import ToastProvider from "@/components/admin/Toast";
import { churchName } from "@/lib/i18n";

const navItems = [
  {
    href: "/espace-prive-ad-niamey-2000",
    label: "Tableau de bord",
    icon: <path d="M3 3h8v8H3zM13 3h8v5h-8zM13 12h8v9h-8zM3 15h8v6H3z" />,
  },
  {
    href: "/espace-prive-ad-niamey-2000/sermons",
    label: "Sermons",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M10 9l5 3-5 3V9z" />
      </>
    ),
  },
  {
    href: "/espace-prive-ad-niamey-2000/events",
    label: "Événements",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
  },
  {
    href: "/espace-prive-ad-niamey-2000/announcements",
    label: "Annonces",
    icon: <path d="M3 11l18-5v12L3 13v-2zM11.6 16.8a3 3 0 11-5.8-1.6" />,
  },
  {
    href: "/espace-prive-ad-niamey-2000/gallery",
    label: "Galerie",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </>
    ),
  },
  {
    href: "/espace-prive-ad-niamey-2000/newsletter",
    label: "Newsletter",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 6L2 7" />
      </>
    ),
  },
  {
    href: "/espace-prive-ad-niamey-2000/departments",
    label: "Départements",
    icon: (
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    ),
  },
  {
    href: "/espace-prive-ad-niamey-2000/leaders",
    label: "Équipe & Responsables",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </>
    ),
  },
  {
    href: "/espace-prive-ad-niamey-2000/schedule",
    label: "Horaires",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  },
  {
    href: "/espace-prive-ad-niamey-2000/messages",
    label: "Messages",
    icon: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <path d="M22 7l-10 6L2 7" />
      </>
    ),
  },
  {
    href: "/espace-prive-ad-niamey-2000/donations",
    label: "Dons",
    icon: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
  },
  {
    href: "/espace-prive-ad-niamey-2000/contact",
    label: "Contact",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 6L2 7" />
      </>
    ),
  },
  {
    href: "/espace-prive-ad-niamey-2000/profile",
    label: "Sécurité",
    icon: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </>
    ),
  },
];

function Icon({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/espace-prive-ad-niamey-2000") return pathname === "/espace-prive-ad-niamey-2000";
    return pathname === href || pathname.startsWith(href + "/");
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
    <ToastProvider />
    <div className="flex min-h-screen bg-slate-50">
      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden flex-col border-r border-primary-soft bg-white transition-[width] duration-300 lg:flex ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div
          className={`flex items-center gap-3 border-b border-primary-soft py-5 ${
            collapsed ? "justify-center px-0" : "px-5"
          }`}
        >
          <Image
            src="/adlogo.jpg"
            alt={churchName}
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />
          {!collapsed && (
            <div>
              <p className="font-serif text-sm font-bold text-ink">{churchName}</p>
              <p className="text-xs text-muted">Administration</p>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  collapsed ? "justify-center px-0" : ""
                } ${
                  active
                    ? "bg-primary-dark text-white shadow-md shadow-primary/25"
                    : "text-muted hover:bg-primary-soft hover:text-primary-dark"
                }`}
              >
                <Icon className="shrink-0">{item.icon}</Icon>
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-primary-soft py-4">
          <Link
            href="/fr"
            target="_blank"
            title={collapsed ? "Voir le site" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-primary-soft hover:text-primary-dark ${
              collapsed ? "justify-center px-0" : ""
            }`}
          >
            <Icon className="shrink-0">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
              <circle cx="12" cy="12" r="3" />
            </Icon>
            {!collapsed && "Voir le site"}
          </Link>
          <LogoutButton collapsed={collapsed} />
        </div>

        <button
          type="button"
          aria-label={collapsed ? "Déplier le menu" : "Replier le menu"}
          onClick={() => setCollapsed((v) => !v)}
          className="absolute -right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-primary-soft bg-white text-primary-dark shadow-md transition hover:bg-primary-soft"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {collapsed ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
          </svg>
        </button>
      </aside>

      <div
        className={`flex-1 transition-[padding] duration-300 ${
          collapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <header className="sticky top-0 z-20 border-b border-primary-soft bg-white lg:hidden">
          <div className="flex h-16 items-center justify-between gap-3 px-4">
            <button
              type="button"
              aria-label="Ouvrir le menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-ink transition hover:bg-primary-soft"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <p className="truncate font-serif text-sm font-bold">{churchName}</p>
            <LogoutButton compact />
          </div>
        </header>
        <main className="overflow-x-hidden p-6 lg:p-10">{children}</main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col border-r border-primary-soft bg-white shadow-xl">
            <div className="flex items-center justify-between gap-3 border-b border-primary-soft px-5 py-5">
              <div className="flex items-center gap-3">
                <Image
                  src="/adlogo.jpg"
                  alt={churchName}
                  width={36}
                  height={36}
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="font-serif text-sm font-bold text-ink">{churchName}</p>
                  <p className="text-xs text-muted">Administration</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-ink transition hover:bg-primary-soft"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? "bg-primary-dark text-white shadow-md shadow-primary/25"
                        : "text-muted hover:bg-primary-soft hover:text-primary-dark"
                    }`}
                  >
                    <Icon className="shrink-0">{item.icon}</Icon>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-1 border-t border-primary-soft px-3 py-4">
              <Link
                href="/fr"
                target="_blank"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-primary-soft hover:text-primary-dark"
              >
                <Icon className="shrink-0">
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </Icon>
                Voir le site
              </Link>
              <LogoutButton />
            </div>
          </aside>
        </div>
      )}
    </div>
    </>
  );
}
