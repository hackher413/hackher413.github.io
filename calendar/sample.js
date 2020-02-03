//	Avoid polluting the global namespace
(function() {

  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}
  
 // Add time intervals to calendar
  /* ~~~~ Date code ~~~~~*/
var d = new Date('2019-02-09 08:00:00');  
 function dateAdd(date, interval, units) {
  var ret = new Date(date); //don't change original date
  var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
  switch(interval.toLowerCase()) {
    case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
    case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
    case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
    case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
    case 'day'    :  ret.setDate(ret.getDate() + units);  break;
    case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
    case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
    case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
    default       :  ret = undefined;  break;
  }
  return ret;
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Namespacing Widgets (Pattern: nested-object)

var FB = FB || {};
FB.Widgets = FB.Widgets || {};
FB.Widgets.DayCalender = FB.Widgets.DayCalender || {
	givenArr: 	//	Input for Day Calendar
	//	Edit these to create events!!
	[
{name: 'Registration', 
        start: 0, end: 119,
        timeloca: '8:00am -10:00am, ILC Entrance', 
        color:'#C3BDF1', bcolor:'#D099D5',
        descr : "Have your dashboard.hackher413.com QR Code Ready to scan!"},
{name: 'Breakfast', 
        start: 0, end: 119,
        timeloca: '8:00am -10:00am, ILC Atrium', 
        color:'#C3BDF1', bcolor:'#D099D5', 
        descr : 'Nothing says breakfast better than breakfast burritos!'},
{name: 'Team Forming #1', 
        start: 60, end: 119,
        timeloca: '9:00am -10:00am, Chein Shing Wu Room', 
        color:'#C7E3F0', bcolor:'#D099D5', 
        descr : 'Meet other hackers, form teams, and brainstorm ideas! Note: We will have another session after the welcome ceremony.'},
{name: 'Opening Ceremony', 
        start: 120, end: 169, 
        timeloca: '10:00am -11:00am, Grace Hopper Room', 
        color:'#C3BDF1', bcolor:'#D099D5', 
        descr : 'Hear from sponsors and our wonderful keynote speaker. Also, learn about the challenges and prizes being offered!'},
{name: 'Hacking Begins!', 
        start: 169, end: 185,
        timeloca: '', 
        color:'#C3BDF1',bcolor:'#D099D5', 
        descr : 'Hardware tables and hacking areas are now open'},
{name: 'Sponsor Fair', 
        start: 185, end: 299,
        timeloca: '11:00am - 1:00pm, Sponsor Area', 
        color:'#C3BDF1',bcolor:'#D099D5', 
        descr : 'Meet our amazing sponsors and grab some swag!'},
{name: 'Teaming Forming #2', 
        start: 185, end: 239,
        timeloca: '11:00am -12:00am, Chein Shing Wu Room', 
        color:'#C7E3F0',bcolor:'#D099D5', 
        descr : '	Don\'t have a team or an idea yet? Now\'s a good time to find one!'},
{name: 'Google Cloud API Demo', 
        start: 270, end: 329,
        timeloca: '12:30am - 1:30pm, Ada Lovelace Room', 
        color:'#EBF9F3', 
        descr : 'Come hear from Googlers about how to use Google Cloud Platform in your hack!'},
    {name: 'Google Cloud API Demo', 
        start: 270, end: 329,
        timeloca: '12:30am - 1:30pm, Ada Lovelace Room', 
        color:'#EBF9F3', 
        descr : 'Come hear from Googlers about how to use Google Cloud Platform in your hack!'},
{name: 'Setting up a Localhost', 
        start: 270, end: 329,
        timeloca: '12:30am - 1:30pm, Amandla Stenberg Room', 
        color:'#C7E3F0',bcolor:'#D099D5', 
        descr :'In this beginner-friendly workshop, you will build the Internet on your laptop. This is a web programming basics workshop, no prior coding experience required.'},
{name: 'Technology in the Real World', 
        start: 270, end: 329,
        timeloca: '12:30am - 1:30pm, Chein Shing Wu Room', 
        color:'#C7E3F0',bcolor:'#D099D5', 
        descr : 'It isn\’t just Google and Facebook (or other tech companies) who are looking for technologists. IT, informatics and data science professionals are in demand across all industries. \n\nThis workshop will provide insight on how technology and data are used in the pharmaceutical and biotech vertical. We will also explore emerging trends that you, as the next generation workforce, will be advancing.'},
{name: 'Ideation/Product Design', 
        start: 330, end: 389,
        timeloca: '1:30pm - 2:30pm, Amandla Stenberg Room', 
        color:'#C7E3F0', 
        descr : 'The Ideation/Product Design workshop will provide beginners a non-technical overview of how an idea, gets accepted and goes a product design workflow to become a software feature based on Agile and Waterfall methodologies (estimate 30 minutes). Attendees will be split into groups to work on an example of product design based on ideas provided (estimate 15 minutes).'},
{name: 'Create your first robot', 
        start: 330, end: 389,
        timeloca: '1:30pm - 2:30pm, Edith Clarke Room', 
        color:'#C7E3F0', bcolor:'#D099D5',
        descr : 'In this workshop, we\'ll be creating simple \"bug\" robots using a solar panel to power a vibrating motor. Building this robot doesn\'t require any coding or even a laptop - it\'s all about hands-on fun. This workshop is a great opportunity for learning how to solder and getting some inspiration for hardware hacks.'},
{name: 'Bose API demo', 
        start: 330, end: 389,
        timeloca: '1:30pm - 2:30pm, Ada Lovelace Room', 
        color:'#C7E3F0', 
        descr : 'About Bose. Things they do.'},
{name: 'Intro to Machine Learning', 
        start: 390, end: 449,
        timeloca: '2:30pm - 3:30pm, Ada Lovelace Room',
        color:'#C7E3F0',
        descr : 'In this workshop, hackers will experience a soft introduction to machine learning using the Python coding language. Participants will become familiar with the sci-kit learn (sklearn) package and the general steps one should take when implementing a machine learning algorithm. Topics will include feature selection, modeling, model selection, and model validation; one example of unsupervised learning (KNN) and one example of supervised learning (decision trees) will be covered.'},
{name: 'Arduino Workshop', 
        start: 390, end: 509,
        timeloca: '2:30pm - 4:30pm, Edith Clarke Room', 
        color:'#C7E3F0', 
        descr : 'This workshop will consist of set up of different circuits like blink(to ensure the proper functionality of the board), a push button LED (A basic circuit operated using the arduino) and a LED Bar Graph (a bit more code driven circuit where LED\'s light up with the crank of the potentiometer).'},
{name: 'Your Code Brightens the Room, Wayfair', 
        start: 390, end: 449,
        timeloca: '2:30pm - 3:30pm, Amandla Stenberg Room', 
        color:'#C7E3F0', bcolor:'#D099D5',
        descr : 'Grab your laptop and join Wayfair to learn the basics of message queues/brokers, and leveraging IOT to enable your code to interact with lights and other things in the physical world. Basic understanding of Python helpful, but not required.'},
    {name: 'Coffee with Mentors', 
        start: 450, end: 509,
        timeloca: '3:30pm - 4:30pm, Chein Shing Wu Room', 
        color:'#EBF9F3',bcolor:'#D099D5', 
        descr : 'Grab some coffee (or tea/hot chocolate) and sit down with mentors! Talk to mentors about anything, ranging from advice to the mentor’s career to their favorite programming language!'},
{name: 'The Endlessly Fascinating World of Cybersecurity', 
        start: 450, end: 509,
        timeloca: '3:30pm - 4:30pm, Amandla Stenberg Room', 
        color:'#EBF9F3', 
        descr : '	In this workshop we will cover the current trends in cybersecurity, how it intersects with national news and espionage of all kinds, secure product development, and an overview of the many careers available'},
{name: 'Web Development with HTML/CSS', 
        start: 510, end: 569,
        timeloca: '4:30pm - 5:30pm, Amandla Stenberg Room', 
        color:'#C7E3F0',bcolor:'#D099D5', 
        descr : '	This beginner-friendly technical workshop will introduce web programming with HTML and CSS in a fun and interactive way! Bring your laptop ready with a code editor of your choice (Visual Studio Code and Sublime Text are some free/lightweight options).  Workshop participants will leave the session with a high-level understanding of how HTML and CSS are used to build websites, and sample code and activity instructions will be provided from GitHub (no GitHub experience required). '},
{name: 'Bloomberg Puzzle Challenge', 
        start: 510, end: 569,timeloca: '4:30pm -5:30pm, Chein Shing Wu Room', 
        color:'#EBF9F3',bcolor:'#D099D5', 
        descr : '	Join Bloomberg for a hackathon break & learn more about our puzzles! This event will include a quick tutorial on how to solve our puzzles, followed by a few speed puzzle rounds. We will be handing out prizes.!'},
{name: 'Should I go to Graduate School? Panel Discussion', 
        start: 510, end: 569,
        timeloca: '4:30pm - 5:30pm, Ada Lovelace Room', 
        color:'#EBF9F3', 
        bcolor:'#D099D5',descr : '	Don\'t have a team or an idea yet? Now\'s a good time to find one!Not sure if you should go to grad school or not? Hear from people who\'ve been through it (or are still in it!) & ask questions!'},
{name: 'Wallpaper Widgets and Wearables/ Design Thinking', 
        start: 570, end: 630,
        timeloca: '5:30pm - 6:30pm, Chein Shing Wu Room', 
        color:'#EBF9F3', 
        descr : '	The "Wallpaper, Widgets and Wearables Workshop" will introduce the concepts of glanceable design (hands-free, transient attention) that is an important concept for mobile apps and responsive web pages. I will get into wearable sensors and the quantified-self movement. The talk will focus on mobile design and wearable technologies without being too, too technical.'},
{name: 'Women & Marginalized Communities in the Workforce Panel', 
        start: 570, end: 630,
        timeloca: '5:30pm - 6:30pm, Ada Lovelace Room', 
        color:'#EBF9F3',bcolor:'#D099D5', 
        descr : 'Hear from a wide range of folks in the workforce about their experiences & ask your questions.'},
{name: 'Five Technology Trends You Don’t Want to Miss', 
        start: 570, end: 630,
        timeloca: '5:30pm - 6:30pm, Amandla Stenberg Room', 
        color:'#C7E3F0', bcolor:'#D099D5',
        descr : '	Every year, our researchers talk to thousands of businesses and everyday people to identify new trends. What new technology is going to spread everywhere? What companies are solving old problems in new ways? What skills are needed to have a strong career? Let’s explore the trends that will shape the next three to seven years.'},
{name: 'Pizza Dinner! ', 
        start: 630, end: 689,
        timeloca: '6:30pm - 7:30pm, Atrium', 
        color:'#C7E3F0', bcolor:'#D099D5',
        descr : ' Come down to the main hacking space at the Atrium for the best pizza in Amherst! Antonio’s is served!'},
{name: 'Beginner Meet Up', 
        start: 660, end: 900,
        timeloca: '7:00pm - 11:30pm, Katherine Johnson Room', 
        color:'#C7E3F0', bcolor:'#D099D5',
        descr : 'Spend some time with other beginners, whether it be chatting about your experiences or working on a hack together!'},
{name: 'Performance by Paisley Rowland!', 
        start: 675, end: 734,
        timeloca: '7:15pm - 8:15pm, Atrium', 
        color:'#C7E3F0', bcolor:'#D099D5',
        descr : '	Gather in the Main Hacking Space to hear live music by a local musician!'},
{name: 'Real Talk', 
        start: 720, end: 779,
        timeloca: '8:00pm - 9:00pm, Chein Shing Wu Room', 
        color:'#C7E3F0', bcolor:'#D099D5',
        descr : '	Talk about diversity, inclusion, and imposter syndrome in this amazing panel.'},
{name: 'Gaming Hour', 
        start: 720, end: 779,
        timeloca: '8:00pm - 9:00pm, De-Stress Room', 
        color:'#C7E3F0', bcolor:'#D099D5',
        descr : '	Take a break by playing some video or board games!'},
{name: 'MLH Cup Stacking', 
        start: 780, end: 839,
        timeloca: '9:00pm - 10:00pm, Check-in Room', 
        color:'#C7E3F0', bcolor:'#D099D5',
        descr : '	Join MLH for a cup stacking competition!'},
{name: 'Women of Color Meetup', 
        start: 840, end: 884,
        timeloca: '10:00pm - 10:45pm, Chein Shing Wu Room', 
        color:'#C7E3F0', bcolor:'#D099D5',
        descr : '	Meet up with fellow WoC to share your experiences.'},
{name: 'LGBTQIA+ Meetup', 
        start: 885, end: 930,
        timeloca: '10:45pm - 11:30pm, Chein Shing Wu Room', 
        color:'#C7E3F0', bcolor:'#D099D5',
        descr : '	Gather with fellow LGBTQIA+ folks to share your experiences.'},
{name: 'Face Masks', 
        start: 930, end: 960,
        timeloca: '11:30pm - 11:45pm, De Stress Room', 
        color:'#C7E3F0', bcolor:'#D099D5',
        descr : '	Grab a face mask and relax!'},
{name: 'Midnight Snack!', 
        start: 990, end: 1020,
        color:'#C3BDF1', bcolor:'#D099D5',
        timeloca: '12:00am- 12:30am, Atrium', 
        descr: 'Who wants a midnight treat?!?'},
{name: 'Breakfast', 
        color:'#C3BDF1', bcolor:'#D099D5',
        start: 1095, end: 1125,
        timeloca: '8:00am- 9:00am, Atrium', 
        descr: 'Grab some food :)'},
{name: 'Zumba', 
        start: 1125, end: 1185,
        color:'#C3BDF1', bcolor:'#D099D5',
        timeloca: '9:00am- 10:00am, Destress Room', 
            descr: 'Wake up with some Zumba!'},
 {name: 'Q&A with Fig O\'Reilly', 
        start: 1260, end: 1290,
        color:'#C3BDF1', bcolor:'#D099D5',
        timeloca: '11:15am- 11:45am, Amandla Stenberg Room', 
        descr: 'Wake up with some Zumba!'},
{name: 'Deadline for Submitting Hacks at 10am!', 
        start: 1185, 
        end: 1200,
        timeloca: '', 
        color:'#C3BDF1', bcolor:'#D099D5',
        descr: 'Submit your project to the dashboard by this time to be eligible for judging!'},
{name: 'Presentations & Judging', 
        start: 1335, end: 1454,
        timeloca: 'ILC', 
 color:'#C3BDF1', bcolor:'#D099D5',
            descr: 'Show off what you did this weekend! Prepare a short pitch to give to judges in a science-fair style presentation. We will give you your table number on Sunday.'},
{name: 'Closing Ceremony', 
        start: 1485, end: 1544,
 color:'#C3BDF1', bcolor:'#D099D5',
        timeloca: '3:00pm - 4:00pm, Grace Hopper Room (N151)', 
           descr: 'Close out the weekend with final remarks & prizes!'}


	],
	
	
	resultArr: [],		
	startWhereLeftOff: 0,
	currColArr: [],	
	pivot: null,		
	CONTAINER_WIDTH: 600,
	atLeastOneCollision: false,	

	initialize: function(){
		this.givenArr.sort(function (a,b) {
		    if (a["start"] > b["start"]) return  1;
		    if (a["start"] < b["start"]) return -1;
		    if (a["end"] > b["end"]) return  1;
		    if (a["end"] < b["end"]) return -1;
		    return 0;
		});
		 this.generateDayEvents();
		this.adjustWidth('last', 2);
		this.renderEvents();
	},
	generateDayEvents: function(){
		do {
			this.pivot = this.givenArr.shift();
			this._setPivotProperties(this.pivot);
			this.currColArr.push(this.pivot);
			if(this.givenArr.length>0) this._generateColumnEvents();
			this.resultArr.push(this.currColArr);
			this.currColArr = [];
			this.startWhereLeftOff = 0;
			console.dir(this.resultArr);
		} while(this.givenArr.length);
	},
	_generateColumnEvents: function(){
		do {
			var newPivot = this._determineCollisions();
			if(newPivot){
				this.pivot = newPivot.evt;
				this.startWhereLeftOff = newPivot.evtIndex;	
				if( this.givenArr.splice(newPivot.evtIndex, 1) ) this.startWhereLeftOff--;
				if(this.startWhereLeftOff<0) this.startWhereLeftOff = 0;
				this._setPivotProperties(this.pivot);
				this.currColArr.push(this.pivot);
			}
			var condition = (this.atLeastOneCollision)? (this.startWhereLeftOff<this.givenArr.length-1) : (this.startWhereLeftOff<this.givenArr.length);
		} while(condition);
	}, 
	_determineCollisions: function(){
		for(var i=this.startWhereLeftOff; i<this.givenArr.length; i++) {
			if ( this._noCollision(this.pivot, this.givenArr[i]) ){
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
	_noCollision: function(pivot, evt){
		return (evt["start"] >= this.pivot.end)? true : false;
	},
	_setPivotProperties: function(pivot){
		pivot.top = pivot.start;
		pivot.height = pivot.end - pivot.start;
		pivot.width = (!this.resultArr.length)? this.CONTAINER_WIDTH : Math.floor( this.CONTAINER_WIDTH/(this.resultArr.length+1) ); 
		pivot.left = (pivot.width * this.resultArr.length) + 10;
	},
	adjustWidth: function(order, times){
		do {
			if(order === 'last') {
				console.log('***** Iterating from last column (nth) till the first (0th) column *****');
				for( var colIndex = this.resultArr.length-1; colIndex > 0; colIndex-- ) {
					var comparatorColIndex = colIndex-1;
					console.info("Comparing column " + colIndex + " with column " + comparatorColIndex);
					this._columnIterator(colIndex, comparatorColIndex);
				}
				order = 'first';
			} else {
				console.log('***** Iterating from first column (0th) till the last (nth) column *****');
				for(var colIndex=0; colIndex<this.resultArr.length-1; colIndex++) {
					var comparatorColIndex = colIndex+1;
					console.info("Comparing column " + colIndex + " with column " + comparatorColIndex);
					this._columnIterator(colIndex, comparatorColIndex);	
				}
				order = 'last';
			}
			times--;
		} while(times > 0);
	},
	_columnIterator: function(colIndex, comparatorColIndex){
		for(var i=0; i<this.resultArr[colIndex].length; i++){  // nth column iteration
			for(var j=0; j<this.resultArr[comparatorColIndex].length; j++){	
				console.log("Comparing event " + this.resultArr[colIndex][i]["id"] + " with event " + this.resultArr[comparatorColIndex][j]["id"]);
				var condition1 = condition2 = condition3 = false;
				condition1 = ( (this.resultArr[colIndex][i]["start"] > this.resultArr[comparatorColIndex][j]["start"]) && (this.resultArr[colIndex][i]["start"] < this.resultArr[comparatorColIndex][j]["end"]) );
				condition2 = ( ( (this.resultArr[colIndex][i]["start"] >= this.resultArr[comparatorColIndex][j]["start"]) && (this.resultArr[colIndex][i]["end"] <= this.resultArr[comparatorColIndex][j]["end"]) ) || ( (this.resultArr[colIndex][i]["start"] <= this.resultArr[comparatorColIndex][j]["start"]) && (this.resultArr[colIndex][i]["end"] >= this.resultArr[comparatorColIndex][j]["end"]) ) );
				condition3 = ( (this.resultArr[colIndex][i]["end"] > this.resultArr[comparatorColIndex][j]["start"]) && (this.resultArr[colIndex][i]["end"] < this.resultArr[comparatorColIndex][j]["end"]) );
				if(condition1 || condition2 || condition3) {
					console.log("Column " + this.resultArr[colIndex][i]["id"] + " collides with " + this.resultArr[comparatorColIndex][j]["id"]);
					console.log("Adjusting the width of " + this.resultArr[comparatorColIndex][j]["id"] + " to " + this.resultArr[colIndex][i]["width"]);
					if(this.resultArr[colIndex][i]["width"] > this.resultArr[comparatorColIndex][j]["width"]) {
						this.resultArr[colIndex][i]["width"] =  this.resultArr[comparatorColIndex][j]["width"];
					}
					if(this.resultArr[colIndex][i]["width"] < this.resultArr[comparatorColIndex][j]["width"]) {
						this.resultArr[comparatorColIndex][j]["width"] = this.resultArr[colIndex][i]["width"];
					}
					this.resultArr[comparatorColIndex][j]["left"] = (this.resultArr[comparatorColIndex][j]["width"] * comparatorColIndex) + 10;
					console.log("Adjusted the leftpos of " + this.resultArr[comparatorColIndex][j]["id"] + " to " + this.resultArr[comparatorColIndex][j]["left"]);
				}
			}
		}
	},
	renderEvents: function(){
		var evtHTML = "";
		for(var i=0; i<this.resultArr.length; i++) {
			for(var j=0; j<this.resultArr[i].length; j++){
				if(this.resultArr[i][j]["start"]<3450 && this.resultArr[i][j]["start"]>=0){
					evtHTML += '<div class="day-event tooltip" id="' + this.resultArr[i][j]["id"] 
								+ '" style="top:' + this.resultArr[i][j]["top"] 
										+ 'px; left:' + this.resultArr[i][j]["left"] 
										+ 'px; width:' + this.resultArr[i][j]["width"] 
										+ 'px; height:' + this.resultArr[i][j]["height"] + 'px;'
                    + 'background-color:' + this.resultArr[i][j]["color"] +';'
                    + 'border-left: 4px solid' + this.resultArr[i][j]["bcolor"] +';'
										+ 'px"><span class="evt-txt">' + this.resultArr[i][j]["name"] +'</span><br>' 
            /*
                  + dateAdd(d, 'minute', this.resultArr[i][j]["start"]).getHours() + ':' 
                  + dateAdd(d, 'minute', this.resultArr[i][j]["start"]).getMinutes()
                  + ' - ' +
                  + dateAdd(d, 'minute', this.resultArr[i][j]["end"]).getHours() + ':' 
                  + dateAdd(d, 'minute', this.resultArr[i][j]["end"]).getMinutes() + ', '
                  */
                  + this.resultArr[i][j]["timeloca"]
										+ '<span class="tooltiptext">'
                  + this.resultArr[i][j]["descr"] + '</span></div></div>' ;
				}					
			}
		}
		document.getElementById('day-event-container').innerHTML = evtHTML;	
	}
};

FB.Widgets.DayCalender.initialize();

})();
