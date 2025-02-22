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
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // }
}, {
    timestamps: true
})

cardSchema.methods.updateReviewDate = async function () {
    const intervals = [1, 2, 5, 7, 10] //days

    const boxIndex = Math.max(0, Math.min(this.level-1, intervals.length-1))

    this.nextReviewDate = new Date()
    this.nextReviewDate.setDate(this.nextReviewDate.getDate() + intervals[boxIndex])
}

cardSchema.plugin(mongooseAggregatePaginate)

export const Card = mongoose.model("Card", cardSchema)
