define(function() {

    /**
     * Объект точки
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;

        this.distanceToPoint = function(otherPoint) {
            var distX = Math.abs(this.x - otherPoint.x);
            var distY = Math.abs(this.y - otherPoint.y);

            return Math.sqrt((distX * distX) + (distY * distY));
        }
    }

    /**
     * Объект прямоугольника
     */
    function Rectangle(x, y, width, height) {
        var self = this;

        self.width = width;
        self.height = height;
        self.x = x;
        self.y = y;

        this.hasCollision = function(otherRectangle) {
            return (
                self.x < (otherRectangle.x + otherRectangle.width)
                && (self.x + self.width) > otherRectangle.x
                && self.y < (otherRectangle.y + otherRectangle.height)
                && (self.y + self.height) > otherRectangle.y
            );
        }
    }

    /**
     * Получение рандомного числа от min до max
     */
    function random(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);

        return rand;
    }

    return {
        'Point': Point,
        'Rectangle': Rectangle,
        'random': random
    };

});