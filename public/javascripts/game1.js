$(function(){

    ShadowSquareApp = function(io){
        io.setBGColor('white');
        io.addGroup('layer_bg', -10);
        io.addGroup('layer_rect', 0);
     
        var blueSquare = new iio.ioCircle(io.canvas.center,10);
        blueSquare
            .setFillStyle('#666666')
            .setStrokeStyle('black')
            .setShadow('rgb(150,150,150)',5,5,4)
            .enableKinematics()
            .setVel(1,1)
            .setBound('bottom', io.canvas.height, function(obj){
                obj.vel.y *= -1;
                return true;
            })
            .setBound('top', 0, function(obj){
                obj.vel.y *= -1;
                return true;
            })
            .setBound('right', io.canvas.width, function(obj){
                obj.vel.x*=-1;
                return true;
            })
            .setBound('left', 0, function(obj){
                obj.vel.x*=-1;
                return true;
            });


        io.addToGroup('layer_rect', blueSquare);
        io.setFramerate(60);
    };
    iio.start(ShadowSquareApp, 'game1');


    ShadowSquareApp2 = function(io){
     
        io.setBGColor('white');
        io.addGroup('layer_bg', -10);
        io.addGroup('layer_rect', 0);
     
        var blueSquare = new iio.ioRect(50,50,60);
        blueSquare
            .setFillStyle('#00baff')
            .setStrokeStyle('black')
            .setShadow('rgb(150,150,150)',10,10,4)
            .enableKinematics()
            .setTorque(0.05)
            .setVel(1,0)
            .setBound('right', io.canvas.width, function(obj){
                obj.vel.x=-1;
                return true;
            })
            .setBound('left', 0, function(obj){
                obj.vel.x=1;
                return true;
            });

        var redSquare = new iio.ioRect(200,50,60);
        redSquare
            .setFillStyle('#ffba00')
            .setStrokeStyle('black')
            .setShadow('rgb(150,150,150)',10,10,4)
            .enableKinematics()
            .setTorque(0.05)
            .setVel(-1,0)
            .setBound('right', io.canvas.width, function(obj){
                obj.vel.x=-1;
                return true;
            })
            .setBound('left', 0, function(obj){
                obj.vel.x=1;
                return true;
            });

        io.addToGroup('layer_rect', blueSquare);
        io.addToGroup('layer_rect', redSquare);

        io.setCollisionCallback('layer_rect', function(obj1, obj2){
            var temp = obj1.vel;
            obj1.vel = obj2.vel;
            obj2.vel = temp;
        });

        io.setFramerate(60);

    };
    iio.start(ShadowSquareApp2, 'game2');


    MyApp1 = function(io){
        io.activateDebugger();
        
        io.setBGColor('white');
        io.addGroup('layer_rect', 0);

        for(var x=10; x<390; x+=60){
            for (var y = 15; y<150; y+=40){
                var grid = new iio.ioRect(x, y, 10);
                grid.setStrokeStyle('black', 1)
                    .setFillStyle('#ff7890')
                    .enableKinematics()
                    .setTorque(0.05)
                    .setVel(x/100,x/100)
                    .setBound('bottom', io.canvas.height, function(obj){
                        obj.vel.y *= -1;
                        return true;
                    })
                    .setBound('top', 0, function(obj){
                        obj.vel.y *= -1;
                        return true;
                    })
                    .setBound('right', io.canvas.width, function(obj){
                        obj.vel.x*=-1;
                        return true;
                    })
                    .setBound('left', 0, function(obj){
                        obj.vel.x*=-1;
                        return true;
                    });
                io.addToGroup('layer_rect', grid);
            }
        }

        io.setCollisionCallback('layer_rect', function(obj1, obj2){
            var temp = obj1.vel;
            obj1.vel = obj2.vel;
            obj2.vel = temp;
        });

        io.setFramerate(60);
    }
    iio.start(MyApp1, 'game3');

    window.addEventListener('keydown', function(event){
     
        if (iio.keyCodeIs('up arrow', event))
            console.log('up arrow pushed');
     
        if (iio.keyCodeIs('right arrow', event))
            console.log('right arrow pushed');
     
        if (iio.keyCodeIs('down arrow', event))
            console.log('down arrow pushed');
     
        if (iio.keyCodeIs('left arrow', event))
            console.log('left arrow pushed');
    });


    MyApp2 = function(io){

        io.activateDebugger();

        io.setBGColor('#333333');

        var enemy12src = [
            './images/angel12_1.png',
            './images/angel12_1.png',
            './images/angel12_1.png',
            './images/angel12_1.png',
            './images/angel12_1.png',
            './images/angel12_2.png',
            './images/angel12_2.png',
            './images/angel12_2.png',
            './images/angel12_2.png',
            './images/angel12_2.png',
            './images/angel12_4.png',
            './images/angel12_4.png',
            './images/angel12_4.png',
            './images/angel12_4.png',
            './images/angel12_4.png',
            './images/angel12_3.png',
            './images/angel12_3.png',
            './images/angel12_3.png',
            './images/angel12_3.png',
            './images/angel12_3.png',
            './images/angel12_3.png'
        ];


        var starBigsrc = [
            './images/spaceArt/png/Background/starBig.png'
        ];


        var starSmallsrc = [
            './images/spaceArt/png/Background/starSmall.png'
        ];


        //Layer
        io.addGroup('layer_bg', -10);
        io.addGroup('layer_enemy', 0);


        for (var x=0; x<10; x++) {
            var starX = iio.getRandomInt(10, io.canvas.width-10)
            var starVel = iio.getRandomInt(1, 4)
     
            var starBig = new iio.ioRect(starX,10);
            starBig
            .enableKinematics()
            .setTorque(0)
            .setVel(0,starVel)
            .createWithAnim(starBigsrc, function(){
                io.addToGroup('layer_bg', starBig);
            });
            io.setAnimFPS(60, starBig);
        }

        var enemy12 = new iio.ioRect(io.canvas.center, 150);
        enemy12
        .enableKinematics()
        .setTorque(0)
        .setVel(1,0)
        .createWithAnim(enemy12src, function(){
            io.addToGroup('layer_enemy', enemy12);
        })
        .setBound('right', io.canvas.width, function(obj){
            obj.vel.x=-1;
            return true;
        })
        .setBound('left', 0, function(obj){
            obj.vel.x=1;
            return true;
        });
        io.setAnimFPS(60,enemy12);

    };
    iio.start(MyApp2, 'game4');


});


