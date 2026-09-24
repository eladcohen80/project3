import { Request, Response } from 'express';
import { pool } from '../db';

export async function getAllGroups(req: Request, res: Response) {
  try {
    const result = await pool.query('SELECT group_id, group_name FROM groups ORDER BY group_id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
  export async function getMeetingByGroup(req: Request, res: Response) {
    try {
      const groupId = req.params.group_id;
      const result = await pool.query('SELECT * FROM meetings WHERE group_id = $1', [groupId]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching meetings for group:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}



