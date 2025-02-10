import aboutImageBASE64 from './aboutImageData';

const k = 11; // kernel size
const color = '#1e2124';

function drawImage(): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = aboutImageBASE64();
  });
}

function createSVGElement(width: number, height: number): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width.toString());
  svg.setAttribute('height', height.toString());
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  return svg;
}

function renderLightLine(svg: SVGSVGElement, x: number, y: number, val: number) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', (x - k / 1.9).toString());
  line.setAttribute('y1', (y - k / 1.9).toString());
  line.setAttribute('x2', (x + k / 2).toString());
  line.setAttribute('y2', (y + k / 2).toString());
  line.setAttribute('stroke', color);
  line.setAttribute('stroke-width', ((k / 2) * (1 - val)).toString());
  line.setAttribute('stroke-linecap', 'round');
  svg.appendChild(line);
}

function renderSVG(svg: SVGSVGElement, sampledData: { x: number; y: number; totalAvg: number; }[]) {
  sampledData.forEach(({ x, y, totalAvg }) => {
    renderLightLine(svg, x, y, totalAvg);
  });
}

function parseSample(x: number, y: number, width: number, data: Uint8ClampedArray) {
  const temp = [];
  for (let i = y; i < y + k; i += 1) {
    for (let j = x; j < x + k; j += 1) {
      const loc = ((i * width) + j) * 4;
      const R = data[loc];
      const G = data[loc + 1];
      const B = data[loc + 2];
      const avg = 0.1 * (R / 255) + 0.7 * (G / 255) + 0.1 * (B / 255);
      temp.push(avg);
    }
  }
  const totalAvg = (temp.reduce((acc, curr) => acc + curr, 0)) / temp.length;
  return { x, y, totalAvg };
}

function parseImageData(imageData: ImageData) {
  const sampledData = [];
  const { data, width, height } = imageData;
  for (let y = 0; y <= height - k; y += k) {
    for (let x = 0; x <= width - k; x += k) {
      sampledData.push(parseSample(x, y, width, data));
    }
  }
  return sampledData;
}

function addImage(img: HTMLImageElement, container: HTMLElement) {
  const imgElement = document.createElement('img');
  imgElement.src = img.src;
  imgElement.style.position = 'absolute';
  imgElement.style.width = `${img.width}px`;
  imgElement.style.height = `${img.height}px`;

  const svg = createSVGElement(img.width, img.height);
  container.appendChild(imgElement);
  container.appendChild(svg);

  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, img.width, img.height);

  return { svg, imageData };
}

export default function createAboutImage() {
  const container = document.querySelector('.about_image_wrapper-too') as HTMLElement;
  container.innerHTML = ''; // Clear previous elements

  drawImage()
    .then((img) => addImage(img, container))
    .then(({ svg, imageData }) => {
      const sampledData = parseImageData(imageData);
      renderSVG(svg, sampledData);
    });
}

// const k = 10; // kernel size;
// const color = '#1e2124';
// const darkMode = false;

// const uniqueId = () => {
//   return `on-canvas-${darkMode ? 'dark' : 'light'}`;
// };

// function drawImage() {
//   const img = new Image();
//   return new Promise((resolve) => {
//     img.onload = () => {
//       resolve(img);
//     };
//     img.src = aboutImageBASE64();
//   });
// }

// function renderLightLine(ctx, x, y, val) {
//   ctx.beginPath();
//   ctx.moveTo((x - k / 1.9), (y - k / 1.9));
//   ctx.lineTo(x + k / 2, y + k / 2);
//   ctx.lineWidth = (k / 2) * (1 - val);
//   ctx.strokeStyle = color;
//   ctx.stroke();
//   ctx.closePath();
// }

// function renderAnimation(ctx, sampledData) {

//   function nextDrawing(currentOption) {
//     const canvas = document.getElementById(uniqueId()) as HTMLCanvasElement;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     for (let i = 0; i < sampledData.length; i += 1) {
//       const { x, y, totalAvg } = sampledData[i];
//       currentOption(ctx, x, y, totalAvg);
//     }
//   }

//   nextDrawing(renderLightLine);
// }

// function parseImageData(imageData, ctx) {
//   const sampledData = [];
//   const { data, width, height } = imageData;
//   for (let y = 0; y <= height - k; y += k) {
//     for (let x = 0; x <= width - k; x += k) {
//       sampledData.push(parseSample(x, y, width, data));
//     }
//   }
//   return { ctx, sampledData };
// }

// function parseSample(x, y, width, data) {
//   const temp = [];
//   for (let i = y; i < y + k; i += 1) {
//     for (let j = x; j < x + k; j += 1) {
//       const loc = ((i * width) + j) * 4;
//       const R = data[loc];
//       const G = data[loc + 1];
//       const B = data[loc + 2];
//       const avg = 0.1 * (R / 255) + 0.7 * (G / 255) + 0.1 * (B / 255);
//       temp.push(avg);
//     }
//   }
//   const totalAvg = (temp.reduce((acc, curr) => acc + curr, 0)) / temp.length;
//   return { x, y, totalAvg };
// }

// function addImage(img, canvasDiv) {
//   const onCanvas = document.createElement('CANVAS') as HTMLCanvasElement;
//   onCanvas.id = uniqueId();
//   // this is to prevent non-square pixels at the ends/
//   onCanvas.width = img.width - (onCanvas.width % k);
//   onCanvas.height = img.height - (onCanvas.height % k);
//   const onCtx = onCanvas.getContext('2d');
//   onCtx.clearRect(0, 0, img.width, img.height);
//   onCtx.beginPath();
//   onCtx.ellipse((img.width / 2) - 10, (img.height / 2) - 10, (img.width / 2) - 10, (img.width / 2) - 10, 0, 0, 2 * Math.PI);
//   onCtx.clip();
//   canvasDiv.appendChild(onCanvas);

//   const offCanvas = document.createElement('CANVAS') as HTMLCanvasElement;
//   offCanvas.width = img.width - (offCanvas.width % k);
//   offCanvas.height = img.height - (offCanvas.height % k);
//   const offCtx = offCanvas.getContext('2d');
//   offCtx.drawImage(img, 0, 0, onCanvas.width, onCanvas.height);
//   const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
//   return { imageData, onCtx };
// }

// export default function createAboutImage() {
//   const canvasDiv = document.querySelector('.about_image_wrapper');
//   drawImage()
//     .then((img) => addImage(img, canvasDiv))
//     .then(({ imageData, onCtx }) => parseImageData(imageData, onCtx))
//     .then(({ ctx, sampledData }) => renderAnimation(ctx, sampledData));
// }