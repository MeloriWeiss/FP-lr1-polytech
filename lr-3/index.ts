// 1. Разработайте набор чистых функций для работы с массивами:
// Функция, которая принимает массив чисел и возвращает новый массив, содержащий только числа, кратные заданному числу.

const filterMultiples = (array: number[], num: number): number[] => {
    return array.filter(item => item % num === 0);
}

// Функция, которая принимает массив строк и возвращает новую строку, содержащую все строки, объединенные заданным разделителем.

const concat = (array: string[], separator: string): string => {
    return array.join(separator);
}

// Функция, которая принимает массив объектов и возвращает новый массив, отсортированный по значению определенного свойства.

const sortBy = <T extends Record<string, number>>(array: T[], prop: keyof T): T[] => {
    return array.sort((a, b) => a[prop] - b[prop]);
}

// 2. Создайте функцию, которая принимает другую функцию в качестве аргумента и возвращает новую функцию, которая выполняет логирование перед вызовом исходной функции.

const log = <T extends (...args: unknown[]) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T> => {
    return (...args: Parameters<T>) => {
        console.log('start fn');
        return fn(...args);
    }
}

const callFunctions = () => {
    console.log(
        filterMultiples([1, 2, 3, 4, 5, 6], 2),
        concat(['1', '2', '3', 'str', '5', 'like'], '|'),
        sortBy<{ value: number }>([{value: 3}, {value: 2}], 'value'),
    );

    console.log(
        log(sortBy<{ value: number }>)([{value: 3}, {value: 2}], 'value')
    );
}

callFunctions();