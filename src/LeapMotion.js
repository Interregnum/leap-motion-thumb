var leapHelper = {
	isListening: false,
	
	startListening: function() {
		leapHelper.isListening = true;
	},
	stopListening: function() {
		leapHelper.isListening = false;
	},
	resumeListening: function() {
		setTimeout(leapHelper.startListening, 500);
	}
}

var options = null;

$(document).ready(function() {
	leapHelper.startListening();
	
	Leap.loop(options, function(frame) {
		if(!leapHelper.isListening) {
			return;
		}

		$("#output").text("");
		leapHelper.stopListening();
		frame.hands.forEach(function(hand, index) {
			var thumbX = hand.thumb.tipPosition[0];
			var palmX = hand.sphereCenter[0];
			var otherFingersExtended = false;
			
			for(var fingerIndex = 1; fingerIndex <= 4; ++fingerIndex) {
				otherFingersExtended |= hand.fingers[fingerIndex].extended;
			}
			
			if(!otherFingersExtended && hand.thumb.extended) {
				if(thumbX - palmX <= -40) {
					$("#output").text("Thumb Up");
				}
				else if(thumbX - palmX >= 30) {
					$("#output").text("Thumb Down");
				}
			}
		});
	
		leapHelper.resumeListening();
	});
});

