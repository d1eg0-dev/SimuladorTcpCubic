let cwnd, ssthresh;
let time = 0;
let data = [];
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function load() {
  cwnd = parseFloat(document.getElementById("cwnd").value);
  ssthresh = parseFloat(document.getElementById("ssthresh").value);

  time = 0;
  data = [];
}
function step() {
  time += 0.1;

  if (cwnd < ssthresh) {
    cwnd += 1; 
  } else {
    cwnd += 0.1; 
  }

  data.push({ t: time, cwnd });
  draw();
}
function loss() {
  ssthresh = cwnd / 2;
  cwnd = 1;
}
function start() {
  load();
  let interval = setInterval(() => {
    step();
    if (time > 30) clearInterval(interval);
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
    let x = p.t * 20;
    let y = canvas.height - p.cwnd * 5;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  ctx.stroke();
}
load();
draw();
