function Square(name, pricetext, color, price, groupNumber, baserent, rent1, rent2, rent3, rent4, rent5) {
	this.name = name;
	this.pricetext = pricetext;
	this.color = color;
	this.owner = 0;
	this.mortgage = false;
	this.house = 0;
	this.hotel = 0;
	this.groupNumber = groupNumber || 0;
	this.price = (price || 0);
	this.baserent = (baserent || 0);
	this.rent1 = (rent1 || 0);
	this.rent2 = (rent2 || 0);
	this.rent3 = (rent3 || 0);
	this.rent4 = (rent4 || 0);
	this.rent5 = (rent5 || 0);
	this.landcount = 0;

	if (groupNumber === 3 || groupNumber === 4) {
		this.houseprice = 50;
	} else if (groupNumber === 5 || groupNumber === 6) {
		this.houseprice = 100;
	} else if (groupNumber === 7 || groupNumber === 8) {
		this.houseprice = 150;
	} else if (groupNumber === 9 || groupNumber === 10) {
		this.houseprice = 200;
	} else {
		this.houseprice = 0;
	}
}

function Card(text, action) {
	this.text = text;
	this.action = action;
}

function corrections() {
	document.getElementById("cell1name").textContent = "Mediter-ranean Avenue";
}

function utiltext() {
	return '&nbsp;&nbsp;&nbsp;&nbsp;If either one is owned, rent is 4 times amount shown on dice.<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;If both are owned rent is 10 times amount shown on dice.';
}

function transtext() {
	return '<div style="font-size: 14px; line-height: 1.5;">Rent<span style="float: right;">D25.</span><br />IF 2 OWNED<span style="float: right;">50.</span><br />If 3 OWNED "<span style="float: right;">100.</span><br />If 4 OWNED "<span style="float: right;">200.</span></div>';
}

function luxurytax() {
	addAlert(player[turn].name + " paid D100 for landing on Open Internet.");
	player[turn].pay(100, 0);

	$("#landed").show().text("You landed on Open Internet. You owe D100.");
}

function citytax() {
	addAlert(player[turn].name + " paid D200 for landing on Internet Tax.");
	player[turn].pay(200, 0);

	$("#landed").show().text("You landed on Internet Tax. Pay D200.");
}

var square = [];

