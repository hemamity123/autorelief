import type React from "react"
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface HeatmapPoint {
  lat: number
  lng: number
  value: number
}

interface HeatmapComponentProps {
  data: HeatmapPoint[]
  center: [number, number]
  zoom: number
}

const HeatmapComponent: React.FC<HeatmapComponentProps> = ({ data, center, zoom }) => {
  const getColor = (value: number) => {
    const hue = ((1 - value / 100) * 120).toString(10)
    return ["hsl(", hue, ",100%,50%)"].join("")
  }

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((point, index) => (
        <CircleMarker
          key={index}
          center={[point.lat, point.lng]}
          radius={20}
          fillColor={getColor(point.value)}
          fillOpacity={0.7}
          stroke={false}
        >
          <Popup>Value: {point.value}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

export default HeatmapComponent

