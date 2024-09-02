import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth('admin'), UserControllers.getAllUser);
router.put('/:id', auth('admin'), UserControllers.getUpdateUser);
router.delete('/:id', auth('admin'), UserControllers.deleteUser);
router.put('/profile/:email', auth('user'), UserControllers.updateProfile);
router.get('/profile/:email', auth('user'), UserControllers.getMyProfile);

export const UserRoutes = router;
