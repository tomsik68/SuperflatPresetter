/**
 * @author Tomsik68
 */
function getBlockImageTag(blockID){
	return "<img src='blocks/"+blockID+"'/>";
}
function updateWP(){
	var layers = parseLayers();
	var e = document.getElementById("worldpreview");
	buildPreview(e,layers);
}
function buildPreview(e, layers){
	makeTable(e);
}
function makeTable(e){
	e.innerHTML = "<table>";
	for(var y = 0;y < 250;++y ){
		e.innerHTML += "<tr>";
		for(var x = 0;x < 100;++x){
			e.innerHTML += "<td>";
			e.innerHTML += "<span class='wp' id='wp_"+x+";"+y+"'></span>";
			e.innerHTML += "</td>";
		}
		e.innerHTML += "</tr>";
	}
	e.innerHTML += "</table>";
}
