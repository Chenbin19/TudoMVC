(function (Vue) {

	//本地存储，获取
	let itemStorage = {
		// 获取数据
		fetch() {
			return JSON.parse(localStorage.getItem("item") || '[]')

		},
		// 保存数据
		save(items) {
			localStorage.setItem("item", JSON.stringify(items))
		}
	}

	//注册全局指令
	Vue.directive('app-focus', {
		inserted(el, binding) {
			// 聚焦元素
			el.focus()
		}
	})

	let app = new Vue({
		el: '#todoapp',
		data: {
			items: itemStorage.fetch(),//获取本地数据进行初始化
			currentItem: null, // 点击的那个任务项
			filterStatus: 'all' // 接收变化的状态值
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
		// 监听器
		watch: {
			// 如果 items 发生改变，这个函数就会运行
			items: {
				deep: true, // 发现对象内部值的变化, 要在选项参数中指定 deep: true。
				handler: function (newItems, oldItems) {
					//本地进行存储
					itemStorage.save(newItems)
				}
			}
		},
		// 定义计算属性
		computed: {
			// 根据不同状态过滤出不同数据
			filterItems() {
				// 判断filterItems状态值
				switch (this.filterStatus) {
					case 'active':
						// 过滤出未完成的数据
						return this.items.filter(item => !item.completed)
						break;
					case 'completed':
						// 过滤出已完成的数据
						return this.items.filter(item => item.completed)
						break;

					default:
						return this.items
						break;
				}
			},

			toggleAll: {
				// 当任务列表中的状态发生变化后，就更新复选框状态
				get() {
					// console.log('get', this.remaining)
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
				let unItems = this.items.filter(item => {
					return !item.completed
				})
				return unItems.length
			}
		},
		// 定义方法
		methods: {

			// 完成编辑，保存数据
			finishEdit(item, index, event) {
				// 1.获取当前输入框的值
				let content = event.target.value.trim()
				// 2.判断输入框的值是否为空，如果为空就删除任务项
				if (!content) {
					// 复用下面删除函数
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
				console.log("addItem", event.target.value)
				// 1.获取文本框中的内容
				let content = event.target.value.trim() //将空格去掉
				// 2.判断数据是否为空，如果为空，什么都不做
				if (!content.length) {
					return
				}
				// 3.如果不为空，添加到数组中
				let id = this.items.length + 1
				this.items.push(
					{ id, content, completed: false }
				)
				// 4.清空文本输入框的内容
				event.target.value = ''
			}

		}
	})
	// 当路由状态变化调用
	window.onhashchange = function () {
		// console.log("hash", window.location.hash)
		// 获取路由hash，截取hash值，不为空返回，为空返回all
		let hash = window.location.hash.substr(2) || 'all'
		// 状态发生改变，就将hash赋值给filterStatus
		// 定义计算属性filterItems来感知filterStatus的变化，当它变化时过滤出不同数组
		app.filterStatus = hash
	}
	// 页面一刷新就调用，让状态值生效
	window.onhashchange()

})(Vue);
