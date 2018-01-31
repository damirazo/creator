define(function(require) {

    var math = require('./math');

    /**
     * Игровой объект
     *
     * @param id Уникальный идентификатор игрового объекта
     * @param x Координата X объекта
     * @param y Координата Y объекта
     * @param width Ширина коллайдера игрового объекта
     * @param height Высота коллайдера игрового объекта
     */
    return function(id, x, y, width, height) {
        var self = this;

        // Уникальный идентификатор игрового объекта
        self.id = id;
        // Координата X объекта
        self.x = x;
        // Координата Y объекта
        self.y = y;
        // Ширина игрового объекта
        self.width = width;
        // Высота игрового объекта
        self.height = height;
        // Объект коллайдера игрового объекта
        self.collider = new math.Rectangle(self.x, self.y, self.width, self.height);

        /**
         * Функция отрисовки игрового объекта
         */
        self.draw = function (game) {
            // FIXME: Тестовая реализация
            if (self.isVisible(game.viewport)) {
                var relativeX = self.x - game.viewport.x;
                var relativeY = self.y - game.viewport.y;

                var ctx = game.viewport.context;

                ctx.fillStyle = '#d3d0a1';
                ctx.fillRect(relativeX, relativeY, self.width, self.height);

                game.visibleObjects[self.id] = self;
                game.visibleObjectsCount += 1;
            }
        };

        /**
         * Проверка виден ли на текущий момент объект в указанной области отображения
         */
        self.isVisible = function (viewport) {
            return (
                self.x >= viewport.x
                && self.x <= viewport.x + viewport.width
                && self.y >= viewport.y
                && self.y <= viewport.y + viewport.height
            )
        }
    }

});