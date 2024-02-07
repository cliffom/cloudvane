import styles from "./page.module.css";
import React, { Suspense } from 'react';
const ClimateInfo = React.lazy(() => import('../components/ClimateInfo/climate_info.client'));


export default function Home() {
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

