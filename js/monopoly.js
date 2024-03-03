function Game() {
	var die1;
	var die2;
	var areDiceRolled = false;

	var auctionQueue = [];
	var highestbidder;
	var highestbid;
	var currentbidder = 1;
	var auctionproperty;
	var communityDrawDouble = 0;


	this.rollDice = function() {
		closeAlert();
		blackFade();
		roller();
		addAlert(p.name + " is rolling");
		// die1 = dices[0];
		// die2 = dices[1];
		areDiceRolled = true;
	};


	this.resetDice = function() {
		areDiceRolled = false;
	};

	this.next = function() {
		updateGameData();

		p.pay(0, 0);
		if (!p.human && p.money < 0) {
			p.AI.payDebt();

			if (p.money < 0) {
				popup("<p>" + p.name + " is bankrupt. All of its assets will be turned over to " + player[p.creditor].name + ".</p>", game.bankruptcy);
			} else {
				roll();
			}
		} else if (areDiceRolled && doublecount === 0) {
			play();
		} else {
			roll();
		}

		console.log(player);
	};

	this.getDie = function(die) {
		if (die === 1) {
			
			// return 1;
			if(player[turn].avatar==2 && studentFirstRow){
				studentFirstRow = false;
				avatarPower(player[turn].name + " used the Avatar Power to roll a double!");
			}
			
			if(player[turn].avatar==5 && caregiverFirstRow){
				dices[0] *= 2;
				avatarPower(player[turn].name + "'s first roll is multiplied by 2!");
			}

			return dices[0];
		} else {
			
			// return 1;
			if(player[turn].avatar==5 && caregiverFirstRow){
				dices[1] *= 2;
				caregiverFirstRow = false;
			}
			return dices[1];
		}

	};



	// Auction functions:



	var finalizeAuction = function() {
		var p = player[highestbidder];
		var sq = square[auctionproperty];

		if (highestbid > 0) {
			p.pay(highestbid, 0);
			sq.owner = highestbidder;
			addAlert(p.name + " bought " + sq.name + " for D" + highestbid + ".");
			// bidface
		}

		for (var i = 1; i <= pcount; i++) {
			player[i].bidding = true;
		}

		$("#popupbackground").hide();
		$("#popup").hide();

		if (!game.auction()) {
			play();
		}
	};

	this.addPropertyToAuctionQueue = function(propertyIndex) {
		auctionQueue.push(propertyIndex);
	};

	this.auction = function() {
		if (auctionQueue.length === 0) {
			return false;
		}

		index = auctionQueue.shift();

		var s = square[index];

		if (s.price === 0 || s.owner !== 0) {
			return game.auction();
		}

		auctionproperty = index;
		highestbidder = 0;
		highestbid = 0;
		currentbidder = turn + 1;

		if (currentbidder > pcount) {
			currentbidder -= pcount;
		}

		popup("<div style='font-weight: bold; font-size: 16px; margin-bottom: 10px;'>Auction for <span id='propertyname'></span> in progress</div><div>Highest Bid = D<span id='highestbid'></span> (<span id='highestbidder'></span>)</div><div><span id='currentbidder'></span>, it is your turn to bid.</div<div> <br>  <br> <input id='bid' title='Enter an amount to bid on " + s.name + ".' class='bid-input' />&nbsp;<input type='button' class='btn buybtn' value='Bid' onclick='game.auctionBid();' title='Place your bid.' /></div><div> <br> <input type='button' value='Pass' title='Skip bidding this time.' class='btn rollbtn' onclick='game.auctionPass();' /><input type='button' class='btn redbtn' value='Exit Auction' title='Stop bidding on " + s.name + " altogether.' onclick='if (confirm(\"Are you sure you want to stop bidding on this property altogether?\")) game.auctionExit();' /></div>", "blank");

		document.getElementById("propertyname").innerHTML = "<a href='javascript:void(0);' onmouseover='showdeed(" + auctionproperty + ");' onmouseout='hidedeed();' class='statscellcolor'>" + s.name + "</a>";
		document.getElementById("highestbid").innerHTML = "0";
		document.getElementById("highestbidder").innerHTML = "N/A";
		document.getElementById("currentbidder").innerHTML = player[currentbidder].name;
		document.getElementById("bid").onkeydown = function (e) {
			var key = 0;
			var isCtrl = false;
			var isShift = false;

			if (window.event) {
				key = window.event.keyCode;
				isCtrl = window.event.ctrlKey;
				isShift = window.event.shiftKey;
			} else if (e) {
				key = e.keyCode;
				isCtrl = e.ctrlKey;
				isShift = e.shiftKey;
			}

			if (isNaN(key)) {
				return true;
			}

			if (key === 13) {
				game.auctionBid();
				return false;
			}

			// Allow backspace, tab, delete, arrow keys, or if control was pressed, respectively.
			if (key === 8 || key === 9 || key === 46 || (key >= 35 && key <= 40) || isCtrl) {
				return true;
			}

			if (isShift) {
				return false;
			}

			// Only allow number keys.
			return (key >= 48 && key <= 57) || (key >= 96 && key <= 105);
		};

		document.getElementById("bid").onfocus = function () {
			this.style.color = "black";
			if (isNaN(this.value)) {
				this.value = "";
			}
		};

		updateMoney();

		if (!player[currentbidder].human) {
			currentbidder = turn; // auctionPass advances currentbidder.
			this.auctionPass();
		}
		return true;
	};

	this.auctionPass = function() {
		if (highestbidder === 0) {
			highestbidder = currentbidder;
		}

		while (true) {
			currentbidder++;

			if (currentbidder > pcount) {
				currentbidder -= pcount;
			}

			if (currentbidder == highestbidder) {
				finalizeAuction();
				return;
			} else if (player[currentbidder].bidding) {
				var p = player[currentbidder];

				if (!p.human) {
					var bid = p.AI.bid(auctionproperty, highestbid);

					if (bid === -1 || highestbid >= p.money) {
						p.bidding = false;

						window.alert(p.name + " exited the auction.");
						continue;

					} else if (bid === 0) {
						window.alert(p.name + " passed.");
						continue;

					} else if (bid > 0) {
						this.auctionBid(bid);
						window.alert(p.name + " bid $" + bid + ".");
						continue;
					}
					return;
				} else {
					break;
				}
			}

		}

		document.getElementById("currentbidder").innerHTML = player[currentbidder].name;
		document.getElementById("bid").value = "";
		document.getElementById("bid").style.color = "black";
	};

	this.auctionBid = function(bid) {
		bid = bid || parseInt(document.getElementById("bid").value, 10);

		if (bid === "" || bid === null) {
			document.getElementById("bid").value = "Please enter a bid.";
			document.getElementById("bid").style.color = "red";
		} else if (isNaN(bid)) {
			document.getElementById("bid").value = "Your bid must be a number.";
			document.getElementById("bid").style.color = "red";
		} else {

			if (bid > player[currentbidder].money) {
				document.getElementById("bid").value = "You don't have enough money to bid $" + bid + ".";
				document.getElementById("bid").style.color = "red";
			} else if (bid > highestbid) {
				highestbid = bid;
				document.getElementById("highestbid").innerHTML = parseInt(bid, 10);
				highestbidder = currentbidder;
				document.getElementById("highestbidder").innerHTML = player[highestbidder].name;

				document.getElementById("bid").focus();

				if (player[currentbidder].human) {
					this.auctionPass();
				}
			} else {
				document.getElementById("bid").value = "Your bid must be greater than highest bid. ($" + highestbid + ")";
				document.getElementById("bid").style.color = "red";
			}
		}
	};

	this.auctionExit = function() {
		player[currentbidder].bidding = false;
		this.auctionPass();
	};



	// Trade functions:



	var currentInitiator;
	var currentRecipient;

	// Define event handlers:

	var tradeMoneyOnKeyDown = function (e) {
		var key = 0;
		var isCtrl = false;
		var isShift = false;

		if (window.event) {
			key = window.event.keyCode;
			isCtrl = window.event.ctrlKey;
			isShift = window.event.shiftKey;
		} else if (e) {
			key = e.keyCode;
			isCtrl = e.ctrlKey;
			isShift = e.shiftKey;
		}

		if (isNaN(key)) {
			return true;
		}

		if (key === 13) {
			return false;
		}

		// Allow backspace, tab, delete, arrow keys, or if control was pressed, respectively.
		if (key === 8 || key === 9 || key === 46 || (key >= 35 && key <= 40) || isCtrl) {
			return true;
		}

		if (isShift) {
			return false;
		}

		// Only allow number keys.
		return (key >= 48 && key <= 57) || (key >= 96 && key <= 105);
	};

	var tradeMoneyOnFocus = function () {
		this.style.color = "black";
		if (isNaN(this.value) || this.value === "0") {
			this.value = "";
		}
	};

	var tradeMoneyOnChange = function(e) {
		$("#proposetradebutton").show();
		$("#canceltradebutton").show();
		$("#accepttradebutton").hide();
		$("#rejecttradebutton").hide();

		var amount = this.value;

		if (isNaN(amount)) {
			this.value = "This value must be a number.";
			this.style.color = "red";
			return false;
		}

		amount = Math.round(amount) || 0;
		this.value = amount;

		if (amount < 0) {
			this.value = "This value must be greater than 0.";
			this.style.color = "red";
			return false;
		}

		return true;
	};

	document.getElementById("trade-leftp-money").onkeydown = tradeMoneyOnKeyDown;
	document.getElementById("trade-rightp-money").onkeydown = tradeMoneyOnKeyDown;
	document.getElementById("trade-leftp-money").onfocus = tradeMoneyOnFocus;
	document.getElementById("trade-rightp-money").onfocus = tradeMoneyOnFocus;
	document.getElementById("trade-leftp-money").onchange = tradeMoneyOnChange;
	document.getElementById("trade-rightp-money").onchange = tradeMoneyOnChange;

	var resetTrade = function(initiator, recipient, allowRecipientToBeChanged) {
		var currentSquare;
		var currentTableRow;
		var currentTableCell;
		var currentTableCellCheckbox;
		var nameSelect;
		var currentOption;
		var allGroupUninproved;
		var currentName;

		var tableRowOnClick = function(e) {
			var checkboxElement = this.firstChild.firstChild;

			if (checkboxElement !== e.srcElement) {
				checkboxElement.checked = !checkboxElement.checked;
			}

			$("#proposetradebutton").show();
			$("#canceltradebutton").show();
			$("#accepttradebutton").hide();
			$("#rejecttradebutton").hide();
		};

		var initiatorProperty = document.getElementById("trade-leftp-property");
		var recipientProperty = document.getElementById("trade-rightp-property");

		currentInitiator = initiator;
		currentRecipient = recipient;

		// Empty elements.
		while (initiatorProperty.lastChild) {
			initiatorProperty.removeChild(initiatorProperty.lastChild);
		}

		while (recipientProperty.lastChild) {
			recipientProperty.removeChild(recipientProperty.lastChild);
		}

		var initiatorSideTable = document.createElement("table");
		var recipientSideTable = document.createElement("table");


		for (var i = 0; i < 40; i++) {
			currentSquare = square[i];

			// A property cannot be traded if any properties in its group have been improved.
			if (currentSquare.house > 0 || currentSquare.groupNumber === 0) {
				continue;
			}

			allGroupUninproved = true;
			var max = currentSquare.group.length;
			for (var j = 0; j < max; j++) {

				if (square[currentSquare.group[j]].house > 0) {
					allGroupUninproved = false;
					break;
				}
			}

			if (!allGroupUninproved) {
				continue;
			}

			// Offered properties.
			if (currentSquare.owner === initiator.index) {
				currentTableRow = initiatorSideTable.appendChild(document.createElement("tr"));
				currentTableRow.onclick = tableRowOnClick;

				currentTableCell = currentTableRow.appendChild(document.createElement("td"));
				currentTableCell.className = "propertycellcheckbox";
				currentTableCellCheckbox = currentTableCell.appendChild(document.createElement("input"));
				currentTableCellCheckbox.type = "checkbox";
				currentTableCellCheckbox.id = "tradeleftcheckbox" + i;
				currentTableCellCheckbox.title = "Check this box to include " + currentSquare.name + " in the trade.";

				currentTableCell = currentTableRow.appendChild(document.createElement("td"));
				currentTableCell.className = "propertycellcolor";
				currentTableCell.style.backgroundColor = currentSquare.color;

				if (currentSquare.groupNumber == 1 || currentSquare.groupNumber == 2) {
					currentTableCell.style.borderColor = "grey";
				} else {
					currentTableCell.style.borderColor = currentSquare.color;
				}

				currentTableCell.propertyIndex = i;
				currentTableCell.onmouseover = function() {showdeed(this.propertyIndex);};
				currentTableCell.onmouseout = hidedeed;

				currentTableCell = currentTableRow.appendChild(document.createElement("td"));
				currentTableCell.className = "propertycellname";
				if (currentSquare.mortgage) {
					currentTableCell.title = "Mortgaged";
					currentTableCell.style.color = "grey";
				}
				currentTableCell.textContent = currentSquare.name;

			// Requested properties.
			} else if (currentSquare.owner === recipient.index) {
				currentTableRow = recipientSideTable.appendChild(document.createElement("tr"));
				currentTableRow.onclick = tableRowOnClick;

				currentTableCell = currentTableRow.appendChild(document.createElement("td"));
				currentTableCell.className = "propertycellcheckbox";
				currentTableCellCheckbox = currentTableCell.appendChild(document.createElement("input"));
				currentTableCellCheckbox.type = "checkbox";
				currentTableCellCheckbox.id = "traderightcheckbox" + i;
				currentTableCellCheckbox.title = "Check this box to include " + currentSquare.name + " in the trade.";

				currentTableCell = currentTableRow.appendChild(document.createElement("td"));
				currentTableCell.className = "propertycellcolor";
				currentTableCell.style.backgroundColor = currentSquare.color;

				if (currentSquare.groupNumber == 1 || currentSquare.groupNumber == 2) {
					currentTableCell.style.borderColor = "grey";
				} else {
					currentTableCell.style.borderColor = currentSquare.color;
				}

				currentTableCell.propertyIndex = i;
				currentTableCell.onmouseover = function() {showdeed(this.propertyIndex);};
				currentTableCell.onmouseout = hidedeed;

				currentTableCell = currentTableRow.appendChild(document.createElement("td"));
				currentTableCell.className = "propertycellname";
				if (currentSquare.mortgage) {
					currentTableCell.title = "Mortgaged";
					currentTableCell.style.color = "grey";
				}
				currentTableCell.textContent = currentSquare.name;
			}
		}

		if (initiator.communityChestJailCard) {
			currentTableRow = initiatorSideTable.appendChild(document.createElement("tr"));
			currentTableRow.onclick = tableRowOnClick;

			currentTableCell = currentTableRow.appendChild(document.createElement("td"));
			currentTableCell.className = "propertycellcheckbox";
			currentTableCellCheckbox = currentTableCell.appendChild(document.createElement("input"));
			currentTableCellCheckbox.type = "checkbox";
			currentTableCellCheckbox.id = "tradeleftcheckbox40";
			currentTableCellCheckbox.title = "Check this box to include this Get Out of Jail Free Card in the trade.";

			currentTableCell = currentTableRow.appendChild(document.createElement("td"));
			currentTableCell.className = "propertycellcolor";
			currentTableCell.style.backgroundColor = "white";
			currentTableCell.style.borderColor = "grey";

			currentTableCell = currentTableRow.appendChild(document.createElement("td"));
			currentTableCell.className = "propertycellname";

			currentTableCell.textContent = "Get Out of Jail Free Card";
		} else if (recipient.communityChestJailCard) {
			currentTableRow = recipientSideTable.appendChild(document.createElement("tr"));
			currentTableRow.onclick = tableRowOnClick;

			currentTableCell = currentTableRow.appendChild(document.createElement("td"));
			currentTableCell.className = "propertycellcheckbox";
			currentTableCellCheckbox = currentTableCell.appendChild(document.createElement("input"));
			currentTableCellCheckbox.type = "checkbox";
			currentTableCellCheckbox.id = "traderightcheckbox40";
			currentTableCellCheckbox.title = "Check this box to include this Get Out of Jail Free Card in the trade.";

			currentTableCell = currentTableRow.appendChild(document.createElement("td"));
			currentTableCell.className = "propertycellcolor";
			currentTableCell.style.backgroundColor = "white";
			currentTableCell.style.borderColor = "grey";

			currentTableCell = currentTableRow.appendChild(document.createElement("td"));
			currentTableCell.className = "propertycellname";

			currentTableCell.textContent = "Get Out of Jail Free Card";
		}

		if (initiator.chanceJailCard) {
			currentTableRow = initiatorSideTable.appendChild(document.createElement("tr"));
			currentTableRow.onclick = tableRowOnClick;

			currentTableCell = currentTableRow.appendChild(document.createElement("td"));
			currentTableCell.className = "propertycellcheckbox";
			currentTableCellCheckbox = currentTableCell.appendChild(document.createElement("input"));
			currentTableCellCheckbox.type = "checkbox";
			currentTableCellCheckbox.id = "tradeleftcheckbox41";
			currentTableCellCheckbox.title = "Check this box to include this Get Out of Jail Free Card in the trade.";

			currentTableCell = currentTableRow.appendChild(document.createElement("td"));
			currentTableCell.className = "propertycellcolor";
			currentTableCell.style.backgroundColor = "white";
			currentTableCell.style.borderColor = "grey";

			currentTableCell = currentTableRow.appendChild(document.createElement("td"));
			currentTableCell.className = "propertycellname";

			currentTableCell.textContent = "Get Out of Jail Free Card";
		} else if (recipient.chanceJailCard) {
			currentTableRow = recipientSideTable.appendChild(document.createElement("tr"));
			currentTableRow.onclick = tableRowOnClick;

			currentTableCell = currentTableRow.appendChild(document.createElement("td"));
			currentTableCell.className = "propertycellcheckbox";
			currentTableCellCheckbox = currentTableCell.appendChild(document.createElement("input"));
			currentTableCellCheckbox.type = "checkbox";
			currentTableCellCheckbox.id = "traderightcheckbox41";
			currentTableCellCheckbox.title = "Check this box to include this Get Out of Jail Free Card in the trade.";

			currentTableCell = currentTableRow.appendChild(document.createElement("td"));
			currentTableCell.className = "propertycellcolor";
			currentTableCell.style.backgroundColor = "white";
			currentTableCell.style.borderColor = "grey";

			currentTableCell = currentTableRow.appendChild(document.createElement("td"));
			currentTableCell.className = "propertycellname";

			currentTableCell.textContent = "Get Out of Jail Free Card";
		}

		if (initiatorSideTable.lastChild) {
			initiatorProperty.appendChild(initiatorSideTable);
		} else {
			initiatorProperty.textContent = initiator.name + " has no properties to trade.";
		}

		if (recipientSideTable.lastChild) {
			recipientProperty.appendChild(recipientSideTable);
		} else {
			recipientProperty.textContent = recipient.name + " has no properties to trade.";
		}

		console.log(initiator);
		document.getElementById("trade-leftp-name").textContent = initiator.name;
		document.getElementById("trade-leftp-amount").textContent = initiator.money;
		$("#trade-leftp-avatar").attr({ "src": "images/avatar"+initiator.avatar+".png"});

		currentName = document.getElementById("trade-rightp-name");

		if (allowRecipientToBeChanged && pcount > 2) {
			// Empty element.
			while (currentName.lastChild) {
				currentName.removeChild(currentName.lastChild);
			}

			nameSelect = currentName.appendChild(document.createElement("select"));
			for (var i = 1; i <= pcount; i++) {
				if (i === initiator.index) {
					continue;
				}

				currentOption = nameSelect.appendChild(document.createElement("option"));
				currentOption.value = i + "";
				currentOption.style.color = player[i].color;
				currentOption.textContent = player[i].name;

				if (i === recipient.index) {
					currentOption.selected = "selected";
				}
			}

			nameSelect.onchange = function() {
				resetTrade(currentInitiator, player[parseInt(this.value, 10)], true);
			};

			nameSelect.title = "Select a player to trade with.";
			nameSelect.classList.add("custom-select");
		} else {
			currentName.textContent = recipient.name;
		}

		document.getElementById("trade-leftp-money").value = "0";
		document.getElementById("trade-rightp-money").value = "0";

	};

	var readTrade = function() {
		var initiator = currentInitiator;
		var recipient = currentRecipient;
		var property = new Array(40);
		var money;
		var communityChestJailCard;
		var chanceJailCard;

		for (var i = 0; i < 40; i++) {

			if (document.getElementById("tradeleftcheckbox" + i) && document.getElementById("tradeleftcheckbox" + i).checked) {
				property[i] = 1;
			} else if (document.getElementById("traderightcheckbox" + i) && document.getElementById("traderightcheckbox" + i).checked) {
				property[i] = -1;
			} else {
				property[i] = 0;
			}
		}

		if (document.getElementById("tradeleftcheckbox40") && document.getElementById("tradeleftcheckbox40").checked) {
			communityChestJailCard = 1;
		} else if (document.getElementById("traderightcheckbox40") && document.getElementById("traderightcheckbox40").checked) {
			communityChestJailCard = -1;
		} else {
			communityChestJailCard = 0;
		}

		if (document.getElementById("tradeleftcheckbox41") && document.getElementById("tradeleftcheckbox41").checked) {
			chanceJailCard = 1;
		} else if (document.getElementById("traderightcheckbox41") && document.getElementById("traderightcheckbox41").checked) {
			chanceJailCard = -1;
		} else {
			chanceJailCard = 0;
		}

		money = parseInt(document.getElementById("trade-leftp-money").value, 10) || 0;
		money -= parseInt(document.getElementById("trade-rightp-money").value, 10) || 0;

		var trade = new Trade(initiator, recipient, money, property, communityChestJailCard, chanceJailCard);

		return trade;
	};

	var writeTrade = function(tradeObj) {
		resetTrade(tradeObj.getInitiator(), tradeObj.getRecipient(), false);

		for (var i = 0; i < 40; i++) {

			if (document.getElementById("tradeleftcheckbox" + i)) {
				document.getElementById("tradeleftcheckbox" + i).checked = false;
				if (tradeObj.getProperty(i) === 1) {
					document.getElementById("tradeleftcheckbox" + i).checked = true;
				}
			}

			if (document.getElementById("traderightcheckbox" + i)) {
				document.getElementById("traderightcheckbox" + i).checked = false;
				if (tradeObj.getProperty(i) === -1) {
					document.getElementById("traderightcheckbox" + i).checked = true;
				}
			}
		}

		if (document.getElementById("tradeleftcheckbox40")) {
			if (tradeObj.getCommunityChestJailCard() === 1) {
				document.getElementById("tradeleftcheckbox40").checked = true;
			} else {
				document.getElementById("tradeleftcheckbox40").checked = false;
			}
		}

		if (document.getElementById("traderightcheckbox40")) {
			if (tradeObj.getCommunityChestJailCard() === -1) {
				document.getElementById("traderightcheckbox40").checked = true;
			} else {
				document.getElementById("traderightcheckbox40").checked = false;
			}
		}

		if (document.getElementById("tradeleftcheckbox41")) {
			if (tradeObj.getChanceJailCard() === 1) {
				document.getElementById("tradeleftcheckbox41").checked = true;
			} else {
				document.getElementById("tradeleftcheckbox41").checked = false;
			}
		}

		if (document.getElementById("traderightcheckbox41")) {
			if (tradeObj.getChanceJailCard() === -1) {
				document.getElementById("traderightcheckbox41").checked = true;
			} else {
				document.getElementById("traderightcheckbox41").checked = false;
			}
		}

		if (tradeObj.getMoney() > 0) {
			document.getElementById("trade-leftp-money").value = tradeObj.getMoney() + "";
		} else {
			document.getElementById("trade-rightp-money").value = (-tradeObj.getMoney()) + "";
		}

	};

	this.trade = function(tradeObj) {
		// $("#board").hide();
		$("#control").hide();
		$("#trade").show();
		$("#proposetradebutton").show();
		$("#canceltradebutton").show();
		$("#accepttradebutton").hide();
		$("#rejecttradebutton").hide();

		if (tradeObj instanceof Trade) {
			writeTrade(tradeObj);
			this.proposeTrade();
		} else {
			var initiator = player[turn];
			var recipient = turn === 1 ? player[2] : player[1];

			currentInitiator = initiator;
			currentRecipient = recipient;

			resetTrade(initiator, recipient, true);
		}
	};


	this.cancelTrade = function() {
		$("#board").show();
		$("#control").show();
		$("#trade").hide();


		if (!player[turn].human) {
			player[turn].AI.alertList = "";
			game.next();
		}

	};

	this.acceptTrade = function(tradeObj) {
		if (isNaN(document.getElementById("trade-leftp-money").value)) {
			document.getElementById("trade-leftp-money").value = "This value must be a number.";
			document.getElementById("trade-leftp-money").style.color = "red";
			return false;
		}

		if (isNaN(document.getElementById("trade-rightp-money").value)) {
			document.getElementById("trade-rightp-money").value = "This value must be a number.";
			document.getElementById("trade-rightp-money").style.color = "red";
			return false;
		}

		var showAlerts = true;
		var money;
		var initiator;
		var recipient;

		if (tradeObj) {
			showAlerts = false;
		} else {
			tradeObj = readTrade();
		}

		money = tradeObj.getMoney();
		initiator = tradeObj.getInitiator();
		recipient = tradeObj.getRecipient();


		if (money > 0 && money > initiator.money) {
			document.getElementById("trade-leftp-money").value = initiator.name + " does not have $" + money + ".";
			document.getElementById("trade-leftp-money").style.color = "red";
			return false;
		} else if (money < 0 && -money > recipient.money) {
			document.getElementById("trade-rightp-money").value = recipient.name + " does not have $" + (-money) + ".";
			document.getElementById("trade-rightp-money").style.color = "red";
			return false;
		}

		var isAPropertySelected = 0;

		// Ensure that some properties are selected.
		for (var i = 0; i < 40; i++) {
			isAPropertySelected |= tradeObj.getProperty(i);
		}

		isAPropertySelected |= tradeObj.getCommunityChestJailCard();
		isAPropertySelected |= tradeObj.getChanceJailCard();

		if (isAPropertySelected === 0) {
			popup("<p>One or more properties must be selected in order to trade.</p>");

			return false;
		}

		if (showAlerts && !confirm(initiator.name + ", are you sure you want to make this exchange with " + recipient.name + "?")) {
			return false;
		}

		// Exchange properties
		for (var i = 0; i < 40; i++) {

			if (tradeObj.getProperty(i) === 1) {
				square[i].owner = recipient.index;
				addAlert(recipient.name + " received " + square[i].name + " from " + initiator.name + ".");
			} else if (tradeObj.getProperty(i) === -1) {
				square[i].owner = initiator.index;
				addAlert(initiator.name + " received " + square[i].name + " from " + recipient.name + ".");
			}

		}

		if (tradeObj.getCommunityChestJailCard() === 1) {
			initiator.communityChestJailCard = false;
			recipient.communityChestJailCard = true;
			addAlert(recipient.name + ' received a "Get Out of Jail Free" card from ' + initiator.name + ".");
		} else if (tradeObj.getCommunityChestJailCard() === -1) {
			initiator.communityChestJailCard = true;
			recipient.communityChestJailCard = false;
			addAlert(initiator.name + ' received a "Get Out of Jail Free" card from ' + recipient.name + ".");
		}

		if (tradeObj.getChanceJailCard() === 1) {
			initiator.chanceJailCard = false;
			recipient.chanceJailCard = true;
			addAlert(recipient.name + ' received a "Get Out of Jail Free" card from ' + initiator.name + ".");
		} else if (tradeObj.getChanceJailCard() === -1) {
			initiator.chanceJailCard = true;
			recipient.chanceJailCard = false;
			addAlert(initiator.name + ' received a "Get Out of Jail Free" card from ' + recipient.name + ".");
		}

		// Exchange money.
		if (money > 0) {
			initiator.pay(money, recipient.index);
			recipient.money += money;

			addAlert(recipient.name + " received D" + money + " from " + initiator.name + ".");
		} else if (money < 0) {
			money = -money;

			recipient.pay(money, initiator.index);
			initiator.money += money;

			addAlert(initiator.name + " received D" + money + " from " + recipient.name + ".");
		}

		updateOwned();
		updateMoney();

		$("#board").show();
		$("#control").show();
		$("#trade").hide();

		if (!player[turn].human) {
			player[turn].AI.alertList = "";
			game.next();
		}
	};

	this.proposeTrade = function() {
		if (isNaN(document.getElementById("trade-leftp-money").value)) {
			document.getElementById("trade-leftp-money").value = "This value must be a number.";
			document.getElementById("trade-leftp-money").style.color = "red";
			return false;
		}

		if (isNaN(document.getElementById("trade-rightp-money").value)) {
			document.getElementById("trade-rightp-money").value = "This value must be a number.";
			document.getElementById("trade-rightp-money").style.color = "red";
			return false;
		}

		var tradeObj = readTrade();
		var money = tradeObj.getMoney();
		var initiator = tradeObj.getInitiator();
		var recipient = tradeObj.getRecipient();
		var reversedTradeProperty = [];

		if (money > 0 && money > initiator.money) {
			document.getElementById("trade-leftp-money").value = initiator.name + " does not have $" + money + ".";
			document.getElementById("trade-leftp-money").style.color = "red";
			return false;
		} else if (money < 0 && -money > recipient.money) {
			document.getElementById("trade-rightp-money").value = recipient.name + " does not have $" + (-money) + ".";
			document.getElementById("trade-rightp-money").style.color = "red";
			return false;
		}

		var isAPropertySelected = 0;

		// Ensure that some properties are selected.
		for (var i = 0; i < 40; i++) {
			reversedTradeProperty[i] = -tradeObj.getProperty(i);
			isAPropertySelected |= tradeObj.getProperty(i);
		}

		isAPropertySelected |= tradeObj.getCommunityChestJailCard();
		isAPropertySelected |= tradeObj.getChanceJailCard();

		if (isAPropertySelected === 0) {
			popup("<p>One or more properties must be selected in order to trade.</p>");

			return false;
		}

		// if (initiator.human && !confirm(initiator.name + ", are you sure you want to make this offer to " + recipient.name + "?")) {
		// 	return false;
		// }

		var reversedTrade = new Trade(recipient, initiator, -money, reversedTradeProperty, -tradeObj.getCommunityChestJailCard(), -tradeObj.getChanceJailCard());

		if (recipient.human) {

			writeTrade(reversedTrade);

			$("#proposetradebutton").hide();
			$("#canceltradebutton").hide();
			$("#accepttradebutton").show();
			$("#rejecttradebutton").show();

			addAlert(initiator.name + " initiated a trade with " + recipient.name + ".");
			popup("<p>" + initiator.name + " has proposed a trade with you, " + recipient.name + ". You may accept, reject, or modify the offer.</p>");
		} else {
			var tradeResponse = recipient.AI.acceptTrade(tradeObj);

			if (tradeResponse === true) {
				popup("<p>" + recipient.name + " has accepted your offer.</p>");
				this.acceptTrade(reversedTrade);
			} else if (tradeResponse === false) {
				popup("<p>" + recipient.name + " has declined your offer.</p>");
				return;
			} else if (tradeResponse instanceof Trade) {
				popup("<p>" + recipient.name + " has proposed a counteroffer.</p>");
				writeTrade(tradeResponse);

				$("#proposetradebutton, #canceltradebutton").hide();
				$("#accepttradebutton").show();
				$("#rejecttradebutton").show();
			}
		}
	};



	// Bankrupcy functions:




	this.eliminatePlayer = function() {
		var p = player[turn];

		aa("https://cdn.lordicon.com/ysheqztl.json", p.name+" has been eliminated from the game.");

		for (var i = p.index; i < pcount; i++) {
			player[i] = player[i + 1];
			player[i].index = i;

		}

		for (var i = 0; i < 40; i++) {
			if (square[i].owner >= p.index) {
				square[i].owner--;
			}
		}

		pcount--;
		turn--;

		if (pcount === 1) {
			updateMoney();
			$("#control").hide();
			$("#board").hide();
			$("#refresh").show();

			// // Display land counts for survey purposes.
			// var text;
			// for (var i = 0; i < 40; i++) {
				// if (i === 0)
					// text = square[i].landcount;
				// else
					// text += " " + square[i].landcount;
			// }
			// document.getElementById("refresh").innerHTML += "<br><br><div><textarea type='text' style='width: 980px;' onclick='javascript:select();' />" + text + "</textarea></div>";

			// popup("<p>Congratulations, " + player[1].name + ", you have won the game.</p><div>");
			winningAnimation();

		} else {
			play();
		}
	};

	this.bankruptcyUnmortgage = function() {
		var p = player[turn];

		if (p.creditor === 0) {
			game.eliminatePlayer();
			return;
		}

		var HTML = "<p>" + player[p.creditor].name + ", you may unmortgage any of the following properties, interest free, by clicking on them. Click OK when finished.</p><table>";
		var price;

		for (var i = 0; i < 40; i++) {
			sq = square[i];
			if (sq.owner == p.index && sq.mortgage) {
				price = Math.round(sq.price * 0.5);

				HTML += "<tr><td class='propertycellcolor' style='background: " + sq.color + ";";

				if (sq.groupNumber == 1 || sq.groupNumber == 2) {
					HTML += " border: 1px solid grey;";
				} else {
					HTML += " border: 1px solid " + sq.color + ";";
				}

				// Player already paid interest, so they can unmortgage for the mortgage price.
				HTML += "' onmouseover='showdeed(" + i + ");' onmouseout='hidedeed();'></td><td class='propertycellname'><a href='javascript:void(0);' title='Unmortgage " + sq.name + " for D" + price + ".' onclick='if (" + price + " <= player[" + p.creditor + "].money) {player[" + p.creditor + "].pay(" + price + ", 0); square[" + i + "].mortgage = false; addAlert(\"" + player[p.creditor].name + " unmortgaged " + sq.name + " for D" + price + ".\");} this.parentElement.parentElement.style.display = \"none\";'>Unmortgage " + sq.name + " ($" + price + ")</a></td></tr>";

				sq.owner = p.creditor;

			}
		}

		HTML += "</table>";

		popup(HTML, game.eliminatePlayer);
	};

	this.resign = function() {
		popup("<p>Are you sure you want to resign?</p>", game.bankruptcy, "Yes/No");
	};

	this.bankruptcy = function() {
		var p = player[turn];
		var pcredit = player[p.creditor];
		var bankruptcyUnmortgageFee = 0;


		if (p.money >= 0) {
			return;
		}

		addAlert(p.name + " is bankrupt.");

		if (p.creditor !== 0) {
			pcredit.money += p.money;
		}

		for (var i = 0; i < 40; i++) {
			sq = square[i];
			if (sq.owner == p.index) {
				// Mortgaged properties will be tranfered by bankruptcyUnmortgage();
				if (!sq.mortgage) {
					sq.owner = p.creditor;
				} else {
					bankruptcyUnmortgageFee += Math.round(sq.price * 0.1);
				}

				if (sq.house > 0) {
					if (p.creditor !== 0) {
						pcredit.money += sq.houseprice * 0.5 * sq.house;
					}
					sq.hotel = 0;
					sq.house = 0;
				}

				if (p.creditor === 0) {
					sq.mortgage = false;
					game.addPropertyToAuctionQueue(i);
					sq.owner = 0;
				}
			}
		}

		updateMoney();

		if (p.chanceJailCard) {
			p.chanceJailCard = false;
			pcredit.chanceJailCard = true;
		}

		if (p.communityChestJailCard) {
			p.communityChestJailCard = false;
			pcredit.communityChestJailCard = true;
		}

		if (pcount === 2 || bankruptcyUnmortgageFee === 0 || p.creditor === 0) {
			game.eliminatePlayer();
		} else {
			addAlert(pcredit.name + " paid D" + bankruptcyUnmortgageFee + " interest on the mortgaged properties received from " + p.name + ".");
			popup("<p>" + pcredit.name + ", you must pay $" + bankruptcyUnmortgageFee + " interest on the mortgaged properties you received from " + p.name + ".</p>", function() {player[pcredit.index].pay(bankruptcyUnmortgageFee, 0); game.bankruptcyUnmortgage();});
		}
	};

}

