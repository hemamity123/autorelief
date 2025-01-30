import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, PieChart } from "@/components/ui/chart"
import { AlertCircle, MapPin, Satellite } from "lucide-react"

const mockDisasters = [
  { id: 1, name: "Earthquake in Gujarat", type: "earthquake", severity: 85 },
  { id: 2, name: "Floods in Kerala", type: "flood", severity: 70 },
  { id: 3, name: "Cyclone in Odisha", type: "hurricane", severity: 90 },
  { id: 4, name: "Wildfire in Uttarakhand", type: "wildfire", severity: 60 },
]

const mockSatelliteData = [
  { id: 1, name: "Gujarat Seismic Activity", captureTime: "2023-07-15 10:30:00" },
  { id: 2, name: "Kerala Flood Extent", captureTime: "2023-07-14 15:45:00" },
  { id: 3, name: "Odisha Coastline", captureTime: "2023-07-13 08:20:00" },
]

const mockAlerts = [
  { id: 1, name: "Earthquake Warning", level: "critical", description: "6.5 magnitude earthquake detected" },
  { id: 2, name: "Flood Alert", level: "high", description: "River levels rising rapidly" },
  { id: 3, name: "Cyclone Update", level: "medium", description: "Cyclone expected to make landfall in 24 hours" },
]

export default function AeroReliefDashboard() {
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredDisasters =
    activeFilter === "all" ? mockDisasters : mockDisasters.filter((d) => d.type === activeFilter)

  const disasterCounts = {
    earthquake: mockDisasters.filter((d) => d.type === "earthquake").length,
    flood: mockDisasters.filter((d) => d.type === "flood").length,
    hurricane: mockDisasters.filter((d) => d.type === "hurricane").length,
    wildfire: mockDisasters.filter((d) => d.type === "wildfire").length,
  }

  const severityData = Object.entries(disasterCounts).map(([type, count]) => ({
    name: type,
    total: mockDisasters.filter((d) => d.type === type).reduce((acc, curr) => acc + curr.severity, 0),
  }))

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">AeroRelief® Command Center</h1>

      <Tabs defaultValue="command_center">
        <TabsList className="mb-4">
          <TabsTrigger value="command_center">Command Center</TabsTrigger>
          <TabsTrigger value="impact_analyzer">Impact Analyzer</TabsTrigger>
          <TabsTrigger value="relief_navigator">Relief Navigator</TabsTrigger>
        </TabsList>

        <TabsContent value="command_center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Disaster Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <MapPin size={48} />
                  <span className="ml-2">Map Placeholder</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disaster List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <Button
                    variant={activeFilter === "all" ? "default" : "outline"}
                    onClick={() => setActiveFilter("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={activeFilter === "earthquake" ? "default" : "outline"}
                    onClick={() => setActiveFilter("earthquake")}
                  >
                    Earthquake
                  </Button>
                  <Button
                    variant={activeFilter === "flood" ? "default" : "outline"}
                    onClick={() => setActiveFilter("flood")}
                  >
                    Flood
                  </Button>
                  <Button
                    variant={activeFilter === "hurricane" ? "default" : "outline"}
                    onClick={() => setActiveFilter("hurricane")}
                  >
                    Hurricane
                  </Button>
                  <Button
                    variant={activeFilter === "wildfire" ? "default" : "outline"}
                    onClick={() => setActiveFilter("wildfire")}
                  >
                    Wildfire
                  </Button>
                </div>
                <div className="space-y-2">
                  {filteredDisasters.map((disaster) => (
                    <div key={disaster.id} className="p-2 bg-muted rounded">
                      <strong>{disaster.name}</strong>
                      <br />
                      Type: {disaster.type}
                      <br />
                      Severity: {disaster.severity}%
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Satellite Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockSatelliteData.map((data) => (
                    <div key={data.id} className="p-2 bg-muted rounded flex items-center">
                      <Satellite className="mr-2" />
                      <div>
                        <strong>{data.name}</strong>
                        <br />
                        Capture Time: {data.captureTime}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-2 rounded flex items-center ${
                        alert.level === "critical"
                          ? "bg-red-100"
                          : alert.level === "high"
                            ? "bg-orange-100"
                            : "bg-yellow-100"
                      }`}
                    >
                      <AlertCircle className="mr-2" />
                      <div>
                        <strong>{alert.name}</strong>
                        <br />
                        Level: {alert.level}
                        <br />
                        {alert.description}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact_analyzer">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Disaster Count by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: "Earthquake", total: disasterCounts.earthquake },
                    { name: "Flood", total: disasterCounts.flood },
                    { name: "Hurricane", total: disasterCounts.hurricane },
                    { name: "Wildfire", total: disasterCounts.wildfire },
                  ]}
                  index="name"
                  categories={["total"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value} disasters`}
                  yAxisWidth={48}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Severity by Disaster Type</CardTitle>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={severityData}
                  index="name"
                  categories={["total"]}
                  colors={["red", "blue", "yellow", "green"]}
                  valueFormatter={(value) => `${value}% severity`}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="relief_navigator">
          <Card>
            <CardHeader>
              <CardTitle>Relief Navigator</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Relief Navigator features coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

