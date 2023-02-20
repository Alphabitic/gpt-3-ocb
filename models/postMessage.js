import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    serveur: String,
    console: String,
    compte: String,
    demande: String,
    nom: String,
    traitement: String,
    action1: String,
    action2: String,
    action3: String,
    action4: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;