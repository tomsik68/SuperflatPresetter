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
		document.write('<select onchange="javascript:updateWP()" value="undefined" id="block_' + i + '">');
		createBlockSelection();
		document.write('</select>');
		document.write('</td><td><input onchange="javascript:updateWP()" type="number" placeholder="Bottom" id="l' + i + '_bottom" /></td><td><input type="number" onchange="javascript:updateWP()" placeholder="Top" id="l' + i + '_top" /></td>');
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

function parseLayers() {
	var layers = [];
	for (var i = 0; i < layerCount; ++i) {
		var block = document.getElementById("block_" + i).value;
		var top = parseInt(document.getElementById("l" + i + "_top").value);
		var bottom = parseInt(document.getElementById("l" + i + "_bottom").value);
		if (block != "undefined" && !isNaN(top) && !isNaN(bottom)) {
			layers[i] = {
				bl : block,
				t : top,
				b : bottom
			};
		}
	}
	return layers;
}

function generate() {
	var result = "";

	var biome = document.getElementById("global_biome").value;
	var villages = document.getElementById("villages").checked;
	var villageSize = document.getElementById("villagesize").value;
	var villageDist = document.getElementById("villagedistance").value;
	var mineshafts = document.getElementById("mineshafts").checked;
	var mineshaftChance = document.getElementById("mineshaftchance").value / 100;
	var strongholds = document.getElementById("strongholds").checked;
	var strongholdDistance = document.getElementById("strongholddistance").value;
	var strongholdCount = document.getElementById("strongholdcount").value;
	var strongholdSpread = document.getElementById("strongholdspread").value;
	var biomeFeatures = document.getElementById("biomefeatures").checked;
	var featureDist = document.getElementById("featuresDistance").value;
	var dungeons = document.getElementById("dungeons").checked;
	var decoration = document.getElementById("decoration").checked;
	var waterLakes = document.getElementById("waterlakes").checked;
	var lavaLakes = document.getElementById("lavalakes").checked;
	//parsing layers
	var layers = parseLayers();
	var layerString = "";

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
	if (villages)
		structures += ",village(size=" + villageSize + " distance=" + villageDist + ")";
	if (strongholds)
		structures += ",stronghold(distance=" + strongholdDistance + " count=" + strongholdCount + " spread=" + strongholdSpread + ")";
	if (mineshafts)
		structures += ",mineshaft(chance=" + (mineshaftChance) + ")";
	if (biomeFeatures)
		structures += ",biome_1(distance=" + featureDist + ")";
	if (dungeons)
		structures += ",dungeon";
	if (decoration)
		structures += ",decoration";
	if (waterLakes)
		structures += ",lake";
	if (lavaLakes)
		structures += ",lava_lake";
	structures = structures.replace(",", "");
	result += structures;
	document.getElementById("output").innerHTML = result;
	$("#output").slideDown();

}