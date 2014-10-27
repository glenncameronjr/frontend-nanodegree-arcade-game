var Car = function(loc) {
	this.loc = loc;
};

Car.prototype.move = function() {
	this.loc++;
};