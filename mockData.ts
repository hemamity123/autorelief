export const mockDisasters = [
  { id: 1, name: "Earthquake in California", type: "earthquake", severity: 85, coordinates: [36.7783, -119.4179] },
  { id: 2, name: "Earthquake in Japan", type: "earthquake", severity: 90, coordinates: [36.2048, 138.2529] },
  { id: 3, name: "Earthquake in Chile", type: "earthquake", severity: 80, coordinates: [-33.4489, -70.6693] },
  { id: 4, name: "Floods in Bangladesh", type: "flood", severity: 75, coordinates: [23.685, 90.3563] },
  { id: 5, name: "Floods in Germany", type: "flood", severity: 70, coordinates: [51.1657, 10.4515] },
  { id: 6, name: "Floods in Brazil", type: "flood", severity: 65, coordinates: [-14.235, -51.9253] },
  { id: 7, name: "Floods in India", type: "flood", severity: 80, coordinates: [20.5937, 78.9629] },
  { id: 8, name: "Floods in Thailand", type: "flood", severity: 72, coordinates: [15.87, 100.9925] },
  { id: 9, name: "Cyclone in Madagascar", type: "cyclone", severity: 88, coordinates: [-18.7669, 46.8691] },
  { id: 10, name: "Cyclone in Australia", type: "cyclone", severity: 85, coordinates: [-25.2744, 133.7751] },
  { id: 11, name: "Drought in California", type: "drought", severity: 60, coordinates: [36.7783, -119.4179] },
  { id: 12, name: "Drought in Ethiopia", type: "drought", severity: 75, coordinates: [9.145, 40.4897] },
  { id: 13, name: "Drought in Australia", type: "drought", severity: 70, coordinates: [-25.2744, 133.7751] },
  { id: 14, name: "Drought in Spain", type: "drought", severity: 65, coordinates: [40.4637, -3.7492] },
  { id: 15, name: "Drought in South Africa", type: "drought", severity: 68, coordinates: [-30.5595, 22.9375] },
  { id: 16, name: "Drought in Argentina", type: "drought", severity: 62, coordinates: [-38.4161, -63.6167] },
]

export const mockSatelliteData = [
  {
    id: 1,
    name: "Gujarat Seismic Activity",
    captureTime: "2023-07-15 10:30:00",
    imageUrl: "/placeholder.svg?height=100&width=100",
    disasterType: "earthquake",
  },
  {
    id: 2,
    name: "Kerala Flood Extent",
    captureTime: "2023-07-14 15:45:00",
    imageUrl: "/placeholder.svg?height=100&width=100",
    disasterType: "flood",
  },
  {
    id: 3,
    name: "Odisha Coastline Cyclone Tracking",
    captureTime: "2023-07-13 08:20:00",
    imageUrl: "/placeholder.svg?height=100&width=100",
    disasterType: "cyclone",
  },
  {
    id: 4,
    name: "California Wildfire Spread",
    captureTime: "2023-07-16 14:10:00",
    imageUrl: "/placeholder.svg?height=100&width=100",
    disasterType: "wildfire",
  },
  {
    id: 5,
    name: "Ethiopia Drought Conditions",
    captureTime: "2023-07-12 11:55:00",
    imageUrl: "/placeholder.svg?height=100&width=100",
    disasterType: "drought",
  },
  {
    id: 6,
    name: "Japan Tsunami Wave Height",
    captureTime: "2023-07-17 09:30:00",
    imageUrl: "/placeholder.svg?height=100&width=100",
    disasterType: "tsunami",
  },
  {
    id: 7,
    name: "Iceland Volcanic Eruption",
    captureTime: "2023-07-18 16:20:00",
    imageUrl: "/placeholder.svg?height=100&width=100",
    disasterType: "volcanic eruption",
  },
]

export const mockAlerts = [
  { id: 1, name: "Earthquake Warning", level: "critical", description: "6.5 magnitude earthquake detected" },
  { id: 2, name: "Flood Alert", level: "high", description: "River levels rising rapidly" },
  { id: 3, name: "Cyclone Update", level: "medium", description: "Cyclone expected to make landfall in 24 hours" },
]

export const mockRoutes = [
  {
    id: 1,
    name: "Route to California",
    start: [37.7749, -122.4194],
    end: [36.7783, -119.4179],
    waypoints: [
      [37.3382, -121.8863],
      [36.9741, -119.7725],
    ],
    distance: 280,
    estimatedTime: 4.5,
  },
  {
    id: 2,
    name: "Route to Bangladesh",
    start: [23.8103, 90.4125],
    end: [23.685, 90.3563],
    waypoints: [
      [23.7104, 90.4074],
      [23.7461, 90.3742],
    ],
    distance: 150,
    estimatedTime: 3,
  },
  {
    id: 3,
    name: "Route to Madagascar",
    start: [-18.8792, 47.5079],
    end: [-18.7669, 46.8691],
    waypoints: [
      [-19.0, 47.0],
      [-18.9, 47.2],
    ],
    distance: 200,
    estimatedTime: 3.5,
  },
]

