import { Request, Response } from "express";
import pool from "../config/database";
import { Event } from "../types/Event";

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY start_date ASC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      start_date,
      end_date,
      priority = 1,
    }: Event = req.body;

    const result = await pool.query(
      `INSERT INTO events (title, description, start_date, end_date, priority) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, start_date, end_date, priority]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, start_date, end_date, priority }: Event =
      req.body;

    const result = await pool.query(
      `UPDATE events 
       SET title = $1, description = $2, start_date = $3, end_date = $4, priority = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 RETURNING *`,
      [title, description, start_date, end_date, priority, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM events WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEventsByPriority = async (req: Request, res: Response) => {
  try {
    const { priority } = req.params;
    const result = await pool.query(
      "SELECT * FROM events WHERE priority = $1 ORDER BY start_date ASC",
      [priority]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching events by priority:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
