/* global angular, document, window */
'use strict';

angular.module('mmc.directives', [])

.directive('numericStepper', [
        function() {
            return {
                restrict: 'E',
                scope: {
                    value: '=?',    // The text box value
                    min: '@',       // Minimum range
                    max: '=?',      // Maximum range
                    step: '@',      // Step value
                    isDisabled: '=', // To disbale text-box
                    isRangeDisabled: '=' // To disable min and max button
                },
                templateUrl: 'templates/numeric-stepper.html',
                link: {
                    // This block is executed for intializing the directive
                    pre: function( scope ){
                        // This variable allows decrement button to get disabled if set false.
                        scope.canDecrease = true;

                        // This variable allows increment button to get disabled if set false.
                        scope.canIncrease = true;

                        // Setting the default value if scope.value is not set by user.
                        if ( !scope.value ) {
                            scope.value = 0;
                        } else {
                            scope.value = parseInt( scope.value , 10 );
                        }

                        // Setting the default value if scope.min value is not set by user
                        if ( !scope.min || scope.min === ' ') {
                            scope.min = -100;
                        } else {
                            scope.min = parseInt( scope.min , 10 );
                        }

                        // Setting the default value is scope.max value is not set by user
                        if ( !scope.max && scope.max !== 0) {
                            scope.max = 100;
                        } else {
                            scope.max = parseInt( scope.max , 10 );
                        }

                        // The below two conditions just check for intial conditions
                        // to diable decrement and increment buttons.
                        if( scope.value <= scope.min ) {
                            scope.canDecrease = false;
                        }

                        if( scope.value >= scope.max ) {
                            scope.canIncrease = false;
                        }

                        if( !scope.step || scope.step === ' ' ) {
                            scope.step = 1;
                        } else {
                            scope.step = parseInt( scope.step , 10 );
                        }

                    },
                    post: function( scope ){
                        var step = parseInt( scope.step , 10 );

                        // This is the click function for increasing the value
                        scope.increase = function() {
                            var value = parseInt( scope.value , 10 );
                            value = isNaN(value) ? 0 : value;
                            value = value + step;
                            scope.value = value;
                            if( value <= scope.max && scope.isRangeDisabled ) {
                                scope.value = value;
                                scope.canDecrease = true;
                            }
                            if( value == scope.max && scope.isRangeDisabled ) {
                                scope.canIncrease = false;
                            }
                        };

                        // This is the click function for decreasing the value
                        scope.decrease = function() {
                            var value = parseInt( scope.value , 10 );
                            value = value - step;
                            if( value >= scope.min && scope.isRangeDisabled ) {
                                scope.value = value;
                                scope.canIncrease = true;
                            }
                            if( ( value == scope.min || isNaN(value) )  && scope.isRangeDisabled ) {
                                scope.canDecrease = false;
                            }
                            if( value >= 0 ){
                                scope.value = value;
                            }
                        };

                        // This is required whn user manually types the value
                        // so that button can be disabled.
                        // Generally it is called always when scope.value changes
                        scope.$watch( 'value' , function( value ) {
                            value = parseInt( value , 10 );
                            if( value <= scope.min || isNaN(value) ) {
                                scope.canDecrease = false;
                            } else {
                                scope.canDecrease = true;
                            }
                            if( value >= scope.max ) {
                                scope.canIncrease = false;
                            } else {
                                scope.canIncrease = true;
                            }
                        });

                        // For diabling or enablimg increase button when
                        // the scope.max value changes dynamically
                        scope.$watch( 'max' , function( max ) {
                            if( max ) {
                                max = parseInt( max );
                                scope.value = parseInt( scope.value , 10 );
                                if( scope.value <= max ) {
                                    scope.canIncrease = true;
                                }
                                if( scope.value == max ) {
                                    scope.canIncrease = false;
                                }
                            }
                        });

                    }

                }
            };
        }
    ]).directive('onlyDigits', function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function ( scope, element, attrs, modelCtrl ) {
                    modelCtrl.$parsers.push(function (inputValue) {
                        if ( !inputValue ) return '';
                        var transformedInput = inputValue.replace(/[^0-9]/g, '');
                        if ( transformedInput !== inputValue ) {
                            modelCtrl.$setViewValue(transformedInput);
                            modelCtrl.$render();
                        }
                        return transformedInput;
                    });
                }
            };
    })
    .directive("compareTo", function() {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {
                
                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };
    
                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    });

;
