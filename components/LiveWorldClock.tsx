"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

const timeZones = [
  { name: "New York", zone: "America/New_York" },
  { name: "London", zone: "Europe/London" },
  { name: "Tokyo", zone: "Asia/Tokyo" },
  { name: "Sydney", zone: "Australia/Sydney" },
  { name: "Dubai", zone: "Asia/Dubai" },
  { name: "Moscow", zone: "Europe/Moscow" },
  { name: "India", zone: "Asia/Kolkata" },
]

export default function LiveWorldClock() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatTime = (date: Date, timeZone: string) => {
    return date.toLocaleTimeString("en-US", {
      timeZone,
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {timeZones.map((tz) => (
        <Card key={tz.zone}>
          <CardHeader>
            <CardTitle className="text-[#1E90FF] flex items-center">
              <Clock className="mr-2" />
              {tz.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatTime(currentTime, tz.zone)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

