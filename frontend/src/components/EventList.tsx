import React from "react";
import { Event } from "../types/Event";

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return "#10B981";
      case 2:
        return "#3B82F6";
      case 3:
        return "#F59E0B";
      case 4:
        return "#EF4444";
      case 5:
        return "#7C2D12";
      default:
        return "#6B7280";
    }
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1:
        return "Low";
      case 2:
        return "Normal";
      case 3:
        return "Medium";
      case 4:
        return "High";
      case 5:
        return "Critical";
      default:
        return "Unknown";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (events.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#6B7280" }}>
        <p>No events found. Create your first event!</p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {events.map((event) => (
        <div
          key={event.id}
          style={{
            backgroundColor: "white",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  margin: 0,
                  marginBottom: "0.5rem",
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                }}
              >
                {event.title}
              </h3>

              <div
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "12px",
                  backgroundColor: getPriorityColor(event.priority),
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  marginBottom: "0.75rem",
                }}
              >
                Priority: {getPriorityText(event.priority)}
              </div>

              {event.description && (
                <p
                  style={{
                    margin: "0.75rem 0",
                    color: "#6B7280",
                    lineHeight: "1.5",
                  }}
                >
                  {event.description}
                </p>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginTop: "1rem",
                }}
              >
                <div>
                  <span style={{ fontWeight: "500", color: "#374151" }}>
                    Start:{" "}
                  </span>
                  <span style={{ color: "#6B7280" }}>
                    {formatDate(event.start_date)}
                  </span>
                </div>
                <div>
                  <span style={{ fontWeight: "500", color: "#374151" }}>
                    End:{" "}
                  </span>
                  <span style={{ color: "#6B7280" }}>
                    {formatDate(event.end_date)}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.5rem", marginLeft: "1rem" }}>
              <button
                onClick={() => onEdit(event)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#3B82F6",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => event.id && onDelete(event.id)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#EF4444",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
