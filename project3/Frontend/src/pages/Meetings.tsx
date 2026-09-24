import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGroups, getMeetingsByGroup, deleteMeeting } from '../api';
import type { Group, Meeting } from '../types';
import MeetingCard from '../components/MeetingCard';
import './Pages.css';

export default function Meetings() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getGroups()
      .then(setGroups)
      .catch(() => setMessage('Failed to load groups'));
  }, []);

  async function handleSelectGroup(group_id: number) {
    setSelectedGroup(group_id);
    setMessage('');

    if (group_id === 0) {
      setMeetings([]);
      return;
    }

    try {
      const data = await getMeetingsByGroup(group_id);
      setMeetings(data);
    } catch {
      setMeetings([]);
      setMessage('Failed to load meetings');
    }
  }

  async function handleDelete(meeting_id: number) {
    if (!window.confirm('Are you sure you want to delete this meeting?')) return;
    await deleteMeeting(meeting_id);
    setMeetings(meetings.filter(m => m.meeting_id !== meeting_id));
    setMessage('Meeting deleted successfully');
  }

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Meetings</h1>
        <Link to="/meetings/new" className="btn btn--primary">
          + New Meeting
        </Link>
      </div>

      {/* בחירת סניף */}
      <div className="card filter-bar">
        <label htmlFor="branch-select">Select Group</label>
        <select
          id="branch-select"
          value={selectedGroup}
          onChange={(e) => handleSelectGroup(Number(e.target.value))}
        >
          <option value={0}>Select Group</option>
          {groups.map((group) => (
            <option key={group.group_id} value={group.group_id}>
              {group.group_name}
            </option>
          ))}
        </select>

        <div className="legend">
          <span className="legend__item">
            <i className="legend__dot legend__dot--future" /> Upcoming
          </span>
          <span className="legend__item">
            <i className="legend__dot legend__dot--past" /> Past Meeting
          </span>
        </div>
      </div>

      {message && <p className="success-box">{message}</p>}

      {selectedGroup === 0 && <p className="empty-state">Select a group to see its meetings.</p>}

      {selectedGroup !== 0 && meetings.length === 0 && (
        <p className="empty-state">No meetings in this group.</p>
      )}

      <div className="classes-grid">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.meeting_id}
            meeting={meeting}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
