angular.module('myApp', ['ngAnimate', 'ngTouch'])
    .controller('SliderController', function ($scope) {
        $scope.slides = [
            {image: 'http://img.actucine.com/wp-content/uploads/2015/04/Star-Wars-7-150416-01.jpg', description: 'Image 00'},
            {image: 'http://pic.pidivn.net/pr2/wp-content/uploads/sites/25/2005/05/105d8632dfbfc05035c988cbfae3be81.jpg', description: 'Image 01'},
            {image: 'http://orig11.deviantart.net/68c4/f/2014/212/e/4/gnar_by_sollyz-d7t5x78.png', description: 'Image 02'},
            {image: 'http://4.bp.blogspot.com/-W6rc1qLN9iI/TYH77r664-I/AAAAAAAAAas/8XMIJ-WqYdc/s1600/terracotta1.jpg', description: 'Image 03'}
        ];

        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function (index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function () {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function () {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
        };
    })
    .animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });