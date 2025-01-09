import React, { useState } from "react";

const DragAndDropCalendar = () => {
  const [events, setEvents] = useState({
    "2025-01-09": ["Meeting at 10 AM"],
    "2025-01-10": ["Workout at 6 PM"],
  });

  const [draggedEvent, setDraggedEvent] = useState(null);

  const handleDragStart = (event, day, eventText) => {
    setDraggedEvent({ day, eventText });
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Allow drop by preventing default behavior
  };

  const handleDrop = (event, targetDay) => {
    event.preventDefault();

    if (draggedEvent) {
      const { day: sourceDay, eventText } = draggedEvent;

      // Move event from sourceDay to targetDay
      const updatedEvents = { ...events };
      updatedEvents[sourceDay] = updatedEvents[sourceDay].filter(
        (e) => e !== eventText
      );
      if (!updatedEvents[targetDay]) {
        updatedEvents[targetDay] = [];
      }
      updatedEvents[targetDay].push(eventText);

      setEvents(updatedEvents);
      setDraggedEvent(null);
    }
  };

  return (
    <div className="calendar">
      {Object.keys(events).map((day) => (
        <div
          key={day}
          className="day"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, day)}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            margin: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h4>{day}</h4>
          <ul>
            {events[day].map((eventText, index) => (
              <li
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, day, eventText)}
                style={{
                  margin: "5px 0",
                  padding: "5px",
                  backgroundColor: "#ddd",
                  cursor: "grab",
                }}
              >
                {eventText}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DragAndDropCalendar;
