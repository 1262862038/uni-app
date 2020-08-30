'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const $ = db.command.aggregate
	const {user_id} = event
	let userinfo = await db.collection('user').doc(user_id).get()
	userinfo = userinfo.data[0]
	// let label = await db.collection('label').get()
	let label = await db.collection('label')
	.aggregate()
	.addFields({
		current: $.in(['$_id', $.ifNull([userinfo.label_ids, []])])
	})
	.end()
	return {
		code: 200,
		msg: '数据请求成功',
		data: label.data
	}
};