square[0] = new Square("GO", "COLLECT D200 SALARY AS YOU PASS.", "#FFFFFF");
square[1] = new Square("GDPR", "D60", "#8B4513", 60, 3, 2, 10, 30, 90, 160, 250);
square[2] = new Square("Community Chest", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF");
square[3] = new Square("INTERNET ACCESS", "D60", "#8B4513", 60, 3, 4, 20, 60, 180, 320, 450);
square[4] = new Square("INTERNET TAX", "Pay D200", "#FFFFFF");
square[5] = new Square("COMMUNITY NETWORKS", "D200", "#FFFFFF", 200, 1, 10); //edit later
square[6] = new Square("DIGITAL LITERACY", "D100", "#87CEEB", 100, 4, 6, 30, 90, 270, 400, 550);
square[7] = new Square("Chance", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF");
square[8] = new Square("DATA COST", "D100", "#87CEEB", 100, 4, 6, 30, 90, 270, 400, 550);
square[9] = new Square("FOE", "D120", "#87CEEB", 120, 4, 8, 40, 100, 300, 450, 600);
square[10] = new Square("Just Visiting", "", "#FFFFFF");
square[11] = new Square("OPEN DATA", "D140", "#FF0080", 140, 5, 10, 50, 150, 450, 625, 750);
square[12] = new Square("ISP", "D150", "#FFFFFF", 150, 2);
square[13] = new Square("DIGITAL DIVIDE", "D140", "#FF0080", 140, 5, 10, 50, 150, 450, 625, 750);
square[14] = new Square("FOSS", "D160", "#FF0080", 160, 5, 12, 60, 180, 500, 700, 900);
square[15] = new Square("DIGITAL CITIZENSHIP", "D200", "#FFFFFF", 200, 1, 10); //edit later
square[16] = new Square("CENSORSHIP", "D180", "#FFA500", 180, 6, 14, 70, 200, 550, 750, 950);
square[17] = new Square("Community Chest", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF");
square[18] = new Square("INTERNET SHUTDOWN", "D180", "#FFA500", 180, 6, 14, 70, 200, 550, 750, 950);
square[19] = new Square("PRIVACY", "D200", "#FFA500", 200, 6, 16, 80, 220, 600, 800, 1000);
square[20] = new Square("Free Parking", "", "#FFFFFF");
square[21] = new Square("ENCRYPTION", "D220", "#FF0000", 220, 7, 18, 90, 250, 700, 875, 1050);
square[22] = new Square("Chance", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF");
square[23] = new Square("SURVEILLANCE", "D220", "#FF0000", 220, 7, 18, 90, 250, 700, 875, 1050);
square[24] = new Square("NET NEUTRALITY", "D240", "#FF0000", 240, 7, 20, 100, 300, 750, 925, 1100);
square[25] = new Square("INTERNET GOVERNANCE", "D200", "#FFFFFF", 200, 1, 10); //edit later
square[26] = new Square("LOCAL CONTENT", "D260", "#FFFF00", 260, 8, 22, 110, 330, 800, 975, 1150);
square[27] = new Square("CYBER TERRORISM", "D260", "#FFFF00", 260, 8, 22, 110, 330, 800, 975, 1150);
square[28] = new Square("INTERNET COURT", "D150", "#FFFFFF", 150, 2);
square[29] = new Square("COPYRIGHT", "D280", "#FFFF00", 280, 8, 24, 120, 360, 850, 1025, 1200);
square[30] = new Square("Go to Jail", "Go directly to Jail. Do not pass GO. Do not collect D200.", "#FFFFFF");
square[31] = new Square("INCLUSIVITY", "D300", "#008000", 300, 9, 26, 130, 390, 900, 1100, 1275);
square[32] = new Square("CHILDREN'S RIGHTS", "D300", "#008000", 300, 9, 26, 130, 390, 900, 1100, 1275);
square[33] = new Square("Community Chest", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF");
square[34] = new Square("CYBERBULLYING", "D320", "#008000", 320, 9, 28, 150, 450, 1000, 1200, 1400);
square[35] = new Square("Chance", "FOLLOW INSTRUCTIONS ON TOP CARD", "#FFFFFF");
square[36] = new Square("INTERNET OF THINGS", "D200", "#FFFFFF", 200, 1, 10); //edit later
square[37] = new Square("HATE SPEECH", "D350", "#0000FF", 350, 10, 35, 175, 500, 1100, 1300, 1500);
square[38] = new Square("OPEN INTERNET", "Pay D100", "#FFFFFF");
square[39] = new Square("BIG DATA", "D400", "#0000FF", 400, 10, 50, 200, 600, 1400, 1700, 2000);

var communityChestCards = [];
var chanceCards = [];

communityChestCards[0] = new Card("Advance to \"GO\" (Collect D200).", function() { advance(0);});
communityChestCards[1] = new Card("You've upgraded to IPv6 - Collect D200", function() { addamount(200, 'Community Chest');});
communityChestCards[2] = new Card("Monthly Data Subscription - Pay D50.", function() { subtractamount(50, 'Community Chest');});
communityChestCards[3] = new Card("You have created local content - Collect D50.", function() { addamount(50, 'Community Chest');});
communityChestCards[4] = new Card("Get out of Jail, Free. - Retain", function(p) { p.communityChestJailCard = true; updateOwned();});
communityChestCards[5] = new Card("Cybercrime Law Misdemeanor. Go directly to Jail. Do not pass \"GO\". Do not collect D200.", function() { gotojail();});
communityChestCards[6] = new Card("Hackathon. Collect D50 from every player for opening day.", function() { collectfromeachplayer(50, 'Community Chest');});
communityChestCards[7] = new Card("GDPR Enforced. Collect Receive D100", function() { addamount(100, 'Community Chest');});
communityChestCards[8] = new Card("Internet Tax Refund - Collect D20", function() { addamount(20, 'Community Chest');});
communityChestCards[9] = new Card("Free WiFi - Collect D10", function() { addamount(10, 'Community Chest');});
communityChestCards[10] = new Card("You've built free, open-source software - Collect D100", function() { addamount(100, 'Community Chest');});
communityChestCards[11] = new Card("IoT Data Breach - Pay D100", function() { subtractamount(100, 'Community Chest');});
communityChestCards[12] = new Card("Pay Social Media Tax - Pay D150", function() { subtractamount(150, 'Community Chest');});
communityChestCards[13] = new Card("You Published an Internet Health Report - Receive D25 consultancy", function() { addamount(25, 'Community Chest');});
communityChestCards[14] = new Card("You Cannot view this Website in your Region – D80 per space owned", function() { payperspace(80);});
communityChestCards[15] = new Card("You have attended the Internet Governance Forum – Collect D10", function() { addamount(10, 'Community Chest');});
communityChestCards[16] = new Card("Declaration of Human Rights, 'everyone has the right to freedom of opinion and expression'. Article 19 — You inherit D100", function() { addamount(100, 'Community Chest');});


chanceCards[0] = new Card("GET OUT OF JAIL FREE. This card may be kept until needed or traded.", function(p) { p.chanceJailCard=true; updateOwned();});
chanceCards[1] = new Card("Advance to OPEN DATA. If unowned, you may buy it from the Bank. If owned, pay the owner a total ten times the amount thrown on the dice.", function() { advanceToOpenData();});
chanceCards[2] = new Card("ADVANCE to Digital Citizenship. If you pass \"GO\" collect D200.", function() { advance(15);});
chanceCards[3] = new Card("ADVANCE to Community Networks. If you pass \"GO\" collect D200.", function() { advance(5);});
chanceCards[4] = new Card("Advance to Censorship. If unowned, you may buy it from the Bank. If owned, pay the owner a total six times the amount thrown on the dice.", function() { advanceToCensorship();});
chanceCards[5] = new Card("Advance token to the Internet Court", function() { advance(28);}); //advanceToNearestRailroad()
chanceCards[6] = new Card("You’ve won a social media defamation lawsuit. Collect D50 from the bank.", function() { addamount(50, 'Chance');});
chanceCards[7] = new Card("Go back three spaces.", function() { gobackthreespaces();});
chanceCards[8] = new Card("Go to Jail. Go Directly to Jail. Do not pass \"GO\". Do not collect D200.", function() { gotojail();});
chanceCards[9] = new Card("Update your GDPR privacy policy, pay D35 for each space owned", function() { payperspace(35);});
chanceCards[10] = new Card("Pay Internet Social media tax of D15.", function() { subtractamount(15, 'Chance');});
chanceCards[11] = new Card("Take a trip to Internet Governance. If you pass \"GO\" collect D200.", function() { advance(25);});
chanceCards[12] = new Card("Go shopping for the latest IoT device – Advance token to IoT", function() { advance(36);});
chanceCards[13] = new Card("You have been elected chairman of your local ISP. Pay each player D50.", function() { payeachplayer(50, 'Chance');});
chanceCards[14] = new Card("Your have stood against Internet Shutdowns - Collect D150", function() { addamount(150, 'Chance');});
chanceCards[15] = new Card("Your community has access to Internet - Collect D100", function() { addamount(100, 'Chance');});
chanceCards[16] = new Card("You have to travel out of your community to access the Internet - Pay D150", function() { subtractamount(150, 'Chance');});




var squareText = [];
squareText[0] = "GO. Collect D200 salary as you pass.";
squareText[1] = "The General Data Protection Regulation is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area. It also addresses the export of personal data outside the EU and EEA areas.";
squareText[2] = "Community Chest. You can draw a card from the Community Chest and follow the instructions on the card.";
squareText[3] = "Internet access is the ability of individuals and organizations to connect to the Internet using computer terminals, computers, and other devices; and to access services such as email and the World Wide Web.";
squareText[4] = "Internet Tax. Pay D200.";
squareText[5] = "Community networks are networks built, managed, and used by local communities. They provide a sustainable solution to address the digital divide and to improve the quality of life in rural and urban areas.";
squareText[6] = "This refers to an individual's ability to find, evaluate, produce and communicate clear information through writing and other forms of communication on various digital platforms.";
squareText[7] = "Chance. You can draw a card from the Chance pile and follow the instructions on the card.";
squareText[8] = "Money paid to internet service providers for internet connectivity on devices. The amount varies globally and is dependent on a number of factors";
squareText[9] = "The principle of freedom of expression and human rights must apply not only to traditional media but also to the Internet and all types of emerging media platforms, which will contribute to development, democracy and dialogue.";
squareText[10] = "Just Visiting. You are not in jail if you land on this square.";
squareText[11] = "Open data is the idea that some data should be freely available to everyone to use and republish as they wish, without restrictions from copyright, patents or other mechanisms of control.";
squareText[12] = "An Internet service provider (ISP) is an organization that provides services for accessing, using, or participating in the Internet.";
squareText[13] = "A digital divide is an economic and social inequality with regard to access to, use of, or impact of information and communication technologies.";
squareText[14] = "Free and open-source software is software that can be classified as both free software and open-source software.";
squareText[15] = "Digital citizenship refers to the responsible use of technology by anyone who uses computers, the Internet, and digital devices to engage with society on any level.";
squareText[16] = "Censorship is the suppression or prohibition of any parts of books, films, news, etc. that are considered obscene, politically unacceptable, or a threat to security.";
squareText[17] = "Community Chest. You can draw a card from the Community Chest and follow the instructions on the card.";
squareText[18] = "Internet shutdowns are a form of deliberate disruption of the Internet, often to control communication or online content, usually ordered by the government.";
squareText[19] = "Data privacy, also called information privacy, is the aspect of information technology (IT) that deals with the ability an organization or individual has to determine what data in a computer system can be shared with third parties.";
squareText[20] = "Free Parking. You can relax here and not worry about paying any fees.";
squareText[21] = "Encryption is a practice of encoding data so that it is no longer in its original form and can't be read. It is an important part of data security.";
squareText[22] = "Chance. You can draw a card from the Chance pile and follow the instructions on the card.";
squareText[23] = "Digital Surveillance is the monitoring of computer behavior, activities, or information for the purpose of influencing, managing, directing, or protecting people.";
squareText[24] = "Net neutrality is the principle that Internet service providers must treat all data on the Internet equally, and not discriminate or charge differently by user, content, website, platform, application, type of attached equipment, or method of communication.";
squareText[25] = "Internet Governance can be defined as the evolving policies and mechanisms under which the Internet community's many stakeholders make decisions about the development and use of the Internet.";
squareText[26] = "The creation of local content empowers individuals to enhance their livelihoods and to contribute to the social and economic development of their society.";
squareText[27] = "Cyberterrorism is the use of the Internet to conduct violent acts that result in, or threaten, loss of life or significant bodily harm, in order to achieve political or ideological gains through threat or intimidation.";
squareText[28] = "The Hangzhou Internet Court, located in the e- commerce hub of Hangzhou, capital of Zhejiang province, was set up on August 18 2017 to cope with increasing online disputes in a country with nearly 800 million internet users by the end of 2017.";
squareText[29] = "Copyright is a law that gives the owner of a work (like a book, movie, picture, song or website) the right to say how other people can use it.";
squareText[30] = "Go to Jail. Go directly to Jail. Do not pass GO. Do not collect D200.";
squareText[31] = "Youth should be included in internet policy making processes due to their strategic position as internet users";
squareText[32] = "Children's rights online should be protected in order to eliminates issues such as transmission of child online sexual abuse images, inappropriate content, online bullying and other forms of harmful behavior, and violation of privacy.";
squareText[33] = "Community Chest. You can draw a card from the Community Chest and follow the instructions on the card.";
squareText[34] = "Cyberbullying is the use of technology to harass, threaten, embarrass, or target another person.";
squareText[35] = "Chance. You can draw a card from the Chance pile and follow the instructions on the card.";
squareText[36] = "The Internet of Things is the network of physical devices, vehicles, home appliances, and other items embedded with electronics, software, sensors, actuators, and connectivity which enables these things to connect and exchange data.";
squareText[37] = "Online hate speech is a type of speech that takes place online, generally attacking a person or group of people because of their with the purpose to attack a person or a group on the basis of attributes such as race, religion, ethnic origin, sexual orientation, disability, or gender.";
squareText[38] = "The Open Internet (OI) is a fundamental network (net) neutrality concept in which information across the World Wide Web (WWW) is equally free and available without variables that depend on the financial motives of Internet Service Providers (ISP).";
squareText[39] = "Big data is a term used to refer to the study and applications of data sets that are too complex for traditional data-processing software to adequately deal with.";
