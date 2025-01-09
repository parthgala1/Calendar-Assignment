import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { EVENT_TAGS } from "@/utils/helpers.js";

const EventListModal = ({
  showEventsListModal,
  setShowEventsListModal,
  selectedDate,
  getFilteredEvents,
  handleAddNewEvent,
  handleEventEdit,
}) => {
  const getTagStyle = (tag) => {
    return EVENT_TAGS[tag]?.color || EVENT_TAGS.other.color;
  };
  return (
    <Dialog open={showEventsListModal} onOpenChange={setShowEventsListModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Events for{" "}
            {selectedDate?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">
              {getFilteredEvents(selectedDate?.toISOString().split("T")[0])
                .length || "No "}{" "}
              {getFilteredEvents(selectedDate?.toISOString().split("T")[0])
                .length === 1
                ? "Event"
                : "Events"}
            </h3>
          </div>
          <div className="space-y-2">
            {getFilteredEvents(selectedDate?.toISOString().split("T")[0]).map(
              (event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg flex justify-between items-center border ${getTagStyle(
                    event.tag
                  )}`}
                >
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm opacity-75">
                      {event.startTime} - {event.endTime}
                    </p>
                    <span className="text-xs font-medium mt-1 inline-block">
                      {EVENT_TAGS[event.tag].label}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEventEdit(event)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddNewEvent}>
            <Plus className="h-4 w-4 mr-2" /> Add Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventListModal;
