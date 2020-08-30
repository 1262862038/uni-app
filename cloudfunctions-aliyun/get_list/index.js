'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {user_id, name, page = 1, pageSize = 10} = event
	let matchObj = {}
	if(name !== '全部') {
		matchObj = {classify:name}
	}
	//获取用户表信息
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userinfo.data[0].article_likes_ids
	// 聚合：更精细化的处理，求和、分组、指定字段等
	const list = await db.collection("article").aggregate().match(matchObj)
	//追加字段
	.addFields({
		is_like:$.in(['$_id', article_likes_ids])
	})
	.project({
		// content: false
		content: 0
	})
	// 要跳过多少数据
	.skip(pageSize*(page-1))
	// 返回多少条
	.limit(pageSize)
	.end()
	// let list = await db.collection('article')
	// // false表示不返回content, true表示只返回
	// .field({
	// 	content:false
	// }).get()
	
	return {
		code: 200,
		msg:'返回数据成功',
		data: list.data
	}
};
