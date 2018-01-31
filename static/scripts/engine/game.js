define(function() {

    /**
     * Основной класс игровой логики
     */
    return function() {
        var self = this;

        // Объект фрейма отрисовки
        self.viewport = null;
        // Идентификатор текущей активной сцены
        self.activeScene = null;
        // Количество тиков расчета игровой логики
        self.ticksPerSecond = 20;
        // Отображать ли текущее количество кадров отрисовки
        self.showFPS = false;

        // Список всех доступных для загрузки сцен.
        // В качестве ключа используется идентификатор сцены.
        self.scenes = {};
        // Список всех загруженных объектов.
        // В качестве ключа используется идентификатор объекта.
        self.objects = {};
        // Список всех видимых в текущий момент объектов
        self.visibleObjects = {};
        // Количество всех видимых в текущий момент объектов
        self.visibleObjectsCount = 0;
        // Признак остановки процесса расчета игровой логики
        self.isStopped = true;
        // Пауза между тиками расчета игровой логики (в мс)
        self.tickDelay = 1000 / self.ticksPerSecond;
        // Счетчик количества тиков расчета игровой логики
        self.ticksTimer = 0;
        // Счетчик количества тиков отрисовки
        self.drawCallsTimer = 0;
        // Глобальный таймер времени для синхронизации (в мс)
        self.globalTimer = null;
        // Зарегистрированные обработчики нажатия клавиш клавиатуры
        self.keyBindings = {};

        self._intervalObject = null;
        self._reqAnimationObject = null;

        /**
         * Запуск игрового движка
         */
        self.run = function () {
            if (!self.isStopped) {
                console.log('Engine is already running!');
                return;
            }

            console.log('Engine is started...');
            self.isStopped = false;

            // Регистрируем обработчик нажатия клавиш клавиатуры
            document.getElementsByTagName('body')[0].onkeydown = keyPressEvent;

            // Указываем время запуска движка
            self.globalTimer = Date.now();
            // Инициализация счетчика тиков отрисовки
            self._reqAnimationObject = window.requestAnimationFrame(self.drawTick);
            // Инициализация счетчика тиков расчета игровой логики
            self._intervalObject = window.setInterval(self.tick, self.tickDelay);
        };

        /**
         * Остановка игрового движка и сброс всех таймеров
         */
        self.stop = function () {
            window.clearInterval(self._intervalObject);
            window.cancelAnimationFrame(self._reqAnimationObject);
            self.isStopped = true;
        };

        /**
         * Функция тика расчета игровой логики
         */
        self.tick = function () {
            //

            if (self.activeScene !== null) {
                var activeScene = self.scenes[self.activeScene];
                activeScene.tick(self);
            }

            self.ticksTimer += 1;
        };

        /**
         * Функция тика отрисовки
         */
        self.drawTick = function () {
            // TODO: Перерисовка всего вьюпорта может быть ресурсозатратной
            self.viewport.clear();
            // Сбрасываем счетчики видимых объектов
            self.visibleObjects = {};
            self.visibleObjectsCount = 0;
            //
            if (self.activeScene !== null) {
                var activeScene = self.scenes[self.activeScene];
                activeScene.draw(self);
            }

            self.fps();
            self.drawCallsTimer += 1;
            self._reqAnimationObject = window.requestAnimationFrame(self.drawTick);
        };

        /**
         * Функция отображения текущего количества кадров отрисовки в секунду (FPS)
         */
        self.fps = function() {
            if (!self.showFPS) {
                return;
            }

            if (self.prevTickCount === undefined) {
                self.prevTickCount = 0;
            }

            if (self.prevTime === undefined) {
                self.prevTime = 0;
            }

            if (self.fpsCount === undefined) {
                self.fpsCount = 0;
            }

            if (self.tmpVisibleObjectsCount === undefined) {
                self.tmpVisibleObjectsCount = 0;
            }

            var currentTime = Math.round(Date.now() / 1000);
            if (currentTime > self.prevTime) {
                self.prevTime = currentTime;
                self.fpsCount = self.drawCallsTimer - self.prevTickCount;
                self.tmpVisibleObjectsCount = self.visibleObjectsCount;
                self.prevTickCount = self.drawCallsTimer;
            }

            self.viewport.showFPS(self);
        };

        /**
         * Добавление указанного объекта на сцену с указанным идентификатором
         */
        self.addObjectToScene = function (object, sceneId) {
            var scene = self.scenes[sceneId];
            if (scene === undefined) {
                throw "Scene with id=" + sceneId + " not found!";
            }

            scene.addObject(object);
            self.objects[object.id] = object;
        };

        /**
         * Добавление новой сцены
         */
        self.addScene = function (scene) {
            self.scenes[scene.id] = scene;
        };

        /**
         * Добавление обработчика логики нажатия кнопки клавиатуры
         */
        self.addKeyBinding = function(keyCode, callback) {
            self.keyBindings[keyCode] = callback;
        };

        /**
         * Обработка нажатия клавиш
         */
        function keyPressEvent(event) {
            var keyCode = event.keyCode;
            var callback = self.keyBindings[keyCode];

            if (callback !== undefined) {
                callback(self);
            }
        }

    }

});