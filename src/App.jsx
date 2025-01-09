import "./App.css";
import DragAndDropCalendar from "./components/Calendar";
import EventCalendar from "./components/EventCalendar";

function App() {
  return (
    <div>
      <h1 className="text-4xl mb-3 font-serif">Event Calendar</h1>
      <EventCalendar />
    </div>
  );
}

export default App;
