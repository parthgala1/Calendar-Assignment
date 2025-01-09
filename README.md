# Calendar App

## 📋 Summary of Features

- **Interactive Calendar**: Displays a grid view of a calendar with days and dates.
- **Event Management**:
  - Add, edit, and delete events.
  - Display event counts and details for each day.
  - Highlight events by category using customizable tags (e.g., personal, work).
- **Highlighting**:
  - Highlights today’s date with a blue ring.
  - Highlights the selected date with a light grey background.
  - Marks Sundays in red for easy identification.
- **Responsive UI**: Designed with **shadcn** and Tailwind CSS for an adaptive and visually appealing interface.
- **Persistent Storage**: Stores events in `localStorage` to retain data even after refreshing the page.
- **Search Functionality**: Quickly find events based on keywords, tags or description.
- **Event Summarization**: Displays up to two events directly on the calendar and a "+x more" indicator for additional events.
- **Event List**: Displays the list of events happening at that particular date.
- **Export Events**: Events can be exported using a CSV or JSON file.

---

## Instructions to Run the App Locally

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

### Steps

1. **Clone the Repository**:
   ```
   git clone https://github.com/parthgala1/Calendar-Assignment.git
   cd Calendar-Assignment
   ```
2. **Install the dependencies**:

```
npm install
```

3. **Start the development server**:

```
npm start
# or
npm run dev
```

## Deployment

The App is deplyed using vercel and is accessible at [Demo](https://calendar-assignment-eight.vercel.app/)
