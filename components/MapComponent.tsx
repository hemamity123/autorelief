"use client"

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
})

interface MarkerData {
  key: number | string
  position: [number, number]
  popup?: string
  options?: L.CircleMarkerOptions
}

interface MapComponentProps {
  center: [number, number]
  zoom: number
  markers: MarkerData[]
}

export default function MapComponent({ center, zoom, markers }: MapComponentProps) {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker) =>
        marker.options ? (
          <CircleMarker key={marker.key} center={marker.position} {...marker.options}>
            {marker.popup && <Popup>{marker.popup}</Popup>}
          </CircleMarker>
        ) : (
          <Marker key={marker.key} position={marker.position}>
            {marker.popup && <Popup>{marker.popup}</Popup>}
          </Marker>
        ),
      )}
    </MapContainer>
  )
}

