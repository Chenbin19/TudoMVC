(function (Vue) {  // 表示依赖了全局的vue

	// Your starting point. Enjoy the ride!

	const items = [
		{ id: 1, content: "湖人MVP", completed: false },
		{ id: 2, content: "詹姆斯", completed: false },
		{ id: 3, content: "戴维斯", completed: false }
	]

<<<<<<< HEAD
=======
	//注册全局指令
	Vue.directive('app-focus', {
		inserted(el, binding) {
			// 聚焦元素
			el.focus()
		}
	})
>>>>>>> clear completed

	new Vue({
		el: '#todoapp',
		data: {
<<<<<<< HEAD
			items
		},
=======
			items,
			currentItem: null
		},

		// 自定义局部指令
		directives: {
			'todo-focus': {
				update(el, binding) {
					// 只有双击那个元素才会获取焦点
					if (binding.value) {
						el.focus()
					}
				}
			}
		},

>>>>>>> clear completed
		// 定义计算属性
		computed: {
			toggleAll: {
				// 当任务列表中的状态发生变化后，就更新复选框状态
				get() {
<<<<<<< HEAD
					console.log('get', this.remaining)
=======
					// console.log('get', this.remaining)
>>>>>>> clear completed
					return this.remaining === 0
				},
				// 当复选框状态更新后，任务列表中的状态更新
				set(newStatus) {
					console.log('set')
					this.items.forEach(item => {
						item.completed = newStatus
					})
				}

			},


			// 剩余未完成任务数量
			remaining() {
				// 数组filter函数过滤所有未完成的任务项
				// unItems 用于接收过滤之后未完成的任务项，它是一个数组
				let unItems = this.items.filter(function (item) {
					return !item.completed
				})
				return unItems.length
			}
		},
		// 定义方法
		methods: {

<<<<<<< HEAD
=======
			// 完成编辑，保存数据
			finishEdit(item, index, event) {
				// 1.获取当前输入框的值
				let content = event.target.value.trim()
				// 2.判断输入框的值是否为空，如果为空就删除任务项
				if (!content) {
					// 服用下面删除函数
					this.removeItem(index)
					return
				}
				// 3.如果不为空，就添加到任务项
				item.content = content
				// 移除.editing样式，退出编辑状态
				this.currentItem = null
			},

			// 取消编辑
			cancelEdit() {
				this.currentItem = null;
			},

			// 进入编辑状态 
			toEdit(item) {
				this.currentItem = item
			},

>>>>>>> clear completed
			// 删除任务项
			removeItem(index) {
				this.items.splice(index, 1)
			},
			// 删除所有已完成任务项
			removeCompleted() {
				this.items = this.items.filter(item => !item.completed)
			},


			// 添加文本框
			addItem(evevt) {
				// console.log("addItem", event.target.value)
				// 1.获取文本框中的内容
				let content = event.target.value.trim() //将空格去掉
				// 2.判断数据是否为空，如果为空，什么都不做
				if (!content.length) {
					return
				}
				// 3.如果不为空，添加到数组中
				const id = this.items.lengt + 1
				this.items.push(
					{ id, content, completed: false }
				)
				// 4.清空文本输入框的内容
				event.target.value = ''
			}

		}
	})

})(Vue);
