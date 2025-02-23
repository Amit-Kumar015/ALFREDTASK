import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const cardSchema = new Schema({
    level: {
        type: Number,
        required: true,
        default: 1
    },
    question: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    nextReviewDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const intervals = [1, 2, 5, 7, 10]; // Days interval for Leitner system

cardSchema.pre("save", function (next) {
    if (this.isModified("level")) {
        const intervalIndex = Math.min(this.level - 1, intervals.length - 1);
        this.nextReviewDate = new Date();
        this.nextReviewDate.setDate(this.nextReviewDate.getDate() + intervals[intervalIndex]);
    }
    next();
});

cardSchema.plugin(mongooseAggregatePaginate)

export const Card = mongoose.model("Card", cardSchema)
