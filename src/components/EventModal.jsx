import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Trash2 } from "lucide-react";
import { EVENT_TAGS } from "@/utils/helpers.js";

const EventModal = ({
  showEventModal,
  setShowEventModal,
  selectedDate,
  selectedEvent,
  eventForm,
  setEventForm,
  handleEventSubmit,
  handleEventDelete,
}) => {
  const getTagStyle = (tag) => {
    return EVENT_TAGS[tag]?.color || EVENT_TAGS.other.color;
  };
  return (
    <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {selectedEvent ? "Edit Event" : "New Event"} -{" "}
            {selectedDate?.toLocaleDateString()}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={eventForm.title}
              onChange={(e) =>
                setEventForm((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={eventForm.startTime}
                onChange={(e) =>
                  setEventForm((prev) => ({
                    ...prev,
                    startTime: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={eventForm.endTime}
                onChange={(e) =>
                  setEventForm((prev) => ({
                    ...prev,
                    endTime: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="tag">Event Type</Label>
            <Select
              value={eventForm.tag}
              onValueChange={(value) =>
                setEventForm((prev) => ({ ...prev, tag: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(EVENT_TAGS).map(([value, { label, color }]) => (
                  <SelectItem
                    className={`hover:${color} rounded-lg`}
                    key={value}
                    value={value}
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={eventForm.description}
              onChange={(e) =>
                setEventForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleEventSubmit}>
              <Calendar />
              {selectedEvent ? "Update Event" : "Add Event"}
            </Button>
            {selectedEvent && (
              <Button
                variant="destructive"
                onClick={() => handleEventDelete(selectedEvent)}
              >
                <Trash2 />
                Delete Event
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
