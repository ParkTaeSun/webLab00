"use strict";

var numberOfBlocks = 9;
var targetBlocks = [];
var trapBlock;
var targetTimer;
var trapTimer;
var instantTimer;


document.observe('dom:loaded', function(){
	if(numberOfBlocks == 9){
		$("start").onclick = readyToStart;
		numberOfBlocks = 0;
	}
	$("stop").onclick = stopGame;
});

function readyToStart(){
	$("state").textContent = "Ready!";
	$("score").textContent = "0";
	

	setTimeout(startGame, 3000);
}

function startGame(){
	if(numberOfBlocks == 9){
		resetToStart();
	}

	clearInterval(targetTimer);
	clearInterval(trapTimer);
	clearInterval(instantTimer);
	numberOfBlocks = 9;
	targetBlocks = [];
	trapBlock = null;

	startToCatch();
}

function stopGame(){
	$("state").textContent = "Stop";
	clearInterval(targetTimer);
	clearInterval(trapTimer);
	clearInterval(instantTimer);
	numberOfBlocks = 9;
	targetBlocks = [];
	trapBlock = null;
}

function resetToStart(){
	var blocks = $$(".block");
	for(var i = 0; i < blocks.length; i++){
		if(blocks[i].hasClassName("target")){
			blocks[i].removeClassName("target");	
		}
		else if(blocks[i].hasClassName("trap")){
			blocks[i].removeClassName("trap");	
		}
	}
	// if(trapBlock < 10){
	// 	blocks[trapBlock].removeClassName("trap");
	// }
}

function startToCatch(){
	$("state").textContent = "Catch!";
	var blocks = $$(".block");

	targetTimer = setInterval(setTarget, 1000);
	trapTimer = setInterval(setTrap, 3000);

	for(var i = 0; i < blocks.length; i++){
		blocks[i].observe("click", clicksss);
	}
}

function setTarget(){
	while(1){
		var is = 0;	
		var tg = Math.floor(Math.random() * 9);
		for(var i = 0; i < targetBlocks.length; i++){
			if (tg == targetBlocks[i] && tg != trapBlock){
				is = 1;
			}
		}
		if(is == 0){
			targetBlocks.push(tg);
			break;
		}
	}
	var blocks = $$(".block");
	blocks[targetBlocks[targetBlocks.length-1]].addClassName("target");

	if(targetBlocks.length > 4){
		clearInterval(targetTimer);
		clearInterval(trapTimer);
		alert("you lose!");
	}
}

function setTrap(){
	while(1){
		var is = 0;	
		trapBlock = Math.floor(Math.random() * 9);
		for(var i = 0; i < targetBlocks.length; i++){
			if (trapBlock == targetBlocks[i]){
				is = 1;
			}
		}
		if(is == 0){
			break;
		}
	}
	var blocks = $$(".block");
	blocks[trapBlock].addClassName("trap");

	setTimeout(setTrapRemove, 2000);
}

function setTrapRemove(){
	var blocks = $$(".block");
	for(var i = 0; i < blocks.length; i++){
		if(blocks[i].hasClassName("trap")){
			blocks[i].removeClassName("trap");	
		}
	}
}

function clicksss(){
	var z = this.readAttribute("data-index");

	if(z == trapBlock){
		$("score").textContent -= 30;
		this.removeClassName("trap");
	}
	else{
		var is = 0;
		for(var i = 0; i < targetBlocks.length; i++){
			if (z == targetBlocks[i]){
				is = 1;
			}
		}
		if(is == 1){
			var temp = [];
			while(targetBlocks.length != 0){
				var a = targetBlocks.pop();
				if(a != z){
					temp.push(a)
				}
			}
			targetBlocks = temp;
			this.removeClassName("target");
			$("score").textContent = parseInt($("score").textContent) + 20;
		}
		else{
			this.addClassName("wrong");	
			$("score").textContent -= 10;
			setTimeout(removeRed, 100, z);
		}
	}
}

function removeRed(z){
	var blocks = $$(".block");
	blocks[z].removeClassName("wrong");
}