var game;


function Player(name, color, avatar) {
	this.name = name;
	this.color = color;
	this.avatar = avatar;
	this.oldposition = 0;
	this.position = 0;
	this.money = 1500;
	this.creditor = -1;
	this.jail = false;
	this.jailroll = 0;
	this.communityChestJailCard = false;
	this.chanceJailCard = false;
	this.bidding = true;
	this.human = true;
	// this.AI = null;

	this.pay = function (amount, creditor) {
		if (amount <= this.money) {
			this.money -= amount;

			updateMoney();

			return true;
		} else {
			this.money -= amount;
			this.creditor = creditor;

			updateMoney();

			return false;
		}
	};
}

// paramaters:
// initiator: object Player
// recipient: object Player
// money: integer, positive for offered, negative for requested
// property: array of integers, length: 40
// communityChestJailCard: integer, 1 means offered, -1 means requested, 0 means neither
// chanceJailCard: integer, 1 means offered, -1 means requested, 0 means neither
function Trade(initiator, recipient, money, property, communityChestJailCard, chanceJailCard) {
	// For each property and get out of jail free cards, 1 means offered, -1 means requested, 0 means neither.

	this.getInitiator = function() {
		return initiator;
	};

	this.getRecipient = function() {
		return recipient;
	};

	this.getProperty = function(index) {
		return property[index];
	};

	this.getMoney = function() {
		return money;
	};

	this.getCommunityChestJailCard = function() {
		return communityChestJailCard;
	};

	this.getChanceJailCard = function() {
		return chanceJailCard;
	};
}

