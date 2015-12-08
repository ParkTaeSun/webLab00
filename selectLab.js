"use strict";

document.observe("dom:loaded", function() {
	/* Make necessary elements Dragabble / Droppables (Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. (힌트: revert옵션을 적절히 지정하시오!)
	 */
	var aa = $$("#labs img");
	for (var i = 0; i < aa.length; i++) {
	    new Draggable(aa[i], {revert: true});
	}
	
	Droppables.add("selectpad", {onDrop: labSelect});
	Droppables.add("labs", {onDrop: labSelect});
});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */
	if(drop.id == "selectpad"){
		if($$("#selectpad img").length < 3){
			$("labs").removeChild(drag);
			$("selectpad").appendChild(drag);

			var line = document.createElement("li");
			line.innerHTML = drag.alt;
			$("selection").appendChild(line);

			setTimeout(function(){$("selection").lastChild.pulsate({duration : 1.0});},500);	
		}
	}
	else{
		$("selectpad").removeChild(drag);
		$("labs").appendChild(drag);

		for(var i = 0; i < $$("#selection li").length; i++){
			if(drag.alt == $$("#selection li")[i].innerHTML){
				$("selection").removeChild($$("#selection li")[i]);		
			}
		}
	}
}

