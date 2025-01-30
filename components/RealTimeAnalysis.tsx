import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"
import { mockRealTimeDisasterData } from "@/utils/mockData"
import ChartComponent from "./ChartComponent"
import HeatmapComponent from "./HeatmapComponent"

// const HeatmapComponent = dynamic(() => import("./HeatmapComponent"), {
//   ssr: false,
//   loading: () => <p>Loading heatmap...</p>,
// })

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
})

export default function RealTimeAnalysis() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Real-Time Disaster Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: "400px" }}>
            <MapComponent
              center={[37.7749, -122.4194]}
              zoom={4}
              markers={mockRealTimeDisasterData.map((disaster) => ({
                key: disaster.id,
                position: disaster.coordinates,
                popup: `${disaster.type} in ${disaster.location}<br>Magnitude: ${disaster.magnitude}<br>Affected Area: ${disaster.affectedArea} sq km<br>Population Affected: ${disaster.populationAffected}`,
              }))}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Impact Heatmaps</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="affected_area">
            <TabsList>
              <TabsTrigger value="affected_area">Affected Area</TabsTrigger>
              <TabsTrigger value="population_affected">Population Affected</TabsTrigger>
              <TabsTrigger value="infrastructure_damage">Infrastructure Damage</TabsTrigger>
            </TabsList>
            <TabsContent value="affected_area">
              <HeatmapComponent
                data={mockRealTimeDisasterData.map((disaster) => ({
                  lat: disaster.coordinates[0],
                  lng: disaster.coordinates[1],
                  value: disaster.affectedArea,
                }))}
                center={[37.7749, -122.4194]}
                zoom={4}
              />
            </TabsContent>
            <TabsContent value="population_affected">
              <HeatmapComponent
                data={mockRealTimeDisasterData.map((disaster) => ({
                  lat: disaster.coordinates[0],
                  lng: disaster.coordinates[1],
                  value: disaster.populationAffected,
                }))}
                center={[37.7749, -122.4194]}
                zoom={4}
              />
            </TabsContent>
            <TabsContent value="infrastructure_damage">
              <HeatmapComponent
                data={mockRealTimeDisasterData.map((disaster) => ({
                  lat: disaster.coordinates[0],
                  lng: disaster.coordinates[1],
                  value: disaster.infrastructureDamage || Math.random() * 100, // Placeholder for missing data
                }))}
                center={[37.7749, -122.4194]}
                zoom={4}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Disaster Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartComponent
            type="bar"
            data={mockRealTimeDisasterData.map((disaster) => ({
              name: disaster.type,
              affectedArea: disaster.affectedArea,
              populationAffected: disaster.populationAffected,
            }))}
            config={{
              xAxis: "name",
              yAxis: ["affectedArea", "populationAffected"],
              colors: ["#36A2EB", "#FF6384"],
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Disaster Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartComponent
            type="line"
            data={mockRealTimeDisasterData.map((disaster) => ({
              name: new Date(disaster.timestamp).toLocaleString(),
              magnitude: disaster.magnitude,
            }))}
            config={{
              xAxis: "name",
              yAxis: "magnitude",
              colors: ["#FFCE56"],
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Life Loss Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartComponent
            type="bar"
            data={mockRealTimeDisasterData.map((disaster) => ({
              name: disaster.type,
              casualties: disaster.casualties || Math.floor(Math.random() * 1000), // Placeholder for missing data
            }))}
            config={{
              xAxis: "name",
              yAxis: "casualties",
              colors: ["#FF6384"],
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

