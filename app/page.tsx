import dynamic from "next/dynamic"
import { Suspense } from "react"

const AeroReliefDashboard = dynamic(() => import("../components/AeroReliefDashboard"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <AeroReliefDashboard />
      </Suspense>
    </main>
  )
}

