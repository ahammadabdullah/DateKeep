"use client";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { formatDateToLocalString } from "@/lib/utils";

export default function CalendarPage({ user }: any) {
  interface Event {
    id: string;
    note: string;
    date: string;
  }

  const [entries, setEntries] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [hoveredEvent, setHoveredEvent] = useState<Event[] | null>(null);
  useEffect(() => {
    async function fetchEntries() {
      if (!user?.username) return;
      try {
        const response = await fetch(`/api/dates?username=${user.username}`);
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    }
    fetchEntries();
  }, [user?.username]);
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = formatDateToLocalString(date);
    const eventsOnDate = entries.filter(
      (event) => formatDateToLocalString(new Date(event.date)) === formattedDate
    );
    setHoveredEvent(eventsOnDate);
  };

  const eventDays = entries.map((event) => new Date(event.date));
  const modifiers = {
    highlighted: eventDays,
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-purple-400 ">
        DateKeep
      </h1>
      <h4 className="text-xl font-medium text-center text-gray-800 mb-8">
        Welcome {user?.first_name} {user?.last_name}
      </h4>
      <div className="my-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg ">
        <Calendar
          modifiersClassNames={{
            highlighted: "bg-purple-200 text-black",
            selected: "bg-purple-500 text-white",
          }}
          selected={selectedDate}
          onDayClick={handleDateChange}
          modifiers={modifiers}
          className="react-day-picker !border-none text-black rounded-lg"
        />
      </div>
      <div className="mt-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold text-center text-gray-700">
          {selectedDate
            ? `Notes on ${selectedDate.toDateString()}`
            : "Select a date to view events."}
        </h3>
        {selectedDate &&
          (hoveredEvent && hoveredEvent.length > 0 ? (
            <ul className="mt-4 text-gray-600 text-center">
              {hoveredEvent.map((event) => (
                <li key={event.id}>{event.note}</li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No notes on this date.</p>
          ))}
      </div>
    </div>
  );
}
