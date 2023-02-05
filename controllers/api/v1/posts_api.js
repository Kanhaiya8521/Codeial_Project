const Post = require('../../../models/post')
const Comment = require('../../../models/comment')

module.exports.index = async function(req, res){

    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function(req, res){
    try {
        // console.log('Post.findById(req.params.id)', Post.findById(req.params.id));
    
        let post =   await Post.findById(req.params.id);
        //if (post.user == req.user.id){
            // console.log('posttttt', post);
            post.remove();
    
            let deleted = await Comment.deleteMany({post: req.params.id});
            // console.log('deleted', deleted);
            return res.json(200, {
                message: 'Post and associated comment deleted successfully',
            });
            // req.flash('success', 'Post and associated comments deleted!');
            // return res.redirect('back');
        // }else{
        //     req.flash('error', 'You cannot delete this post!');
        //     return res.redirect('back');
        // }

    }catch(err){
        console.log('****************************Error', err);

        return res.json(500, {
            message: "Internal Server Error"
        });
        // console.log('Error', err);
        // return;
    }
   
}

// module.exports.destroy = async function(req, res){

//     try{
//         let post = await Post.findById(req.params.id);

//         // if (post.user == req.user.id){
//             post.remove();

//             await Comment.deleteMany({post: req.params.id});


    
//             return res.json(200, {
//                 message: "Post and associated comments deleted successfully!"
//             });
//         // }else{
//         //     req.flash('error', 'You cannot delete this post!');
//         //     return res.redirect('back');
//         // }

//     }catch(err){
//         console.log('********', err);
//         return res.json(500, {
//             message: "Internal Server Error"
//         });
//     }
    
// }