interface NumbersOnly {
    [index: string]: number;
}

const numbers: NumbersOnly = {
    low: -50,
    high: 100,
    // foo: 'bar',
};

function double(val: number) {
    return val * 2;
}

// eslint-disable-next-line
console.log('Hello, TS!', double(numbers.low));
