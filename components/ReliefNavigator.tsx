import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import dynamic from "next/dynamic"
import { mockRoutes, mockResources } from "@/utils/mockData"

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
})

export default function ReliefNavigator() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Relief Routes and Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: "400px" }}>
            <MapComponent
              center={[20, 0]}
              zoom={2}
              markers={[
                ...mockRoutes.flatMap((route) => [
                  {
                    key: `route-start-${route.id}`,
                    position: route.start,
                    popup: `Start: ${route.name}`,
                  },
                  {
                    key: `route-end-${route.id}`,
                    position: route.end,
                    popup: `End: ${route.name}`,
                  },
                ]),
                ...mockResources.map((resource) => ({
                  key: `resource-${resource.id}`,
                  position: resource.location,
                  popup: `${resource.name}: ${resource.quantity} ${resource.type}`,
                })),
              ]}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Relief Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Distance (km)</TableHead>
                <TableHead>Est. Time (hours)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRoutes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell>{route.name}</TableCell>
                  <TableCell>{route.distance}</TableCell>
                  <TableCell>{route.estimatedTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Relief Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>{resource.name}</TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell>{resource.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