// var player = [];
// var pcount;
// var turn = 0, doublecount = 0;

// Overwrite an array with numbers from one to the array's length in a random order.
Array.prototype.randomize = function(length) {
	length = (length || this.length);
	var num;
	var indexArray = [];

	for (var i = 0; i < length; i++) {
		indexArray[i] = i;
	}

	for (var i = 0; i < length; i++) {
		// Generate random number between 0 and indexArray.length - 1.
		num = Math.floor(Math.random() * indexArray.length);
		this[i] = indexArray[num] + 1;

		indexArray.splice(num, 1);
	}
};

alertTimeout = setTimeout(function(){}, 10);
function addAlert(alertText) {
	$alert = $("#alert");

	$(document.createElement("div")).text(alertText).appendTo($alert);

	// Animate scrolling down alert element.
	$alert.stop().animate({"scrollTop": $alert.prop("scrollHeight")}, 1000);

	if (!player[turn].human) {
		player[turn].AI.alertList += "<div>" + alertText + "</div>";
	}

	$("#alertDiv").css("opacity", 1);
	$("#alertDiv").css("transform", "translateY(10px)");
	$("#alert").html(alertText); 
	clearTimeout(alertTimeout);
	alertTimeout = setTimeout(function(){
		$("#alertDiv").css("transform", "translateY(0)");
		$("#alertDiv").css("opacity", 0);
	}, 5000);
}

