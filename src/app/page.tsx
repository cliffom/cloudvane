import styles from "./page.module.css";
import React, { Suspense } from 'react';
const ClimateInfo = React.lazy(() => import('../components/climate_info.client'));


export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <ClimateInfo />
        </Suspense>
      </div>
    </main>
  );
}
