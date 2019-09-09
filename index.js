class Stopwatch {
  constructor(display, results) {
      this.running = false;
      this.display = display;
      this.results = results;
      this.stopTime = null;
      this.startTime = null;
      this.laps = [];
      this.reset();
      this.print(this.times);
  }
  
  reset() {
      this.times = [ 0, 0, 0 ];
  }
  
  start() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let times1 = this.times;

    console.log(`stopwatch start at ${h}:${m}:${s}`);

      if (!this.time) this.time = performance.now();
      if (!this.running) {
          this.running = true;
          requestAnimationFrame(this.step.bind(this));
      }

  }
  //record time lap
  lap() {
      // let sec = this.times - 1000;
      let times = this.times;
      let li = document.createElement('li');
      li.innerText = this.format(times);
      this.results.appendChild(li);
      console.log(`${times}`);
  }
  
    stop() {
      let date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      
      console.log(`stopwatch stop at ${h}:${m}:${s}`);
      this.running = false;
      this.time = null;
  }
  // duration(){
    
  // }

  restart() {
      if (!this.time) this.time = performance.now();
      if (!this.running) {
          this.running = true;
          requestAnimationFrame(this.step.bind(this));
      }
      this.reset();
  }
  
  clear() {
      clearChildren(this.results);
  }
  
  step(timestamp) {
      if (!this.running) return;
      this.calculate(timestamp);
      this.time = timestamp;
      this.print();
      requestAnimationFrame(this.step.bind(this));
  }
  
  calculate(timestamp) {
      var diff = timestamp - this.time;
      // Hundredths of a second are 100 ms
      this.times[2] += diff / 10;
      // Seconds are 100 hundredths of a second
      if (this.times[2] >= 100) {
          this.times[1] += 1;
          this.times[2] -= 100;
      }
      // Minutes are 60 seconds
      if (this.times[1] >= 60) {
          this.times[0] += 1;
          this.times[1] -= 60;
      }
  }
  
  print() {
      this.display.innerText = this.format(this.times);
  }
  
  format(times) {
      return `\
${pad0(times[0], 2)}:\
${pad0(times[1], 2)}:\
${pad0(Math.floor(times[2]), 2)}`;
  }
}

function pad0(value, count) {
  var result = value.toString();
  for (; result.length < count; --count)
      result = '0' + result;
  return result;
}

function clearChildren(node) {
  while (node.lastChild)
      node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
  document.querySelector('.stopwatch'),
  document.querySelector('.results'));

  console.log(stopwatch.start());
  console.log(stopwatch.stop());
  console.log(stopwatch.lap());
  