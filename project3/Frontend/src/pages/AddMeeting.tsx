import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getGroups, addMeeting} from '../api';
import type { Group } from '../types';
import './Pages.css';

export default function AddMeeting() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<Group[]>([]);
    const [group_id, setGroupId] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [room, setRoom] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        getGroups().then(data => setGroups(data)).catch(console.error);
    }, []);

    function checkForm(): boolean {
        if (group_id === 0) {
            setError('Please select a group');
            return false;
        }
        if (!startTime) {
            setError('Please enter a start time');
            return false;
        }
        if (!endTime) {
            setError('Please enter an end time');
            return false;
        }
        if (!description) {
            setError('Please enter a description');
            return false;
        }
        if (!room) {
            setError('Please enter a room');
            return false;
        }
        setError('');
        return true;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!checkForm()) return;
        const result = await addMeeting({
            group_id: group_id,
            start_time: startTime,
            end_time: endTime,
            description: description,
            room: room,
        });
    if (!result) {
        setError('Failed to add meeting');
        return;
    }
        navigate('/meetings');
    }

    return (
        <main className="form-page">
            <div className="form-page__intro">
                <span className="form-page__eyebrow">Schedule</span>
                <h1>New meeting</h1>
                <p>Create a focused time slot for your group.</p>
            </div>
            <form className="meeting-form" onSubmit={handleSubmit}>
                <label>Group
                    <select value={group_id} onChange={e => setGroupId(Number(e.target.value))}>
                        <option value={0}>Select a group</option>
                        {groups.map(group => (
                            <option key={group.group_id} value={group.group_id}>{group.group_name}</option>
                        ))}
                    </select>
                </label>
                <div className="meeting-form__row">
                    <label>Start<input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} /></label>
                    <label>End<input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} /></label>
                </div>
                <label>Description<input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="What is this meeting about?" /></label>
                <label>Room<input type="text" value={room} onChange={e => setRoom(e.target.value)} placeholder="Add a room" /></label>
                {error && <p className="form-error">{error}</p>}
                <button className="btn btn--primary" type="submit">Add meeting</button>
            </form>
        </main>
    );
}