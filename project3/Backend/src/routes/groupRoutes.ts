import {Router} from 'express';
import {getAllGroups, getMeetingByGroup} from '../controllers/groupController';

const router = Router();

router.get ('/', getAllGroups);

router.get('/:group_id/meetings', getMeetingByGroup);

export default router;
