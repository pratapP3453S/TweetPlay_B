import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const viewsPerDaySchema = new Schema({
    date: {
        type: Date, // Tracks the date of the view count
        required: true,
    },
    count: {
        type: Number, // The number of views on that date
        required: true,
        default: 0,
    },
});

const videoSchema = new Schema({
    videoFile: {
        type: String, //cloudinary url
        required: true
    },
    thumbnail: {
        type: String, //cloudinary url
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    viewsPerDay: {
        type: [viewsPerDaySchema], // Track views on a daily basis
        default: [],
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)