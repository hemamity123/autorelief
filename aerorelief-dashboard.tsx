import React, { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts"
import {
  AlertCircle,
  MapPin,
  Satellite,
  Truck,
  Users,
  AlertTriangle,
  Trash2,
  Phone,
  Shield,
  Flame,
  Stethoscope,
  Anchor,
  Search,
  Building,
  UsersIcon,
  Send,
  Clock,
} from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
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
} from "./mockData"
import { LiveWorldClock } from "./components/LiveWorldClock"

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
})

const getMarkerColor = (type) => {
  const colors = {
    earthquake: "#FF6384",
    flood: "#36A2EB",
    cyclone: "#FFCE56",
    drought: "#4BC0C0",
    personnel: "#FF9F40",
    supplies: "#9966FF",
    vehicles: "#FF99CC",
    equipment: "#C9CBCF",
    wildfire: "#FFA500",
  }
  return colors[type] || "#4BC0C0"
}

const getSeverityColor = (severity) => {
  const colors = {
    Low: "#4BC0C0",
    Medium: "#FFCE56",
    High: "#FF9F40",
    Critical: "#FF6384",
  }
  return colors[severity] || "#4BC0C0"
}

const getEmergencyServiceIcon = (type: string) => {
  const iconMap = {
    police: "🛡️",
    fire: "🔥",
    medical: "🏥",
    coast_guard: "⚓",
    search_rescue: "🔍",
    emergency_management: "🏢",
    ngo: "👥",
  }
  return iconMap[type] || "⚠️"
}

