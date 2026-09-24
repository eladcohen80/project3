import type { Group, Meeting } from './types';

const API_URL = 'http://localhost:3000';

const NO_SERVER = 'No server response';

export async function getGroups(): Promise<Group[]> {
    try {
        const response = await fetch(`${API_URL}/api/groups`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(error);
        throw new Error(NO_SERVER);
    }
}

export async function getMeetingsByGroup(group_id: number): Promise<Meeting[]> {
    try {
        const response = await fetch(`${API_URL}/api/groups/${group_id}/meetings`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(error);
        throw new Error(NO_SERVER);
    }
}

export async function getMeetings(): Promise<Meeting[]> {
    try {
        const response = await fetch(`${API_URL}/api/meetings`);
        if (!response.ok) {
            throw new Error('Failed to fetch meetings');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error(NO_SERVER);
    }
}

export async function getMeetingById(meeting_id: number): Promise<Meeting> {
    try {
        const response = await fetch(`${API_URL}/api/meetings/${meeting_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch meeting');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error(NO_SERVER);
    }
}

export async function addMeeting(meeting: Omit<Meeting, 'meeting_id'>): Promise<Meeting> {
    try {
        const response = await fetch(`${API_URL}/api/meetings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meeting),
        });
        if (!response.ok) {
            throw new Error('Failed to add meeting');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error(NO_SERVER);
    }
}

export async function deleteMeeting(meeting_id: number): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/api/meetings/${meeting_id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete meeting');
        }
    } catch (error) {
        console.error(error);
        throw new Error(NO_SERVER);
    }
}

export async function updateMeeting(meeting_id: number, meeting: Omit<Meeting, 'meeting_id'>): Promise<Meeting> {
    try {
        const response = await fetch(`${API_URL}/api/meetings/${meeting_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meeting),
        });
        if (!response.ok) {
            throw new Error('Failed to update meeting');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw new Error(NO_SERVER);
    }
}
