import {Router} from 'express';
import { supabase, unwrap } from '../../lib/supabase.js';

export const healthRouter = Router();

healthRouter.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

// Hace una consulta mínima para comprobar que Supabase responde.
healthRouter.get('/db', async (req, res) => {
    try {
        unwrap(await supabase.from('tasks').select('id').limit(1));
        res.json({ status: 'ok' });
    } catch (error) {
        res.status(503).json({ status: 'error', error: error.message });
    }
});