function popup(HTML, action, option) {
	document.getElementById("popuptext").innerHTML = HTML;

	if (!option && typeof action === "string") {
		option = action;
	}

	option = option ? option.toLowerCase() : "";

	if (typeof action !== "function") {
		action = null;
	}

	$("#popupbackground").css("background","rgb(0, 0, 0, 0.4)");
	// Yes/No
	if (option === "yes/no") {
		document.getElementById("popuptext").innerHTML += "<div><input type=\"button\" value=\"Yes\" id=\"popupyes\" class=\"btn buybtn\" /><input type=\"button\" value=\"No\" class=\"btn redbtn\" id=\"popupno\" /></div>";

		$("#popupyes, #popupno").on("click", function() {
			$("#popup").hide();
			$("#popupbackground").fadeOut(400);
		});

		$("#popupyes").on("click", action);

	// Ok
	} else if (option !== "blank") {
		$("#popuptext").append("<div><input type='button' class='btn rollbtn' value='OK' id='popupclose' /></div>");
		$("#popupclose").focus();

		$("#popupclose").on("click", function() {
			$("#popup").hide();
			$("#popupbackground").fadeOut(400);
		}).on("click", action);

	}
	if (option=="blank") {
		$("#popupbackground").css("background","rgb(70, 0, 0, 0.4)");
	}


	// Show using animation.
	$("#popupbackground").fadeIn(400, function() {
		$("#popup").show();
	});

}

function closePopup(){
	$("#popup").hide();
	$("#popupbackground").fadeOut(400);
}

function cardPick(){

}

function updatePosition() {

	player[turn].oldposition = player[turn].position;

	p = player[turn];
	$("#avatar"+p.avatar).css({"left": positions[p.position][0]+"px", "top": positions[p.position][1]+"px"});


	if (p.jail) {
		// document.getElementById("jail").style.border = "1px solid " + p.color;
	} else {
		// document.getElementById("cell" + p.position).style.border = "1px solid " + p.color;
	}

}

function updateMoney() {
	var p = player[turn];

	$('#manageBoardMoney').html(p.money);

	for (var i = 1; i <= pcount; i++) {
		p_i = player[i];
		document.getElementById("avatar" + p_i.avatar + "money").innerHTML = p_i.name +" D"+p_i.money;
	}

	if (document.getElementById("landed").innerHTML === "") {
		$("#landedDiv").hide();
	}

	if (p.money < 0) {
		$("#resignbutton").show();
		$("#nextbutton").hide();
	} else {
		$("#resignbutton").hide();
		$("#nextbutton").show();
	}
}

function updateDice() {
	var die0 = game.getDie(1);
	var die1 = game.getDie(2);
}


function updateOwned() {
	var p = player[turn];
	var checkedproperty = getCheckedProperty();
	$("#option").show();
	$("#owned").show();

	var HTML = "",
	firstproperty = -1;

	var mortgagetext = "",
	housetext = "";
	var sq;

	for (var i = 0; i < 40; i++) {
		sq = square[i];
		if (sq.owner == turn) {

			mortgagetext = "";

			housetext = "";
			if (sq.house >= 1 && sq.house <= 4) {
				for (var x = 1; x <= sq.house; x++) {
					housetext += "<img src='images/policy.png' alt='' title='Policy' class='house' />";
				}
			} else if (sq.hotel) {
				housetext += "<img src='images/law.png' alt='' title='Law' class='hotel' />";
			}

			if (HTML === "") {
				// HTML += "<table>";
				firstproperty = i;
			}

			HTML += "<label class='playertile-label";

			if (sq.mortgage) {
				HTML += " playertile-label-disabled";
			}
				HTML += "' for='propertycheckbox"+i+"'><div class='playerstats-tile property-cell-row'><input type='checkbox' id='propertycheckbox" + i + "'></td><div class='playerstats-tile-color' style='background: " + sq.color + ";'></div><div class='playerstats-tile-name'>"+sq.name+"</div></div></label><br>";

			if (sq.groupNumber == 1 || sq.groupNumber == 2) {
				// HTML += " border: 1px solid grey; width: 18px;";
			}

			// HTML += "' onmouseover='showdeed(" + i + ");' onmouseout='hidedeed();'></td><td class='propertycellname' " + mortgagetext + ">" + sq.name + housetext + "</td></tr>";
		}
	}

	if (p.communityChestJailCard) {
		if (HTML === "") {
			firstproperty = 40;
			HTML += "<table>";
		}

			HTML += "<label class='playertile-label' for='propertycheckbox40'><div class='playerstats-tile property-cell-row'><input type='checkbox' id='propertycheckbox40'></td><div class='playerstats-tile-name'>Get Out of Jail Free Card</div></div></label><br>";

	}
	if (p.chanceJailCard) {
		if (HTML === "") {
			firstproperty = 41;
			HTML += "<table>";
		}

			HTML += "<label class='playertile-label' for='propertycheckbox41'><div class='playerstats-tile property-cell-row'><input type='checkbox' id='propertycheckbox41'></td><div class='playerstats-tile-name'>Get Out of Jail Free Card</div></div></label><br>";
	}

	if (HTML === "") {
		HTML = p.name + ", you don't have any properties.";
		$("#option").hide();
	} else {
		// HTML += "</table>";
	}

	document.getElementById("owned").innerHTML = HTML;

	// Select previously selected property.
	if (checkedproperty > -1 && document.getElementById("propertycheckbox" + checkedproperty)) {
		document.getElementById("propertycheckbox" + checkedproperty).checked = true;
	} else if (firstproperty > -1) {
		document.getElementById("propertycheckbox" + firstproperty).checked = true;
	}
	$(".property-cell-row").click(function() {
		var row = this;

		// Toggle check the current checkbox.
		$(this).find("input").prop("checked", function(index, val) {
			return !val;
		});

		// Set all other checkboxes to false.
		$(".property-cell-row > input").prop("checked", function(index, val) {
			if (!$.contains(row, this)) {
				return false;
			}
		});

		updateOption();
	});
	updateOption();
}

function updateOption() {
	$("#option").show();

	var allGroupUninproved = true;
	var allGroupUnmortgaged = true;
	var checkedproperty = getCheckedProperty();

	if (checkedproperty < 0 || checkedproperty >= 40) {
		$("#buyhousebutton").hide();
		$("#sellhousebutton").hide();
		$("#mortgagebutton").hide();


		var housesum = 32;
		var hotelsum = 12;

		for (var i = 0; i < 40; i++) {
			s = square[i];
			if (s.hotel == 1)
				hotelsum--;
			else
				housesum -= s.house;
		}

		$("#buildings").show();
		document.getElementById("buildings").innerHTML = "<img src='images/policy.png' alt='' title='policy' class='house' />:&nbsp;" + housesum + "&nbsp;&nbsp;<img src='images/law.png' alt='' title='Law' class='hotel' />:&nbsp;" + hotelsum+"<br><br>";

		return;
	}

	$("#buildings").hide();
	var sq = square[checkedproperty];

	buyhousebutton = document.getElementById("buyhousebutton");
	sellhousebutton = document.getElementById("sellhousebutton");

	$("#mortgagebutton").show();
	document.getElementById("mortgagebutton").disabled = false;

	if (sq.mortgage) {
		document.getElementById("mortgagebutton").value = "Unmortgage (D" + Math.round(sq.price * 0.55) + ")";
		document.getElementById("mortgagebutton").title = "Unmortgage " + sq.name + " for D" + Math.round(sq.price * 0.55) + ".";
		$("#buyhousebutton").hide();
		$("#sellhousebutton").hide();

		allGroupUnmortgaged = false;
	} else {
		document.getElementById("mortgagebutton").value = "Mortgage (D" + (sq.price * 0.5) + ")";
		document.getElementById("mortgagebutton").title = "Mortgage " + sq.name + " for D" + (sq.price * 0.5) + ".";

		if (sq.groupNumber >= 3) {
			$("#buyhousebutton").show();
			$("#sellhousebutton").show();
			buyhousebutton.disabled = false;
			sellhousebutton.disabled = false;

			buyhousebutton.value = "Buy policy (D" + sq.houseprice + ")";
			sellhousebutton.value = "Sell policy (D" + (sq.houseprice * 0.5) + ")";
			buyhousebutton.title = "Buy a policy for D" + sq.houseprice;
			sellhousebutton.title = "Sell a policy for D" + (sq.houseprice * 0.5);

			if (sq.house == 4) {
				buyhousebutton.value = "Buy law (D" + sq.houseprice + ")";
				buyhousebutton.title = "Buy a law for D" + sq.houseprice;
			}
			if (sq.hotel == 1) {
				$("#buyhousebutton").hide();
				sellhousebutton.value = "Sell law (D" + (sq.houseprice * 0.5) + ")";
				sellhousebutton.title = "Sell a law for D" + (sq.houseprice * 0.5);
			}

			var maxhouse = 0;
			var minhouse = 5;

			for (var j = 0; j < max; j++) {

				if (square[currentSquare.group[j]].house > 0) {
					allGroupUninproved = false;
					break;
				}
			}

			var max = sq.group.length;
			for (var i = 0; i < max; i++) {
				s = square[sq.group[i]];

				if (s.owner !== sq.owner) {
					buyhousebutton.disabled = true;
					sellhousebutton.disabled = true;
					buyhousebutton.title = "Before you can buy a policy, you must own all the policies of this color-group.";
				} else {

					if (s.house > maxhouse) {
						maxhouse = s.house;
					}

					if (s.house < minhouse) {
						minhouse = s.house;
					}

					if (s.house > 0) {
						allGroupUninproved = false;
					}

					if (s.mortgage) {
						allGroupUnmortgaged = false;
					}
				}
			}

			if (!allGroupUnmortgaged) {
				buyhousebutton.disabled = true;
				buyhousebutton.title = "Before you can buy a policy, you must unmortgage all the properties of this color-group.";
			}

			// Force even building
			if (sq.house > minhouse) {
				buyhousebutton.disabled = true;

				if (sq.house == 1) {
					buyhousebutton.title = "Before you can buy another policy, the other properties of this color-group must all have one policy.";
				} else if (sq.house == 4) {
					buyhousebutton.title = "Before you can buy a law, the other properties of this color-group must all have 4 houses.";
				} else {
					buyhousebutton.title = "Before you can buy a law, the other properties of this color-group must all have " + sq.house + " houses.";
				}
			}
			if (sq.house < maxhouse) {
				sellhousebutton.disabled = true;

				if (sq.house == 1) {
					sellhousebutton.title = "Before you can sell policy, the other policies of this color-group must all have one policy.";
				} else {
					sellhousebutton.title = "Before you can sell a policy, the other policies of this color-group must all have " + sq.house + " policies.";
				}
			}

			if (sq.house === 0 && sq.hotel === 0) {
				$("#sellhousebutton").hide();

			} else {
				$("#mortgagebutton").hide();

			}

			// Before a property can be mortgaged or sold, all the properties of its color-group must unimproved.
			if (!allGroupUninproved) {
				document.getElementById("mortgagebutton").title = "Before a property can be mortgaged, all the properties of its color-group must unimproved.";
				document.getElementById("mortgagebutton").disabled = true;
			}

		} else {
			$("#buyhousebutton").hide();
			$("#sellhousebutton").hide();
		}
	}
}

