define(function() {

    /**
     * Объект сцены
     *
     * @param id Идентификатор сцены
     * @param width Ширина сцены
     * @param height Высота сцены
     */
    return function(id, width, height) {
        var self = this;

        // Уникальный идентификатор сцены
        self.id = id;
        // Ширина сцены
        self.width = width;
        // Высота сцены
        self.height = height;
        // Коллбек, вызываемый в момент расчета игровой логики
        self.tickCallback = null;
        // Коллбек, вызываемый до вызова функции отрисовки
        self.beforeDrawCallback = null;
        // Коллбек, вызываемый после вызова функции отрисовки
        self.afterDrawCallback = null;

        // Объекты сцены
        self.objects = {};

        /**
         * Функция отрисовки сцены
         */
        self.draw = function (game) {
            if (self.beforeDrawCallback !== null) {
                self.beforeDrawCallback(game);
            }

            for (var id in self.objects) {
                if (self.objects.hasOwnProperty(id)) {
                    var obj = self.objects[id];

                    // Отрисовываем только видимые на текущий момент объекты
                    if (obj.isVisible(game.viewport)) {
                        obj.draw(game);
                    }
                }
            }

            if (self.afterDrawCallback !== null) {
                self.afterDrawCallback(game);
            }
        };

        /**
         * Функция расчета игровой логики
         */
        self.tick = function (game) {
            if (self.tickCallback !== null) {
                self.tickCallback(game);
            }
        };

        /**
         * Добавление нового объекта на сцену
         */
        self.addObject = function (object) {
            self.objects[object.id] = object;
        };

    }

});