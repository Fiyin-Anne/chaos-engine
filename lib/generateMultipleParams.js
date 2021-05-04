const generateArgs = (arr, repeat=100) => {
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
    
  let multiple_params_args = []
  do {
    // create array of random args
    let args = [];
    let rand = getRandomIntInclusive(2, 10)
    do {
      args.push(arr[Math.floor(Math.random() * arr.length)])
    }
    while (args.length < rand);
  
    multiple_params_args.push(args)
  }
  while (multiple_params_args.length < repeat);

  return multiple_params_args;
}

module.exports = { generateArgs }