import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
	},
	details: {
		type: String,
	},
	views: {
		type: Number,
		default: 0,
	},
	likes: {
		type: Number,
		default: 0,
	},
	dislikes: {
		type: Number,
		default: 0,
	},
	createdAt: {
		type: Date,
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'comment',
	}],
	// author: AuthorSchema,
});

PostSchema.statics.findComments = function(postId) {
	return this.findById(postId)
		.populate('comments')
		.then(post => post.comments);
};

PostSchema.statics.addComment = function(postId, { text }) {
	const Comment = mongoose.model('comment');
	return this.findById(postId).then(post => {
		const comment = new Comment({ text, createdAt: new Date() });
		post.comments.push(comment);
		return Promise.all([comment.save(), post.save()]).then(([, newPost]) => newPost);
		// return comment.save().then(newComment => 
		// 	this.findByIdAndUpdate(postId, { $push: { comments: newComment } })
		// );
	});
};

const Post = mongoose.model('post', PostSchema);

export default Post;
