import React, { useState } from "react";
import "./App.css";
import EventCalendar from "./components/EventCalendar";
import ExportList from "./components/ExportList";

function App() {
  const [events, setEvents] = useState([]);
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-3 font-serif">Event Calendar</h1>
      <EventCalendar updateEvents={setEvents} />
      <ExportList events={events} />
    </div>
  );
}

export default App;
