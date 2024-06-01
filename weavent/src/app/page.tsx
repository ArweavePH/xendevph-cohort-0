"use client"

import dynamic from "next/dynamic";

const HomeComponent = dynamic(() => import("@/components/Home"), {
  ssr: false,
});

export default function Home() {
  return <HomeComponent />;
}
