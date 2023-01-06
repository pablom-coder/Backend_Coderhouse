let defaultQuantity = 100000000;
export const randomNumb = (cant) => {
  if (cant >= 0) {
    defaultQuantity = cant;
  }
  let numerosRandom = [];

  for (let i = 0; i < defaultQuantity; i++) {
      numerosRandom.push(Math.floor(Math.random() * 1000));
      //console.log(numerosRandom);
  }

  return numerosRandom.reduce((a, d) => (a[d] ? (a[d] += 1) : (a[d] = 1), a), {});;

};

process.on('message', (cant) => {

  if (cant !== 0) {
      console.log(`PID: ${process.pid}`);
      const numb = randomNumb(cant || 100000000);
      console.log(numb);
      process.send(numb);
  }
});
