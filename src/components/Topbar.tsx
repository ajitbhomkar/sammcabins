import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Topbar.module.css";

export default function Topbar() {
  const [settings, setSettings] = useState<{ logo?: string; siteName?: string } | null>(null);

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.siteSettings) {
          setSettings(data.siteSettings);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className={styles.topbar} style={{ marginBottom: 0 }}>
      <div className={styles.logoNav} style={{ marginBottom: 0 }}>
        {settings?.logo ? (
          <Image src={settings.logo} alt={settings.siteName || "SAAM CABINS"} width={160} height={48} className={styles.logo} priority />
        ) : (
          <Image src="/images/logo.png" alt="SAAM CABINS" width={160} height={48} className={styles.logo} priority />
        )}
        <nav>
          <ul className={styles.navList} style={{ marginBottom: 0 }}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/cabins">Cabins</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li>
              <Link href="/contact">
                <span className={styles.contactBtn}>Contact</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
