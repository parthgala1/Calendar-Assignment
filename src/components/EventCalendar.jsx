import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventListModal from "./EventListModal";
import { EVENT_TAGS } from "@/utils/helpers.js";
import EventModal from "./EventModal";

const EventCalendar = ({ updateEvents }) => {
  // State for calendar data
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [showEventsListModal, setShowEventsListModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Event form state
  const [eventForm, setEventForm] = useState({
    title: "",
    startTime: "",
    endTime: "",
    description: "",
    tag: "personal", // Default tag
  });

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("calendarEvents");
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents);
      // Sort events for each date
      const sortedEvents = Object.keys(parsedEvents).reduce((acc, date) => {
        acc[date] = sortEvents(parsedEvents[date]);
        return acc;
      }, {});
      setEvents(sortedEvents);
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  // Sort events helper function
  const sortEvents = (eventsList) => {
    return eventsList.sort((a, b) => {
      // Convert time strings to comparable numbers
      const aTime = a.startTime.replace(":", "");
      const bTime = b.startTime.replace(":", "");
      return aTime - bTime;
    });
  };

  // Get tag style for an event
  const getTagStyle = (tag) => {
    return EVENT_TAGS[tag]?.color || EVENT_TAGS.other.color;
  };

  // Calendar navigation functions
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Get calendar data for current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startPadding = firstDay.getDay();
    const endPadding = 6 - lastDay.getDay();

    // Previous month padding days
    const prevMonthDays = [...Array(startPadding)].map((_, i) => {
      const day = new Date(year, month, -startPadding + i + 1);
      return { date: day, isPadding: true };
    });

    // Current month days
    const currentMonthDays = [...Array(lastDay.getDate())].map((_, i) => ({
      date: new Date(year, month, i + 1),
      isPadding: false,
    }));

    // Next month padding days
    const nextMonthDays = [...Array(endPadding)].map((_, i) => {
      const day = new Date(year, month + 1, i + 1);
      return { date: day, isPadding: true };
    });

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // Event handlers
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowEventsListModal(true);
  };

  const handleAddNewEvent = () => {
    setShowEventsListModal(false);
    setShowEventModal(true);
    setSelectedEvent(null);
    setEventForm({
      title: "",
      startTime: "",
      endTime: "",
      description: "",
      tag: "personal", // Reset to default tag
    });
  };

  const handleEventSubmit = () => {
    if (
      !selectedDate ||
      !eventForm.title ||
      !eventForm.startTime ||
      !eventForm.endTime
    ) {
      return;
    }

    const dateKey = selectedDate.toISOString().split("T")[0];
    const newEvent = {
      ...eventForm,
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    // Check for time conflicts
    const dayEvents = events[dateKey] || [];
    const hasConflict = dayEvents.some((event) => {
      if (selectedEvent && event.id === selectedEvent.id) return false;
      return (
        (eventForm.startTime >= event.startTime &&
          eventForm.startTime < event.endTime) ||
        (eventForm.endTime > event.startTime &&
          eventForm.endTime <= event.endTime)
      );
    });

    if (hasConflict) {
      alert("Event time conflicts with an existing event");
      return;
    }

    setEvents((prev) => {
      const updatedEvents = selectedEvent
        ? [
            ...(prev[dateKey] || []).filter((e) => e.id !== selectedEvent.id),
            newEvent,
          ]
        : [...(prev[dateKey] || []), newEvent];

      return {
        ...prev,
        [dateKey]: sortEvents(updatedEvents),
      };
    });

    updateEvents((prev) => {
      const updatedEvents = selectedEvent
        ? [
            ...(prev[dateKey] || []).filter((e) => e.id !== selectedEvent.id),
            newEvent,
          ]
        : [...(prev[dateKey] || []), newEvent];

      return {
        ...prev,
        [dateKey]: sortEvents(updatedEvents),
      };
    });

    setShowEventModal(false);
    setSelectedEvent(null);
    setEventForm({
      title: "",
      startTime: "",
      endTime: "",
      description: "",
      tag: "personal",
    });
  };

  const handleEventDelete = (event) => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    setEvents((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((e) => e.id !== event.id),
    }));
    setShowEventModal(false);
    setShowEventsListModal(true);
  };

  const handleEventEdit = (event) => {
    setSelectedEvent(event);
    setEventForm({
      title: event.title,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description || "",
      tag: event.tag || "other",
    });
    setShowEventsListModal(false);
    setShowEventModal(true);
  };

  // Filter events based on search term
  const getFilteredEvents = (dateKey) => {
    const dayEvents = events[dateKey] || [];
    if (!searchTerm) return dayEvents; // Already sorted
    const filteredEvents = dayEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredEvents; // Maintains sort order since source array is sorted
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <Button variant="outline" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Input
          type="text"
          placeholder="Search events..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-2 text-center font-semibold bg-gray-100">
            {day}
          </div>
        ))}

        {getCalendarDays().map(({ date, isPadding }, index) => {
          const dateKey = date.toISOString().split("T")[0];
          const dayEvents = getFilteredEvents(dateKey);
          const isToday = new Date().toDateString() === date.toDateString();
          const isSelected =
            selectedDate?.toDateString() === date.toDateString();

          return (
            <div
              key={index}
              onClick={() => !isPadding && handleDateClick(date)}
              className={`p-2 min-h-24 border ${
                isPadding ? "bg-gray-100 text-gray-300" : "bg-white"
              } ${isToday ? "ring-2 ring-blue-500" : ""} ${
                isSelected ? "bg-blue-50" : ""
              } hover:bg-gray-50 cursor-pointer`}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`${date.getDay() === 0 ? "text-red-500" : ""}`}
                >
                  {date.getDate()}
                </span>
                {!isPadding && dayEvents.length > 0 && (
                  <span className="text-xs bg-blue-500 text-white rounded-full px-2">
                    {dayEvents.length}
                  </span>
                )}
              </div>
              {!isPadding &&
                dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className={`text-xs mt-1 p-1 rounded truncate border ${getTagStyle(
                      event.tag
                    )}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDate(date);
                      handleEventEdit(event);
                    }}
                  >
                    {event.title}
                  </div>
                ))}
              {!isPadding && dayEvents.length > 2 && (
                <div className="text-xs text-gray-500 mt-1">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Events List Modal */}
      <EventListModal
        {...{
          showEventsListModal,
          setShowEventsListModal,
          selectedDate,
          getFilteredEvents,
          handleAddNewEvent,
          handleEventEdit,
        }}
      />

      {/* Event Modal */}
      <EventModal
        {...{
          showEventModal,
          setShowEventModal,
          selectedDate,
          selectedEvent,
          eventForm,
          setEventForm,
          handleEventSubmit,
          handleEventDelete,
        }}
      />
    </div>
  );
};

export default EventCalendar;
