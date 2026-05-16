import express from 'express';
import { submitContact, getContacts } from '../controllers/contactController.js';

const router = express.Router();

router.route('/').get(getContacts).post(submitContact);

export default router;
