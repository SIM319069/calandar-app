import React, { useState, useEffect } from "react";
import { Event } from "../types/Event";

interface CalendarViewProps {
  events: Event[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onDateClick,
  onEventClick,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
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

  const getEventsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.start_date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    let newMonth = currentMonth;
    let newYear = currentYear;

    if (direction === "prev") {
      newMonth--;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      }
    } else {
      newMonth++;
      if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setCurrentDate(today);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const prevMonthDate = new Date(
        currentYear,
        currentMonth,
        -firstDay + i + 1
      );
      days.push(
        <div
          key={`empty-${i}`}
          className="calendar-day other-month"
          onClick={() => onDateClick(prevMonthDate)}
          style={{
            minHeight: "100px",
            border: "1px solid #E5E7EB",
            padding: "8px",
            cursor: "pointer",
            backgroundColor: "#F9FAFB",
            color: "#9CA3AF",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {prevMonthDate.getDate()}
        </div>
      );
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayEvents = getEventsForDate(date);
      const todayClass = isToday(date);

      days.push(
        <div
          key={day}
          className={`calendar-day ${todayClass ? "today" : ""}`}
          onClick={() => onDateClick(date)}
          style={{
            minHeight: "100px",
            border: "1px solid #E5E7EB",
            padding: "8px",
            cursor: "pointer",
            backgroundColor: todayClass ? "#EBF5FF" : "white",
            borderColor: todayClass ? "#3B82F6" : "#E5E7EB",
            borderWidth: todayClass ? "2px" : "1px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: todayClass ? "bold" : "500",
              color: todayClass ? "#3B82F6" : "#1F2937",
              marginBottom: "4px",
            }}
          >
            {day}
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "2px",
            }}
          >
            {dayEvents.slice(0, 3).map((event, index) => (
              <div
                key={event.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
                style={{
                  backgroundColor: getPriorityColor(event.priority),
                  color: "white",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: "500",
                  cursor: "pointer",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "100%",
                }}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div
                style={{
                  fontSize: "10px",
                  color: "#6B7280",
                  fontWeight: "500",
                  textAlign: "center",
                  padding: "2px",
                }}
              >
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    // Add days from next month to fill the grid
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);

    for (let i = 1; i <= remainingCells; i++) {
      const nextMonthDate = new Date(currentYear, currentMonth + 1, i);
      days.push(
        <div
          key={`next-${i}`}
          className="calendar-day other-month"
          onClick={() => onDateClick(nextMonthDate)}
          style={{
            minHeight: "100px",
            border: "1px solid #E5E7EB",
            padding: "8px",
            cursor: "pointer",
            backgroundColor: "#F9FAFB",
            color: "#9CA3AF",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      {/* Calendar Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          backgroundColor: "#F8FAFC",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        <button
          onClick={() => navigateMonth("prev")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3B82F6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          ← Previous
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h2
            style={{
              margin: 0,
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#1F2937",
            }}
          >
            {monthNames[currentMonth]} {currentYear}
          </h2>

          <button
            onClick={goToToday}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#10B981",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Today
          </button>
        </div>

        <button
          onClick={() => navigateMonth("next")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3B82F6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Next →
        </button>
      </div>

      {/* Day Headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          backgroundColor: "#F3F4F6",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        {dayNames.map((day) => (
          <div
            key={day}
            style={{
              padding: "1rem",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "14px",
              color: "#374151",
              borderRight: "1px solid #E5E7EB",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "0",
        }}
      >
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div
        style={{
          padding: "1rem 1.5rem",
          backgroundColor: "#F8FAFC",
          borderTop: "1px solid #E5E7EB",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: "500", color: "#374151" }}>Priority:</span>
        {[
          { level: 1, name: "Low", color: "#10B981" },
          { level: 2, name: "Normal", color: "#3B82F6" },
          { level: 3, name: "Medium", color: "#F59E0B" },
          { level: 4, name: "High", color: "#EF4444" },
          { level: 5, name: "Critical", color: "#7C2D12" },
        ].map((priority) => (
          <div
            key={priority.level}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: priority.color,
                borderRadius: "2px",
              }}
            />
            <span style={{ fontSize: "14px", color: "#6B7280" }}>
              {priority.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