function chanceCommunityChest() {
	var p = player[turn];

	// Community Chest
	if (p.position === 2 || p.position === 17 || p.position === 33) {
		communityChestIndex = communityChestCards.deck[communityChestCards.index];


		// Remove the get out of jail free card from the deck.
		if (communityChestIndex === 0) {
			communityChestCards.deck.splice(communityChestCards.index, 1);
		}

		card_type = 'communityChest';
		
		document.getElementById("landed").innerHTML = "You landed on Community Chest. <br><br> <div class='btn rollbtn' onclick='openCards()' id='pickCardBtn'>Pick Card</div></span>";
		// document.getElementById("landed").innerHTML = "You landed on Community Chest. <br><br>Click on a deck to pick a card</span>";
		$("#nextbutton").hide();
		// openCards();
		
		
		
		// Chance
	} else if (p.position === 7 || p.position === 22 || p.position === 35) {
		console.log(chanceCards);
		chanceIndex = chanceCards.deck[chanceCards.index];
		
		// Remove the get out of jail free card from the deck.
		if (chanceIndex === 0) {
			chanceCards.deck.splice(chanceCards.index, 1);
		}
		
		
		card_type = 'chance';
		
		document.getElementById("landed").innerHTML = "You landed on Chance. <br><br> <div class='btn rollbtn' onclick='openCards()' id='pickCardBtn'>Pick Card</div></span>";
		// document.getElementById("landed").innerHTML = "You landed on Chance <br> <br>Click on a deck to pick a card</span>";
		$("#nextbutton").hide();
		// openCards();

	} else {
		if (!p.human) {
			p.AI.alertList = "";

			if (!p.AI.onLand()) {
				game.next();
			}
		}
	}
}

function chanceAction(chanceIndex) {
	console.log(chanceIndex);
	var p = player[turn]; 

	chanceCards[chanceIndex].action(p);
	
	updateMoney();

	if (chanceIndex !== 15 && !p.human) {
		p.AI.alertList = "";
		game.next();
	}
	
	chanceCards.index++;

	if (chanceCards.index >= chanceCards.deck.length) {
		chanceCards.index = 0;
	}
}

// 

function communityChestAction(communityChestIndex) {
	var p = player[turn]; // This is needed for reference in action() method.
	
	communityChestCards[communityChestIndex].action(p);
	
	updateMoney();
	
	if (communityChestIndex !== 15 && !p.human) {
		p.AI.alertList = "";
		game.next();
	}

	communityChestCards.index++;
	
	if (communityChestCards.index >= communityChestCards.deck.length) {
		communityChestCards.index = 0;
	}
	
	if(communityDrawDouble == 1 && p.avatar == 4){
		avatarPower(p.name + " get's to draw another card!", "https://cdn.lordicon.com/neujejkf.json");
		communityDrawDouble = 0;
		chanceCommunityChest();
		pickCard();
	}
}

// 

function addamount(amount, cause) {
	var p = player[turn];

	p.money += amount;

	addAlert(p.name + " received D" + amount + " from " + cause + ".");
}

function subtractamount(amount, cause) {
	var p = player[turn];

	p.pay(amount, 0);

	addAlert(p.name + " lost D" + amount + " from " + cause + ".");
}

function gotojail() {
	var p = player[turn];

	addAlert(p.name + " was sent directly to jail.");
	document.getElementById("landed").innerHTML = "You are in jail.";

	p.position = 10;
	p.jail = true;
	doublecount = 0;

	document.getElementById("nextbutton").value = "End turn";
	document.getElementById("nextbutton").title = "End turn and advance to the next player.";

	if (p.human) {
		document.getElementById("nextbutton").focus();
	}

	updatePosition();
	updateOwned();

	if (!p.human) {
		// popup(p.AI.alertList, game.next);
		p.AI.alertList = "";
	}
}

function gobackthreespaces() {
	var p = player[turn];

	p.position -= 3;
	updatePosition();

	land();
}

function payeachplayer(amount, cause) {
	var p = player[turn];
	var total = 0;

	for (var i = 1; i <= pcount; i++) {
		if (i != turn) {
			player[i].money += amount;
			total += amount;
			creditor = p.money >= 0 ? i : creditor;

			p.pay(amount, creditor);
		}
	}

	addAlert(p.name + " lost D" + total + " from " + cause + ".");
}

function collectfromeachplayer(amount, cause) {
	var p = player[turn];
	var total = 0;

	for (var i = 1; i <= pcount; i++) {
		if (i != turn) {
			money = player[i].money;
			if (money < amount) {
				p.money += money;
				total += money;
				player[i].money = 0;
			} else {
				player[i].pay(amount, turn);
				p.money += amount;
				total += amount;
			}
		}
	}

	addAlert(p.name + " received D" + total + " from " + cause + ".");
}

function advance(destination, pass) {
	var p = player[turn];

	if (typeof pass === "number") {
		if (p.position < pass) {
			p.position = pass;
		} else {
			p.position = pass;
			p.money += 200;
			addAlert(p.name + " collected a D200 salary for passing GO.");
		}
	}
	if (p.position < destination) {
		p.position = destination;
	} else {
		p.position = destination;
		p.money += 200;
		addAlert(p.name + " collected a D200 salary for passing GO.");
	}

	land();
}

function advanceToNearestUtility() {
	var p = player[turn];

	if (p.position < 12) {
		p.position = 12;
	} else if (p.position >= 12 && p.position < 28) {
		p.position = 28;
	} else if (p.position >= 28) {
		p.position = 12;
		p.money += 200;
		addAlert(p.name + " collected a D200 salary for passing GO.");
	}

	land(true);
}

function advanceToNearestRailroad() {
	var p = player[turn];

	updatePosition();

	if (p.position < 15) {
		p.position = 15;
	} else if (p.position >= 15 && p.position < 25) {
		p.position = 25;
	} else if (p.position >= 35) {
		p.position = 5;
		p.money += 200;
		addAlert(p.name + " collected a D200 salary for passing GO.");
	}

	land(true);
}


function advanceToOpenData() {
	var p = player[turn];
	p.position = 11;
	land(true);
}

function advanceToCensorship() {
	var p = player[turn];
	p.position = 16;
	land(true);
}

function advanceToInternetCourt() {
	var p = player[turn];
	p.position = 28;
	land(true);
}


function streetrepairs(houseprice, hotelprice) {
	var cost = 0;
	for (var i = 0; i < 40; i++) {
		var s = square[i];
		if (s.owner == turn) {
			if (s.hotel == 1)
				cost += hotelprice;
			else
				cost += s.house * houseprice;
		}
	}

	var p = player[turn];

	if (cost > 0) {
		p.pay(cost, 0);

		// If function was called by Community Chest.
		if (houseprice === 40) {
			addAlert(p.name + " lost D" + cost + " to Community Chest.");
		} else {
			addAlert(p.name + " lost D" + cost + " to Chance.");
		}
	}

}

function payperspace(fee) {
	var cost = 0;
	for (var i = 0; i < 40; i++) {
		var s = square[i];
		if (s.owner == turn) {
			cost += fee;
		}
	}

	var p = player[turn];

	if (cost > 0) {
		p.pay(cost, 0);
		addAlert(p.name + " lost D" + cost);
	}

}

function payfifty() {
	var p = player[turn];

	// document.getElementById("jail").style.border = '1px solid black';
	// document.getElementById("cell11").style.border = '2px solid ' + p.color;

	$("#landed").hide();
	doublecount = 0;

	p.jail = false;
	p.jailroll = 0;
	p.position = 10;
	var jailfee = 50;

	if (p.avatar==3){
		jailfee *= 0.5;
		avatarPower(p.name + " paid 50% less jail fee.");
	}

	p.pay(jailfee, 0);

	addAlert(p.name + " paid the D" + jailfee + " fine to get out of jail.");
	updateMoney();
	updatePosition();
}

function useJailCard() {
	var p = player[turn];

	// document.getElementById("jail").style.border = '1px solid black';
	// document.getElementById("cell11").style.border = '2px solid ' + p.color;

	$("#landed").hide();
	p.jail = false;
	p.jailroll = 0;

	p.position = 10;

	doublecount = 0;

	if (p.communityChestJailCard) {
		p.communityChestJailCard = false;

		// Insert the get out of jail free card back into the community chest deck.
		communityChestCards.deck.splice(communityChestCards.index, 0, 0);

		communityChestCards.index++;

		if (communityChestCards.index >= communityChestCards.deck.length) {
			communityChestCards.index = 0;
		}
	} else if (p.chanceJailCard) {
		p.chanceJailCard = false;

		// Insert the get out of jail free card back into the chance deck.
		chanceCards.deck.splice(chanceCards.index, 0, 0);

		chanceCards.index++;

		if (chanceCards.index >= chanceCards.deck.length) {
			chanceCards.index = 0;
		}
	}

	addAlert(p.name + " used a \"Get Out of Jail Free\" card.");
	updateOwned();
	updatePosition();
}

function buyHouse(index) {
	var sq = square[index];
	var p = player[sq.owner];
	var houseSum = 0;
	var hotelSum = 0;

	if (p.money - sq.houseprice < 0) {
		if (sq.house == 4) {
			return false;
		} else {
			return false;
		}

	} else {
		for (var i = 0; i < 40; i++) {
			if (square[i].hotel === 1) {
				hotelSum++;
			} else {
				houseSum += square[i].house;
			}
		}

		if (sq.house < 4) {
			if (houseSum >= 32) {
				return false;

			} else {
				sq.house++;
				addAlert(p.name + " bought a policy on " + sq.name + ".");
			}

		} else {
			if (hotelSum >= 12) {
				return;

			} else {
				sq.house = 5;
				sq.hotel = 1;
				addAlert(p.name + " bought a law on " + sq.name + ".");
			}
		}

		var payAmount = sq.houseprice;
		if(p.avatar == 8){
			payAmount *= 0.9;
			avatarPower(p.name + " paid 10% less for the policy.");
		}else{
			aa("https://cdn.lordicon.com/lsrcesku.json", "Policy Created!");
		}

		p.pay(payAmount, 0);

		updateOwned();
		updateMoney();
	}
}

