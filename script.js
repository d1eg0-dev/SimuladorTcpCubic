let cwnd, ssthresh;
let time = 0;
let data = [];
let Wmax = 1;
let K = 0;
let lastLossTime = 0;

const C = 0.4;
const beta = 0.7;
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function load() {
  cwnd = parseFloat(document.getElementById("cwnd").value);
  ssthresh = parseFloat(document.getElementById("ssthresh").value);

  time = 0;
  data = [];

  Wmax = cwnd;
  lastLossTime = 0;
  K = Math.cbrt(Wmax * (1 - beta) / C);
}
function step() {
  time += 0.1;

  if (cwnd < ssthresh) {
    cwnd += 1;
  } else {
    let t = time - lastLossTime;
    let cubic = C * Math.pow(t - K, 3) + Wmax;

    if (cubic > cwnd) {
      cwnd += 0.3;
    } else {
      cwnd += 0.05;
    }
  }

  data.push({ t: time, cwnd });
  draw();
}
function loss() {
  Wmax = cwnd;
  ssthresh = cwnd * beta;
  cwnd = ssthresh;

  lastLossTime = time;
  K = Math.cbrt(Wmax * (1 - beta) / C);

  data.push({ t: time, cwnd });
  draw();
}
function start() {
  load();
  let interval = setInterval(() => {
    step();
    if (time > 60) clearInterval(interval);
  }, 100);
}
function resetSim() {
  load();
  draw();
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.strokeStyle = "blue";

  data.forEach((p, i) => {
    let x = p.t * 10;
    let y = canvas.height - p.cwnd * 5;

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}
load();
draw();