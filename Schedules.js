// Schedules used by scheduled jobs

var test_script = Class.create();
test_script.prototype = {
	initialize: function() {
	},
	
	Daily: function (workDay) {
		if (!workDay) return true;
			var d = new GlideDateTime();
		d.setValue("2018-01-01 12:00:00");
		return isWorkDay(d);
	},
	
	Weekly: function (weekDay, workDay){
		var d = new GlideDateTime();
		d.setValue(d.getLocalDate() + " 12:00:00");
		if (!workDay && weekDay == d.getDayOfWeekLocalTime()) return true;
			return (weekDay == d.getDayOfWeekLocalTime() && isWorkDay(d));
	},
	
	TenthWorkdayofMonth:function(month) {
		var d = new GlideDateTime();
		d.setValue(d.getLocalDate() + " 12:00:00");
		var d2 = d.getDayOfMonthLocalTime();
		for (i = 15;i<=31; i++) {
			d.setDayOfMonthLocalTime(i);
			if (isWorkDay(d)) break;
			}
		return (d2 == d.getDayOfMonthLocalTime());
		
	},
	
	FirstWorkdayofMonth:function(month) {
		var d = new GlideDateTime();
		d.setValue(d.getLocalDate() + " 12:00:00");
		var d2 = d.getDayOfMonthLocalTime();
		for (var i = 1;i<=d2; i++) {
			d.setDayOfMonthLocalTime(i);
			if (isWorkDay(d)) break;
			}
		
		return (d2 == d.getDayOfMonthLocalTime());
		
	},
	
	Monthly: function (day, workDay) {
		var d = new GlideDateTime();
		d.setValue(d.getLocalDate() + " 12:00:00");
		if (!workDay && day == d.getDayOfMonthLocalTime()) return true;
			return (day == d.getDayOfMonthLocalTime() && isWorkDay(d));
	},
	
	Monthly2: function (number, weekDay, workDay) {
		var d = new GlideDateTime();
		d.setValue(d.getLocalDate() + " 12:00:00");
		if (number != 5) {
			
			if (!workDay && weekDay == d.getDayOfWeekLocalTime() && number == parseInt((d.getDayOfMonthLocalTime()-1 )/7) + 1 ) return true;
				return (weekDay == d.getDayOfWeekLocalTime() && number == parseInt((d.getDayOfMonthLocalTime()-1 )/7) + 1 && isWorkDay(d));
		}
		else {
			if (!workDay) {
				return (weekDay == d.getDayOfWeekLocalTime() && lastWeekDayOfMonth(d));
			}
			return (weekDay == d.getDayOfWeekLocalTime() && lastWeekDayOfMonth(d) && isWorkDay(d));
		}
	},
	
	Yearly: function (month, day, workDay) {
		var d = new GlideDateTime();
		d.setValue(d.getLocalDate() + " 12:00:00");
		if (!workDay && month == d.getMonthLocalTime() && day == d.getDayOfMonthLocalTime()) return true;
			return (month == d.getMonthLocalTime() && day == d.getDayOfMonthLocalTime() && isWorkDay(d));
	},
	Yearly2: function (month, number, weekDay, workDay) {
		var d = new GlideDateTime();
		d.setValue(d.getLocalDate() + " 12:00:00");
		if (number != 5) {
			
			if (!workDay && month == d.getMonthLocalTime() && weekDay == d.getDayOfWeekLocalTime() && number == parseInt((d.getDayOfMonthLocalTime()-1 )/7) + 1 ) return true;
				return (month == d.getMonthLocalTime() && weekDay == d.getDayOfWeekLocalTime() && number == parseInt((d.getDayOfMonthLocalTime()-1 )/7) + 1 && isWorkDay(d));
		}
		else {
			if (!workDay) {
				return (month == d.getMonthLocalTime() && weekDay == d.getDayOfWeekLocalTime() && lastWeekDayOfMonth(d));
			}
			return (month == d.getMonthLocalTime() && weekDay == d.getDayOfWeekLocalTime() && lastWeekDayOfMonth(d) && isWorkDay(d));
		}
	},
	
	Quarterly: function (day, workDay) {
		var d = new GlideDateTime();
		d.setValue(d.getLocalDate() + " 12:00:00");
		
		month = d.getMonthLocalTime();
		if (!workDay && day == d.getDayOfMonthLocalTime() && (month == 1 || month == 4 || month == 7 || month == 10) ) return true;
			return (day == d.getDayOfMonthLocalTime() && isWorkDay(d) && (month == 1 || month == 4 || month == 7 || month == 10) );
	},
	
	type: 'kcc_schedule'
};


function isWorkDay (date) {
	//KCC 8-18  weekdays excluding holidays
	var schedule = new GlideSchedule("390217f44f7003007f5344f18110c792");
	return schedule.isInSchedule(date);
}

function lastWeekDayOfMonth (date) {
	var d2 = new GlideDateTime();
	d2.setValue(date);
	d2.setDayOfMonthLocalTime(date.getDaysInMonthLocalTime());
	var a=0;
	if (d2.getDayOfWeekLocalTime() < date.getDayOfWeekLocalTime() ) {
		a=date.getDayOfWeekLocalTime()  - d2.getDayOfWeekLocalTime() - 7;
	}
	else
		{
		a=date.getDayOfWeekLocalTime()  - d2.getDayOfWeekLocalTime();
	}
	d2.addDaysLocalTime(a);
	return (gs.dateDiff(date.getDisplayValue(), d2.getDisplayValue(),true)) == 0;
}
