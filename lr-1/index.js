// 1. Разработайте набор чистых функций для работы с массивами:
// Функция, которая принимает массив чисел и возвращает новый массив, содержащий только четные числа.

const filterEvenNumbered = (array) => {
    return array.filter(item => item % 2 === 0);
}

// Функция, которая принимает массив чисел и возвращает новый массив, содержащий квадраты этих чисел.

const squareItems = (array) => {
    return array.map(item => item ** 2);
}

// Функция, которая принимает массив объектов и возвращает новый массив, содержащий только объекты с определенным свойством.

const filterByProp = (array, prop) => {
    return array.filter(item => item.hasOwnProperty(prop));
}

// Функция, которая принимает массив чисел и возвращает их сумму.

const getSum = (array) => {
    return array.reduce((acc, item) => acc + item, 0);
}

// 2. Создайте функцию высшего порядка, которая принимает функцию и массив в качестве аргументов и применяет функцию
// к каждому элементу массива, возвращая новый массив с результатами.

const customMap = (fn, array) => {
    return array.map(fn);
}
// или
const customMap2 = (fn, array) => {
    return array.reduce((acc, item) => [...acc, fn(item)], []);
}

// 3. Используя разработанные функции, выполните следующие математические операции:
// Найдите сумму квадратов всех чётных чисел в заданном массиве.

const sumOfEvenNumberedSquaredNums = (array) => {
    return getSum(squareItems(filterEvenNumbered(array)));

    // или более читаемо:

    // const evenNumbered = filterEvenNumbered(array);
    // const squareNums = squareItems(evenNumbered);
    //
    // return getSum(squareNums);
}

// Найдите среднее арифметическое всех чисел, больших заданного значения, в заданном массиве объектов.

const arithmeticMean = (array, greaterThan = -Infinity) => {
    if (!array.length || greaterThan > Math.max(...array)) return 0;

    const filtered = array.filter(item => item > greaterThan);

    return getSum(filtered) / filtered.length;
}

const callFunctions = () => {
    console.log(
        '1.\n',
        filterEvenNumbered([1, 2, 3, 4, 5, 6]),
        squareItems([1, 2, 3, 4, 5, 6]),
        filterByProp([{name: 'Ivan'}, {name: 'John'}, {lastname: 'Carver', address: 'Wall street'}], 'name'),
        getSum([1, 2, 3, 4, 5, 6]),
        '\n2.\n',
        customMap((item) => item * 2, [1, 2, 3, 4, 5, 6]),
        customMap2((item) => item * 2, [1, 2, 3, 4, 5, 6]),
        '\n3.\n',
        sumOfEvenNumberedSquaredNums([1, 2, 3, 4, 5, 6]),
        arithmeticMean([1, 2, 3, 4, 5, 6], 3)
    )
}

callFunctions();