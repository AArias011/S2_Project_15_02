"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Anthony Arias
   Date:   4/18/19
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/
window.onload = function () {
      var changingCells = document.querySelectorAll("table#travelExp input.sum");
      for (var i = 0; i < changingCells.length; i++) {
            changingCells[i].onchange = calcExp;
      }
      document.getElementById("submitButton").onclick = validateSummary;
}

//This function makes an alert message to the user when he or she doesn't fill out the summary report correct.
function validateSummary() {
      var neglect = document.getElementById("summary");
      if (neglect.validity.valueMissing) {
            neglect.setCustomValidity("You must include a summary of the trip in your report");
      } else {
            neglect.setCustomValidity("");
      }
}
//This function is to sum the values of input elements belonging to the sumClass class of elements.
function calcClass(sumClass) {
      var sumFields = document.getElementsByClassName(sumClass);
      //this variable keeps a running total of the total values in the input elements in the sumFields object collection.
      var sumTotal = 0;
      for (var i = 0; i < sumFields.length; i++) {
            var itemValue = parseFloat(sumFields[i].value)
            if (!isNaN(itemValue)) {
                  sumTotal += itemValue;
            }  
      }
      return sumTotal;
}

//this function is to calculate the row and column totals from the travelExp table
function calcExp() {
      var expTable = document.querySelectorAll("table#travelExp tbody tr");

      for (var i = 0; i < expTable.length; i++) {
            document.getElementById("subtotal" + i).value = formatNumber(calcClass("date" + i), 2);
      }
      //These input elements track the totals of each column and makes it to a 2 decimal places.
      document.getElementById("transTotal").value = formatNumber(calcClass("trans"), 2);
      document.getElementById("lodgeTotal").value = formatNumber(calcClass("lodge"), 2);
      document.getElementById("mealTotal").value = formatNumber(calcClass("meal"), 2);
      document.getElementById("otherTotal").value = formatNumber(calcClass("other"), 2);

      document.getElementById("expTotal").value = formatUSCurrency(calcClass("sum"));
}





function formatNumber(val, decimals) {
      return val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
      });
}

function formatUSCurrency(val) {
      return val.toLocaleString('en-US', {
            style: "currency",
            currency: "USD"
      });
}