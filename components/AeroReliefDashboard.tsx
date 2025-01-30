"use client"

import dynamic from "next/dynamic"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ErrorBoundary } from "react-error-boundary"
import { Suspense } from "react"

// Dynamically import components that use browser APIs
const DashboardContent = dynamic(() => import("./DashboardContent"), {
  ssr: false,
  loading: () => <div>Loading Dashboard Content...</div>,
})

const LiveWorldClock = dynamic(() => import("./LiveWorldClock"), {
  ssr: false,
  loading: () => <div>Loading World Clock...</div>,
})

const CleanupHeatmaps = dynamic(() => import("./CleanupHeatmaps"), {
  ssr: false,
  loading: () => <div>Loading Cleanup Heatmaps...</div>,
})

const NotificationsAndSubscriptions = dynamic(() => import("./NotificationsAndSubscriptions"), {
  ssr: false,
  loading: () => <div>Loading Notifications & Subscriptions...</div>,
})

export default function AeroReliefDashboard() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please try refreshing the page.</div>}>
      <div className="container mx-auto p-4 bg-gray-100">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-[#1E90FF]">AeroRelief®</h1>
          <p className="text-xl text-gray-600">"Accelerating Disaster Response Through Space Technology"</p>
          <p className="text-sm text-gray-500 mt-2">Powered by Odoo</p>
        </header>

        <Tabs defaultValue="command_center">
          <TabsList className="mb-4 flex flex-wrap justify-center">
            <TabsTrigger value="command_center">Command Center</TabsTrigger>
            <TabsTrigger value="impact_analyzer">Impact Analyzer</TabsTrigger>
            <TabsTrigger value="relief_navigator">Relief Navigator</TabsTrigger>
            <TabsTrigger value="manual_response">Manual Response</TabsTrigger>
            <TabsTrigger value="emergency_services">Emergency Services</TabsTrigger>
            <TabsTrigger value="real_time_analysis">Real-Time Analysis</TabsTrigger>
            <TabsTrigger value="live_chat">Live Chat</TabsTrigger>
            <TabsTrigger value="world_clock">World Clock</TabsTrigger>
            <TabsTrigger value="cleanup_heatmaps">Cleanup Heatmaps</TabsTrigger>
            <TabsTrigger value="notifications_subscriptions">Notifications & Subscriptions</TabsTrigger>
          </TabsList>

          <ErrorBoundary fallback={<div>Error loading Dashboard Content</div>}>
            <Suspense fallback={<div>Loading Dashboard Content...</div>}>
              <DashboardContent />
            </Suspense>
          </ErrorBoundary>

          <TabsContent value="world_clock">
            <ErrorBoundary fallback={<div>Error loading World Clock</div>}>
              <Suspense fallback={<div>Loading World Clock...</div>}>
                <LiveWorldClock />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="cleanup_heatmaps">
            <ErrorBoundary fallback={<div>Error loading Cleanup Heatmaps</div>}>
              <Suspense fallback={<div>Loading Cleanup Heatmaps...</div>}>
                <CleanupHeatmaps />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>

          <TabsContent value="notifications_subscriptions">
            <ErrorBoundary fallback={<div>Error loading Notifications & Subscriptions</div>}>
              <Suspense fallback={<div>Loading Notifications & Subscriptions...</div>}>
                <NotificationsAndSubscriptions />
              </Suspense>
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  )
}

