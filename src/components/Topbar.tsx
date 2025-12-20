import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Topbar.module.css";

export default function Topbar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.logoNav}>
  <Image src="/images/logo.png" alt="SAAM CABINS" width={160} height={48} className={styles.logo} />
        <nav>
          <ul className={styles.navList}>
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
