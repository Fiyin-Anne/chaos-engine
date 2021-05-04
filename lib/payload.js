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
    ['bolu', 2, 'bolu@xyz.co'],
    [1000000000, 20000000000, 300000000000, Infinity]
]

const payload2 = [

    [1, 2, 3],
    ["x", "i", 0],
    [1, true, false],
    [true, undefined, null],
    [1, true, false],
    [1, true, false],
    [1, false, true],
    [1, 2, 3],
    ["letter", "biro", "pen"],
    [8, {a: 2, b: 4, c: 5}, 9],
    [8, {}, 9],
    [8, [], 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    [1,"sandra",3],
    [1, [2,3], 4,5],
]

module.exports = { payload, payload2 }