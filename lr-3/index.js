// 1. Разработайте набор чистых функций для работы с массивами:
// Функция, которая принимает массив чисел и возвращает новый массив, содержащий только числа, кратные заданному числу.
var filterMultiples = function (array, num) {
    return array.filter(function (item) { return item % num === 0; });
};
// Функция, которая принимает массив строк и возвращает новую строку, содержащую все строки, объединенные заданным разделителем.
var concat = function (array, separator) {
    return array.join(separator);
};
// Функция, которая принимает массив объектов и возвращает новый массив, отсортированный по значению определенного свойства.
var sortBy = function (array, prop) {
    return array.sort(function (a, b) { return a[prop] - b[prop]; });
};
// 2. Создайте функцию, которая принимает другую функцию в качестве аргумента и возвращает новую функцию, которая выполняет логирование перед вызовом исходной функции.
var log = function (fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log('start fn');
        return fn.apply(void 0, args);
    };
};
var callFunctions = function () {
    console.log(filterMultiples([1, 2, 3, 4, 5, 6], 2), concat(['1', '2', '3', 'str', '5', 'like'], '|'), sortBy([{ value: 3 }, { value: 2 }], 'value'));
    console.log(log((sortBy))([{ value: 3 }, { value: 2 }], 'value'));
};
callFunctions();
