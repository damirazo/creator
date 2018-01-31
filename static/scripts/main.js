define(function(require) {
    // Логика для тестирования функционала

    var math = require('engine/math');
    var Keys = require('engine/keys');
    var Game = require('engine/game');
    var Viewport = require('engine/viewport');
    var Scene = require('engine/scene');
    var GameObject = require('engine/gameobject');

    var game = new Game();
    game.viewport = new Viewport('viewport');
    game.showFPS = true;

    var firstScene = new Scene('first', 10000, 10000);
    firstScene.beforeDrawCallback = function(g) {
        g.viewport.fill('#000000');
    };

    game.addScene(firstScene);
    game.activeScene = firstScene.id;

    for (var i = 0; i <= 100000; i++) {
        var x = math.random(0, 10000);
        var y = math.random(0, 10000);

        var obj = new GameObject('obj-' + i, x, y, 1, 1);
        game.addObjectToScene(obj, firstScene.id);
    }

    var viewportMoveSpeed = 50;
    game.addKeyBinding(Keys.RIGHT, function(g) {g.viewport.x += viewportMoveSpeed;});
    game.addKeyBinding(Keys.LEFT, function(g) {g.viewport.x -= viewportMoveSpeed;});
    game.addKeyBinding(Keys.UP, function(g) {g.viewport.y -= viewportMoveSpeed;});
    game.addKeyBinding(Keys.DOWN, function(g) {g.viewport.y += viewportMoveSpeed;});

    game.run();

});