// import { Video } from "../models/video.model.js";
// import { asyncHandler } from "../utils/asyncHandler.js";

// const updateVideoViews = async (videoId) => {
//     const currentDate = new Date().setHours(0, 0, 0, 0); // Reset time to midnight for date comparison

//     const video = await Video.findById(videoId);

//     if (!video) {
//         throw new Error("Video not found");
//     }

//     // Increment the total views
//     video.views += 1;

//     // Find if there's an entry for today
//     const todayView = video.viewsPerDay.find(
//         (view) => new Date(view.date).getTime() === currentDate
//     );

//     if (todayView) {
//         // If today's entry exists, increment the view count
//         todayView.count += 1;
//     } else {
//         // If no entry for today, add a new entry
//         video.viewsPerDay.push({ date: currentDate, count: 1 });
//     }

//     await video.save();
// };


// const getViewCountForLast10Days = async (videoId) => {
//     const today = new Date();
//     const tenDaysAgo = new Date(today);
//     tenDaysAgo.setDate(today.getDate() - 10);

//     const video = await Video.aggregate([
//         { $match: { _id: new mongoose.Types.ObjectId(videoId) } },
//         {
//             $project: {
//                 _id: 1,
//                 title: 1,
//                 viewsPerDay: {
//                     $filter: {
//                         input: "$viewsPerDay",
//                         as: "view",
//                         cond: {
//                             $gte: ["$$view.date", tenDaysAgo],
//                         },
//                     },
//                 },
//             },
//         },
//     ]);

//     if (!video || video.length === 0) {
//         throw new ApiError(404, "Video not found");
//     }

//     return video[0].viewsPerDay;
// };

// const fillMissingDates = (viewsPerDay) => {
//     const viewsMap = {};
//     viewsPerDay.forEach((view) => {
//         viewsMap[view.date.toISOString().split('T')[0]] = view.count;
//     });

//     const result = [];
//     for (let i = 0; i < 10; i++) {
//         const date = new Date();
//         date.setDate(date.getDate() - i);
//         const dateString = date.toISOString().split('T')[0];

//         result.push({
//             date: dateString,
//             count: viewsMap[dateString] || 0, // Use 0 if there are no views for that date
//         });
//     }

//     return result.reverse(); // Reverse the array to get it in ascending order by date
// };

// const getVideoViewsLast10Days = asyncHandler(async (req, res) => {
//     const { videoId } = req.params;

//     if (!isValidObjectId(videoId)) {
//         throw new ApiError(400, "Invalid video Id");
//     }

//     const dailyViews = await getViewCountForLast10Days(videoId);
//     const viewsForLast10Days = fillMissingDates(dailyViews);

//     return res.status(200).json(new ApiResponse(200, viewsForLast10Days, "View counts fetched successfully"));
// });

// export {
//     updateVideoViews,
//     getViewCountForLast10Days,
//     fillMissingDates,
//     getVideoViewsLast10Days,
// }