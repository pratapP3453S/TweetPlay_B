// import express from 'express';
// import { getVideoViewsLast10Days, updateVideoViews } from '../controllers/viewstats.controller.js';


// const router = express.Router();

// // Route to update video views
// router.put('/videos/view/:videoId', async (req, res) => {
//     const { videoId } = req.params;

//     try {
//         await updateVideoViews(videoId);
//         res.status(200).json({ message: 'Video view count updated' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Route to get views for the last 10 days
// router.get('/videos/views-last-10-days/:videoId', async (req, res) => {
//     const { videoId } = req.params;

//     try {
//         const viewsData = await getVideoViewsLast10Days(videoId);
//         res.status(200).json(viewsData);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// export default router;
