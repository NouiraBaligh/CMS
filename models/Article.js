import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
    {
        title: {
            type: String, 
            required: [true, 'Title is required'],
            unique: true,
            trim: true,
            maxlength: [400, 'Title must be less than 400 characters'],
        }, 
        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: [1000, 'Description must be less than 1000 characters'],
        }
    }, {
        timestamps: true,
        versionKey: false,
    })

export default mongoose.models.Article || mongoose.model("Article",ArticleSchema);