function sellHouse(index) {
	sq = square[index];
	p = player[sq.owner];

	if (sq.hotel === 1) {
		sq.hotel = 0;
		sq.house = 4;
		addAlert(p.name + " sold the law on " + sq.name + ".");
	} else {
		sq.house--;
		addAlert(p.name + " sold a law on " + sq.name + ".");
	}

	p.money += sq.houseprice * 0.5;
	updateOwned();
	updateMoney();
}

function showStats() {
	var HTML, sq, p;
	var mortgagetext,
	housetext;
	var write;
	// HTML = "<table align='center'><tr>";
	HTML = "";

	for (var x = 1; x <= pcount; x++) {
		write = false;
		p = player[x];

		HTML += '<div class="playerstats-col"><div class="playerstats-profile"><img class="playerstats-img" src="images/avatar'+p.avatar+'.png"><div class="playerstats-profile-name"><div>'+p.name+'</div><br><b><div>(D'+p.money+')</div></b></div></div>';
		// console.log(HTML);

		for (var i = 0; i < 40; i++) {
			sq = square[i];

			if (sq.owner == x) {
				mortgagetext = "",
				housetext = "";
				HTML += "<div class='playerstats-tile'>";

				if (sq.mortgage) {
					mortgagetext = "title='Mortgaged' style='color: grey;'";
				}

				if (!write) {
					write = true;
				}
				HTML += "<div class='playerstats-tile-color' style='background: " + sq.color + ";'></div>";
				HTML += "<div class='playerstats-tile-name'>"+sq.name+"</div>";


				if (sq.house == 5) {
					housetext += "<span style='float: right; font-weight: bold;'>1&nbsp;x&nbsp;<img src='images/hotel.png' alt='' title='Law' class='hotel' style='float: none;' /></span>";
					HTML += "<img src='images/law.png'>";
				} else if (sq.house > 0 && sq.house < 5) {
					// housetext += "<span style='float: right; font-weight: bold;'>" + sq.house + "&nbsp;x&nbsp;<img src='images/house.png' alt='' title='House' class='house' style='float: none;' /></span>";
					HTML += "<img src='images/policy.png'><div class='playerstats-tile-policy'>" + sq.house + "</div>";
				}

				// HTML += "<tr><td class='statscellcolor' style='background: " + sq.color + ";";

				if (sq.groupNumber == 1 || sq.groupNumber == 2) {
					// HTML += " border: 1px solid grey;";
				}

				// HTML += "' onmouseover='showdeed(" + i + ");' onmouseout='hidedeed();'></td><td class='statscellname' " + mortgagetext + ">" + sq.name + housetext + "</td></tr>";

				HTML += "</div>";

			}
		}

		if (p.communityChestJailCard) {
			if (!write) {
				write = true;
			}
			HTML += "<div class='playerstats-tile'>Get Out of Jail Free Card</div>";

		}
		if (p.chanceJailCard) {
			if (!write) {
				write = true;
				// HTML += "<<div class='playerstats-tile'>";
			}
			HTML += "<div class='playerstats-tile'>Get Out of Jail Free Card</div>";

		}

		if (!write) {
			HTML += "<center>"+ p.name + " does not have any properties.</center>";
		} else {
			// HTML += "</div>";
		}

	HTML += "</div>";
	}

	document.getElementById("statstext").innerHTML = HTML;
	// Show using animation.
	$("#statsbackground").fadeIn(400, function() {
		$("#statswrap").show();
	});
}

function showdeed(property) {
	var sq = square[property];
	$("#deed").show();

	$("#deed-normal").hide();
	$("#deed-mortgaged").hide();
	$("#deed-special").hide();

	if (sq.mortgage) {
		$("#deed-mortgaged").show();
		document.getElementById("deed-mortgaged-name").textContent = sq.name;
		document.getElementById("deed-mortgaged-mortgage").textContent = (sq.price / 2);

	} else {

		if (sq.groupNumber >= 3) {
			$("#deed-normal").show();
			document.getElementById("deed-header").style.backgroundColor = sq.color;
			document.getElementById("deed-name").textContent = sq.name;
			document.getElementById("deed-baserent").textContent = sq.baserent;
			document.getElementById("deed-rent1").textContent = sq.rent1;
			document.getElementById("deed-rent2").textContent = sq.rent2;
			document.getElementById("deed-rent3").textContent = sq.rent3;
			document.getElementById("deed-rent4").textContent = sq.rent4;
			document.getElementById("deed-rent5").textContent = sq.rent5;
			document.getElementById("deed-mortgage").textContent = (sq.price / 2);
			document.getElementById("deed-houseprice").textContent = sq.houseprice;
			document.getElementById("deed-hotelprice").textContent = sq.houseprice;

		} else if (sq.groupNumber == 2) {
			$("#deed-special").show();
			document.getElementById("deed-special-name").textContent = sq.name;
			document.getElementById("deed-special-text").innerHTML = utiltext();
			document.getElementById("deed-special-mortgage").textContent = (sq.price / 2);

		} else if (sq.groupNumber == 1) {
			$("#deed-special").show();
			document.getElementById("deed-special-name").textContent = sq.name;
			document.getElementById("deed-special-text").innerHTML = transtext();
			document.getElementById("deed-special-mortgage").textContent = (sq.price / 2);
		}
	}
}

function hidedeed() {
	$("#deed").hide();
}

function buy() {
	var p = player[turn];
	var property = square[p.position];
	var cost = property.price;

	if (p.money >= cost) {

		aa("https://cdn.lordicon.com/jtiihjyw.json", "Sold!");

		
		if(cost>100 && p.avatar==1){
			cost *= 0.9;
			avatarPower(p.name+" just bought "+property.name+" for 10% less.");
		}

		if(p.avatar==5 && p.position==32){
			cost = 0;
			avatarPower(p.name+" just bought "+property.name+" for free.", "https://cdn.lordicon.com/tjgiycnd.json");
		}

		if(p.avatar==6 && getPlayerProperties(turn).length==0){
			cost *= 0.5;
			avatarPower(p.name+" has 50% off as a first-time buyer!");
		}

		if(p.avatar==6 && p.position==3){
			cost = 0;
			avatarPower(p.name+" just bought "+property.name+" for free.", "https://cdn.lordicon.com/tjgiycnd.json");
		}

		if(p.avatar==7 && p.position==36){
			cost = 0;
			avatarPower(p.name+" just bought "+property.name+" for free.", "https://cdn.lordicon.com/tjgiycnd.json");
		}

		if(p.avatar==3 && p.position==6){
			cost = 0;
			avatarPower(p.name+" just bought "+property.name+" for free.", "https://cdn.lordicon.com/tjgiycnd.json");
		}

		if(p.avatar==10 && p.position==26){
			cost = 0;
			avatarPower(p.name+" just bought "+property.name+" for free.", "https://cdn.lordicon.com/tjgiycnd.json");
		}


		p.pay(cost, 0);

		property.owner = turn;
		showCity();

		updateMoney();
		if(sfx){buyAudio.play();}

		addAlert(p.name + " bought " + property.name + " for " + property.pricetext + ".");

		var faceProperty = document.createElement("img");
        faceProperty.id = "faceProperty"+p.position;
        faceProperty.className = "faceProperty";
        faceProperty.src = "images/avatar"+p.avatar+".png";

        faceProperty.style.top = (positions[p.position][1]+45)+"px";
        faceProperty.style.left = (positions[p.position][0]+10)+"px";
		


        // console.log(faceProperty);
        $("#canvas").append(faceProperty);

		updateOwned();

		$("#landed").hide();

	} else {
		popup("<p>" + p.name + ", you need D" + (property.price - p.money) + " more to buy " + property.name + ".</p>");
	}

	updateGameData();
}

function mortgage(index) {
	var sq = square[index];
	var p = player[sq.owner];

	if (sq.house > 0 || sq.hotel > 0 || sq.mortgage) {
		return false;
	}

	var mortgagePrice = Math.round(sq.price * 0.5);
	var unmortgagePrice = Math.round(sq.price * 0.55);

	sq.mortgage = true;
	p.money += mortgagePrice;

	document.getElementById("mortgagebutton").value = "Unmortgage for $" + unmortgagePrice;
	document.getElementById("mortgagebutton").title = "Unmortgage " + sq.name + " for $" + unmortgagePrice + ".";

	addAlert(p.name + " mortgaged " + sq.name + " for D" + mortgagePrice + ".");
	updateOwned();
	updateMoney();

	return true;
}

function unmortgage(index) {
	var sq = square[index];
	var p = player[sq.owner];
	var unmortgagePrice = Math.round(sq.price * 0.55);
	var mortgagePrice = Math.round(sq.price * 0.5);

	if (unmortgagePrice > p.money || !sq.mortgage) {
		return false;
	}

	// journalist unmortgage for free
	if(p.avatar==10){
		unmortgagePrice = 0;
		avatarPower(p.name+" just unmortgaged "+sq.name+" for free.");
	}

	p.pay(unmortgagePrice, 0);
	sq.mortgage = false;
	document.getElementById("mortgagebutton").value = "Mortgage for D" + mortgagePrice;
	document.getElementById("mortgagebutton").title = "Mortgage " + sq.name + " for $" + mortgagePrice + ".";

	addAlert(p.name + " unmortgaged " + sq.name + " for D" + unmortgagePrice + ".");
	updateOwned();
	return true;
}


