function fact(parsed){
  let fives = 0;
  let number = Number(parsed.number), start = number % 2 == 0 ? 2 : 1;
  for (let i = start; i < number + 1; i += parsed.step){
    if (i % 5 == 0){
      if (i % 25 == 0){
        fives += 2;
      }
      else{
        ++fives
      }
    }
  }
  return {num: fives, add: number % 2 == 0 || parsed.step === 1};
}

function parse(str){
  let res = [{number: "", step: 0}, ];;
  for (let char of str){
    if (char === '*'){
      res.push({number: "", step: 0})
    } else if (!isNaN(Number(char))){
      res[res.length - 1].number += char;
    } else {
      ++res[res.length - 1].step;
    }
  }
  return res;
}

module.exports = function zeros(expression){
  let elems = parse(expression), zerosArr = [];
  for (let elem of elems){
    zerosArr.push(fact(elem))
  }
  let accum = 0, prev = false;
  for (let elem of zerosArr){
    if (elem.add)
      prev = true;
  }
  if (!prev){
    return 0
  }
  for (let elem of zerosArr){
    accum += elem.num
  }
  return accum;
}