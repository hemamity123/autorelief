"use client"

import { useState, useEffect } from "react"
import { TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import {
  mockDisasters,
  mockSatelliteData,
  mockAlerts,
  mockRoutes,
  mockResources,
  mockSafeZones,
  mockManualReports,
  mockEmergencyServices,
  mockRealTimeDisasterData,
  mockChatMessages,
  removeManualReport,
} from "@/utils/mockData"

// Import new components
import ImpactAnalyzer from "./ImpactAnalyzer"
import ReliefNavigator from "./ReliefNavigator"
import ManualResponse from "./ManualResponse"
import EmergencyServicesComponent from "./EmergencyServices"
import RealTimeAnalysis from "./RealTimeAnalysis"
import LiveChat from "./LiveChat"

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
})

const ChartComponent = dynamic(() => import("./ChartComponent"), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
})

export default function DashboardContent() {
  const [disasters, setDisasters] = useState(mockDisasters)
  const [satelliteData, setSatelliteData] = useState(mockSatelliteData)
  const [alerts, setAlerts] = useState(mockAlerts)
  const [routes, setRoutes] = useState(mockRoutes)
  const [resources, setResources] = useState(mockResources)
  const [safeZones, setSafeZones] = useState(mockSafeZones)
  const [manualReports, setManualReports] = useState(mockManualReports)
  const [emergencyServices, setEmergencyServices] = useState(mockEmergencyServices)
  const [realTimeDisasterData, setRealTimeDisasterData] = useState(mockRealTimeDisasterData)
  const [chatMessages, setChatMessages] = useState(mockChatMessages)
  const [activeFilter, setActiveFilter] = useState("all")
  const [newMessage, setNewMessage] = useState("")
  const [newReport, setNewReport] = useState({
    type: "",
    severity: "",
    location: "",
    description: "",
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API calls with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setDisasters(mockDisasters)
        setSatelliteData(mockSatelliteData)
        setAlerts(mockAlerts)
        setRoutes(mockRoutes)
        setResources(mockResources)
        setSafeZones(mockSafeZones)
        setManualReports(mockManualReports)
        setEmergencyServices(mockEmergencyServices)
        setRealTimeDisasterData(mockRealTimeDisasterData)
        setChatMessages(mockChatMessages)
      } catch (error) {
        console.error("Error fetching data:", error)
        // You can set an error state here if needed
      }
    }

    fetchData()
  }, [])

  const getMarkerColor = (type) => {
    const colors = {
      earthquake: "#FF6384",
      flood: "#36A2EB",
      hurricane: "#FFCE56",
      wildfire: "#FF9F40",
    }
    return colors[type] || "#4BC0C0"
  }

  const filteredDisasters = activeFilter === "all" ? disasters : disasters.filter((d) => d.type === activeFilter)

  const handleSubmitReport = () => {
    const newReportWithId = {
      ...newReport,
      id: manualReports.length + 1,
      coordinates: [0, 0], // This should be replaced with actual coordinates
    }
    setManualReports([...manualReports, newReportWithId])
    setNewReport({
      type: "",
      severity: "",
      location: "",
      description: "",
    })
  }

  const handleRemoveReport = (id) => {
    removeManualReport(id)
    setManualReports(manualReports.filter((report) => report.id !== id))
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() !== "") {
      const newChatMessage = {
        id: chatMessages.length + 1,
        sender: "You",
        message: newMessage,
        timestamp: new Date().toISOString(),
        location: "Your Location",
      }
      setChatMessages([...chatMessages, newChatMessage])
      setNewMessage("")
    }
  }

  return (
    <>
      <TabsContent value="command_center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-[#1E90FF]">Disaster Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ height: "400px" }}>
                {disasters.length > 0 && (
                  <MapComponent
                    center={[0, 0]}
                    zoom={2}
                    markers={disasters.map((disaster) => ({
                      key: disaster.id,
                      position: disaster.coordinates,
                      popup: `<strong>${disaster.name}</strong><br />Type: ${disaster.type}<br />Severity: ${disaster.severity}%`,
                      options: {
                        radius: 10,
                        fillColor: getMarkerColor(disaster.type),
                        color: getMarkerColor(disaster.type),
                        weight: 1,
                        opacity: 0.8,
                        fillOpacity: 0.6,
                      },
                    }))}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#1E90FF]">Disaster List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4 flex flex-wrap">
                <Button
                  variant={activeFilter === "all" ? "default" : "outline"}
                  onClick={() => setActiveFilter("all")}
                  className="mr-2 mb-2 bg-[#FF5733] text-white hover:bg-[#E54E2E]"
                >
                  All
                </Button>
                {["earthquake", "flood", "hurricane", "wildfire"].map((type) => (
                  <Button
                    key={type}
                    variant={activeFilter === type ? "default" : "outline"}
                    onClick={() => setActiveFilter(type)}
                    className="mr-2 mb-2 bg-[#FF5733] text-white hover:bg-[#E54E2E]"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredDisasters.map((disaster) => (
                  <div key={disaster.id} className="p-2 bg-white rounded shadow">
                    <strong className="text-[#1E90FF]">{disaster.name}</strong>
                    <br />
                    <span className="text-black">Type: {disaster.type}</span>
                    <br />
                    <span className="text-black">Severity: {disaster.severity}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add more cards for satellite data, emergency alerts, etc. */}
        </div>
      </TabsContent>

      <TabsContent value="impact_analyzer">
        <ImpactAnalyzer />
      </TabsContent>

      <TabsContent value="relief_navigator">
        <ReliefNavigator />
      </TabsContent>

      <TabsContent value="manual_response">
        <ManualResponse />
      </TabsContent>

      <TabsContent value="emergency_services">
        <EmergencyServicesComponent />
      </TabsContent>

      <TabsContent value="real_time_analysis">
        <RealTimeAnalysis />
      </TabsContent>

      <TabsContent value="live_chat">
        <LiveChat />
      </TabsContent>
      {/* Add more TabsContent for other tabs */}
    </>
  )
}

