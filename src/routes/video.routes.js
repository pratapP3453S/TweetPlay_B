import { Router } from "express";
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
    getUserVideos,
    getSubscribedVideos,
    viewCountUpdate,
    getVideoStatsForLastTenDays,
} from "../controllers/video.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { checkUser } from "../middlewares/openAuth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get(getAllVideos);
router.route("/c/:userId").get(getUserVideos);
router.route("/:videoId").get(checkUser, getVideoById);

router.use(verifyJWT);

router.route("/").post(
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnail",
            maxCount: 1,
        },
    ]),
    publishAVideo
);

router.route("/:videoId").delete(deleteVideo).patch(upload.single("thumbnail"), updateVideo);

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);
router.route("/s/subscription").get(getSubscribedVideos);

router.route("/:videoId/views/last-ten-days").post(verifyJWT, viewCountUpdate)
router.route("/get-videostats/last-ten-days/").get(verifyJWT, getVideoStatsForLastTenDays);

export default router;
