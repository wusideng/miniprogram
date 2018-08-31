const app = getApp();
Page({
	
	/**
	 * 页面的初始数据
	 */
	data: {
		day: '',
		year: '',
		month: '',
		date: '2017-01',
		today: '',
		week: ['日', '一', '二', '三', '四', '五', '六'],
		calendar: {
			first: [],
			second: [],
			third: []
		},
		swiperMap: ['first', 'second', 'third'],
		swiperIndex: 1,
		memoryDate: [],
		memoryDateTip: {},
		remind: ''
	},
	
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.initProfessionData();
		const date = new Date()
			, month = this.formatMonth(date.getMonth() + 1)
			, year = date.getFullYear()
			, day = this.formatDay(date.getDate())
			, today = `${year}-${month}-${day}`;
		let calendar = this.generateThreeMonths(year, month);
		console.log('remind:', app.globalData.calendar);
		let memoryDate = app.globalData.calendar.remind || [];
		this.setData({
			calendar,
			month,
			year,
			day,
			today,
			beSelectDate: today,
			date: `${year}-${month}`,
			memoryDate
		});
	},
	
	generateThreeMonths (year, month) {
		let { swiperIndex, swiperMap, calendar } = this.data
			, thisKey = swiperMap[swiperIndex]
			, lastKey = swiperMap[swiperIndex - 1 === -1 ? 2 : swiperIndex - 1]
			, nextKey = swiperMap[swiperIndex + 1 === 3 ? 0 : swiperIndex + 1]
			, time = this.countMonth(year, month);
		delete calendar[lastKey];
		calendar[lastKey] = this.generateAllDays(time.lastMonth.year, time.lastMonth.month);
		delete calendar[thisKey];
		calendar[thisKey] = this.generateAllDays(time.thisMonth.year, time.thisMonth.month);
		delete calendar[nextKey];
		calendar[nextKey] = this.generateAllDays(time.nextMonth.year, time.nextMonth.month);
		return calendar;
	},
	/**
	 *
	 * 生成一个月的日历
	 * @param {any} year
	 * @param {any} month
	 * @returns Array
	 */
	generateAllDays (year, month) {
		let lastMonth = this.lastMonthDays(year, month)
			, thisMonth = this.currentMonthDays(year, month)
			, nextMonth = this.nextMonthDays(year, month)
			, days = [].concat(lastMonth, thisMonth, nextMonth);
		return days;
	},
	/**
	 *
	 * 月份处理
	 * @param {any} year
	 * @param {any} month
	 * @returns
	 */
	countMonth (year, month) {
		let lastMonth = {
			month: this.formatMonth(parseInt(month) - 1)
		}
			, thisMonth = {
			year,
			month,
			num: this.getNumOfDays(year, month)
		}
			, nextMonth = {
			month: this.formatMonth(parseInt(month) + 1)
		};
		
		lastMonth.year = parseInt(month) === 1 && parseInt(lastMonth.month) === 12
			? `${parseInt(year) - 1}`
			: year + '';
		lastMonth.num = this.getNumOfDays(lastMonth.year, lastMonth.month);
		nextMonth.year = parseInt(month) === 12 && parseInt(nextMonth.month) === 1
			? `${parseInt(year) + 1}`
			: year + '';
		nextMonth.num = this.getNumOfDays(nextMonth.year, nextMonth.month);
		return {
			lastMonth,
			thisMonth,
			nextMonth
		};
	},
	currentMonthDays (year, month) {
		const numOfDays = this.getNumOfDays(year, month);
		return this.generateDays(year, month, numOfDays);
	},
	/**
	 * 生成上个月应显示的天
	 * @param {any} year
	 * @param {any} month
	 * @returns
	 */
	lastMonthDays (year, month) {
		const lastMonth = this.formatMonth(parseInt(month) - 1)
			, lastMonthYear = parseInt(month) === 1 && parseInt(lastMonth) === 12
			? `${parseInt(year) - 1}`
			: year
			, lastNum = this.getNumOfDays(lastMonthYear, lastMonth); //上月天数
		let startWeek = this.getWeekOfDate(year, month - 1, 1) //本月1号是周几
			, days = [];
		if (startWeek == 6) {
			return days;
		}
		
		const startDay = lastNum - startWeek;
		
		return this.generateDays(lastMonthYear, lastMonth, lastNum, { startNum: startDay, notCurrent: true });
	},
	/**
	 * 生成下个月应显示天
	 * @param {any} year
	 * @param {any} month
	 * @returns
	 */
	nextMonthDays (year, month) {
		const nextMonth = this.formatMonth(parseInt(month) + 1)
			, nextMonthYear = parseInt(month) === 12 && parseInt(nextMonth) === 1
			? `${parseInt(year) + 1}`
			: year
			, nextNum = this.getNumOfDays(nextMonthYear, nextMonth);  //下月天数
		let endWeek = this.getWeekOfDate(year, month)						 //本月最后一天是周几
			, days = []
			, daysNum = 0;
		if (endWeek == 6) {
			return days;
		} else if (endWeek == 7) {
			daysNum = 6;
		} else {
			daysNum = 6 - endWeek;
		}
		return this.generateDays(nextMonthYear, nextMonth, daysNum, { startNum: 1, notCurrent: true });
	},
	/**
	 *
	 * 月份处理
	 * @param {number} month
	 * @returns format month MM 1-12
	 */
	formatMonth (month) {
		let monthStr = '';
		if (month > 12 || month < 1) {
			monthStr = Math.abs(month - 12) + '';
		} else {
			monthStr = month + '';
		}
		monthStr = `${monthStr.length > 1 ? '' : '0'}${monthStr}`;
		return monthStr;
	},
	/**
	 *
	 * 获取本月天数
	 * @param {number} year
	 * @param {number} month
	 * @param {number} [day=0] 0为本月0最后一天的
	 * @returns number 1-31
	 */
	getNumOfDays (year, month, day = 0) {
		return new Date(year, month, day).getDate();
	},
	/**
	 *
	 * 获取指定月第n天是周几        |
	 * 9月第1天： 2017, 08, 1 |
	 * 9月第31天：2017, 09, 0
	 * @param {any} year
	 * @param {any} month
	 * @param {number} [day=0] 0为最后一天，1为第一天
	 * @returns number 周 1-7,
	 */
	getWeekOfDate (year, month, day = 0) {
		let dateOfMonth = new Date(year, month, 0).getUTCDay() + 1;
		dateOfMonth == 7 ? dateOfMonth = 0 : '';
		return dateOfMonth;
	},
	/**
	 *
	 * 生成日详情
	 * @param {any} year
	 * @param {any} month
	 * @param {any} daysNum
	 * @param {boolean} [option={
		 * 		startNum:1,
		 * 		grey: false
		 * 	}]
	 * @returns Array 日期对象数组
	 */
	generateDays (year, month, daysNum, option = {
		startNum: 1,
		notCurrent: false
	}) {
		const weekMap = ['一', '二', '三', '四', '五', '六', '日'];
		let days = [];
		for (let i = option.startNum; i <= daysNum; i++) {
			let week = weekMap[new Date(year, month - 1, i).getUTCDay()];
			let day = this.formatDay(i);
			days.push({
				date: `${year}-${month}-${day}`,
				event: false,
				day,
				week,
				month,
				year
			});
		}
		return days;
	},
	/**
	 *
	 * 直接改变日期
	 * @param {any} year
	 * @param {any} month
	 */
	changeDate (year, month) {
		let { day, today } = this.data
			, calendar = this.generateThreeMonths(year, month)
			, date = `${year}-${month}`;
		date.indexOf(today) === -1
			? day = '01'
			: day = today.slice(-2);
		
		this.setData({
			calendar,
			day,
			date,
			month,
			year
		});
	},
	formatDay (day) {
		return `${(day + '').length > 1 ? '' : '0'}${day}`;
	},
	bindDayTap (e) {
		let { month, year } = this.data
			, time = this.countMonth(year, month)
			, tapMon = e.currentTarget.dataset.month
			, day = e.currentTarget.dataset.day;
		if (tapMon == time.lastMonth.month) {
			this.changeDate(time.lastMonth.year, time.lastMonth.month);
		} else if (tapMon == time.nextMonth.month) {
			this.changeDate(time.nextMonth.year, time.nextMonth.month);
		} else {
			this.setData({
				day
			});
		}
		let beSelectDate = e.currentTarget.dataset.date;
		this.setData({
			beSelectDate
		});
	},
	bindDateChange (e) {
		console.log(e);
		if (e.detail.value === this.data.date) {
			return;
		}
		
		const month = e.detail.value.slice(-2)
			, year = e.detail.value.slice(0, 4);
		
		this.changeDate(year, month);
	},
	/**
	 *
	 * 左右滑动
	 * @param {any} e
	 */
	swiperChange (e) {
		const lastIndex = this.data.swiperIndex
			, currentIndex = e.detail.current;
		let flag = false
			, { year, month, day, today, date, calendar, swiperMap } = this.data
			, change = swiperMap[(currentIndex + 2) % 3]
			, time = this.countMonth(year, month)
			, key = 'lastMonth';
		
		if (lastIndex > currentIndex) {
			lastIndex === 2 && currentIndex === 0
				? flag = true
				: null;
		} else {
			lastIndex === 0 && currentIndex === 2
				? null
				: flag = true;
		}
		if (flag) {
			key = 'nextMonth';
			change = swiperMap[(currentIndex + 1) % 3];
		}
		// console.log('change:', change, 'time', time, 'lastIndex:', lastIndex, 'currentIndex:', currentIndex);
		// console.log(flag,(currentIndex + 2) % 3)
		year = time[key].year;
		month = time[key].month;
		date = `${year}-${month}`;
		day = '';
		if (today.indexOf(date) !== -1) {
			day = today.slice(-2);
		}
		
		time = this.countMonth(year, month);
		calendar[change] = null;
		calendar[change] = this.generateAllDays(time[key].year, time[key].month);
		
		this.setData({
			swiperIndex: currentIndex,
			//文档上不推荐这么做，但是滑动并不会改变current的值，所以随之而来的计算会出错
			year,
			month,
			date,
			day,
			calendar
		});
	},
	/**
	 * 新建提醒
	 */
	bindRemind () {
		wx.navigateTo({ url: 'sub-page/index' });
	},
	initProfessionData () {
		if (!app.globalData.calendar)
			app.globalData.calendar = {
				'tip': [
					{ name: '计划投资日', id: '1', color: '#ff0000' },
					{ name: '到期日', id: '1', color: '#00ff00' },
					{ name: '发薪日', id: '1', color: '#0000ff' },
					{ name: '信用卡还款日', id: '1', color: '#ffff00' },
					{ name: '水电费缴纳日', id: '1', color: '#00ffff' },
					{ name: '定存宝理财到期，转无忧宝', id: '1', color: '#077770' }
				]
			};
		this.setData({
			memoryDateTip: app.globalData.calendar.tip
		});
	},
	getRemind () {
		let remind = util.getStorageSync('remind');
		this.setData({
			remind:''
		})
	}
});