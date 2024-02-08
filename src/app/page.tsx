import styles from "./page.module.css";
import type { Metadata } from "next";
import React, { Suspense } from 'react';
const ClimateInfo = React.lazy(() => import('../components/ClimateInfo/climate_info.client'));

export const metadata: Metadata = {
  title: "CloudVane Home"
};

export default function ClimateInformation() {
  return (
    <main className={styles.main}>
      <div>
        <h2>Climate Information<sup><a href="/about">?</a></sup></h2>
        <hr />
        <ClimateInfo />
      </div>
    </main>
  );
}
