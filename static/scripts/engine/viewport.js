define(function(require) {

    var math = require('./math');

    /**
     * Объект области отрисовки изображения на экран
     *
     * @param canvasId Идентификатор объекта canvas на странице
     * @param width Ширина области отрисовки
     * @param height Высота области отрисовки
     * @param startX Координата X области отрисовки относительно координат сцены
     * @param startY Координата Y области отрисовки относительно координат сцены
     */
    return function(canvasId, width, height, startX, startY) {
        var self = this;

        // Идентификатор элемента canvas
        self.id = canvasId;
        self.canvas = document.getElementById(self.id);
        if (self.canvas === undefined) {
            throw "Не удалось найти элемент canvas с именем " + self.id;
        }
        // Контекст отрисовки
        self.context = self.canvas.getContext('2d');

        if (arguments.length === 1) {
            self.width = window.innerWidth;
            self.height = window.innerHeight;
            self.x = 0;
            self.y = 0;
        } else if (arguments.length === 5) {
            self.width = width;
            self.height = height;
            self.x = startX;
            self.y = startY;
        } else {
            throw "Неверное количество аргументов! Необходимое количество: 1 или 5."
        }
        // Корректируем размеры элемента canvas в соответствии с размером области отрисовки
        self.canvas.width = self.width;
        self.canvas.height = self.height;

        // Объект пересечения области отрисови
        self.collider = new math.Rectangle(self.x, self.y, self.width, self.height);

        /**
         * Возвращает абсолютное значение X относительно границ сцены
         */
        self.getAbsoluteX = function (x) {
            return x + self.x;
        };

        /**
         * Возвращает абсолютное значение Y относительно границ сцены
         */
        self.getAbsoluteY = function (y) {
            return y + self.y;
        };

        /**
         * Очистка всей области отрисовки
         */
        self.clear = function () {
            self.context.clearRect(0, 0, self.width, self.height);
        };

        /**
         * Заливка области отрисовки указанным цветом
         * @param color
         */
        self.fill = function (color) {
            var ctx = self.context;
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, self.width, self.height);
        };

        /**
         * Функция отображения количество кадров в секунду
         */
        self.showFPS = function (game) {
            var ctx = self.context;

            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = "#000000";
            ctx.font = 'bold 40px sans-serif';
            ctx.strokeText("FPS: " + game.fpsCount, 20, 50);
            ctx.fillText("FPS: " + game.fpsCount, 20, 50);
            ctx.strokeText("Объекты: " + game.tmpVisibleObjectsCount, 20, 100);
            ctx.fillText("Объекты: " + game.tmpVisibleObjectsCount, 20, 100);
        };
    }

});