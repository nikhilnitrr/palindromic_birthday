var input = document.querySelector("#input");
var output = document.querySelector("#output");
var btn = document.querySelector("#btn");

//function to reverse a string
function reverseString(str) {
  return str.split("").reverse().join("");
}

//function to check if a string is palindromic
function isPalindrome(str) {
  return str === reverseString(str);
}

//function to check palindrome for all dates
function checkPalindromeForAllDates(dates) {
  for (var i = 0; i < dates.length; i++) {
    if (isPalindrome(dates[i])) {
      return true;
    }
  }
  return false;
}

// function to get all date formats
function getAllDateFormats(date) {
  var dates = [];
  var dateArr = date.split("-");
  var dateObj = {
    year: dateArr[0],
    day: dateArr[2],
    month: dateArr[1],
  };

  var y = dateObj.year[2] + dateObj.year[3];
  dates.push(dateObj.year + dateObj.month + dateObj.day);
  dates.push(dateObj.day + dateObj.month + dateObj.year);
  dates.push(dateObj.month + dateObj.day + dateObj.year);
  dates.push(dateObj.day + dateObj.month + y);
  dates.push(dateObj.month + dateObj.day + y);
  dates.push(y + dateObj.month + dateObj.day);

  return dates;
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

// function for getting the next date
function getNextDate(date) {
  var temp = date.split("-");
  var day = parseInt(temp[2]) + 1;
  var month = parseInt(temp[1]);
  var year = parseInt(temp[0]);

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }
  var mystr = `${year}-${month}-${day}`;
  console.log(mystr);
  return mystr;
}

//Actual function
function myFunc() {
  var date = input.value;
  var dates = getAllDateFormats(date);
  var flag = checkPalindromeForAllDates(dates);
  if (flag) {
    output.innerText = "😃 Yup! your birthday is palindrome";
  } else {
    var count = 0;
    while (true) {
      count++;
      var nextDate = getNextDate(date);
      var myArr = nextDate.split("-");
      dates = getAllDateFormats(nextDate);
      flag = checkPalindromeForAllDates(dates);
      if (flag) {
        output.innerText = `The next palindrome day is ${myArr[2]}/${myArr[1]}/${myArr[0]} you missed it by ${count} days`;
        break;
      }
      date = nextDate;
    }
  }
}

function check() {
  var date = input.value;
  if (date === "" || date == undefined || date == null) {
    output.innerText = "Please enter valid date";
  } else {
    myFunc();
  }
}

// handling button click event
btn.addEventListener("click", check);
