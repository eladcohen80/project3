import { Link } from 'react-router-dom';
import type { Meeting } from '../types';
import './MeetingCard.css';

interface MeetingCardProps {
  meeting: Meeting;
  onDelete: (meetingId: number) => void;
}

function formatDate(value: string) {
  const date = new Date(value.replace(' ', 'T'));
  return date.toLocaleString('he-IL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function isPast(value: string) {
  return new Date(value.replace(' ', 'T')) < new Date();
}

function formatDuration(start: string, end: string) {
  const durationMinutes = Math.max(
    0,
    Math.round(
      (new Date(end.replace(' ', 'T')).getTime() -
        new Date(start.replace(' ', 'T')).getTime()) /
        60000,
    ),
  );
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
}

export default function MeetingCard({ meeting, onDelete }: MeetingCardProps) {
  const past = isPast(meeting.start_time);

  return (
    <article className={`meeting-card ${past ? 'meeting-card--past' : 'meeting-card--future'}`}>
      <div className="meeting-card__header">
        <div>
          <span className="meeting-card__eyebrow">Meeting</span>
          <h3>{meeting.description}</h3>
        </div>
        <span className="meeting-card__status">{past ? 'Past Meeting' : 'Upcoming'}</span>
      </div>

      <div className="meeting-card__details">
        <div>
          <span>Room</span>
          <strong>{meeting.room}</strong>
        </div>
      </div>

      <div className="meeting-card__schedule" aria-label="Meeting schedule">
        <div className="meeting-card__time">
          <span>Start</span>
          <strong>{formatDate(meeting.start_time)}</strong>
        </div>
        <div className="meeting-card__timeline" aria-hidden="true">
          <span />
          <b>↓</b>
          <span />
        </div>
        <div className="meeting-card__time">
          <span>End</span>
          <strong>{formatDate(meeting.end_time)}</strong>
        </div>
        <div className="meeting-card__duration">
          <span>Duration</span>
          <strong>{formatDuration(meeting.start_time, meeting.end_time)}</strong>
        </div>
      </div>

      <div className="meeting-card__actions">
        <Link to={`/meetings/${meeting.meeting_id}/edit`} className="btn btn--small btn--outline">
          Update
        </Link>
        <button
          className="btn btn--small btn--danger"
          onClick={() => onDelete(meeting.meeting_id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}