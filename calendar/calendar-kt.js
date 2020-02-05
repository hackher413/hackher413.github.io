 /*~~~~~~~~~~~~~~~~~~~~~~~~~*/
 // User-defined Variables
 var event_color = "#E6F4F4" // Hexadecimal code for event background
 var border_color = "#86cccc"; // Hexadecimal code for event border color
 /*~~~~~~~~~~~~~~~~~~~~~~~~~*/

 function findPlacement(date) {
     var hours = date.getHours();
     var minutes = date.getMinutes();
     var ampm = hours >= 12 ? 'pm' : 'am';

     // find the placement on the grid
     if (hours - 8 >= 0) { // if after 8am
         var placement = (hours - 8) * 60 + minutes - 2;
     } else {
         var placement = hours * 60 + minutes - 2;
     }
     // adjust the first event if negative
     if (placement < 0) {
         placement = 0;
     }

     hours = hours % 12;
     hours = hours ? hours : 12; // the hour '0' should be '12'
     minutes = minutes < 10 ? '0' + minutes : minutes;
     var strTime = hours + ':' + minutes + ' ' + ampm;
     return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime, placement;
 }

 function formatAMPM(date) {
     var hours = date.getHours();
     var minutes = date.getMinutes();
     var ampm = hours >= 12 ? 'pm' : 'am';
     hours = hours % 12;
     hours = hours ? hours : 12; // the hour '0' should be '12'
     minutes = minutes < 10 ? '0' + minutes : minutes;
     if (minutes > 0) {
         var strTime = hours + ':' + minutes + ampm;
     } else {
         var strTime = hours + ampm;
     }

     return strTime;
 }

 function truncate(input) {
     if (input.length > 50)
         return input.substring(0, 50) + '...';
     else
         return input;
 };

 function getCalendar(dayofweek, daytext) {

     // get the date
     var x = document.getElementById("date"); // Get the element with id="demo"
     x.innerHTML = daytext; // Change the color of the element

     // Get request for dashboard events
     var xhr = new XMLHttpRequest();
     xhr.open('GET', "https://dashboard.hackher413.com/events.json", true);
     xhr.send();
     xhr.onreadystatechange = processRequest;

     function processRequest(e) {
         if (xhr.readyState == 4 && xhr.status == 200) {
             data = JSON.parse(xhr.responseText);
             /*~~~~~~~~~~~~~~~~~~~~~~~~~*/
             // Customize the event calendar
             // ONLY WORKS FROM 8AM - 1:30AM.
             /*~~~~~~~~~~~~~~~~~~~~~~~~~*/
             for (var i = 0; i < data.length; i++) {
                 date1 = new Date(data[i]["start_time"]);

                 // start placement on grid
                 date1, start_placement = findPlacement(date1);

                 // start hours
                 date1_hour = date1.getHours();

                 // start day of week
                 var day = date1.getDay();

                 // Add start time
                 date1 = formatAMPM(date1);
                 data[i]["start_time"] = date1.toString();

                 // end time placement on grid
                 date2 = new Date(data[i]["end_time"]);
                 date2, end_placement = findPlacement(date2);

                 // add end time
                 date2 = formatAMPM(date2);
                 data[i]["end_time"] = " - " + date2.toString();

                 // event box colors 
                 data[i]["color"] = event_color;
                 data[i]["bcolor"] = border_color;

                 // size events that do not have a duration
                 if (start_placement == end_placement) {
                     end_placement = end_placement + 27;
                     data[i]["end_time"] = ""
                 }

                 // finalize placement on grid 
                 data[i]["start"] = start_placement;
                 data[i]["end"] = end_placement;

                 // reformat long titles
                 var str = data[i]["title"]
                 var fields = str.split(' (');
                 var desc = fields[0];
                 var beginner = fields[1];
                 if (beginner != undefined) {
                     data[i]["abbr_title"] = truncate(desc)
                     data[i]["title_desc"] = " (" + beginner
                 } else {
                     data[i]["abbr_title"] = truncate(desc)
                     data[i]["title_desc"] = ""
                 }

                 // if the time is before 8am, show the day before
                 if (date1_hour < 8) {
                     if ((day - 1) < 0) {
                         data[i]["dayofweek"] = day - 1 + 7
                     } else {
                         data[i]["dayofweek"] = day - 1
                     }
                     data[i]["start"] = start_placement + 960; // show after 11:30pm day before
                     data[i]["end"] = end_placement + 960;
                 } else {
                     data[i]["dayofweek"] = day; // show on actual day
                 }

             }

             // only show the current calenday day
             final_data = data.filter(d => d.dayofweek == dayofweek);

             // Facebook Calendar Widget
             var FB = FB || {};
             FB.Widgets = FB.Widgets || {};
             FB.Widgets.DayCalender = FB.Widgets.DayCalender || {
                 givenArr: final_data,
                 resultArr: [],
                 startWhereLeftOff: 0,
                 currColArr: [],
                 pivot: null,
                 CONTAINER_WIDTH: 600,
                 atLeastOneCollision: false,

                 initialize: function () {
                     this.givenArr.sort(function (a, b) {
                         if (a["start"] > b["start"]) return 1;
                         if (a["start"] < b["start"]) return -1;
                         if (a["end"] > b["end"]) return 1;
                         if (a["end"] < b["end"]) return -1;
                         return 0;
                     });
                     this.generateDayEvents();
                     this.adjustWidth('last', 2);
                     this.renderEvents();
                 },
                 generateDayEvents: function () {
                     do {
                         this.pivot = this.givenArr.shift();
                         this._setPivotProperties(this.pivot);
                         this.currColArr.push(this.pivot);
                         if (this.givenArr.length > 0) this._generateColumnEvents();
                         this.resultArr.push(this.currColArr);
                         this.currColArr = [];
                         this.startWhereLeftOff = 0;
                     } while (this.givenArr.length);
                 },
                 _generateColumnEvents: function () {
                     do {
                         var newPivot = this._determineCollisions();
                         if (newPivot) {
                             this.pivot = newPivot.evt;
                             this.startWhereLeftOff = newPivot.evtIndex;
                             if (this.givenArr.splice(newPivot.evtIndex, 1)) this.startWhereLeftOff--;
                             if (this.startWhereLeftOff < 0) this.startWhereLeftOff = 0;
                             this._setPivotProperties(this.pivot);
                             this.currColArr.push(this.pivot);
                         }
                         var condition = (this.atLeastOneCollision) ? (this.startWhereLeftOff < this.givenArr.length - 1) : (this.startWhereLeftOff < this.givenArr.length);
                     } while (condition);
                 },
                 _determineCollisions: function () {
                     for (var i = 1; i < this.givenArr.length; i++) {
                         if (this._noCollision(this.pivot, this.givenArr[i])) {
                             return {
                                 evt: this.givenArr[i],
                                 evtIndex: i
                             }
                         } else {
                             this.atLeastOneCollision = true;
                             this.startWhereLeftOff = i;
                         }
                     }
                 },
                 _noCollision: function (pivot, evt) {
                     return (evt["start"] >= this.pivot.end) ? true : false;
                 },
                 _setPivotProperties: function (pivot) {
                     pivot.top = pivot.start;
                     pivot.height = pivot.end - pivot.start;
                     pivot.width = (!this.resultArr.length) ? this.CONTAINER_WIDTH : Math.floor(this.CONTAINER_WIDTH / (this.resultArr.length + 1));
                     pivot.left = (pivot.width * this.resultArr.length);
                 },
                 adjustWidth: function (order, times) {
                     do {
                         if (order === 'last') {
                             console.log('***** Iterating from last column (nth) till the first (0th) column *****');
                             for (var colIndex = this.resultArr.length - 1; colIndex > 0; colIndex--) {
                                 var comparatorColIndex = colIndex - 1;
                                 console.info("Comparing column " + colIndex + " with column " + comparatorColIndex);
                                 this._columnIterator(colIndex, comparatorColIndex);
                             }
                             order = 'first';
                         } else {
                             console.log('***** Iterating from first column (0th) till the last (nth) column *****');
                             for (var colIndex = 0; colIndex < this.resultArr.length - 1; colIndex++) {
                                 var comparatorColIndex = colIndex + 1;
                                 console.info("Comparing column " + colIndex + " with column " + comparatorColIndex);
                                 this._columnIterator(colIndex, comparatorColIndex);
                             }
                             order = 'last';
                         }
                         times--;
                     } while (times > 0);
                 },
                 _columnIterator: function (colIndex, comparatorColIndex) {
                     for (var i = 0; i < this.resultArr[colIndex].length; i++) { // nth column iteration
                         for (var j = 0; j < this.resultArr[comparatorColIndex].length; j++) {
                             console.log("Comparing event " + this.resultArr[colIndex][i]["id"] + " with event " + this.resultArr[comparatorColIndex][j]["id"]);
                             var condition1 = condition2 = false;
                             condition1 = ((this.resultArr[colIndex][i]["start"] <= this.resultArr[comparatorColIndex][j]["start"]) && (this.resultArr[colIndex][i]["end"] > this.resultArr[comparatorColIndex][j]["start"]));
                             condition3 = ((this.resultArr[colIndex][i]["start"] > this.resultArr[comparatorColIndex][j]["start"]) && (this.resultArr[colIndex][i]["start"] < this.resultArr[comparatorColIndex][j]["end"]));
                             if (condition1 || condition2 || condition3) {
                                 //console.log("Column " + this.resultArr[colIndex][i]["id"] + " collides with " + this.resultArr[comparatorColIndex][j]["id"]);
                                 //console.log("Adjusting the width of " + this.resultArr[comparatorColIndex][j]["id"] + " to " + this.resultArr[colIndex][i]["width"]);
                                 if (this.resultArr[colIndex][i]["width"] > this.resultArr[comparatorColIndex][j]["width"]) {
                                     this.resultArr[colIndex][i]["width"] = this.resultArr[comparatorColIndex][j]["width"];
                                 }
                                 if (this.resultArr[colIndex][i]["width"] < this.resultArr[comparatorColIndex][j]["width"]) {
                                     this.resultArr[comparatorColIndex][j]["width"] = this.resultArr[colIndex][i]["width"];
                                 }
                                 this.resultArr[comparatorColIndex][j]["left"] = (this.resultArr[comparatorColIndex][j]["width"] * comparatorColIndex);
                                 //console.log("Adjusted the leftpos of " + this.resultArr[comparatorColIndex][j]["id"] + " to " + this.resultArr[comparatorColIndex][j]["left"]);
                             }
                         }
                     }
                 },
                 renderEvents: function () {
                     var evtHTML = "";
                     for (var i = 0; i < this.resultArr.length; i++) {
                         for (var j = 0; j < this.resultArr[i].length; j++) {
                             if (this.resultArr[i][j]["start"] < 3450 && this.resultArr[i][j]["start"] >= 0) {
                                 evtHTML += '<div class="day-event tooltip" id="' + this.resultArr[i][j]["id"] +
                                     '" style="top:' + this.resultArr[i][j]["top"] +
                                     'px; left:' + this.resultArr[i][j]["left"] +
                                     'px; width:' + this.resultArr[i][j]["width"] +
                                     'px; height:' + this.resultArr[i][j]["height"] + 'px;' +
                                     'background-color:' + this.resultArr[i][j]["color"] + ';' +
                                     'border-left: 4px solid' + this.resultArr[i][j]["bcolor"] + ';' +
                                     'px"><span class="evt-txt">' + this.resultArr[i][j]["abbr_title"] + '</span>' +
                                     '<span class="beg-txt">' + this.resultArr[i][j]["title_desc"] + "</span><br>" +
                                     this.resultArr[i][j]["start_time"] +
                                     this.resultArr[i][j]["end_time"] + ", " +
                                     this.resultArr[i][j]["location"] +

                                     '<span class="tooltiptext">' +
                                     "<b>" + this.resultArr[i][j]["title"] + ":</b><br>" +
                                     this.resultArr[i][j]["description"] + '</span></div></div>';
                             }
                         }
                     }
                     document.getElementById('day-event-container').innerHTML = evtHTML;
                 }
             };

             FB.Widgets.DayCalender.initialize();

         } else if (xhr.status == 404 || xhr.status == 500) {
             console.log('The request failed...')
         }
     };
 }