export const mockResources = [
  { id: 1, name: "Emergency Response Team A", type: "personnel", quantity: 20, location: [36.7783, -119.4179] },
  { id: 2, name: "Medical Supplies for Bangladesh", type: "supplies", quantity: 1000, location: [23.685, 90.3563] },
  { id: 3, name: "Rescue Vehicles for Madagascar", type: "vehicles", quantity: 5, location: [-18.7669, 46.8691] },
  { id: 4, name: "Water Purification Units", type: "equipment", quantity: 10, location: [51.1657, 10.4515] },
  { id: 5, name: "Emergency Food Supplies", type: "supplies", quantity: 5000, location: [20.5937, 78.9629] },
]

export const mockSafeZones = [
  { id: 1, name: "California Safe Zone", coordinates: [38.5816, -121.4944] },
  { id: 2, name: "Bangladesh Safe Zone", coordinates: [23.8103, 90.4125] },
  { id: 3, name: "Madagascar Safe Zone", coordinates: [-18.8792, 47.5079] },
  { id: 4, name: "Japan Safe Zone", coordinates: [35.6762, 139.6503] },
  { id: 5, name: "Germany Safe Zone", coordinates: [52.52, 13.405] },
]

export const mockManualReports = [
  {
    id: 1,
    type: "Earthquake",
    severity: "High",
    location: "San Francisco",
    coordinates: [37.7749, -122.4194],
    description: "Buildings collapsed in downtown area",
  },
  {
    id: 2,
    type: "Flood",
    severity: "Medium",
    location: "Dhaka",
    coordinates: [23.8103, 90.4125],
    description: "Streets flooded in low-lying areas",
  },
  {
    id: 3,
    type: "Cyclone",
    severity: "Critical",
    location: "Antananarivo",
    coordinates: [-18.8792, 47.5079],
    description: "Severe wind damage to infrastructure",
  },
]

export const removeManualReport = (id: number) => {
  const index = mockManualReports.findIndex((report) => report.id === id)
  if (index !== -1) {
    mockManualReports.splice(index, 1)
  }
}

export const mockEmergencyServices = [
  {
    id: 1,
    name: "Central Police Station",
    type: "police",
    location: [37.7749, -122.4194],
    contact: "+1 (555) 123-4567",
    status: "Available",
  },
  {
    id: 2,
    name: "City Fire Department",
    type: "fire",
    location: [37.7833, -122.4167],
    contact: "+1 (555) 987-6543",
    status: "Responding",
  },
  {
    id: 3,
    name: "General Hospital",
    type: "medical",
    location: [37.7855, -122.4064],
    contact: "+1 (555) 789-0123",
    status: "Available",
  },
  {
    id: 4,
    name: "Coast Guard Station",
    type: "coast_guard",
    location: [37.8083, -122.4098],
    contact: "+1 (555) 456-7890",
    status: "On Standby",
  },
  {
    id: 5,
    name: "Search and Rescue Team",
    type: "search_rescue",
    location: [37.7694, -122.4862],
    contact: "+1 (555) 234-5678",
    status: "Available",
  },
  {
    id: 6,
    name: "Emergency Management Office",
    type: "emergency_management",
    location: [37.779, -122.419],
    contact: "+1 (555) 876-5432",
    status: "Active",
  },
  {
    id: 7,
    name: "Disaster Relief NGO",
    type: "ngo",
    location: [37.7749, -122.4194],
    contact: "+1 (555) 345-6789",
    status: "Mobilizing",
  },
]

export const mockRealTimeDisasterData = [
  {
    id: 1,
    type: "earthquake",
    location: "San Francisco, CA",
    coordinates: [37.7749, -122.4194],
    magnitude: 5.8,
    timestamp: new Date().toISOString(),
    affectedArea: 50,
    populationAffected: 100000,
  },
  {
    id: 2,
    type: "flood",
    location: "New Orleans, LA",
    coordinates: [29.9511, -90.0715],
    waterLevel: "15 feet",
    timestamp: new Date().toISOString(),
    affectedArea: 75,
    populationAffected: 150000,
  },
  {
    id: 3,
    type: "wildfire",
    location: "Los Angeles, CA",
    coordinates: [34.0522, -118.2437],
    size: "5000 acres",
    timestamp: new Date().toISOString(),
    affectedArea: 30,
    populationAffected: 50000,
  },
]

export const mockChatMessages = [
  {
    id: 1,
    sender: "John Doe",
    message: "We need immediate assistance in downtown San Francisco. Buildings are damaged.",
    timestamp: new Date().toISOString(),
    location: "San Francisco, CA",
  },
  {
    id: 2,
    sender: "Emergency Responder",
    message: "Understood. Rescue teams are being dispatched to your location. Please stay in a safe place.",
    timestamp: new Date().toISOString(),
    location: "San Francisco, CA",
  },
  {
    id: 3,
    sender: "Jane Smith",
    message: "Flooding is getting worse in the 9th Ward. We need boats for evacuation.",
    timestamp: new Date().toISOString(),
    location: "New Orleans, LA",
  },
  {
    id: 4,
    sender: "Coast Guard",
    message: "Rescue boats are en route to the 9th Ward. Please gather essential items and be ready for evacuation.",
    timestamp: new Date().toISOString(),
    location: "New Orleans, LA",
  },
]

