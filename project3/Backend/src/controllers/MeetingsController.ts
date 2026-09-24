import {Request, Response} from "express";
import {pool} from "../db";

function checkMeetingData(body: any, allowPast: boolean): { valid: boolean; message?: string } | null {
    const groupID = body.groupID ?? body.group_id;
    const startTime = body.startTime ?? body.start_time;
    const endTime = body.endTime ?? body.end_time;
    const { description, room } = body;

    if (!groupID || !startTime || !endTime || !description || !room) {
        return { valid: false, message: 'Missing required fields' };
    }
    if (startTime >= endTime) {
        return { valid: false, message: 'Start time must be before end time' };
    }
    if (!allowPast && new Date(startTime) < new Date()) {
        return { valid: false, message: 'Start time must be in the future' };
    }
   return null;
}

export async function getMeetingById(req: Request, res: Response) {
    try {
        const meetingId = req.params.meetingId;
        const result = await pool.query('SELECT * FROM meetings WHERE meeting_id = $1', [meetingId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching meeting:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function createMeeting(req: Request, res: Response) {
    try {
        const groupID = req.body.groupID ?? req.body.group_id;
        const startTime = req.body.startTime ?? req.body.start_time;
        const endTime = req.body.endTime ?? req.body.end_time;
        const { description, room } = req.body;
        const validationError = checkMeetingData(req.body, false);
        if (validationError) {
            return res.status(400).json({ error: validationError.message });
        }
        const result = await pool.query(
            'INSERT INTO meetings (group_id, start_time, end_time, description, room) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [groupID, startTime, endTime, description, room]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating meeting:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateMeeting(req: Request, res: Response) {
    try {
        const meetingId = req.params.meetingId;
        const groupID = req.body.groupID ?? req.body.group_id;
        const startTime = req.body.startTime ?? req.body.start_time;
        const endTime = req.body.endTime ?? req.body.end_time;
        const { description, room } = req.body;
        const validationError = checkMeetingData(req.body, true);
        if (validationError) {
            return res.status(400).json({ error: validationError.message });
        }
        const result = await pool.query(
            'UPDATE meetings SET group_id = $1, start_time = $2, end_time = $3, description = $4, room = $5 WHERE meeting_id = $6 RETURNING *',
            [groupID, startTime, endTime, description, room, meetingId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating meeting:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteMeeting(req: Request, res: Response) {
    try {
        const meetingId = req.params.meetingId;
        const result = await pool.query('DELETE FROM meetings WHERE meeting_id = $1 RETURNING *', [meetingId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Meeting not found' });
        }
        res.json({ message: 'Meeting deleted successfully' });
    } catch (error) {
        console.error('Error deleting meeting:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}