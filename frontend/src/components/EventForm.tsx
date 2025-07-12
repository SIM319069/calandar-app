import React, { useState, useEffect } from "react";
import { Event } from "../types/Event";

interface EventFormProps {
  event?: Event;
  onSubmit: (event: Omit<Event, "id" | "created_at" | "updated_at">) => void;
  onCancel: () => void;
  selectedDate?: Date | null;
}

const EventForm: React.FC<EventFormProps> = ({
  event,
  onSubmit,
  onCancel,
  selectedDate,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    priority: 1,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || "",
        start_date: new Date(event.start_date).toISOString().slice(0, 16),
        priority: event.priority,
      });
    } else if (selectedDate) {
      // Pre-fill with selected date
      const startDate = new Date(selectedDate);
      startDate.setHours(9, 0, 0, 0); // Default to 9:00 AM

      setFormData({
        title: "",
        description: "",
        start_date: startDate.toISOString().slice(0, 16),
        priority: 1,
      });
    }
  }, [event, selectedDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Automatically set end_date to 1 hour after start_date
    const startDate = new Date(formData.start_date);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Add 1 hour

    onSubmit({
      ...formData,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "priority" ? parseInt(value) : value,
    }));
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "#10B981"; // green
      case 2:
        return "#3B82F6"; // blue
      case 3:
        return "#F59E0B"; // yellow
      case 4:
        return "#EF4444"; // red
      case 5:
        return "#7C2D12"; // dark red
      default:
        return "#6B7280"; // gray
    }
  };

  // Calculate and display the auto-generated end time
  const getEndTime = () => {
    if (formData.start_date) {
      const startDate = new Date(formData.start_date);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
      return endDate.toLocaleString();
    }
    return "Select start time first";
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "500px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2
          style={{
            marginBottom: "1.5rem",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {event
            ? "Edit Event"
            : selectedDate
            ? `Create Event - ${selectedDate.toDateString()}`
            : "Create New Event"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "4px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
              placeholder="Enter event title"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "4px",
                fontSize: "1rem",
                resize: "vertical",
                boxSizing: "border-box",
              }}
              placeholder="Enter event description (optional)"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Start Date & Time *
            </label>
            <input
              type="datetime-local"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "4px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />

            {/* Show auto-calculated end time */}
            {formData.start_date && (
              <div
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  color: "#6B7280",
                }}
              >
                📅 End time (auto): <strong>{getEndTime()}</strong>
                <br />
                <span style={{ fontSize: "0.75rem" }}>
                  Events are automatically set to 1 hour duration
                </span>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Priority Level
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "4px",
                fontSize: "1rem",
                backgroundColor: getPriorityColor(formData.priority),
                color: "white",
                boxSizing: "border-box",
              }}
            >
              <option value={1}>1 - Low Priority</option>
              <option value={2}>2 - Normal Priority</option>
              <option value={3}>3 - Medium Priority</option>
              <option value={4}>4 - High Priority</option>
              <option value={5}>5 - Critical Priority</option>
            </select>
          </div>

          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}
          >
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#6B7280",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#3B82F6",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              {event ? "Update" : "Create"} Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
