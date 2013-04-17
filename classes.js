/**
 * @author Tomsik68
 */
function Map(){
	this.stuff = new Array();
	this.lastIndex = 0;
	this.put = function(k,v){
		this.stuff[k] = v;
		this.lastIndex++;
	}
	this.remove = function(k){
		this.stuff[k] = null;
	}
	this.get = function(k){
		return this.stuff[k];
	}
	this.contains = function(k){
		return this.stuff[k] != null;
	}
	this.length = function(){
		return this.stuff.length;
	}
}
function List() {
	this.array = new Array();
	this.lastIndex = 0;
	this.add = function(e) {
		this.array[this.lastIndex] = e;
		this.lastIndex++;
	}
	this.remove = function(index) {
		this.array[index] = null;
	}
	this.indexOf = function(e) {
		return this.array.indexOf(e);
	}
	this.contains = function(e) {
		return this.indexOf(e) != -1;
	}
	this.length = function(){
		return this.array.length;
	}
	this.get = function(i){
		return this.array[i];
	}
}
function Layer() {
	this.blockType = 0;
	this.bottom = 0;
	this.top = 0;
}
function PresetBuilder() {
	this.version = "2";
	this.biome = "";
	this.layers = new List();
}