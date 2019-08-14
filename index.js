import "babel-polyfill";
import SVG from "svg.js";

import { randomNumber, randomOption } from "./random";

async function makeFlyer() {
  // ===== setup canvas =====

  // create div
  const frame = document.getElementById("app");
  const container = document.createElement("div");
  container.className = "page";
  frame.appendChild(container);

  // create svg
  const draw = SVG(container);
  draw.rect("100%", "100%").fill("#000");
  draw.viewbox(0, 0, 210, 297);

  // ===== draw scene =====

  drawStars(draw);
  const rocket = drawRocket(draw);
  const slogan = drawSlogan(draw);

  // invert slogan inside of rocket
  const blackSlogan = slogan.clone();
  blackSlogan.fill("#000");
  draw
    .group()
    .add(blackSlogan)
    .maskWith(rocket.clone());

  drawTitle(draw);
  drawUrl(draw);
}

function positionRandomly(draw, obj) {
  const bbox = obj.rbox(draw);
  obj
    .x(randomNumber(bbox.w / 2, 210 - bbox.w / 2))
    .y(randomNumber(bbox.h / 2, 297 - bbox.h / 2));
}

for (let i = 0; i < 20; i++) {
  makeFlyer();
}

// ================================ DRAWING STUFF ==================================

function drawRocket(draw) {
  const rocket = draw.group();

  rocket.fill("#fff");
  const group = rocket.group();
  // group.move(0, 60);
  group.path(
    "M143.145,517.94c26.671,0.842 43.522,-9.193 60.178,-33.011c22.739,-32.518 39.597,-73.232 52.196,-140.573c9.147,-48.893 3.897,-102.775 -7.627,-146.144c-12.317,-46.354 -26.888,-81.488 -50.65,-112.977c-12.629,-16.737 -31.472,-30.15 -36.181,-38.743c-3.71,-6.771 -6.303,-46.289 -6.303,-46.289c0,0 -4.109,39.785 -8.445,45.921c-5.594,7.92 -28.11,21.284 -43.849,37.065c-28.547,28.621 -55.443,76.406 -65.651,115.888c-9.141,35.352 -14.352,81.497 -6.57,139.722c7.955,59.518 41.36,122.158 53.841,143.162c14.86,25.007 31.625,35.112 59.061,35.979Z"
  );
  group.path(
    "M193.021,382.495c19.792,-6.546 35.366,13.445 50.423,33.258c20.334,26.757 36.612,74.987 38.329,116.181c1.305,31.326 1.146,45.844 -2.962,67.983c-4.231,22.803 -10.151,29.497 -11.428,30.237c-3.394,1.967 -10.431,1.657 -16.339,1.104c-17.801,-1.666 -24.051,-2.505 -26.266,-4.997c-1.878,-2.112 1.425,-22.011 -4.49,-47.776c-6.68,-29.101 -17.971,-45.704 -37.497,-60.997c-27.256,-21.347 -33.702,-13.221 -34.758,-20.051c-1.635,-10.569 19.985,-47.695 22.208,-63.476c2.615,-18.57 6.857,-46.199 22.78,-51.466Z"
  );
  group.path(
    "M93.197,379.021c-19.683,-6.961 -35.578,12.698 -50.953,32.191c-20.763,26.325 -38.532,72.993 -40.915,114.144c-1.812,31.293 -1.888,45.812 1.861,68.034c3.862,22.888 9.673,29.705 10.937,30.472c3.362,2.038 10.403,1.876 16.319,1.448c17.824,-1.292 24.087,-2 26.342,-4.444c1.911,-2.072 -1.068,-22.037 5.262,-47.674c7.15,-28.955 18.707,-45.318 38.478,-60.197c27.597,-20.771 33.911,-12.51 35.077,-19.316c1.805,-10.534 -19.211,-48.108 -21.177,-63.934c-2.315,-18.621 -5.396,-45.123 -21.231,-50.724Z"
  );
  group
    .path(
      "M128.383,111.703c20.33,7.021 27.709,39.369 16.469,72.192c-11.239,32.823 -36.87,53.77 -57.199,46.75c-20.329,-7.021 -27.709,-39.369 -16.469,-72.192c11.24,-32.823 36.87,-53.77 57.199,-46.75Z"
    )
    .fill("#000");
  group.path(
    "M132.016,1074.85c0,0 -3.044,-252.274 -27.833,-334.948c-24.654,-82.219 -59.814,-144.286 5.264,-185.328c41.598,-26.234 30.275,-26.207 71.227,-1.799c31.12,18.548 19.802,71.613 2.849,132.032c-9.831,35.037 -21.558,72.546 -28.003,107.232c-17.561,94.501 -23.504,282.811 -23.504,282.811Z"
  );

  let rocketScale = randomNumber(0.05, 0.3);
  const rocketRotation = randomNumber(-100, 100);

  const scaleCorrection =
    (Math.cos((rocketRotation / 360) * 4 * Math.PI) + 1) / 6;
  rocketScale = rocketScale + scaleCorrection;
  rocket.cy(0);
  const yRange = 297 * rocketScale * 2;
  const xRange = 210 * rocketScale * 2;
  rocket.cy(randomNumber(297 / 2 - yRange / 2, 297 / 2 + yRange / 2) + 50);
  rocket.cx(randomNumber(210 / 2 - xRange / 2, 210 / 2 + xRange / 2));
  rocket.scale(rocketScale);
  rocket.rotate(rocketRotation);

  return rocket;
}

function drawSlogan(draw) {
  const slogan = draw.group();

  slogan
    .text("10 YEARS IN SPACE")
    .font({
      family: "monaco",
      size: randomNumber(15, 18),
      leading: "1.5em"
    })
    .cx(0)
    .cy(0)
    .transform({ rotation: randomOption([0, 90, 0, -90]) });

  slogan.fill("#fff");

  positionRandomly(draw, slogan);
  return slogan;
}

function drawDate(draw) {
  const date = draw.group();

  date
    .text("2019/10/03 - 2019/10/06")
    .font({
      family: "monaco",
      size: randomNumber(8, 10),
      leading: "1.5em"
    })
    .fill("#fff")
    .cx(0)
    .cy(0)
    .transform({ rotation: randomOption([0, 90, 0, -90]) });

  positionRandomly(draw, date);
  return date;
}

function drawStars(draw) {
  const group = draw.group();

  for (let i = 0; i < 30; i++) {
    const star = group.circle(randomNumber(0.1, 2)).fill("#fff");
    positionRandomly(draw, star);
  }

  return group;
}

function drawTitle(draw) {
  const group = draw.group();

  const title = group
    .text("hackumenta")
    .font({
      family: "monaco",
      size: 8,
      leading: "1.5em"
    })
    .x(10)
    .y(10)
    .fill("#fff");

  const titleBounds = title.rbox(draw);
  group
    .rect(titleBounds.w + 2, titleBounds.h)
    .cx(titleBounds.cx)
    .cy(titleBounds.cy - 0.5)
    .fill("#000");
  title.front();

  return group;
}

function drawUrl(draw) {
  const group = draw.group();

  const title = group
    .text("0xA.flipdot.org")
    .font({
      family: "monaco",
      size: 8,
      leading: "1.5em"
    })
    .cx(105)
    .cy(284)
    .fill("#fff");

  const titleBounds = title.rbox(draw);
  group
    .rect(titleBounds.w + 2, titleBounds.h)
    .cx(titleBounds.cx)
    .cy(titleBounds.cy - 0.5)
    .fill("#000");
  title.front();

  return group;
}
