"use strict";

/* 
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Tutorial Case

   Author: Leonela Waltrick
   Date: 04/14/2026
   Leonela Waltrick
   Filename: lht_calendar.js
*/


/* Set the date displayed in the calendar */
var thisDay = new Date("August 24, 2018");

/* Write the calendar to the element with the id "calendar" */
document.getElementById("calendar").innerHTML = createCalendar(thisDay);


/* Function to generate the calendar table */
function createCalendar(calDate) {
   var calendarHTML = "<table id='calendar_table'>";
   calendarHTML += calCaption(calDate);
   calendarHTML += calWeekdayRow();
   calendarHTML += calDays(calDate);
   calendarHTML += "</table>";
   return calendarHTML;
}


/* Function to write the calendar caption */
function calCaption(calDate) {
   var monthName = ["January", "February", "March", "April",
      "May", "June", "July", "August", "September",
      "October", "November", "December"];

   var thisMonth = calDate.getMonth();
   var thisYear = calDate.getFullYear();

   return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";
}


/* Function to write the weekday title row */
function calWeekdayRow() {
   var dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
   var rowHTML = "<tr>";

   for (var i = 0; i < dayName.length; i++) {
      rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
   }

   rowHTML += "</tr>";
   return rowHTML;
}


/* Function to return number of days in the month */
function daysInMonth(calDate) {
   var dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
   var thisYear = calDate.getFullYear();

   // Leap year adjustment
   if (thisYear % 4 === 0) {
      dayCount[1] = 29;
   }

   return dayCount[calDate.getMonth()];
}


/* Function to write the calendar days */
function calDays(calDate) {

   var totalDays = daysInMonth(calDate);
   var thisMonth = calDate.getMonth();

   var firstDay = new Date(calDate.getFullYear(), thisMonth, 1);
   var startDay = firstDay.getDay();

   var htmlCode = "<tr>";
   var day = 1;

   // Empty cells before the first day
   for (var i = 0; i < startDay; i++) {
      htmlCode += "<td></td>";
   }

   // FIRST WEEK
   for (var i = startDay; i < 7; i++) {

      var eventText = getEvent(thisMonth, day);

      if (day === calDate.getDate()) {
         htmlCode += "<td class='calendar_dates' id='calendar_today'>" + day + "<br />" + eventText + "</td>";
      } else {
         htmlCode += "<td class='calendar_dates'>" + day + "<br />" + eventText + "</td>";
      }
      day++;
   }

   htmlCode += "</tr>";

   // REMAINING WEEKS
   while (day <= totalDays) {
      htmlCode += "<tr>";

      for (var i = 0; i < 7; i++) {
         if (day <= totalDays) {

            var eventText = getEvent(thisMonth, day);

            if (day === calDate.getDate()) {
               htmlCode += "<td class='calendar_dates' id='calendar_today'>" + day + "<br />" + eventText + "</td>";
            } else {
               htmlCode += "<td class='calendar_dates'>" + day + "<br />" + eventText + "</td>";
            }
            day++;

         } else {
            htmlCode += "<td></td>";
         }
      }

      htmlCode += "</tr>";
   }

   return htmlCode;
}