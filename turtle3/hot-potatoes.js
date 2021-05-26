<!--
/* hot-potatoes.js (v2007.04.13)
 * ========================================
 * by Gordon Bateson, February 2003
 * Copyright (c) 2003 Gordon Bateson. All Rights Reserved.
 *
 * You are hereby granted a royalty free license to use or modify this 
 * software provided that this copyright notice appears on all copies. 
 *
 * This software is provided "AS IS" without a warranty of any kind.
 * 
 * Documentation and downloads may be available from: 
 * http://www.kanazawa-gu.ac.jp/~gordon/research/hot-potatoes/
 */

// This JavaScript library modifies the SendResults and StartUp functions 
// used by HotPotatoes v5 and v6, so that more (or less!) details about the
// student can be input, and more details of a quiz's questions and answers 
// can be submitted to the server when the quiz is finished

// If the arrays below (Login, DB, JBC, ...) are set BEFORE calling this 
// script, they will NOT be overwritten. Any array that is not set, will 
// use the defaults below. This is useful if you want to use different 
// settings for different quizzes.

// **************
//  Login Screen
// **************

if (window.Login==null) {
	Login = new Array();
	Login[0] = true;	// Show prompt for user name
				// This can also be a string of user names ... 
				// Login[0] = "Guest,Peter,Paul,Mary,Webmaster";
				// or an array of user names (and on-screen texts) (and passwords) ...
				// Login[0] = new Array("Guest", "001,Peter,xxxx", "002,Paul,yyyy", "003,Mary,zzzz", "Webmaster");
				// and can also be  written as ...
				// Login[0] = new Array(
				//	new Array("Guest"),
				//	new Array("001", "Peter", "xxxx"),
				//	new Array("002", "Paul", "yyyy"),
				//	new Array("003", "Mary", "zzzz"),
				//	new Array("Webmaster")
				// );
	Login[1] = true;	// Show prompt for student's UserID
				// If there is no password prompt (i.e. Logon[3] is false), this value 
				// will be checked against the password information, if any, in Login[0]
	Login[2] = false;	// Show prompt for student's email
	Login[3] = false;	// Show prompt for quiz password, and check this value against 
				// the password information, if any, in Login[0]
				// This can also be a string required to start the quiz ...
				// Login[3] = "password";
	Login[4] = false;	// Show prompt for the cookie expiry date
				// If false, cookies expire at the end of the current session
	Login[5] = "guest,webmaster"
				// guest user names (case insensitive) ...  
				// Login[5] = "guest,webmaster"; 
				// These users do NOT need to fill in other login fields
				// and their quiz results are NOT added to the database

	// the Login prompts and error messages 
	// are defined in the MSG array (see below)
}


// *********
//  Database (for use with BFormMail)
// *********

if (window.DB==null) {
	DB = new Array();
	DB[0] = true; // append form fields to database on server
			// If you are NOT using BFormMail's database feature, 
			// set DB[0]=false, and you can then safely ignore DB[1 to 5]
	DB[1] = "/home/gordon/public_html/cgi/hot-potatoes-data"; 
			// append_db folder path (no trailing slash)
			// Can be either an absolute path  e.g. "/home/gordon/public_html/cgi/hot-potatoes-data"
			// or a relative (to CGI bin) path  e.g. "hot-potatoes-data"
	DB[2] = "hot-potatoes"; 
			// append_db file name (no extension)
			// If left blank, the quiz file name, without extension, will be used
			// i.e. each quiz will have its results stored in a different file.
			// If filled in, this file will store the results for ALL quizzes.
			// Database files and folders must be set up BEFORE running the quiz 
			// must have appropriate access privileges (on Unix, use "chmod 666").
	DB[3] = ""; // append_db extension (if left blank, ".txt" will be used)
	DB[4] = ""; // db_fields (if left blank, ALL quiz fields will be sent)
	DB[5] = ""; // db_delimiter (if left blank, tab will be used)
	DB[6] = "REMOTE_ADDR,HTTP_USER_AGENT"; 
			// env_report ('REMOTE_ADDR','HTTP_USER_AGENT' and a few others)

	// for a complete description of these fields are, see ... 
	// http://www.infosheet.com/stuff/BFormMail.readme
}

// By default the quiz's question's scores will be returned. 
// If you want more detailed information, set the flags below:

// ********
//  JBC
// ********

if (window.JBC==null) {
	JBC = new Array();
	JBC[0] = true;	// show separator line between answers on email
	JBC[1] = true;	// show number of attempts to answer question
	JBC[2] = true;	// show question texts
	JBC[3] = true;	// show right answer(s)
	JBC[4] = true;	// show wrong answer(s)
	JBC[5] = true;	// show ignored answer(s)
	JBC[6] = false;	// show answer as text (false) or number (true)
}

// ********
//  JCloze
// ********

if (window.JCloze==null) {
	JCloze = new Array();
	JCloze[0] = true;	// show separator line between answers on email
	JCloze[1] = true;	// show student's correct answer
	JCloze[2] = true;	// show other correct answer(s), if any
	JCloze[3] = true;	// show wrong answer(s), if any (NOT available for v5)
	JCloze[4] = true;	// show number of hints or penalties
	JCloze[5] = true;	// show if clue was asked for or not
	JCloze[6] = true;	// show clue
}

// ********
//  JCross
// ********

if (window.JCross==null) {
	JCross = new Array();
	JCross[0] = false;	// show separator line between answers on email
	JCross[1] = true;	// show number of penalties (hints or checks before complete)
	JCross[2] = false;	// show number of letters
	JCross[3] = false;	// show answers
	JCross[4] = false;	// show clues
}

// ********
//  JMatch
// ********

if (window.JMatch==null) {
	JMatch = new Array();
	JMatch[0] = false;	// show separator line between answers on email
	JMatch[1] = true;	// show number of attempts for each match
	JMatch[2] = false;	// show LHS texts
	JMatch[3] = false;	// show RHS texts
}

