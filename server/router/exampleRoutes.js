import express from 'express';

const router = express.Router();

router.get('/fun', (req, res) => {
   return res.status(200).json({ success: true, data: 'Hello from api/example/fun' })
});

export default router;