function land(increasedRent) {

	increasedRent = !!increasedRent; // Cast increasedRent to a boolean value. It is used for the ADVANCE TO THE NEAREST RAILROAD/UTILITY Chance cards.

	var p = player[turn];
	var s = square[p.position];

	var die1 = game.getDie(1);
	var die2 = game.getDie(2);

	$("#landed").show();

	blackFade();


	if (p.position === 2 || p.position === 17 || p.position === 33 || p.position === 7 || p.position === 22 || p.position === 35) {
	}else{
		document.getElementById("landed").innerHTML = "You landed on <span style='text-decoration:underline'>" + s.name + "</span>.";
	}

	s.landcount++;
	// addAlert(p.name + " landed on " + s.name + ".");

	// Allow player to buy the property on which he landed.
	if (s.price !== 0 && s.owner === 0) {

		if (!p.human) {

			if (p.AI.buyProperty(p.position)) {
				buy();
			}
		} else {
			document.getElementById("landed").innerHTML = "You landed on <br><a href='javascript:void(0);' onclick='tiler(" + p.position + ");' class='statscellcolor'>" + s.name + "</a>.<br><input type='button' onclick='buy();' class='btn buybtn' value='Buy (D" + s.price + ")' title='Buy " + s.name + " for " + s.pricetext + ".'/>";
		}

		// this adds property to auction queue
		game.addPropertyToAuctionQueue(p.position);
	}

	// Collect rent
	if (s.owner !== 0 && s.owner != turn && !s.mortgage) {
		var groupowned = true;
		var rent;

		if(p.position == 11){

			rent = (die1 + die2) * 10;

		}else if(p.position == 16){

			rent = (die1 + die2) * 6;

		}

		else if (p.position === 12) {
			if (increasedRent || square[28].owner == s.owner) {
				rent = (die1 + die2) * 10;
			} else {
				rent = (die1 + die2) * 4;
			}

		} else if (p.position === 28) {
			if (increasedRent || square[12].owner == s.owner) {
				rent = (die1 + die2) * 10;
			} else {
				rent = (die1 + die2) * 4;
			}

		} 

		else {

			for (var i = 0; i < 40; i++) {
				sq = square[i];
				if (sq.groupNumber == s.groupNumber && sq.owner != s.owner) {
					groupowned = false;
				}
			}

			if (!groupowned) {
				rent = s.baserent;
			} else {
				if (s.house === 0) {
					rent = s.baserent * 2;
				} else {
					rent = s["rent" + s.house];
				}
			}
		}

		if(p.avatar==2){
			rent *= 0.95;
			avatarPower(p.name+" just paid 5% less rent"+s.name+".", "https://cdn.lordicon.com/epietrpn.json");
		}
		
		if(p.avatar==3 && p.position==6){
			rent = 0;
			avatarPower(p.name+" just paid nothing for landing on "+s.name+".", "https://cdn.lordicon.com/jrxatxqu.json");
		}

		if(p.avatar==5 && p.position==32){
			rent = 0;
			avatarPower(p.name+" just paid nothing for landing on "+s.name+".", "https://cdn.lordicon.com/jrxatxqu.json");
		}
		
		if(p.avatar==6 && p.position==16){
			rent = 0;
			avatarPower(p.name+" just paid nothing for landing on "+s.name+".", "https://cdn.lordicon.com/jrxatxqu.json");
		}

		if(p.avatar==7 && p.position==3){
			rent = 0;
			avatarPower(p.name+" just paid nothing for landing on "+s.name+".", "https://cdn.lordicon.com/jrxatxqu.json");
		}
		
		if(p.avatar==7 && p.position==36){
			rent = 0;
			avatarPower(p.name+" just paid nothing for landing on "+s.name+".", "https://cdn.lordicon.com/jrxatxqu.json");
		}

		if(p.avatar==9 && pensionerFirstRent==true){
			rent = 0;
			pensionerFirstRent = false;
			avatarPower("Free first rent <br>"+p.name+" just paid nothing for landing on "+s.name+".", "https://cdn.lordicon.com/jrxatxqu.json");
		}

		if(p.avatar==10 && p.position==26){
			rent = 0;
			avatarPower(p.name+" just paid nothing for landing on "+s.name+".", "https://cdn.lordicon.com/jrxatxqu.json");
		}
		

		addAlert(p.name + " paid D" + rent + " rent to " + player[s.owner].name + ".");
		p.pay(rent, s.owner);
		player[s.owner].money += rent;

		document.getElementById("landed").innerHTML = "You landed on " + s.name + ". " + player[s.owner].name + " collected D" + rent + " rent.";
	} else if (s.owner > 0 && s.owner != turn && s.mortgage) {
		document.getElementById("landed").innerHTML = "You landed on " + s.name + ". Property is mortgaged; no rent was collected.";
	}

	// City Tax
	if (p.position === 4) {
		citytax();
	}

	// Go to jail. Go directly to Jail. Do not pass GO. Do not collect $200.
	if (p.position === 30) {
		updateMoney();
		updatePosition();

		if (p.human) {
			popup("<div>Go to jail. Go directly to Jail. Do not pass GO. Do not collect D200.</div>", gotojail);
		} else {
			gotojail();
		}

		return;
	}

	// Luxury Tax
	if (p.position === 38) {
		luxurytax();
	}

	updateMoney();
	updatePosition();
	updateOwned();


	if(p.avatar == 5){
		communityDrawDouble = 1;
	}
	if (!p.human) {
		popup(p.AI.alertList, chanceCommunityChest);
		// chanceCommunityChest();
		p.AI.alertList = "";
	} else {
		chanceCommunityChest();
	}

	updateGameData();
}

function roll() {
	var p = player[turn];

	$("#option").hide();
	$("#buy").show();
	// $("#manage").hide();
	$("#info").hide();

	if (p.human) {
		document.getElementById("nextbutton").focus();
	}

	document.getElementById("nextbutton").value = "End turn";
	document.getElementById("nextbutton").title = "End turn and advance to the next player.";
	game.rollDice();

	setTimeout(function(){

	setTimeout(function(){
		showInfo();
	},2000);

	var die1 = game.getDie(1);
	var die2 = game.getDie(2);


	doublecount++;

	if (die1 == die2) {
		addAlert(p.name + " rolled " + (die1 + die2) + " - doubles.");
	} else {
		addAlert(p.name + " rolled " + (die1 + die2) + ".");
	}

	if (die1 == die2 && !p.jail) {
		updateDice(die1, die2);

		if (doublecount < 3) {
			document.getElementById("nextbutton").value = "Roll again";
			document.getElementById("nextbutton").title = "You threw doubles. Roll again.";

		// If player rolls doubles three times in a row, send him to jail
		} else if (doublecount === 3) {
			p.jail = true;
			doublecount = 0;
			addAlert(p.name + " rolled doubles three times in a row.");
			updateMoney();


			if (p.human) {
				popup("You rolled doubles three times in a row. Go to jail.", gotojail);
			} else {
				gotojail();
			}

			return;
		}
	} else {
		document.getElementById("nextbutton").value = "End turn";
		document.getElementById("nextbutton").title = "End turn and advance to the next player.";
		doublecount = 0;
	}

	updatePosition();
	updateMoney();
	updateOwned();

	if (p.jail === true) {
		p.jailroll++;

		updateDice(die1, die2);
		if (die1 == die2) {
			// document.getElementById("jail").style.border = "1px solid black";
			// document.getElementById("cell11").style.border = "2px solid " + p.color;
			$("#landed").hide();

			p.jail = false;
			p.jailroll = 0;
			p.position = 10 + die1 + die2;
			doublecount = 0;

			addAlert(p.name + " rolled doubles to get out of jail.");

			land();
		} else {
			if (p.jailroll === 3) {

				if (p.human) {
					popup("<p>You must pay the D50 fine.</p>", function() {
						payfifty();
						player[turn].position=10 + die1 + die2;
						land();
					});
				} else {
					payfifty();
					p.position = 10 + die1 + die2;
					land();
				}
			} else {
				$("#landed").show();
				document.getElementById("landed").innerHTML = "You are in jail.";

				if (!p.human) {
					// popup(p.AI.alertList, game.next);
					p.AI.alertList = "";
				}
			}
		}


	} else {
		updateDice(die1, die2);

		// Move player
		p.position += die1 + die2;
		if(sfx){moveAvatarAudio.play();}

		// Collect $200 salary as you pass GO
		if (p.position >= 40) {
			p.position -= 40;
			var goSalary = 200;
			if(p.avatar==9){
				goSalary = 250;
				avatarPower(p.name+" just collected D50 extra for passing GO.", "https://cdn.lordicon.com/lxizbtuq.json");
			}
			p.money += goSalary;
			addAlert(p.name + " collected a D"+goSalary+" salary for passing GO.");
		}

		land();
	}

}, 6000);
}

function play() {

// switch auction back on
	if (game.auction()) {
		return;
	}

	turn++;
	if (turn > pcount) {
		turn -= pcount;
	}

	var p = player[turn];
	// $('.avatar').css("z-index", 2);
	$('.avatar').removeClass("avatar-highlight");
	$('#avatar'+p.avatar).addClass("avatar-highlight");

	$('#manageBoardName').html(p.name);
	$('#manageBoardMoney').html(p.money);
	$('#manageBoardAvatar').attr({ "src": "images/avatar"+p.avatar+".png"});
	game.resetDice();

	// document.getElementById("pname").innerHTML = p.name;
	// highlightAvatar(p.avatar);

	moveInfoPosition();

	addAlert("It is " + p.name + "'s turn.");

	// Check for bankruptcy.
	p.pay(0, p.creditor);

	$("#landed, #option").hide();
	$("#board, #control, #moneybar, #viewstats, #buy").show();

	doublecount = 0;
	if (p.human) {
		document.getElementById("nextbutton").focus();
	}
	document.getElementById("nextbutton").value = "Roll Dice";
	document.getElementById("nextbutton").classList.add('rollbtn');
	document.getElementById("nextbutton").title = "Roll the dice and move your token accordingly.";

	$("#die0").hide();
	$("#die1").hide();

	if (p.jail) {
		$("#landed").show();
		document.getElementById("landed").innerHTML = "You are in jail.<input type='button' class='btn redbtn' title='Pay D50 fine to get out of jail immediately.' value='Pay D50 fine' onclick='payfifty();' />";

		if (p.communityChestJailCard || p.chanceJailCard) {
			document.getElementById("landed").innerHTML += "<input type='button' id='gojfbutton' title='Use &quot;Get Out of Jail Free&quot; card.' onclick='useJailCard();' value='Use Card' />";
		}

		document.getElementById("nextbutton").title = "Roll the dice. If you throw doubles, you will get out of jail.";

		if (p.jailroll === 0)
			addAlert("This is " + p.name + "'s first turn in jail.");
		else if (p.jailroll === 1)
			addAlert("This is " + p.name + "'s second turn in jail.");
		else if (p.jailroll === 2) {
			document.getElementById("landed").innerHTML += "<div>NOTE: If you do not throw doubles after this roll, you <i>must</i> pay the $50 fine.</div>";
			addAlert("This is " + p.name + "'s third turn in jail.");
		}

		if (!p.human && p.AI.postBail()) {
			if (p.communityChestJailCard || p.chanceJailCard) {
				useJailCard();
			} else {
				payfifty();
			}
		}
	}

	updateMoney();
	updatePosition();
	updateOwned();

	$(".money-bar-arrow").hide();
	$("#p" + turn + "arrow").show();

	$(".player-stat").removeClass('player-stat-active');
	$("#p" + turn + "stat").addClass('player-stat-active');

	if (!p.human) {
		if (!p.AI.beforeTurn()) {
			game.next();
		}
	}
}



function getCheckedProperty() {
	for (var i = 0; i < 42; i++) {
		if (document.getElementById("propertycheckbox" + i) && document.getElementById("propertycheckbox" + i).checked) {
			return i;
		}
	}
	return -1; // No property is checked.
}

function menuitem_onmouseover(element) {
	element.className = "menuitem menuitem_hover";
	return;
}

function menuitem_onmouseout(element) {
	element.className = "menuitem";
	return;
}

// custom functions

function highlightAvatar(avatar){
  $(".black-fade").css("display", "block");
  $(".black-fade").css("opacity", 1);

  $(".avatar").css("z-index",2);
  $("#avatar"+avatar).css("z-index",4);
}

function blackFade(){
	$(".black-fade").css("display", "block");
	$(".black-fade").css("opacity", 1);
	setTimeout(function(){
		$(".black-fade").css("opacity", 0);
		setTimeout(function(){
			$(".black-fade").css("display", "none");
		}, 500);
	}, 10000);
}

var infoPos =38;

function moveInfoPosition(){
	p=player[turn];
	// p= {position:infoPos};
	var xpos = positions[p.position][0];
	var ypos = positions[p.position][1];

	if (p.position==0 || p.position==30) {
		ypos = ypos - 60;
		xpos = xpos - 87;
	}else if (p.position==10) {
		ypos = ypos - 90;
		xpos = xpos - 87;
	}else if (p.position==20) {
		ypos = ypos + 70;
		xpos = xpos - 87;
	}else if (p.position>0 && p.position<10) {
		ypos = ypos - 60;
		xpos = xpos + 50;
	}else if (p.position>10 && p.position<20) {
		ypos = ypos + 30;
		xpos = xpos + 50;
	}else if (p.position>20 && p.position<30) {
		ypos = ypos + 40;
		xpos = xpos - 220;
	}else if (p.position>30 && p.position<40) {
		ypos = ypos - 40;
		xpos = xpos + 50;
	}
	// console.log(ypos);
	$("#info").css("top", ypos+"px");
	$("#info").css("left", xpos+"px");
}

function showInfo(e=p.position){
	moveInfoPosition();
	// $("#info").css("background", "red");
	if (sfx) {swooshAudio.play()}
	$("#info").show();
	// $("#info").addClass("animate__bounceIn");
	// $("#info").css("transform", "scale(1.1)");
	// setTimeout(function(){
		// $("#info").css("transform", "scale(1)");
	// },300)
};

var lastShownCity = 'city99';

