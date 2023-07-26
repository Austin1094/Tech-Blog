const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

module.exports = { User, Post, Comment };