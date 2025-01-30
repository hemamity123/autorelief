import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ChartComponent from "./ChartComponent"
import { mockDisasters } from "@/utils/mockData"

export default function ImpactAnalyzer() {
  const disasterCounts = mockDisasters.reduce((acc, disaster) => {
    acc[disaster.type] = (acc[disaster.type] || 0) + 1
    return acc
  }, {})

  const disasterCountData = Object.entries(disasterCounts).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
  }))

  const severityData = Object.entries(disasterCounts).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: mockDisasters.filter((d) => d.type === type).reduce((acc, curr) => acc + curr.severity, 0) / count,
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Disaster Count by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartComponent
            type="bar"
            data={disasterCountData}
            config={{
              xAxis: "name",
              yAxis: "value",
              colors: ["#1E90FF"],
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Average Severity by Disaster Type</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartComponent
            type="pie"
            data={severityData}
            config={{
              colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