function showCity(){

	var boughtSquares = 0;
	for (var i = 0; i < 40; i++) {
		if(square[i].owner > 0){boughtSquares++;}
	}

	if (boughtSquares>39) {
		showBuilding('city7');
	}if (boughtSquares>36) {
		showBuilding('city5');
	}if (boughtSquares>31) {
		showBuilding('city8');
	}if (boughtSquares>27) {
		showBuilding('city11');
	}if (boughtSquares>23) {
		showBuilding('city9');
	}if (boughtSquares>19) {
		showBuilding('city3');
	}if (boughtSquares>15) {
		showBuilding('city2');
	}if (boughtSquares>11) {
		showBuilding('city10');
	}if (boughtSquares>7) {
		showBuilding('city1');
	}if (boughtSquares>4) {
		showBuilding('city6');
		showBuilding('city0');
	}if (boughtSquares>0) {
		showBuilding('city4');
	}

}

function showBuilding(e){

	// console.log("last: "+lastShownCity);
	// console.log("e: "+e);

	if (e=='city6' || e=='city0') {
		if (lastShownCity=='city6' || lastShownCity=='city0') {
		}else{
			setTimeout(function(){
			$('#city6, #city0').addClass('activated-city');
			$('#city6, #city0').fadeIn();
			if(sfx){cityAudio.play();}
			}, 1000);
		}
	}else{

		if (lastShownCity==e) {
		}else{
			setTimeout(function(){
				$('#'+e).addClass('activated-city', "animate__animated", "animate__tada");
				$('#'+e).show();
				if(sfx){cityAudio.play();}
				// console.log('played');
			}, 1000);
		}
	}

	lastShownCity = e;
	// console.log("new last: "+lastShownCity);
}





$("#mortgagebutton").click(function() {
	var checkedProperty = getCheckedProperty();
	var s = square[checkedProperty];


	if (s.mortgage) {
		if (player[s.owner].money < Math.round(s.price * 0.55)) {
			popup("<p>You need D" + (Math.round(s.price * 0.55) - player[s.owner].money) + " more to unmortgage " + s.name + ".</p>");

		} else {
			popup("<p>" + player[s.owner].name + ", are you sure you want to unmortgage " + s.name + " for D" + Math.round(s.price * 0.55) + "?</p>", function() {
				unmortgage(checkedProperty);
			}, "Yes/No");
		}
	} else {
		popup("<p>" + player[s.owner].name + ", are you sure you want to mortgage " + s.name + " for D" + Math.round(s.price * 0.5) + "?</p>", function() {
			mortgage(checkedProperty);
		}, "Yes/No");
	}

	$('#manageBoardMoney').html(player[s.owner].money);
});

$("#buyhousebutton").on("click", function() {
	var checkedProperty = getCheckedProperty();
	var s = square[checkedProperty];
	var p = player[s.owner];
	var houseSum = 0;
	var hotelSum = 0;

	if (p.money < s.houseprice) {
		if (s.house === 4) {
			popup("<p>You need D" + (s.houseprice - player[s.owner].money) + " more to buy a law for " + s.name + ".</p>");
			return;
		} else {
			popup("<p>You need D" + (s.houseprice - player[s.owner].money) + " more to buy a policy for " + s.name + ".</p>");
			return;
		}
	}

	for (var i = 0; i < 40; i++) {
		if (square[i].hotel === 1) {
			hotelSum++;
		} else {
			houseSum += square[i].house;
		}
	}

	if (s.house < 4 && houseSum >= 32) {
		popup("<p>All 32 policies are owned. You must wait until one becomes available.</p>");
		return;
	} else if (s.house === 4 && hotelSum >= 12) {
		popup("<p>All 12 laws are owned. You must wait until one becomes available.</p>");
		return;
	}

	buyHouse(checkedProperty);

});

$("#sellhousebutton").click(function() { sellHouse(getCheckedProperty()); });


// $("#alert").scrollTop($("#alert").prop("scrollHeight"));

$("#managecircle").click(function() {
	$('#manageBoardMoney').html(player[turn].money);
});


function getPlayerProperties() {
	var props = [];
	for (var i = 0; i < 40; i++) {
		if (square[i].owner === turn) {
			props.push(i);
		}
	}
	return props;
}


var player = [];
var pcount;
var turn = 0, doublecount = 0;

var loadgame = false;

const urlParams = new URLSearchParams(window.location.search);
const loadParam = urlParams.get('load');
if (loadParam) {
	loadgame = true;
}


window.onload = function() {



	AITest.count = 0;
	var gameObjectString;

	if (loadgame) {
		const saved_url = `presaved_sessions/${loadParam}.json`;
		gameObjectString = loadGameDataFromURL(saved_url);
	}
	else{
		gameObjectString = localStorage.getItem('gameData');
	}
	var gameObject = JSON.parse(gameObjectString);
	// console.log(gameObject);


	game = new Game();



	pcount = gameObject.playerCount;
	turn = gameObject.turn;
	doublecount = gameObject.doublecount;
	lastShownCity = gameObject.lastShownCity;

	player = gameObject.player;
	square = gameObject.square;


	// communityChestCards = gameObject.communityChestCards;
	// chanceCards = gameObject.chanceCards;

	chanceCards.index = gameObject.chanceCardsIndex;
	communityChestCards.index = gameObject.communityChestCardsIndex;

	chanceCards.deck = gameObject.chanceCardsDeck;
	communityChestCards.deck = gameObject.communityChestCardsDeck;

	pensionerFirstRent = gameObject.pensionerFirstRent;
	caregiverFirstRow = gameObject.caregiverFirstRow;
	studentFirstRow = gameObject.studentFirstRow;

	for (var i = 0; i <= 8; i++) {
		player[i].pay = function (amount, creditor) {
			if (amount <= this.money) {
				this.money -= amount;

				updateMoney();

				return true;
			} else {
				this.money -= amount;
				this.creditor = creditor;

				updateMoney();

				return false;
			}
		};
	}

	// console.log()

	var playerArray = player;
	var p;

	for (var i = 1; i <= pcount; i++) {
		p = player[i];


		p.avatar = playerArray[i].avatar;
		$("#avatar"+playerArray[i].avatar).show();
		$("#avatar"+playerArray[i].avatar).addClass('avatar-active');

		$("#playerstats-col"+playerArray[i].avatar).show();
		$("#playerstatsName"+playerArray[i].avatar).html(playerArray[i].name);

		if (playerArray[i].human == true) {
			p.name = playerArray[i].name;
			p.human = true;
		} else {
			p.human = false;
			p.AI = new AITest(p);
		}

		turn = i;
		updatePosition();
	}
	turn = gameObject.turn;



	for (var i = 0; i < 40; i++) {
		si = square[i];
		if (si.owner>0) {
			var faceProperty = document.createElement("img");
		    faceProperty.id = "faceProperty"+i;
		    faceProperty.className = "faceProperty";
		    faceProperty.src = "images/avatar"+player[si.owner].avatar+".png";

		    faceProperty.style.top = (positions[i][1]+45)+"px";
		    faceProperty.style.left = (positions[i][0]+10)+"px";


		    // console.log(faceProperty);
		    $("#canvas").append(faceProperty);
		}
	}



// #########################################
// #########################################


	$("#nextbutton").click(game.next);
	$("#noscript").hide();

	$("#board").show();


	play();


	// setup();

	// player[2].name = 'ffff';

	// console.log(gameObject);


	// $("#avatar1").css({"left": positions[infoPos][0]+"px", "top": positions[infoPos][1]+"px"});
	// showInfo(infoPos);

	updateGameData();
	showCity();
};



function updateGameData(){

	if(1){

		gameData = {
			"playerCount" : pcount,
			"turn" : turn,
			"doublecount" : doublecount,
			"lastShownCity" : lastShownCity,
			player,
			square,
			"chanceCardsIndex" : chanceCards.index,
			"communityChestCardsIndex" : communityChestCards.index,
			"chanceCardsDeck" : chanceCards.deck,
			"communityChestCardsDeck" : communityChestCards.deck,
			"pensionerFirstRent" : pensionerFirstRent,
			"caregiverFirstRow" : caregiverFirstRow,
			"studentFirstRow" : studentFirstRow
		};
		var dataString = JSON.stringify(gameData);
		localStorage.setItem('gameData', dataString);
		// console.log(square);
		
	}

	// console.log(pensionerFirstRent);
}



function restart(){

	newplayers = player;
	player = [];

	var groupPropertyArray = [];
	var groupNumber;

	for (var i = 0; i <= 8; i++) {
		if (i==0) {
			player[0] = new Player("the bank", "", "");
		}else if(i<pcount+1){
		player[i] = new Player(newplayers[i].name, "", newplayers[i].avatar);
		}else{
			player[i] = new Player("", "", "");
		}
		player[i].index = i;
	}


	for (var i = 0; i < 40; i++) {
		square[i].hotel = 0;
		square[i].house = 0;
		square[i].mortgage = false;
		square[i].owner = 0;
	}



	communityChestCards.deck = [];
	chanceCards.deck = [];

	for (var i = 0; i < 16; i++) {
		chanceCards.deck[i] = i;
		communityChestCards.deck[i] = i;
	}
	
	communityChestCards.index = 0;
	chanceCards.index = 0;

	gameData = {
		"playerCount" : pcount,
		"turn" : 0,
		"doublecount" : 0,
		"lastShownCity" : 'city99',
		player,
		square,
		"chanceCardsIndex" : chanceCards.index,
		"communityChestCardsIndex" : communityChestCards.index,
		"chanceCardsDeck" : chanceCards.deck,
		"communityChestCardsDeck" : communityChestCards.deck,
		"pensionerFirstRent" : pensionerFirstRent,
		"caregiverFirstRow" : caregiverFirstRow,
		"studentFirstRow" : studentFirstRow
	};

	var dataString = JSON.stringify(gameData);

    localStorage.setItem('gameData', dataString)
    	window.location.href = "game.html";
	// console.log(lastShownCity);
	
}


function checkGameData() {
    // Check if 'gameData' exists in localStorage
    var gameObjectString = localStorage.getItem('gameData');
    if (!gameObjectString) {
        console.log("gameData does not exist in localStorage");
        return false;
    }

    try {
        // Parse 'gameData' string to JSON
        var gameObject = JSON.parse(gameObjectString);

        // Check if required properties exist in the parsed object
        if (!gameObject.hasOwnProperty("playerCount") ||
            !gameObject.hasOwnProperty("turn") ||
            !gameObject.hasOwnProperty("doublecount") ||
            !gameObject.hasOwnProperty("lastShownCity") ||
            !gameObject.hasOwnProperty("player") ||
            !gameObject.hasOwnProperty("square") ||
            !gameObject.hasOwnProperty("communityChestCardsIndex") ||
            !gameObject.hasOwnProperty("communityChestCardsDeck") ||
            !gameObject.hasOwnProperty("chanceCardsDeck") ||
			!gameObject.hasOwnProperty("pensionerFirstRent") ||
			!gameObject.hasOwnProperty("caregiverFirstRow") ||
			!gameObject.hasOwnProperty("studentFirstRow") ||
            !gameObject.hasOwnProperty("chanceCardsIndex")) {
            console.log("gameData is missing required properties");
            return false;
        }

        // Additional checks if needed
        // For example, you might want to validate specific properties' types or values

        // If all checks pass, return true
        return true;
    } catch (error) {
        console.error("Error parsing gameData:", error);
        return false;
    }
}


if (checkGameData() || loadgame) {
}else{
	window.location.href = "setup.html";
}

function downloadGameData(){
	var gameObjectString = localStorage.getItem('gameData');
	var gameObject = JSON.parse(gameObjectString);
	var dataString = JSON.stringify(gameObject);
	var blob = new Blob([dataString], {type: "application/json"});
	var url = URL.createObjectURL(blob);
  
	var a = document.createElement('a');
	a.href = url;
	a.download = 'game_data.json';
	a.style.display = 'none';
	document.body.appendChild(a);
	
	a.click();
  
	// Remove the element after the download
	document.body.removeChild(a);
  
	// Clean up the URL object
	URL.revokeObjectURL(url);
  }

  
function loadGameDataFromURL(url) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, false);
	xhr.send();
	if (xhr.status === 200) {
	  return xhr.responseText;
	}
  }
  
  