// ********
//  JMix
// ********

if (window.JMix==null) {
	JMix = new Array();
	JMix[0] = true;	// show separator line between answers on email
	JMix[1] = true;	// show number of wrong guesses
	JMix[2] = true;	// show right answer
	JMix[3] = true;	// show wrong answer, if any
	JMix[4] = false;	// show answer as text (false) or number (true)
}

// ********
//  JQuiz
// ********

if (window.JQuiz==null) {
	JQuiz = new Array();
	JQuiz[0] = true;	// show separator line between answers on email
	JQuiz[1] = true;	// show question text
	JQuiz[2] = true;	// show student's correct answer(s)
	JQuiz[3] = false;	// show wrong and ignored answer(s)
	JQuiz[4] = true;	// show number of hints requested
	JQuiz[5] = true;	// show number of checks of incorrect answers

	// v6 quizzes only
	JQuiz[6] = true;	// show answer value (false) or A,B,C... index (true)
	JQuiz[7] = false;	// show all students answers
	JQuiz[8] = true;	// show student's wrong answers
	JQuiz[9] = true;	// show ignored answers (not relevant for multi-select questions)
	JQuiz[10] = true;	// show score weightings
	JQuiz[11] = true;	// show question type
}

// **********
//  Rhubarb
// (TexToys)
// **********

if (window.Rhubarb==null) {
	Rhubarb = new Array();
	Rhubarb[0] = true; // show correct words
	Rhubarb[1] = true; // show incorrect words
}

// **********
//  Sequitur
// (TexToys)
// **********

if (window.Sequitur==null) {
	Sequitur = new Array();
}

// **********
//  Messages
// **********

if (window.MSG==null) {
	MSG = new Array();

	// Login prompts
	MSG[0] = 'Name';
	MSG[1] = 'ID';
	MSG[2] = 'Email';
	MSG[3] = 'Password';
	MSG[4] = 'Cookies';

	// Login buttons
	MSG[5] = 'Start the Quiz';
	MSG[6] = 'Cancel';

	// Cookie menu options (only used if Login[4] is true)
	MSG[7] = 'keep for this session only';
	MSG[8] = 'keep for one day';
	MSG[9] = 'keep for one month';
	MSG[10] = 'do NOT keep cookies';

	// Login error messages
	MSG[11] = 'Sorry, you were unable to login. Please try again later.';
	MSG[12] = 'Please fill in all the information.';
	MSG[13] = 'Incorrect Password. Please try again.';
	MSG[14] = 'Incorrect ID. Please try again.';
	MSG[15] = 'Email address does not appear to be valid.';

	// day and month names (used in Start_Time and End_Time)
	MSG[16] = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
	MSG[17] = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');

	// enable popups
	MSG[18] = 'Please enable pop-up windows on your browser.';

	// browser specific instuctions on how to enable popup windows
	var n = navigator;
	var s = n.userAgent.toLowerCase();
	if (n.appName=='Netscape' && s.indexOf('gecko')>=0) {
		// Netscape 6 and 7
		MSG[18] += '\n\n' + 'Edit->Preferences, ' + (s.indexOf('mac')>=0 ? 'Advanced->Scripts & Plugins' : 'Privacy & Security->Popup Window Controls');
	} else if (s.indexOf('safari')>=0) {
		// Safari
		MSG[18] += '\n\n' + 'on Safari menu, uncheck "Block Pop-Up Windows"';
	} else if (s.indexOf('firebird')>=0) {	
		// Firebird
		MSG[18] += '\n\n' + 'Preferences->Web Features, uncheck "Block Pop-Up Windows"';
	} else if (s.indexOf('msie 6')>=0) {
		// IE 6 (WinXP.SP2)
		MSG[18] += '\n\n' + 'Tools->Pop-up Blocker->Turn Off Pop-up Blocker';
	}
}

// ***************
//  Server Fields
// ***************

if (window.ServerFields==null) {
	ServerFields = new Array();

	// these fields will be added to the ResultForm and submitted to the CGI script on the server
	// 'Sort', 'return_link_title', 'return_link_url' and 'print_blank_fields' are used by formmail

	// override the HP setting of sort fields (forces ALL fields to be displayed)
	ServerFields[0] = new Array('sort', '');

	// add link to close pop-up results window
	ServerFields[1] = new Array('return_link_title', 'Close this window');
	ServerFields[2] = new Array('return_link_url', 'javascript:self.close()');

	// make sure zero values are printed
	ServerFields[3] = new Array('print_blank_fields', 'yes');

	// you can also set other fields for your customized CGI script
	// e.g. adding a server defined start time (instead of a client defined start time)
	// ServerFields[4] = new Array('serverStartTime', '<?php echo date("Y-m-d H:i:s") ?>');
}


// the following JavaScript code was compacted using :
// http://www.kanazawa-gu.ac.jp/~gordon/research/tools/code-compactor.html

