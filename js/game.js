function Actor (x, y, health) {
    var self = this;
    
    self.getX = function() {
        return x;
    };
    
    self.getY = function() {
        return y;
    };
    
    self.getHealth = function() {
        return health;
    };
    
    self.setX = function(newx) {
        x = newx;
    };
    
    self.setY = function(newy) {
        y = newy;
    };
    
    self.setHealth = function(newhealth) {
        health = newhealth;
    };
    
    self.move = function(dx, dy) {
        x += dx;
        y += dy;
    };
    
    self.damage = function(dhealth) {
        health -= dhealth;
    };
}

function Player (x, y, health) {
    var self = new Actor(x, y, health);
    return self;
}


var ap = new Player(12, 40, 1);
ap.setY(20);
alert(ap.getY());