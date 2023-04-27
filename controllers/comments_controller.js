const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            // console.log(comment.user.name);
            // if(comment) {
                post.comments.push(comment);
                await post.save();
                await comment.populate('user');
                // commentsMailer.newComment(comment);
                let job = queue.createJob('emails', comment).save(function(err) {
                    if(err) {
                        console.log('Error in sending to the queue', err);
                        return;
                    }
                    // console.log('job enqueued', job.id);
                })
                // return res.redirect('/');
            // } else {
            //     console.log('Error'); return;
            // }

            if(req.xhr) {
                console.log(comment);
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment Created!"
                });
            }

            req.flash('success', "Comment published!");
            res.redirect('/');
            
        }

    }catch(err){
        console.log('Error', err);
        return;
    }
}


module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});

            if (req.xhr)
            {
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Comment deleted"
                });
            }

        }else{
            return res.redirect('back');
        }
    });
}