if(window.ServerFields==null){ServerFields=new Array();ServerFields[0]=new Array('sort','');ServerFields[1]=new Array('return_link_title','Close this window');ServerFields[2]=new Array('return_link_url','javascript:self.close()');ServerFields[3]=new Array('print_blank_fields','yes');}function QuizLogin(LoginPrompt){if((Login[0]||Login[1]||Login[2]||Login[3])&&!is_LMS()){var html=''+'<HTML>'+'<HEAD></HEAD>'+'<BODY bgColor="#cccccc" onLoad="opener.setFocus(self)">'+'<FORM onSubmit="'+'self.ok=true;'+'self.expiry=null;';if(Login[4]){html+="opener.checkOK(self,'CookieExpiry');"}if(Login[0]){html+="opener.checkOK(self,'UserName');"}if(Login[1]){html+="opener.checkOK(self,'UserID');"}if(Login[2]){html+="opener.checkOK(self,'UserEmail');"}if(Login[3]){html+="opener.checkOK(self,'Password');"}html+= 'if(ok){'+'opener.StartQuiz();'+'self.close();'+ '}else{'+'if(isNaN(self.tries))self.tries=0;'+'self.tries++;'+'if(self.tries<3){'+'opener.setFocus(self);'+'}else{'+"alert(opener.MSG[11]);"+'opener.goBack();'+'self.close();'+'}'+ '}'+ 'return false;'+'">';html+='<TABLE>'+'<CAPTION>'+LoginPrompt+'</CAPTION>';if(Login[0]){var v=getCookie(self,'UserName');html+='<TR>'+'<TH align=right nowrap>'+MSG[0]+' :</TH>'+'<TD>';if(typeof(Login[0])=='boolean'){html+='<INPUT type=text name=UserName value="'+v+'">'}else{var comma=(window.RegExp)?new RegExp('\\s*,\\s*'):',';if(typeof(Login[0])=='string'){Login[0]=Login[0].split(comma)}html+='<SELECT name=UserName size=1>'+'<OPTION value=""></OPTION>';for(var i=0;i<Login[0].length;i++){if(typeof(Login[0][i])=='string'){Login[0][i]=Login[0][i].split(comma)}html+=makeOption(Login[0][i][0],v,Login[0][i][1])}html+='</SELECT>'}html+='</TD>'+'</TR>'}if(Login[1]){var v=getCookie(self,'UserID');html+='<TR><TH align=right nowrap>'+MSG[1]+' :</TH><TD><INPUT type=text name=UserID value="'+v+'"></TD></TR>'}if(Login[2]){var v=getCookie(self,'UserEmail');html+='<TR><TH align=right nowrap>'+MSG[2]+' :</TH><TD><INPUT type=text name=UserEmail value="'+v+'"></TD></TR>'}if(Login[3]){var v=getCookie(self,'Password');html+='<TR><TH align=right nowrap>'+MSG[3]+' :</TH><TD><INPUT type=password name=Password value="'+v+'"></TD></TR>'}if(Login[4]){var v=getCookie(self,'CookieExpiry');html+='<TR>'+'<TH align=right nowrap>'+MSG[4]+' :</TH>'+'<TD>'+'<SELECT name="CookieExpiry" size=1>'+makeOption('session',v,MSG[7])+makeOption('day',v,MSG[8])+makeOption('month',v,MSG[9])+makeOption('never',v,MSG[10])+'</SELECT>'+'</TD>'+'</TR>'}html+='<TR>'+'<TH>&nbsp;</TH>'+'<TD nowrap>'+'<INPUT type=submit value="'+MSG[5]+'"> '+'<INPUT type=button value="'+MSG[6]+'" onClick="opener.goBack();self.close();">'+'</TD>'+'</TR>'+'</TABLE></FORM></BODY></HTML>';var m=navigator.userAgent.indexOf('Mac')>=0;var h=(m?80:100);for(var i=0;i<5;i++)h+=(Login[i]?(m?20:25):0);if(!openWindow('','',(m?320:300),h,'RESIZABLE',html)){alert(MSG[18]);}}else{window.UserName=window.UserID=window.UserEmail=window.Password='';window.StartQuiz()}return true}function makeOption(value,v,txt){return '<OPTION value="'+value+'"'+(value==v?' SELECTED':'')+'>'+(txt?txt:value)+'</OPTION>'}function setFocus(w){w.focus();var obj=w.document.forms[0].elements;for(var i=0;i<obj.length;i++){var v=getValue(w,i);if(v==''||obj[i].type=='submit'){obj[i].focus();break}}}function checkOK(w,n){var v=getValue(w,n,true);if(v||(n!='UserName'&&isGuest())){if(n=='CookieExpiry')setCookieExpiry(w,v);setCookie(self,n,v,w.expiry);if(n!='CookieExpiry')eval('self.'+n+'=v')}else{if(w.ok)alert(MSG[12]);w.ok=false}}function getValue(w,n,flag){var obj=w.document.forms[0].elements[n];var TYPE=obj.type.toUpperCase();if(obj.options&&TYPE.indexOf('SELECT')>=0){var v=obj.options[obj.selectedIndex].value}else{var v=obj.value}if(flag){var msg='';if(n=='Password'||(n=='UserID'&&!Login[3])){var pwd=getPassword(w);if(pwd&&v!=pwd)msg=MSG[n=='Password'?13:14]}if(n=='UserEmail'&&window.RegExp){var r='(\\w|-)+';r=r+'(\\.'+r+')';r=new RegExp('^('+r+'*)@('+r+'+)$');if(v.match(r)==null)msg=MSG[15]}if(msg){obj.value=v='';if(w.ok)alert(msg);w.ok=false}}return v}function getPassword(w){var pwd='';if(Login[3]&&typeof(Login[3])=='string'){pwd=Login[3]}else if((Login[3]||Login[1])&&typeof(Login[0])=='object'){var username=getValue(w,'UserName');for(var i=0;i<Login[0].length;i++){if(username==Login[0][i][0]){pwd=Login[0][i][2];break}}}return pwd}function setCookieExpiry(w,v){if(v=='never'){w.expiry=new Date('Thu, 01-Jan-70 00:00:01 GMT')}else if(v=='day'||v=='month'){var ms=(v=='month'?31:1)*60*60*24*1000;w.expiry=new Date((new Date()).getTime()+ms)}}function setCookie(w,name,value,expires,path,domain,secure){if(name)w.document.cookie=''+'HP_'+name+"="+escape(value)+(expires?"; expires="+expires.toGMTString():"")+(path?"; path="+path:"")+(domain?"; domain="+domain:"")+(secure?"; secure":"")}function getCookie(w,n){var c=w.document.cookie;var i=c.indexOf('HP_'+n+'=');var j=(i<0)?-1:c.indexOf(';',(i+=n.length+4));return(i<0)?'':unescape(c.substring(i,((j<0)?c.length:j)))}function goBack(w){if(w==null)w=self;if(w.history.length)w.history.back()}function openWindow(url,name,width,height,attributes,html){if(window.screen&&width&&height){var W=screen.availWidth;var H=screen.availHeight;width=Math.min(width,W);height=Math.min(height,H);attributes=''+(attributes?(attributes+','):'')+'WIDTH='+width+',HEIGHT='+height}var ie_offline=(document.all&&location.protocol=='file:');var w=window.open((ie_offline?'':url),name,attributes);if(w){if(window.screen&&width&&height){w.moveTo((W-width)/2,(H-height)/2)}if(html){with(w.document){clear();open();write(html);close()}}else{if(ie_offline&&url)w.location=url}}return w}function SendAllResults(Score){if(!is_LMS()){AddDatabaseDetailsToResultForm();AddStudentDetailsToResultForm();AddQuestionDetailsToResultForm();AddServerFieldsToResultForm();if(DB[9]){ResultForm=replaceLast('method="get"','method="post"',ResultForm)}var w=openWindow('','',500,400,'RESIZABLE,SCROLLBARS,LOCATION',ResultForm);if(w){var form=w.document.forms[0];form.Score.value=Score+'%';form.realname.value=UserName;form.Start_Time.value=getTime(Start_Time);form.End_Time.value=getTime();form.subject.value=document.title;form. Exercise.value=document.title;if(DB[0]&&!isGuest())set_db_fields(form);if(DB[7])form.action=DB[7];if(DB[8])form.recipient.value=DB[8];if(navigator.appName=='Netscape'&&(location.protocol=='file:'||navigator.userAgent.indexOf('Netscape6')>=0)){var url=form.action;var obj=form.elements;for(var i=0;i<obj.length;i++){var v=escape(obj[i].value);v=v.replace((new RegExp('\\+','g')),'%2B');url+=(i==0?'?':'&')+obj[i].name+'='+v}w.location.href=url}else{form.submit()}}else{alert(MSG[18])}}}function isGuest(){var flag=false;var n=getCookie(self,'UserName').toLowerCase();if(n){if(typeof(Login[5])=='string'){Login[5]=Login[5].split(',')}for(var i=0;i<Login[5].length;i++){if(n==Login[5][i].toLowerCase()){flag=true;break}}}return flag}function set_db_fields(form){if(DB[4]==''&&window.RegExp){var db_fields=''+'subject,realname'+(Login[1]?',ID':'')+(Login[2]?',email':'')+(Login[3]?',password':'')+',Score,Start_Time,End_Time';var r=new RegExp('^[^_]+_q\\d\\d_\\w+$');for(var i=0;i<form.elements.length;i++){var n=form.elements[i].name;if(r.test(n))db_fields+=','+n}form.db_fields.value=db_fields}form.db_delimiter.value=(DB[5]?DB[5]:'\t')}function AddStudentDetailsToResultForm(){var sDetails='';if(Login[0]){}if(Login[1]){sDetails+=makeHiddenField('ID',window.UserID)}if(Login[2]){sDetails+=makeHiddenField('email',window.UserEmail)}if(sDetails&&window.RegExp){var r=new RegExp('<input[^>]*Score[^>]*><\\/input>','i');var m=r.exec(ResultForm);if(m){ResultForm=ResultForm.replace(m[0],sDetails+m[0]+makeSeparator('Time_'));sDetails=''}}if(Login[3]){sDetails+=makeHiddenField('Password',window.Password);ResultForm=replaceLast('</form>',sDetails+'</form>',ResultForm)}}function AddQuestionDetailsToResultForm(){var qDetails=GetQuestionDetails();if(qDetails){ResultForm=replaceLast('</form>',qDetails+'</form>',ResultForm)}}function AddDatabaseDetailsToResultForm(){if(window.DB&&DB[0]&&!isGuest()){var dbDetails='';var folder=DB[1];if(folder&&folder.charAt(folder.length-1)!='/')folder+='/';var file=DB[2];if(file==''){file=location.href;file=file.substring(file.lastIndexOf('/')+1);var i=file.indexOf('?');if(i>=0)file=file.substring(0,i);var i=file.lastIndexOf('.');if(i>=0)file=file.substring(0,i)}var ext=(DB[3]?DB[3]:'txt');if(ext.charAt(0)!='.')ext='.'+ext;dbDetails+=makeHiddenField('append_db',folder+file+ext);dbDetails+=makeHiddenField('db_fields',DB[4]);dbDetails+=makeHiddenField('db_delimiter','');if(DB[6])dbDetails+=makeHiddenField('env_report',DB[6]);ResultForm=replaceLast('</form>',dbDetails+'</form>',ResultForm)}}function AddServerFieldsToResultForm(){if(window.ServerFields){var s='';for(var i=0;i<ServerFields.length;i++){if(ServerFields[i][0]&&window.RegExp){var r=new RegExp('<input[^>]*name\\s*=\\s*["\']\\s*'+ServerFields[i][0]+'[^>]*>(\\s*<\\/input>)?','i');if(r.test(ResultForm)){ResultForm=ResultForm.replace(r,'')}}if(ServerFields[i][1]){s+=makeHiddenField(ServerFields[i][0],ServerFields[i][1])}}if(s)ResultForm=replaceLast('</form>',s+'</form>',ResultForm)}}function replaceLast(a,b,c){var l=a.length;var i=c.lastIndexOf(a);return(i<0||l==0)?c:(c.substring(0,i)+b+c.substring(i+l))}function GetQuestionDetails(){var t=get_quiz_type();var v=get_quiz_version();return(t==1)?GetJbcQuestionDetails(v):(t==2)?GetJClozeQuestionDetails(v):(t==3)?GetJCrossQuestionDetails(v):(t==4)?GetJMatchQuestionDetails(v):(t==5)?GetJMixQuestionDetails(v):(t==6)?GetJQuizQuestionDetails(v):(t==7)?GetRhubarbDetails(v):(t==8)?GetSequiturDetails(v):''}function GetJbcQuestionDetails(v){qDetails='';if(v==5||v==6){for(var q=0;q<I.length;q++){var aDetails=new Array();aDetails[0]=new Array();aDetails[1]=new Array();aDetails[2]=new Array();for(var a=0;a<I[q][1].length;a++){var i=(Status[q][1][a]=='R')?0:(Status[q][1][a]=='0')?2:1;aDetails[i][aDetails[i].length]=(JBC[6]?a:I[q][1][a][0])}var Q=getQ('JBC',q);if(JBC[0])qDetails+=makeSeparator(Q);if(JBC[1]){qDetails+=makeHiddenField(Q+'attempts',Status[q][2]+(Status[q][0]==1?1:0))}if(JBC[2]){qDetails+=makeHiddenField(Q+'text',I[q][0])}if(JBC[3]&&(DB[0]||aDetails[0].length>0)){qDetails+=makeHiddenField(Q+'right',aDetails[0])}if(JBC[4]&&(DB[0]||aDetails[1].length>0)){qDetails+=makeHiddenField(Q+'wrong',aDetails[1])}if(JBC[5]&&(DB[0]||aDetails[2].length>0)){qDetails+=makeHiddenField(Q+'ignored',aDetails[2])}if(isNaN(Status[q][3])){var a1=Status[q][1].length;var a2=Status[q][2];Status[q][3]=(a1<1||a1<(a2-1))?0:((a1-(a2-1))/a1)}qDetails+=makeHiddenField(Q+'score',Math.floor(Status[q][3]*100)+'%')}}return qDetails}function GetJClozeQuestionDetails(v){var qDetails='';if(v==5||v==6){var hp5=(State[0].Guesses==null);for(var q=0;q<State.length;q++){var Q=getQ('JCloze',q);if(JCloze[0])qDetails+=makeSeparator(Q);var x=(hp5?State[q][3]:State[q].ItemScore);qDetails+=makeHiddenField(Q+'score',Math.floor(x*100)+'%');var correct=(hp5?State[q][5]:State[q].Guesses[State[q].Guesses.length-1]);if(JCloze[1]){qDetails+=makeHiddenField(Q+'correct',correct)}if(JCloze[2]){var ignored=new Array();for(var i=0,ii=0;i<I[q][1].length;i++){if(I[q][1][i][0]&&(I[q][1][i][0].toUpperCase()!=correct.toUpperCase())){ignored[ii++]=I[q][1][i][0]}}if(DB[0]||ignored.length>0)qDetails+=makeHiddenField(Q+'ignored',ignored)}if(JCloze[3]&&State[q].Guesses){var wrong=new Array();for(var i=0,ii=0;i<State[q].Guesses.length-1;i++){wrong[ii++]=State[q].Guesses[i]}if(DB[0]||ii>0)qDetails+=makeHiddenField(Q+'wrong',wrong)}if(JCloze[4]){var x=(hp5?State[q][1]:State[q].HintsAndChecks);qDetails+=makeHiddenField(Q+'penalties',x)}if(JCloze[5]){var x=(hp5?State[q][0]:State[q].ClueGiven);qDetails+=makeHiddenField(Q+'clue_shown',(x?'YES':'NO'))}if(JCloze[6]){qDetails+=makeHiddenField(Q+'clue_text',I[q][2])}}}return qDetails}function GetJCrossQuestionDetails(v){var qDetails='';if(v==5||v==6){var letters=0;for(var row=0;row<L.length;row++){for(var col=0;col<L[row].length;col++){if(L[row][col])letters++;var q=(v==5)?C[row][col]:CL[row][col];if(q){var Q=getQ('JCross',q);var clue_A=(v==5)?A[q]:GetJCrossClue('Clue_A_'+q);var clue_D=(v==5)?D[q]:GetJCrossClue('Clue_D_'+q);if(JCross[0]&&(clue_A||clue_D)){qDetails+=makeSeparator(Q)}if(clue_A){if(JCross[3])qDetails+=makeHiddenField(Q+'across',GetJCrossWord(G,row,col));if(JCross[4])qDetails+=makeHiddenField(Q+'across_clue',clue_A)}if(clue_D){if(JCross[3])qDetails+=makeHiddenField(Q+'down',GetJCrossWord(G,row,col,true));if(JCross[4])qDetails+=makeHiddenField(Q+'down_clue',clue_D)}}}}if(JCross[2]){qDetails=makeHiddenField('JCross_letters',letters)+qDetails}if(JCross[1]){qDetails=makeHiddenField('JCross_penalties',window.Penalties)+qDetails}}return qDetails}function GetJCrossClue(id){var obj=(document.getElementById)?document.getElementById(id):null;return(obj)?GetChildNodesText(obj,'Clue'):''}function GetJCrossWord(a,r,c,goDown){var s='';while(r<a.length&&c<a[r].length&&a[r][c]){s+=a[r][c];if(goDown){r++}else{c++}}return s}function GetJMatchQuestionDetails(v){var qDetails='';var hp5=(window.I)?true:false;if(hp5||v==6||v==6.1){if(JMatch[1]&&v==6.1){qDetails+=makeHiddenField('JMatch_attempts',Penalties+1)}var max_q=(hp5||v==6)?Status.length:F.length;for(var q=0;q<max_q;q++){var Q=getQ('JMatch',q);if(JMatch[0]&&(JMatch[1]||JMatch[2]||JMatch[3])){qDetails+=makeSeparator(Q)}if(JMatch[1]&&(hp5||v==6)){qDetails+=makeHiddenField(Q+'attempts',Status[q][1])}if(JMatch[2]){var x=(hp5)?I[q][0]:(v==6)?GetJMatchText(q,'LeftItem'):F[q][0];qDetails+=makeHiddenField(Q+'lhs',x)}if(JMatch[3]){var x=(hp5)?I[q][1]:(v==6)?GetJMatchText(q,'RightItem'):GetJMatchRHS(q);qDetails+=makeHiddenField(Q+'rhs',x)}}}return qDetails}function GetJMatchText(q,className){var obj=(document.getElementById)?document.getElementById('Questions'):null;return(obj)?GetChildNodesText(obj.childNodes[q],className):''}function GetJMatchRHS(q){var max_i=(window.F&&window.D)?F.length:0;for(var i=0;i<max_i;i++){if(D[i][2]==F[q][1])break}return(i<max_i)?D[i][0]:''}function GetJMixQuestionDetails(v){qDetails='';if(v==5||v==6||v==6.1){var A=Answers.length;for(var a=0;a<A;a++){var G=Answers[a].length;for(var g=0;g<G;g++){if(Answers[a][g]!=GuessSequence[g])break}if(g>=G)break}var isWrong=(a>=A);var Q=getQ('JMix',0);if(JMix[0])qDetails+=makeSeparator(Q);var score=isWrong?0:((Segments.length-Penalties)/Segments.length);qDetails+=makeHiddenField(Q+'score',Math.floor(score*100)+'%');if(JMix[1]){qDetails+=makeHiddenField(Q+'wrongGuesses',Penalties)}if(JMix[2]){qDetails+=makeHiddenField(Q+'right',GetJMixSequence(Answers[isWrong?0:a]))}if(JMix[3]&&isWrong){qDetails+=makeHiddenField(Q+'wrong',GetJMixSequence(GuessSequence))}}return qDetails}function GetJMixSequence(indexes){var s=new Array();for(var i=0;i<indexes.length;i++){s[i]=JMix[4]?indexes[i]:GetJMixSegmentText(indexes[i])}return s}function GetJMixSegmentText(index){var i_max=Segments.length;for(var i=0;i<i_max;i++){if(Segments[i][1]==index)break}return(i<i_max)?Segments[i][0]:''}function GetJQuizQuestionDetails(v){var qDetails='';var hp=(window.Status)?5:(window.State)?6:0;if(hp){var max_q=(hp==5)?Status.length:State.length;for(var q=0;q<max_q;q++){if(hp==6&&!State[q])continue;var Q=getQ('JQuiz',q);if(JQuiz[0])qDetails+=makeSeparator(Q);if(hp==6&&JQuiz[11]){var x=parseInt(I[q][2]);x=(x==0)?'multiple-choice':(x==1)?'short-answer':(x==2)?'hybrid':(x==3)?'multi-select':'n/a';qDetails+=makeHiddenField(Q+'type',x)}var x=(hp==5)?Status[q][4]*10:I[q][0]*State[q][0];qDetails+=makeHiddenField(Q+'score',Math.floor(x)+'%');if(hp==6&&JQuiz[10]){qDetails+=makeHiddenField(Q+'weighting',I[q][0])}if(JQuiz[1]){var x=(hp==5)?I[q][0]:(document.getElementById)?GetChildNodesText(document.getElementById('Q_'+q),'QuestionText'):'';qDetails+=makeHiddenField(Q+'question',x)}if(JQuiz[2]){var x=(hp==5)?Status[q][3]:GetJQuizAnswerDetails(q,2);qDetails+=makeHiddenField(Q+'correct',x)}if(JQuiz[3]){var x=(hp==5)?'':GetJQuizAnswerDetails(q,1);if(hp==5){for(var i=0;i<I[q][1].length;i++){if(I[q][1][i][0]&&(I[q][1][i][0].toUpperCase()!=Status[q][3].toUpperCase())){x+=((x?',':'')+I[q][1][i][0])}}}if(DB[0]||x)qDetails+=makeHiddenField(Q+'other',x)}if(hp==6&&JQuiz[7]){var x=GetJQuizAnswerDetails(q,0);qDetails+=makeHiddenField(Q+'selected',x)}if(hp==6&&JQuiz[8]){var x=GetJQuizAnswerDetails(q,3);qDetails+=makeHiddenField(Q+'wrong',x)}if(hp==6&&JQuiz[9]){var x=GetJQuizAnswerDetails(q,4);qDetails+=makeHiddenField(Q+'ignored',x)}if(JQuiz[4]){var x=(hp==5)?Status[q][2]:State[q][4];qDetails+=makeHiddenField(Q+'hints',x)}if(JQuiz[5]){var x=(hp==5)?Status[q][1]:(State[q][2]-1);qDetails+=makeHiddenField(Q+'checks',x)}}}return qDetails}function GetChildNodesText(obj,className){var txt='';if(obj){if(className&&obj.className==className){className=''}if(className==''&&obj.nodeType==3){txt=obj.nodeValue+' ';}if(obj.childNodes){for(var i=0;i<obj.childNodes.length;i++){txt+=GetChildNodesText(obj.childNodes[i],className)}}}return txt}function GetJQuizAnswerDetails(q,flag){var x=State[q][5];if(I[q][2]=='3'){if(flag==4){var x=new Array()}else{var i=x.lastIndexOf('|');var x=x.substring((flag==2?(i+1):1),((flag==0||flag==2)?x.length:i)).split('|')}for(var i=0;i<x.length;i++){var a=new Array();for(var ii=0;ii<x[i].length;ii++){if(x[i].charAt(ii)=='Y'){var s=JQuiz[6]?String.fromCharCode(97+ii):I[q][3][ii][0];if(s&&s.replace&&window.RegExp){s=s.replace(new RegExp('\\+','g'),'&#43;')}a.push(s)}}x[i]=a.join('+')}}else{    if(x){      if(x.charAt(x.length-1)==','){        x=x.substring(0,x.length-1);     }   }    if(x){  x=x.split(',');  if(flag){  var a=new Array();  if(flag==1||flag==2||flag==3){  for(var i=0;i<x.length;i++){  var ii=I[q][3][(x[i].charCodeAt(0)-65)][2];  if(((flag==1||flag==2)&&ii==1)||(flag==3&&ii==0))a.push(x[i]); } }  if(flag==1){  x=a;  a=new Array(); }  if(flag==1||flag==4){  for(var i=0;i<I[q][3].length;i++){  var s=String.fromCharCode(65+i);  for(var ii=0;ii<x.length;ii++){  if(x[ii]==s)break; }  if(ii==x.length)a.push(s); } }  x=a;     }}if(JQuiz[6]==false){for(var i=0;i<x.length;i++){var ii=x[i].charCodeAt(0)-65;x[i]=I[q][3][ii][0]}}}return x}function GetRhubarbDetails(v){qDetails='';if(v==6){var Q=getQ('Rhubarb',0);if(Rhubarb[0]){qDetails+=makeHiddenField(Q+'correct',Words.length+' words')}if(Rhubarb[1]){var x=Detail.substring(15).split(' ');qDetails+=makeHiddenField(Q+'wrong',x)}}return qDetails}function GetSequiturDetails(v){qDetails='';return qDetails}function pad(i,l){var s=(i+'');while(s.length<l)s='0'+s;return s}function getQ(section,q){return section+'_q'+(q<9?'0':'')+(q+1)+'_'}function makeSeparator(Q){return is_LMS()?'':makeHiddenField(Q.substring(0,Q.length-1),'---------------------------------')}function makeHiddenField(name,value){var field='';var t=typeof(value);if(t=='string'){value=encode_entities(value)}else if(t=='object'){var values=value;var i_max=values.length;value='';for(var i=0;i<i_max;i++){values[i]=trim(values[i]);if(values[i]!=''){value+=(i==0?'':',')+ encode_entities(values[i])}}}if(is_LMS()){if(value&&value.indexOf&&value.indexOf('<')>=0&&value.indexOf('>')>=0){value='<![CDATA['+value+']]>'}field='<field><fieldname>'+name+'</fieldname><fielddata>'+value+'</fielddata></field>'}else{field='<INPUT type=hidden name="'+name+'" value="'+value+'">'}return field}function trim(s){var i=0;var ii=s.length;while(i<ii&&s.charAt(i)==' '){i++}while(ii>i&&s.charAt(ii-1)==' '){ii--}return s.substring(i,ii)}function encode_entities(s_in){var i_max=(s_in)?s_in.length:0;var s_out='';for(var i=0;i<i_max;i++){var c=s_in.charCodeAt(i);s_out+=(c<128)? s_in.charAt(i):('&#x'+pad(c.toString(16),4)+';')}return s_out}function getTime(obj){obj=obj?obj:new Date();var s=is_LMS()?obj.getFullYear()+'-'+pad(obj.getMonth()+1,2)+'-'+pad(obj.getDate(),2):MSG[16][obj.getDay()]+' '+MSG[17][obj.getMonth()]+' '+pad(obj.getDate(),2)+' '+obj.getFullYear();s+=' '+pad(obj.getHours(),2)+':'+pad(obj.getMinutes(),2)+':'+pad(obj.getSeconds(),2);var x=obj.getTimezoneOffset();if(!isNaN(x)){s+=' '+(is_LMS()?'':'GMT')+(x<0?'+':'-');x=Math.abs(x);s+=pad(parseInt(x/60),2)+pad(x-(parseInt(x/60)*60),2)}return s}function getFunction(fn){if(typeof(fn)=='string'){fn=eval('window.'+fn)}return(typeof(fn)=='function')?fn:null}function getFunctionCode(fn,extra){var s='';var obj=getFunction(fn);if(obj){s=obj.toString();var i1=s.indexOf('{')+1;var i2=s.lastIndexOf('}');if(i1>0&&i1<i2){s=s.substring(i1,i2)}}return s+(extra?extra:'')}function getFunctionArgs(fn){var a=new Array();var obj=getFunction(fn);if(obj){var s=obj.toString();var i1=s.indexOf('(')+1;var i2=s.indexOf(')');if(i1>0&&i1<i2){a=s.substring(i1,i2).split(',')}}return(a.length)?('"'+a.join('","')+'",'):''}function getPrompt(fn){var s=getFunctionCode(fn);var i1=s.indexOf('prompt')+8;var i2=s.indexOf(s.charAt(i1-1),i1);var p=(i1>=8&&i2>i1)?s.substring(i1,i2):'';if(window.RegExp){var r=new RegExp('u([0-9A-F]{4})');var m=r.exec(p);while(m){p=p.replace(m[0],'&#'+parseInt(m[1],16)+';');m=r.exec(p)}}return p}function getStartUpCode(fn){var s=getFunctionCode(fn);var i1=s.indexOf('GetUserName();');if(i1>=0){var i2=i1+14}else{var i1=s.indexOf('UserName');var i2=s.indexOf('}',s.indexOf('}',i1+8)+1)+1}return(0<i1&&i1<i2)?s.substring(0,i1)+s.substring(i2):''}function is_LMS(){return document.forms['store']?true:false}if(Array.prototype&&Array.prototype.push==null){Array.prototype.push=new Function("x","this[this.length]=x")}if(window.attachEvent==null){window.attachEvent=new Function('evt','fn','eval("window."+evt+"="+fn)')}if(document.attachEvent==null){document.attachEvent=new Function('evt','fn','eval("document."+evt+"="+fn)')}if(navigator.userAgent.indexOf("Netscape6")>=0&&window.ShowMessage){var s=ShowMessage.toString();var r=new RegExp('document\\.getElementById\\((\'|")FeedbackOKButton(\'|")\\)\\.focus\\(\\);','gi');s=s.substring(s.indexOf('{')+1,s.lastIndexOf('}')).replace(r,'');window.ShowMessage=new Function('Feedback',s)}function sniff_quiz(){if(!window.quiz)window.quiz=new Object();if(!quiz.v||!quiz.t){var v=0;var t=0;var d=document;var f=d.forms;if(f.QuizForm&&f.CheckForm&&self.CorrectAnswers){v=3;t=4;}else if(self.FeedbackFrame&&self.CodeFrame){v=3;f=CodeFrame.document.forms;t=(f.QuizForm)?1:(f.Cloze)?2:(f.Crossword)?3:(f.QForm1)?6:0}else if(self.DynLayer){v=4;if(d.layers){var lyr=d.QuestionDiv||d.CWDiv||d.TitleDiv||null;if(lyr)f=lyr.document.forms}t=(f.QForm&&f.QForm.FB0)?1:(f.Cloze)?2:(f.Crossword)?3:(f.ExCheck)?4:(f.QForm&&f.QForm.Answer)?6:0}else if(self.TopFrame&&self.BottomFrame){v=5;f=BottomFrame.document.forms;t=(f.QForm&&f.QForm.elements[0].name.substring(0,3)=='FB_')?1:(f.Cloze)?2:(self.GetAnswerOpener&&GetAnswerOpener.indexOf('AnswerForm')>=0)?3:(f.QForm&&self.RItems)?4:(f.ButtonForm)?5:(f.QForm0&&f.Buttons0)?6:0}else if(GetObj(d,'MainDiv')){v=6;var obj=(f.QForm)?f.QForm.elements:null;t=(obj&&obj.length>0&&obj[0].id=='')?1:(f.Cloze)?2:(GetObj(d,'GridDiv')||GetObj(d,'Clues'))?3:GetObj(d,'MatchDiv')?4:GetObj(d,'SegmentDiv')?5:((f.QForm&&f.QForm.Guess)||GetObj(d,'Questions'))?6:0}else if(GetObj(d,'D0')){v=6.1;t=(GetObj(d,'F0'))?4:(GetObj(d,'Drop0'))?5:0}else if(window.Words&&f.Rhubarb){v=6;t=7;}else if(window.Segments&&GetObj(d,'Story')){v=6;t=8;}if(v)quiz.v=v;if(t)quiz.t=t;}}function get_quiz_type(){sniff_quiz();return quiz.t}function get_quiz_version(){sniff_quiz();return quiz.v}function all_finished(a,s,aa,ss){var r=true;var l=(typeof(a)=="string")?eval(a+".length"):a?a.length:0;for(var i=0;i<l;i++){if(s&&eval(s))r=false;var ll=(typeof(aa)=="string")?eval(aa+".length"):aa?aa.length:0;for(var ii=0;ii<ll;ii++){if(ss&&eval(ss))r=false}}return r}function is_finished(){var r=false;var t=get_quiz_type();var v=get_quiz_version();if(t==1){if(v==3)r=all_finished(DoneStatus,"i>0 && a[i]=='0'");else if(v==4)r=all_finished(DoneStatus,"a[i]==0");else if(v==5||v==6)r=all_finished(Status,"a[i][0]==0")}else if(t==2){if(v==3||v==4||v==5||v==6)r=all_finished(I,"CheckAnswer(i)==-1");}else if(t==3){if(v==3)r=all_finished(document.Crossword.elements,"ConvertCase(is.mac?unescape(MacStringToWin(a[i].value)):a[i].value,1)!=Letters[i]");else if(v==4)r=all_finished(WinLetters,"ConvertCase(GetBoxValue(i),1).charAt(0) != a[i].charAt(0)");else if(v==5)r=all_finished(L,"","L[i]","L[i][ii] && L[i][ii]!=G[i][ii]")}else if(t==4){if(v==3)r=all_finished(CorrectAnswers,"document.QuizForm.elements[i*2].selectedIndex != a[i]");else if(v==4)r=all_finished(Draggables,"a[i].correct!='1'");else if(v==5)r=all_finished(I,"I[i][2]<1 && I[i][0].length>0 && Status[i][0]<1 && GetAnswer(i)!=I[i][3]");else if(v==6)r=all_finished(D,"D[i][2]==0 || D[i][2]!=D[i][1]")}else if(t==5){if(v==5||v==6)r=!all_finished(Answers,"a[i].join(',')=='"+GuessSequence.join(',')+"'")}else if(t==6){if(v==3||v==4)r=all_finished(State,"a[i][0]==0");else if(v==5||v==6)r=all_finished(State,"a[i] && a[i][0]<0")}else if(t==7){if(v==6)r=all_finished(DoneList,"a[i]==1")}else if(t==8){if(v==6)r=(CurrentNumber==TotalSegments||AllDone)}return r;}function GetObj(d,id){return d.getElementById?d.getElementById(id):d.all?d.all[id]:d[id]}if(window.Finish==null){var f=window.WriteFeedback?'WriteFeedback':'CheckAnswer';var s=getFunctionCode(f,'if(is_finished())Finish();');var a=getFunctionArgs(f);eval('window.'+f+'=new Function('+a+'s)')}function Finish(){var f=document.store;if(f){var mark=(window.Score?Score:window.FinalScore?FinalScore:0);f.starttime.value=getTime(Start_Time);f.endtime.value=getTime();f.mark.value=mark;f.detail.value='<?xml version="1.0"?><hpjsresult><fields>'+GetQuestionDetails()+'</fields></hpjsresult>';f.submit()}}if(DB[7]&&DB[8]&&!is_LMS()){ResultForm=''+'<html><body>'+'<form name="Results" action="" method="post" enctype="x-www-form-encoded">'+makeHiddenField('recipient','')+makeHiddenField('subject','')+makeHiddenField('Exercise','')+makeHiddenField('realname','')+makeHiddenField('Score','')+makeHiddenField('Start_Time','')+makeHiddenField('End_Time','')+makeHiddenField('title','Thanks!')+'</form>'+'</body></html>'}var p=getPrompt(window.GetUserName||window.StartUp);var c=getStartUpCode(window.StartUp);if(p&&c){window.StartUp=new Function('QuizLogin("'+p+'")');window.StartQuiz=new Function('if(!is_LMS()){'+c+'}')}window.SendResults=SendAllResults;var Start_Time=new Date();

//-->