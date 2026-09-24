import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getGroups, getMeetingById, updateMeeting } from "../api";
import type { Group } from "../types";
import './Pages.css';

function toInputValue(value: string) {
  return value.replace(' ', 'T').slice(0, 16);
}

export default function EditMeeting() {
    const navigate = useNavigate();
    const { meeting_id } = useParams();
    const  [groups, setGroups] = useState<Group[]>([]);

    const [groupId, setGroupId] = useState<string>("");
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [room, setRoom] = useState<string>("");

    const [error, setError] = useState<string>("");

    useEffect(() => {
        getGroups().then((data) => setGroups(data)).catch(() => setError("Failed to load groups"));
        if (!meeting_id) return;

        getMeetingById(Number(meeting_id)).then((meeting) => {
            setGroupId(String(meeting.group_id));
            setStart(toInputValue(meeting.start_time));
            setEnd(toInputValue(meeting.end_time));
            setDescription(meeting.description);
            setRoom(meeting.room);
        }).catch(() => setError("Failed to load meeting"));
    }, [meeting_id]);
    return (
        <main className="form-page">
            <div className="form-page__intro">
                <span className="form-page__eyebrow">Schedule</span>
                <h1>Edit meeting</h1>
                <p>Update the details and keep everyone aligned.</p>
            </div>
            {error && <p className="form-error">{error}</p>}
            <form className="meeting-form"
                onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                        await updateMeeting(Number(meeting_id), {
                            group_id: Number(groupId),
                            start_time: start,
                            end_time: end,
                            description,
                            room,
                        });
                        navigate("/meetings");
                    } catch (err) {
                        setError("Failed to update meeting");
                    }
                }}
            >
                <label>Group
                    <select value={groupId} onChange={(e) => setGroupId(e.target.value)}>
                        <option value="">Select a group</option>
                        {groups.map((group) => (
                            <option key={group.group_id} value={group.group_id}>
                                {group.group_name}
                            </option>
                        ))}
                    </select>
                </label>
                <div className="meeting-form__row">
                <label>Start
                    <input
                        type="datetime-local"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
                </label>
                <label>End
                    <input
                        type="datetime-local"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </label>
                </div>
                <label>Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>Room
                    <input
                        type="text"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    />
                </label>
                <button className="btn btn--primary" type="submit">Save changes</button>
            </form>
        </main>
    );
}