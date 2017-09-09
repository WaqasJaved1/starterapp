angular
    .module('milkhaas')
    .directive('splashScreen', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            link: function(scope, elem, attr) {
                // fade it out for 300 milliseconds (see css)
                elem.addClass('_splash_fade_out');

                // remove splash screen after animation is completed
                $timeout(function() {
                    elem.remove();
                    scope = elem = attr = null;
                }, 600);
            }
        }
    }])

    .directive('customOnChange', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeHandler);
            }
        };
    })

    .directive('chooseFile', function() {
        return {
            link: function(scope, elem, attrs) {
                var button = elem.find('button');
                var input = angular.element(elem[0].querySelector('input#fileInput'));
                button.bind('click', function() {
                    input[0].click();
                });
                input.bind('change', function(e) {
                    scope.$apply(function() {
                        var files = e.target.files;
                        if (files[0]) {
                            scope.fileName = files[0].name;
                        } else {
                            scope.fileName = null;
                        }
                    });
                });
            }
        };
    })
    .directive('nxEqualEx', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, model) {
                if (!attrs.nxEqualEx) {
                    console.error('nxEqualEx expects a model as an argument!');
                    return;
                }
                scope.$watch(attrs.nxEqualEx, function(value) {
                    // Only compare values if the second ctrl has a value.
                    if (model.$viewValue !== undefined && model.$viewValue !== '') {
                        model.$setValidity('nxEqualEx', value === model.$viewValue);
                    }
                });
                model.$parsers.push(function(value) {
                    // Mute the nxEqual error if the second ctrl is empty.
                    if (value === undefined || value === '') {
                        model.$setValidity('nxEqualEx', true);
                        return value;
                    }
                    var isValid = value === scope.$eval(attrs.nxEqualEx);
                    model.$setValidity('nxEqualEx', isValid);
                    return isValid ? value : undefined;
                });
            }
        };
    })
    .directive('selectsearchfix', function() {
        return {
            link: function(scope, elem) {
                elem.find('input').on('keydown', function(ev) {
                    ev.stopPropagation();
                });
                return
            }
        }
    }).directive('scrollOnClick', function() {
        return {
            restrict: 'A',
            link: function(scope, $elm, attrs) {
                var idToScroll = attrs.href;
                $elm.on('click', function() {
                    var $target;
                    if (idToScroll) {
                        $target = $(idToScroll);
                    } else {
                        $target = $elm;
                    }
                    $("body").animate({ scrollTop: $target.offset().top }, "slow");
                });
            }
        }
    });;