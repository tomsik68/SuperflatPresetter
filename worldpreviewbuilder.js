/**
 * @author Tomsik68
 */
function getBlockImageURL(blockID) {
	return "url('blocks/" + blockID + ".png')";
}

function updateWP() {
	var layers = parseLayers();
	var e = document.getElementById("worldpreview");
	buildPreview(e, layers);
}

function buildPreview(e, layers) {
	for (var i = 0; i < 250; ++i) {
		setLayer(i, 0);
	}
	for (var i = 0; i < layers.length; ++i) {
		var layer = layers[i];
		if (layer != null)
			for (var l = layer.b; l < layer.t; ++l) {
				setLayer(l, layer.bl);
			}
	}
}

function setLayer(y, blockID) {
	if (blockID == "0") {
		$("#wp_" + y).fadeOut();
	} else
		$("#wp_" + y).fadeIn();
	$("#wp_"+y).css("background-image",getBlockImageURL(blockID));
}

function makeLayout(e) {
	for (var i = 0; i < 250; i++) {
		e.innerHTML += "<div class='wp' id='wp_" + i + "'></div>";
	}
}