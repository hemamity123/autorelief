import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import dynamic from "next/dynamic"
import { mockEmergencyServices } from "@/utils/mockData"
import {
  Phone,
  Shield,
  Flame,
  Stethoscope,
  Anchor,
  Search,
  Building,
  Truck,
  BirdIcon as Helicopter,
} from "lucide-react"

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
})

const getServiceIcon = (type: string) => {
  switch (type) {
    case "police":
      return <Shield className="h-6 w-6" />
    case "fire":
      return <Flame className="h-6 w-6" />
    case "medical":
      return <Stethoscope className="h-6 w-6" />
    case "coast_guard":
      return <Anchor className="h-6 w-6" />
    case "search_rescue":
      return <Search className="h-6 w-6" />
    case "emergency_management":
      return <Building className="h-6 w-6" />
    case "ambulance":
      return <Truck className="h-6 w-6" />
    case "air_ambulance":
      return <Helicopter className="h-6 w-6" />
    default:
      return <Phone className="h-6 w-6" />
  }
}

export default function EmergencyServices() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Emergency Services Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ height: "400px" }}>
            <MapComponent
              center={[37.7749, -122.4194]}
              zoom={12}
              markers={mockEmergencyServices.map((service) => ({
                key: service.id,
                position: service.location,
                popup: `${service.name}<br>Type: ${service.type}<br>Status: ${service.status}`,
              }))}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Emergency Services List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEmergencyServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.type}</TableCell>
                  <TableCell>{service.status}</TableCell>
                  <TableCell>{service.contact}</TableCell>
                  <TableCell>
                    <Button onClick={() => window.open(`tel:${service.contact}`)}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

