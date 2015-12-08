function Connection(){
    $("#myModal").modal('hide');
}

$(function(){
    var btn = document.getElementById("btnco");
    var btn2 = document.getElementById("btnsug");

    btn.onclick = Connection;
});
function initAD(){
    return  {
        lastName: "",
        firstName: "",
        birth: "",
        link: "",
        ad: ""
    };
}

function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
          center: new google.maps.LatLng(48.71352, 2.25922),
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(mapCanvas, mapOptions)
      }
      google.maps.event.addDomListener(window, 'load', initialize);

var myApp = angular.module('myApp', ["ngAnimate"]);

myApp.controller('ConnectionController', function($scope, $location) {
    $scope.location = $location;
    $scope.value = 0;
    $scope.isChanged = 0;
    $scope.data = false;
    $scope.user = {
        isConnected: false,
        login: "",
        firstname: "",
        lastname: "",
        adress: "",
        mail: "",
        phone: "",
        ad: ""
  };
    $scope.ADs = [];
    
    $scope.AD = initAD();
    $scope.setUser = function(input) {
        if($scope.user.login.length > 0)
            $scope.user.isConnected = true;
    };
    $scope.notif = false;
    $scope.isSet = function(input) {
        return $scope.value == input;
    };
    $scope.changeView = function(input) {
        $scope.isChanged = input;
    };
    $scope.goMenu = function() {
        $scope.isChanged = 0;
    };
    $scope.dataChanged = function() {
        var regexWord = /[a-zA-Z]/;
        var regexNum = /[0-9]+/;
        var regexMail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if(!regexWord.test($scope.user.lastname) || !regexWord.test($scope.user.firstname) || !regexNum.test($scope.user.phone) || !regexMail.test($scope.user.mail)){
            $scope.notif = true;
        }
        else 
            {
                $scope.data = true;
                $scope.notif = false;
            }
    };
    $scope.editData = function() {
        $scope.data = false;
    };
    $scope.showAD = true;
    $scope.checkUrl = function() {
        if ($location.path() == "/info")
            return 1;
        else if ($location.path() == "/ayantdroit")
            return 2;
        else if ($location.path() == "/justif")
            return 3;
        else if ($location.path() == "/contact")
            return 4;
    };
    $scope.addAyantDroit = function(input) {
        if (input != 1)
            $scope.showAD = false;
        else if (input == 1){
            var regexWord = /[a-zA-Z]/;
            var regexBirth = /[0-9]+\/[0-9]+\/[0-9]+/;
            if(!regexWord.test($scope.AD.lastName) || !regexWord.test($scope.AD.firstName) || !regexBirth.test($scope.AD.birth)){
                $scope.notif = true;
            }
            else {
                $scope.notif = false;
                $scope.showAD = true;
                $scope.ADs.push($scope.AD);
                $scope.AD = initAD();
            }
        }
    }
    $scope.deleteAyantDroit = function(input) {
        $scope.ADs.splice(input, 1);
    }
});
    myApp.controller('SliderController', function ($scope) {
        $scope.slides = [
            {image: 'https://sodifferentfr.files.wordpress.com/2014/03/canada-moraine-lake-amc3a9rique.jpg', description: 'Image 00'},
            {image: 'https://i.ytimg.com/vi/48fKIXlxaXk/maxresdefault.jpg', description: 'Image 01'},
            {image: 'http://www.weareucpa.com/wp-content/uploads/2015/03/50-ans-ucpa-pralognan-tourn%C3%A9e-vue-paysage-colonie-de-vacances.jpg', description: 'Image 02'},
            {image: 'http://cdn3-europe1.new2.ladmedia.fr/var/europe1/storage/images/europe1/emissions/bonjour-monsieur-le-maire/les-enfants-si-c-est-pas-fun-et-si-c-est-pas-drole-ils-n-ont-pas-envie-d-apprendre-189068/3994600-1-fre-FR/Les-enfants-si-c-est-pas-fun-et-si-c-est-pas-drole-ils-n-ont-pas-envie-d-apprendre.jpg', description: 'Image 03'}
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
    myApp.animation('.slide-animation', function () {
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