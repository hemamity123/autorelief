import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockChatMessages } from "@/utils/mockData"
import { Send } from "lucide-react"

export default function LiveChat() {
  const [chatMessages, setChatMessages] = useState(mockChatMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="md:col-span-2">
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
                <div className="text-xs text-gray-400">{message.location}</div>
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
    </div>
  )
}

