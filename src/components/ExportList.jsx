import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const ExportList = ({ events }) => {
  const [format, setFormat] = useState("");

  // Convert events to CSV format
  const convertToCSV = (data) => {
    const keys = Object.keys(data[0]);
    const csvRows = [keys.join(",")]; // Header row

    data.forEach((event) => {
      const values = keys.map((key) => `"${event[key]}"`);
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  // Handle the file export
  const handleExport = (selectedFormat) => {
    const data = Object.values(events).flat(); // Flatten events by date
    let fileContent, fileName;

    if (selectedFormat === "csv") {
      fileContent = convertToCSV(data);
      fileName = "events.csv";
    } else if (selectedFormat === "json") {
      fileContent = JSON.stringify(data, null, 2);
      fileName = "events.json";
    }

    // Create a blob and trigger download
    const blob = new Blob([fileContent], {
      type: selectedFormat === "csv" ? "text/csv" : "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex justify-center max-w-4xl items-center space-x-4">
      <Select value={format} onValueChange={setFormat}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="csv">CSV</SelectItem>
          <SelectItem value="json">JSON</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() => {
          if (format) {
            handleExport(format);
          } else {
            alert("Please select a file format!");
          }
        }}
      >
        Export All Events
      </Button>
    </div>
  );
};

export default ExportList;
