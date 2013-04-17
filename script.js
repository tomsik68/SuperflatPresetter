/**
 * @author Tomsik68
 */
var layerCount = 15;
var version = "2";
function createBlockSelection() {
	for (var i = 0; i < blocks.length; i++) {
		document.write("<option value='" + blocks[i][0] + "'>" + blocks[i][1] + "</option>");
	}
}

function createLayerSelections() {
	for (var i = 0; i < layerCount; i++) {
		document.write('<tr><td>');
		document.write('<select value="undefined" id="block_' + i + '">');
		createBlockSelection();
		document.write('</select>');
		document.write('</td><td><input type="number" placeholder="Bottom" id="l' + i + '_bottom" /></td><td><input type="number" placeholder="Top" id="l' + i + '_top" /></td>');
		document.write('</tr>');
	}
}

function getLowestLayer(layers) {
	var layer = null;
	for (var i = 0; i < layerCount; ++i) {
		if (layers[i] != null) {
			if (layer == null)
				layer = layers[i];
			if (layers[i].b < layer.b) {
				layer = layers[i].b;
			}
		}
	}
	return layer;
}

function generate() {
	var result = "";

	var biome = document.getElementById("global_biome").value;
	var villages = document.getElementById("villages").checked;
	var villageSize = document.getElementById("villagesize").value;
	var villageDist = document.getElementById("villagedistance").value;
	var mineshafts = document.getElementById("mineshafts").checked;
	var mineshaftChance = document.getElementById("mineshaftchance").value;
	var strongholds = document.getElementById("strongholds").checked;
	var strongholdDistance = document.getElementById("strongholddistance").value;
	var strongholdCount = document.getElementById("strongholdcount").value;
	var strongholdSpread = document.getElementById("strongholdspread").value;
	var biomeFeatures = document.getElementById("biomefeatures").checked;
	var dungeons = document.getElementById("dungeons").checked;
	var decoration = document.getElementById("decoration").checked;
	var waterLakes = document.getElementById("waterlakes").checked;
	var lavaLakes = document.getElementById("lavalakes").checked;
	//parsing layers
	var layers = [];
	var layerString = "";
	for (var i = 0; i < layerCount; ++i) {
		var block = document.getElementById("block_" + i).value;
		var top = parseInt(document.getElementById("l" + i + "_top").value);
		var bottom = parseInt(document.getElementById("l" + i + "_bottom").value);
		if (block != "undefined" && !isNaN(top) && !isNaN(bottom)) {
			layers.push({
				bl : block,
				t : top,
				b : bottom
			});
		}
	}
	var lastTop = 0;
	for (var i = 0; i < layerCount; ++i) {
		var layer = getLowestLayer(layers);
		if (layer != null) {
			layers.splice(layers.indexOf(layer), 1);
			//add additional air between 2 layers
			if (layer.b > lastTop) {
				layerString += "," + (layer.b - lastTop) + "x0";
			}
			lastTop = layer.t;
			layerString += "," + (layer.t - layer.b) + "x" + layer.bl;
		}
	}
	layerString = layerString.replace(",", "");
	result = version + ";" + layerString + ";" + biome + ";";
	//parsing structures
	var structures = "";

	document.getElementById("output").innerHTML = result;
	alert("Don't press the button again, or the page will reset! Your code was generated!");
	$("#output").slideDown();

}