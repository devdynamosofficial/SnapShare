import React from 'react'
import styles from './loading.module.css';

export default function Loading({text}) {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[rgba(0, 0, 255, 0.5)]">
      <div className="w-fit px-4 py-8 bg-[#001B00] text-white rounded-md flex justify-center items-center gap-x-4">
        <div className={styles['loader']}></div> {text}
      </div>
    </div>
  );
}
