import {Router} from "express";
import {createMeeting, getMeetingById, updateMeeting, deleteMeeting} from "../controllers/MeetingsController";

const router = Router();

router.get('/:meetingId', getMeetingById);

router.post('/', createMeeting);

router.put('/:meetingId', updateMeeting);

router.delete('/:meetingId', deleteMeeting);

export default router;
