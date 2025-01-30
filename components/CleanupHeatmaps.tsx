"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import { mockCleanupHeatmaps } from "@/utils/mockData"

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 flex items-center justify-center">Loading map...</div>,
})

export default function CleanupHeatmaps() {
  const [selectedDisaster, setSelectedDisaster] = useState(mockCleanupHeatmaps[0].id)
  const [showHeatmap, setShowHeatmap] = useState(false)

  const handleDisasterChange = (value: string) => {
    setSelectedDisaster(value)
    setShowHeatmap(false)
  }

  const handleGenerateHeatmap = () => {
    setShowHeatmap(true)
  }

  const selectedHeatmapData = mockCleanupHeatmaps.find((heatmap) => heatmap.id === selectedDisaster)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Cleanup Heatmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: "400px" }}>
            <MapComponent
              center={selectedHeatmapData?.center || [0, 0]}
              zoom={10}
              markers={
                showHeatmap && selectedHeatmapData
                  ? selectedHeatmapData.heatmapPoints.map((point, index) => ({
                      key: index,
                      position: point.coordinates,
                      popup: `Cleanup Intensity: ${point.intensity}%\nLocation: ${point.location}`,
                      options: {
                        radius: 5,
                        fillColor: point.intensity > 75 ? "red" : point.intensity > 50 ? "orange" : "yellow",
                        color: "transparent",
                        fillOpacity: 0.7,
                      },
                    }))
                  : []
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Cleanup Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="disaster-select" className="block text-sm font-medium text-gray-700 mb-1">
                Select Disaster
              </label>
              <Select onValueChange={handleDisasterChange} value={selectedDisaster}>
                <SelectTrigger id="disaster-select">
                  <SelectValue placeholder="Select a disaster" />
                </SelectTrigger>
                <SelectContent>
                  {mockCleanupHeatmaps.map((heatmap) => (
                    <SelectItem key={heatmap.id} value={heatmap.id}>
                      {heatmap.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleGenerateHeatmap} className="w-full bg-[#1E90FF] hover:bg-[#1E90FF]/90">
              Generate Heatmap
            </Button>
            {showHeatmap && selectedHeatmapData && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Cleanup Summary</h3>
                <p>
                  <strong>Total Area:</strong> {selectedHeatmapData.totalArea} sq km
                </p>
                <p>
                  <strong>Cleanup Progress:</strong> {selectedHeatmapData.cleanupProgress}%
                </p>
                <p>
                  <strong>Estimated Completion:</strong> {selectedHeatmapData.estimatedCompletion}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

