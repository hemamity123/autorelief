import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockManualReports, removeManualReport } from "@/utils/mockData"
import { Trash2 } from "lucide-react"

export default function ManualResponse() {
  const [manualReports, setManualReports] = useState(mockManualReports)
  const [newReport, setNewReport] = useState({
    type: "",
    severity: "",
    location: "",
    description: "",
    casualties: "",
    infrastructureDamage: "",
    resourcesNeeded: "",
  })

  const handleSubmitReport = () => {
    const newReportWithId = {
      ...newReport,
      id: manualReports.length + 1,
      timestamp: new Date().toISOString(),
      coordinates: [0, 0], // This should be replaced with actual coordinates
    }
    setManualReports([...manualReports, newReportWithId])
    setNewReport({
      type: "",
      severity: "",
      location: "",
      description: "",
      casualties: "",
      infrastructureDamage: "",
      resourcesNeeded: "",
    })
  }

  const handleRemoveReport = (id: number) => {
    removeManualReport(id)
    setManualReports(manualReports.filter((report) => report.id !== id))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#1E90FF]">Manual Disaster Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Casualties</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {manualReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.location}</TableCell>
                  <TableCell>{report.severity}</TableCell>
                  <TableCell>{report.casualties}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveReport(report.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
                <SelectItem value="Hurricane">Hurricane</SelectItem>
                <SelectItem value="Wildfire">Wildfire</SelectItem>
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

            <Input
              placeholder="Estimated Casualties"
              value={newReport.casualties}
              onChange={(e) => setNewReport({ ...newReport, casualties: e.target.value })}
            />

            <Textarea
              placeholder="Infrastructure Damage"
              value={newReport.infrastructureDamage}
              onChange={(e) => setNewReport({ ...newReport, infrastructureDamage: e.target.value })}
            />

            <Textarea
              placeholder="Resources Needed"
              value={newReport.resourcesNeeded}
              onChange={(e) => setNewReport({ ...newReport, resourcesNeeded: e.target.value })}
            />

            <Button type="submit" className="w-full bg-[#1E90FF] text-white hover:bg-[#1E90FF]/90">
              Submit Report
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

