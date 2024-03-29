"use strict";

function numpad(x, digits) {
  var result = Math.floor(x).toString();

  if (typeof digits == "undefined") digits = 2;

  while (result.length < digits) result = "0" + result;

  var dec = x.toString().split(".")[1];
  if (dec) return result + "." + dec;

  return result;
}

function getTZOString(timezoneOffset) {
  var prefix = timezoneOffset > 0 ? "-" : "+";
  var offsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  var offsetMinutes = Math.abs(timezoneOffset % 60);

  return prefix + numpad(offsetHours, 2) + numpad(offsetMinutes, 2);
}

module.exports = function (date) {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    days[date.getDay()] +
    ", " +
    numpad(date.getDate(), 2) +
    " " +
    months[date.getMonth()] +
    " " +
    date.getFullYear() +
    " " +
    numpad(date.getHours(), 2) +
    ":" +
    numpad(date.getMinutes(), 2) +
    ":" +
    numpad(date.getSeconds(), 2) +
    " " +
    getTZOString(date.getTimezoneOffset())
  );
};

module.exports.getTZOString = getTZOString;
