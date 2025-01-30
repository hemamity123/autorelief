"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, Mail, Phone, AlertTriangle, Info } from "lucide-react"
import { mockNotifications, mockSubscriptionPreferences } from "@/utils/mockData"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsAndSubscriptions() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [preferences, setPreferences] = useState(mockSubscriptionPreferences)
  const [notificationFilter, setNotificationFilter] = useState("all")

  const handleSubscribe = () => {
    console.log("Subscribed with:", { email, phone, preferences })
    // Here you would typically send this data to your backend
  }

  const handlePreferenceChange = (id: string) => {
    setPreferences(preferences.map((pref) => (pref.id === id ? { ...pref, subscribed: !pref.subscribed } : pref)))
  }

  const filteredNotifications =
    notificationFilter === "all"
      ? mockNotifications
      : mockNotifications.filter((notification) => notification.type === notificationFilter)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="mr-2 text-red-500" />
      case "update":
        return <Info className="mr-2 text-blue-500" />
      default:
        return <Bell className="mr-2 text-gray-500" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="mb-4">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setNotificationFilter("all")}>
                All
              </TabsTrigger>
              <TabsTrigger value="alerts" onClick={() => setNotificationFilter("alert")}>
                Alerts
              </TabsTrigger>
              <TabsTrigger value="updates" onClick={() => setNotificationFilter("update")}>
                Updates
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <ScrollArea className="h-[400px]">
            {filteredNotifications.map((notification) => (
              <div key={notification.id} className="mb-4 p-3 bg-white rounded-lg shadow">
                <div className="flex items-center mb-2">
                  {getNotificationIcon(notification.type)}
                  <h3 className="font-semibold">{notification.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Subscription Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Notification Preferences</h3>
              {preferences.map((pref) => (
                <div key={pref.id} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={pref.id}
                    checked={pref.subscribed}
                    onCheckedChange={() => handlePreferenceChange(pref.id)}
                  />
                  <label
                    htmlFor={pref.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {pref.label}
                  </label>
                </div>
              ))}
            </div>
            <Button onClick={handleSubscribe} className="w-full bg-[#1E90FF] hover:bg-[#1E90FF]/90">
              Update Subscription
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

