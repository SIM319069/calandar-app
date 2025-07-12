import React, { useState, useEffect } from "react";
import { Event } from "../types/Event";
import { eventAPI } from "../services/api";
import EventForm from "./EventForm";
import EventList from "./EventList";
import CalendarView from "./CalendarView";

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();
  const [filterPriority, setFilterPriority] = useState<number | "all">("all");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentView, setCurrentView] = useState<"calendar" | "list">(
    "calendar"
  );

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const eventsData = await eventAPI.getAllEvents();
      setEvents(eventsData);
      setError(null);
    } catch (err) {
      setError("Failed to load events");
      console.error("Error loading events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (
    eventData: Omit<Event, "id" | "created_at" | "updated_at">
  ) => {
    try {
      console.log("🔄 Attempting to create event...");
      const newEvent = await eventAPI.createEvent(eventData);
      console.log("✅ Event created:", newEvent);
      setShowForm(false);
      setError(null);
      await loadEvents();
    } catch (err: any) {
      console.error("❌ Error creating event:", err);
      let errorMessage = "Failed to create event";

      if (err.code === "ECONNREFUSED") {
        errorMessage =
          "Cannot connect to server. Is the backend running on port 3001?";
      } else if (err.response?.status === 404) {
        errorMessage =
          "API endpoint not found. Check if backend is running properly.";
      } else if (err.response?.status === 500) {
        errorMessage = "Server error. Check backend logs for details.";
      } else if (err.message.includes("Network Error")) {
        errorMessage =
          "Network error. Check if backend is running and CORS is configured.";
      }

      setError(errorMessage);
    }
  };

  const handleUpdateEvent = async (
    eventData: Omit<Event, "id" | "created_at" | "updated_at">
  ) => {
    if (!editingEvent?.id) return;

    try {
      await eventAPI.updateEvent(editingEvent.id, eventData);
      setEditingEvent(undefined);
      setShowForm(false);
      loadEvents();
    } catch (err) {
      setError("Failed to update event");
      console.error("Error updating event:", err);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await eventAPI.deleteEvent(id);
      loadEvents();
    } catch (err) {
      setError("Failed to delete event");
      console.error("Error deleting event:", err);
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEvent(undefined);
    setSelectedDate(null);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowForm(true);
  };

  const handleEventClick = (event: Event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const filteredEvents =
    filterPriority === "all"
      ? events
      : events.filter((event) => event.priority === filterPriority);

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    // Sort by priority (highest first) then by start date
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
  });

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <div>Loading events...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#1F2937",
          }}
        >
          📅 Calendar App
        </h1>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#10B981",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          + Add Event
        </button>
      </div>

      {error && (
        <div
          style={{
            backgroundColor: "#FEE2E2",
            border: "1px solid #FECACA",
            color: "#991B1B",
            padding: "1rem",
            borderRadius: "6px",
            marginBottom: "1rem",
          }}
        >
          {error}
        </div>
      )}

      {/* View Toggle Tabs */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", borderBottom: "2px solid #E5E7EB" }}>
          <button
            onClick={() => setCurrentView("calendar")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor:
                currentView === "calendar" ? "#3B82F6" : "transparent",
              color: currentView === "calendar" ? "white" : "#6B7280",
              border: "none",
              borderRadius: "6px 6px 0 0",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500",
              marginRight: "0.5rem",
            }}
          >
            📅 Calendar View
          </button>
          <button
            onClick={() => setCurrentView("list")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor:
                currentView === "list" ? "#3B82F6" : "transparent",
              color: currentView === "list" ? "white" : "#6B7280",
              border: "none",
              borderRadius: "6px 6px 0 0",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "500",
            }}
          >
            📋 List View
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {currentView === "calendar" && (
        <CalendarView
          events={filteredEvents}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
        />
      )}

      {/* List View */}
      {currentView === "list" && (
        <>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Filter by Priority:
            </label>
            <select
              value={filterPriority}
              onChange={(e) =>
                setFilterPriority(
                  e.target.value === "all" ? "all" : parseInt(e.target.value)
                )
              }
              style={{
                padding: "0.5rem",
                border: "1px solid #D1D5DB",
                borderRadius: "4px",
                fontSize: "1rem",
              }}
            >
              <option value="all">All Priorities</option>
              <option value={1}>Low Priority</option>
              <option value={2}>Normal Priority</option>
              <option value={3}>Medium Priority</option>
              <option value={4}>High Priority</option>
              <option value={5}>Critical Priority</option>
            </select>
          </div>

          <div style={{ marginBottom: "1rem", color: "#6B7280" }}>
            Showing {sortedEvents.length} of {events.length} events
          </div>

          <EventList
            events={sortedEvents}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        </>
      )}

      {showForm && (
        <EventForm
          event={editingEvent}
          onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
          onCancel={handleCloseForm}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default Calendar;
