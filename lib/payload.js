const payload = [
    null,
    undefined,
    true,
    false,
    {},
    [],
    0,
    1.35,
    0.987,
    'sandra', 
    10,
    'sandra@xyz.com',
    [1, 2],
    [1,2,3],
    [1,2,3,4,5],
    [8,7,8,9],
    {
        name: 'sandra',
        age: 20,
        email: 'sandra@xyz.com'
    },
    {
        name: 'sandra',
        age: 20
    },
    {
        id: 123,
        name: "Bolu",
        email: 'bolu@xyz.com'
    },
    [2, 'bolu@xyz.co'],
    [1000000000, 20000000000, 300000000000, Infinity],
    [[], {}],
    ['bolu', 2, 'bolu@xyz.co'],
    [10, 100, 1000, 20, 200, 2000, 30, 3000, 300000000000, Infinity],
    [[], {}],
    '1+2%9',
    ['$,', '&', '¥'],
    "about, home, contact",
    [true, false, null],
    [undefined, false, null]
]

const payload2 = [

    [1, 2, 3],
    ["x", "i", 0],
    [1, true, false],
    [true, undefined, null],
    [true, 100000, false],
    [1, false, true],
    [1, [2, 3]],
    ["letter", "biro", "pen"],
    [8, {a: 2, b: 4, c: 5}, 9],
    [8, {}, 9],
    [0, 0, 0],
    [1, 2, 3, Infinity, 5, 6, 7, 8, undefined, 0],
    [1,"sandra",3],
    [1, [2,3], 4,5],
    [['Bisola', 35, 'Google'], 250, null],
    [['Bisola', 35, 'Google'], {'hobby': 'reading'}],
    ["x", "i", 0],
    [true, 'undefined', null],
    [2%1, true, {value: false, return: true}],
    [1, false, true],
    [{'shopping_list': ["letter", "biro", "pen"], 'todo': ['shop', 'bake', 'sleep']}, {'malls': ['ICM', 'Adeniran ogunsanya']}],
    [{}, {a: 2, b: 4, c: 5}, 9],
    [8, {middle_val: true}, 9],
    [8, [null, true], 9],
    [[8, null], [true, 100.6], 9],
    [undefined, undefined, undefined],
    [[8, null], [true, 100.6]],
    ['undefined', undefined, 'null'],
    [null, [2,3], undefined,5],
    [[60, 120], [[70, 140], [140, 280]]]
]

module.exports = { payload, payload2 }