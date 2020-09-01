'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	
	const {user_id, article_id, content,comment_id = ''} = event
	
	let user = await db.collection("user").doc(user_id).get()
	user = user.data[0]
	
	// 获取当前文章信息
	const article = await db.collection('article').doc(article_id).get()
	// 当前文章的评论
	const comments = article.data[0].comments
	let commentObj = {
		comment_id: genID(5),
		comment_content: content,
		create_time: new Date().getTime(),
		author:{
			author_id: user_id,
			author_name: user.author_name,
			avatar: user.avatar,
			professional: user.professional
		},
		replys:[]
	}
	if(comment_id === '') {
		commentObj.replys = []
		commentObj = dbCmd.unshift(commentObj)
	} else {
		// 获取评论索引
		let commentIndex = comments.findIndex(v => v.comment_id == comment_id)
		//获取要回复的评论人信息
		let commentAuthor = comments.find(v => v.comment_id == comment_id)
		commentAuthor = commentAuthor.author.author_name
		commentObj.to = commentAuthor
		
		// 更新回复信息
		commentObj = {
			[commentIndex]: {
				replys: dbCmd.unshift(commentObj)
			}
		}
	}
	await db.collection('article').doc(article_id).update({
		comments: commentObj
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据更新成功'
	}
};

function genID(length) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}