export default function AeroReliefDashboard() {
  const [activeFilter, setActiveFilter] = useState("all")
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
  const [newMessage, setNewMessage] = useState("")
  const [selectedDisaster, setSelectedDisaster] = useState(null)
  const [newReport, setNewReport] = useState({
    type: "",
    severity: "",
    location: "",
    description: "",
  })

  useEffect(() => {
    // Simulate fetching data from an API
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
  }, [])

  const filteredDisasters = activeFilter === "all" ? disasters : disasters.filter((d) => d.type === activeFilter)

  const disasterCounts = disasters.reduce((acc, disaster) => {
    acc[disaster.type] = (acc[disaster.type] || 0) + 1
    return acc
  }, {})

  const disasterCountData = Object.entries(disasterCounts).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
  }))

  const severityData = Object.entries(disasterCounts).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: disasters.filter((d) => d.type === type).reduce((acc, curr) => acc + curr.severity, 0),
  }))

  const COLORS = ["#1E90FF", "#FF5733", "#228B22", "#FF8042", "#8884D8", "#82CA9D"]

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

  const handleRemoveReport = (id: number) => {
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
        </TabsList>

        <TabsContent value="command_center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Disaster Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ height: "400px" }}>
                  <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {disasters.map((disaster) => (
                      <CircleMarker
                        key={disaster.id}
                        center={disaster.coordinates}
                        radius={10}
                        fillColor={getMarkerColor(disaster.type)}
                        color={getMarkerColor(disaster.type)}
                        weight={1}
                        opacity={0.8}
                        fillOpacity={0.6}
                      >
                        <Popup>
                          <strong>{disaster.name}</strong>
                          <br />
                          Type: {disaster.type}
                          <br />
                          Severity: {disaster.severity}%
                        </Popup>
                      </CircleMarker>
                    ))}
                    {safeZones.map((zone) => (
                      <Marker key={zone.id} position={zone.coordinates}>
                        <Popup>
                          <strong>{zone.name}</strong>
                          <br />
                          Safe Zone
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
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
                  {Object.keys(disasterCounts).map((type) => (
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
                      <br />
                      <span className="text-black">Coordinates: {disaster.coordinates.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Satellite Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {satelliteData.map((data) => (
                    <div key={data.id} className="p-2 bg-white rounded shadow flex items-center">
                      <Satellite className="mr-2 text-[#228B22]" />
                      <div>
                        <strong>{data.name}</strong>
                        <br />
                        <span className="text-sm text-gray-600">Type: {data.disasterType}</span>
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
                <CardTitle className="text-[#1E90FF]">Emergency Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {alerts.map((alert) => (
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
                      <AlertCircle className="mr-2 text-[#FF5733]" />
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
                <CardTitle className="text-[#1E90FF]">Disaster Count by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={disasterCountData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#1E90FF" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Severity by Disaster Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={severityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {severityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="relief_navigator">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Route Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ height: "400px" }}>
                  <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {routes.map((route) => (
                      <React.Fragment key={route.id}>
                        <Polyline
                          positions={[route.start, ...route.waypoints, route.end]}
                          color="#228B22"
                          weight={3}
                          opacity={0.7}
                        />
                        <Marker position={route.start}>
                          <Popup>Start: {route.name}</Popup>
                        </Marker>
                        <Marker position={route.end}>
                          <Popup>End: {route.name}</Popup>
                        </Marker>
                        {route.waypoints.map((waypoint, index) => (
                          <Marker key={index} position={waypoint}>
                            <Popup>
                              Waypoint {index + 1}: {route.name}
                            </Popup>
                          </Marker>
                        ))}
                      </React.Fragment>
                    ))}
                    {disasters.map((disaster) => (
                      <CircleMarker
                        key={disaster.id}
                        center={disaster.coordinates}
                        radius={8}
                        fillColor={getMarkerColor(disaster.type)}
                        color={getMarkerColor(disaster.type)}
                        weight={1}
                        opacity={0.8}
                        fillOpacity={0.6}
                      >
                        <Popup>
                          <strong>{disaster.name}</strong>
                          <br />
                          Type: {disaster.type}
                          <br />
                          Severity: {disaster.severity}%
                        </Popup>
                      </CircleMarker>
                    ))}
                    {safeZones.map((zone) => (
                      <Marker
                        key={zone.id}
                        position={zone.coordinates}
                        icon={
                          new L.Icon({
                            iconUrl:
                              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
                            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41],
                          })
                        }
                      >
                        <Popup>
                          <strong>{zone.name}</strong>
                          <br />
                          Safe Zone
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
                <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                  {routes.map((route) => (
                    <div key={route.id} className="p-2 bg-white rounded shadow">
                      <strong className="text-[#1E90FF]">{route.name}</strong>
                      <br />
                      <span className="text-black">Distance: {route.distance} km</span>
                      <br />
                      <span className="text-black">Estimated Time: {route.estimatedTime} hours</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Resource Deployment</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ height: "400px" }}>
                  <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {resources.map((resource) => (
                      <Marker key={resource.id} position={resource.location}>
                        <Popup>
                          <strong>{resource.name}</strong>
                          <br />
                          Type: {resource.type}
                          <br />
                          Quantity: {resource.quantity}
                        </Popup>
                      </Marker>
                    ))}
                    {disasters.map((disaster) => (
                      <CircleMarker
                        key={disaster.id}
                        center={disaster.coordinates}
                        radius={8}
                        fillColor={getMarkerColor(disaster.type)}
                        color={getMarkerColor(disaster.type)}
                        weight={1}
                        opacity={0.8}
                        fillOpacity={0.6}
                      >
                        <Popup>
                          <strong>{disaster.name}</strong>
                          <br />
                          Type: {disaster.type}
                          <br />
                          Severity: {disaster.severity}%
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>
                <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                  {resources.map((resource) => (
                    <div key={resource.id} className="p-2 bg-white rounded shadow flex items-center">
                      {resource.type === "personnel" && <Users className="mr-2 text-[#FF9F40]" />}
                      {resource.type === "supplies" && <Truck className="mr-2 text-[#9966FF]" />}
                      {resource.type === "vehicles" && <Truck className="mr-2 text-[#FF99CC]" />}
                      {resource.type === "equipment" && <Truck className="mr-2 text-[#C9CBCF]" />}
                      <div>
                        <strong className="text-[#1E90FF]">{resource.name}</strong>
                        <br />
                        <span className="text-black">Type: {resource.type}</span>
                        <br />
                        <span className="text-black">Quantity: {resource.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="manual_response">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Manual Disaster Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {manualReports.map((report) => (
                    <div key={report.id} className="p-2 bg-white rounded shadow flex justify-between items-center">
                      <div>
                        <strong className="text-[#1E90FF]">
                          {report.type} in {report.location}
                        </strong>
                        <br />
                        <span className="text-black">Severity: {report.severity}</span>
                        <br />
                        <span className="text-black">Description: {report.description}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveReport(report.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Submit New Report</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSubmitReport()
                  }}
                  className="space-y-4"
                >
                  <Select value={newReport.type} onValueChange={(value) => setNewReport({ ...newReport, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select disaster type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Earthquake">Earthquake</SelectItem>
                      <SelectItem value="Flood">Flood</SelectItem>
                      <SelectItem value="Cyclone">Cyclone</SelectItem>
                      <SelectItem value="Drought">Drought</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={newReport.severity}
                    onValueChange={(value) => setNewReport({ ...newReport, severity: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    placeholder="Location"
                    value={newReport.location}
                    onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                  />

                  <Textarea
                    placeholder="Description"
                    value={newReport.description}
                    onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                  />

                  <Button type="submit" className="bg-[#1E90FF] text-white hover:bg-[#1E90FF]/90">
                    Submit Report
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="emergency_services">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Emergency Services Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ height: "400px" }}>
                  <MapContainer center={[37.7749, -122.4194]} zoom={12} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {emergencyServices.map((service) => (
                      <Marker
                        key={service.id}
                        position={service.location}
                        icon={
                          new L.DivIcon({
                            className: "custom-div-icon",
                            html: `<div style="background-color: white; border-radius: 50%; padding: 5px; font-size: 20px;">
                                   ${getEmergencyServiceIcon(service.type)}
                                 </div>`,
                            iconSize: [30, 30],
                            iconAnchor: [15, 15],
                          })
                        }
                      >
                        <Popup>
                          <strong>{service.name}</strong>
                          <br />
                          Type: {service.type}
                          <br />
                          Status: {service.status}
                          <br />
                          Contact: {service.contact}
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>

            {emergencyServices.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <CardTitle className="text-[#1E90FF] flex items-center">
                    <span className="mr-2 text-2xl">{getEmergencyServiceIcon(service.type)}</span>
                    <span>{service.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Type:</strong> {service.type}
                  </p>
                  <p>
                    <strong>Status:</strong> {service.status}
                  </p>
                  <p>
                    <strong>Contact:</strong> {service.contact}
                  </p>
                  <Button className="mt-2" onClick={() => window.open(`tel:${service.contact}`)}>
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="real_time_analysis">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Real-Time Disaster Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ height: "400px" }}>
                  <MapContainer center={[37.7749, -122.4194]} zoom={4} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {realTimeDisasterData.map((disaster) => (
                      <CircleMarker
                        key={disaster.id}
                        center={disaster.coordinates}
                        radius={10}
                        fillColor={getMarkerColor(disaster.type)}
                        color={getMarkerColor(disaster.type)}
                        weight={1}
                        opacity={0.8}
                        fillOpacity={0.6}
                      >
                        <Popup>
                          <strong>
                            {disaster.type} in {disaster.location}
                          </strong>
                          <br />
                          {disaster.type === "earthquake" && `Magnitude: ${disaster.magnitude}`}
                          {disaster.type === "flood" && `Water Level: ${disaster.waterLevel}`}
                          {disaster.type === "wildfire" && `Size: ${disaster.size}`}
                          <br />
                          Affected Area: {disaster.affectedArea} sq km
                          <br />
                          Population Affected: {disaster.populationAffected}
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Disaster Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={realTimeDisasterData}>
                    <XAxis dataKey="type" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="affectedArea" fill="#8884d8" name="Affected Area (sq km)" />
                    <Bar yAxisId="right" dataKey="populationAffected" fill="#82ca9d" name="Population Affected" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Disaster Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={realTimeDisasterData}>
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="affectedArea" stroke="#8884d8" name="Affected Area (sq km)" />
                    <Line type="monotone" dataKey="populationAffected" stroke="#82ca9d" name="Population Affected" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="live_chat">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full pr-4">
                  {chatMessages.map((message) => (
                    <div key={message.id} className="mb-4">
                      <div className="font-bold">{message.sender}</div>
                      <div className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</div>
                      <div className="mt-1 p-2 bg-white rounded-lg shadow">{message.message}</div>
                    </div>
                  ))}
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="mt-4 flex">
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-grow mr-2"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1E90FF]">Affected Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div style={{ height: "400px" }}>
                  <MapContainer center={[37.7749, -122.4194]} zoom={4} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {realTimeDisasterData.map((disaster) => (
                      <CircleMarker
                        key={disaster.id}
                        center={disaster.coordinates}
                        radius={10}
                        fillColor={getMarkerColor(disaster.type)}
                        color={getMarkerColor(disaster.type)}
                        weight={1}
                        opacity={0.8}
                        fillOpacity={0.6}
                      >
                        <Popup>
                          <strong>
                            {disaster.type} in {disaster.location}
                          </strong>
                          <br />
                          Affected Area: {disaster.affectedArea} sq km
                          <br />
                          Population Affected: {disaster.populationAffected}
                        </Popup>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="world_clock">
          <LiveWorldClock />
        </TabsContent>
      </Tabs>
    </div>
  )
}

