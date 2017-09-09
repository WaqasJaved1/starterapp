var myApp = angular.module('milkhaas');

myApp.filter('phone', function () {
    return function (phone) {
        if (!phone) { return ''; }

        var code = phone.substr(0, 4); // Gets the first part
		var number = phone.substr(4);

        return code+"-"+number;
    };
})
.filter('nulltozero', function () {
    return function (number) {
        if (!number) { return 0; }

        return number;
    };
})
.filter('arrayToString', function () {
    return function (array) {
        if (!array) { return '-------------'; }
        var str = ""
        for (var i in array) {
            str += array[i].Type + ", ";
        } 

        return str;
    };
})