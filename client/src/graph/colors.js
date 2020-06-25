//
// const colors = ['tomato', 'orange', 'gold', 'cyan', 'navy'];
// built in color scales: "grayscale", "qualitative", "heatmap", "warm", "cool", "red", "green", "blue".
// const colors = 'qualitative';

const yellow200 = '#FFF59D';
const deepOrange600 = '#F4511E';
const lime300 = '#DCE775';
const lightGreen500 = '#8BC34A';
const teal700 = '#00796B';
const cyan900 = '#006064';
const red = '#C00000';
const green = '#00FF00';
// const blue = '#202080';
// const blue = '#000080';
const gray = '#80D0D0';

export const colors = [
  cyan900,
  teal700,
  lightGreen500,
  lime300,
  yellow200,
  deepOrange600,
  green,
  red,
  // blue, // Color for lower sum
  gray,
];

// const lower_label = '▼'; // 'Less'; ▼

const assigned = [];

const prefered = {
  'United States': { color: red, xval: 'United States' },
  China: { color: yellow200, xval: 'China' },
  Jamaica: { color: green, xval: 'Jamaica' },
  // [lower_label]: { color: blue, xval: lower_label },
};

export function colorfor(index) {
  return colors[index % colors.length];
}

// slices = [ { x, y, label } ... ]
//  { x: "US", y: 1069424, label: "US\n32.8%" }
export function orderColors_pie(slices) {
  // Select next to last to do swapping
  let clast = colors.length - 2;
  if (clast > slices.length - 1) clast = slices.length - 1;
  const cswap = clast;
  for (let index = 0; index < clast; index++) {
    const nitem = slices[index];
    const nxval = nitem.x;
    // console.log('index', index, 'nxval', nxval);
    let aitem = prefered[nxval];
    if (!aitem) {
      aitem = assigned.find((item) => item.xval === nxval);
    }
    const ocolor = colors[index];
    if (aitem) {
      if (aitem.color === ocolor) continue;
      const aindex = colors.findIndex((color) => color === aitem.color);
      colors[index] = aitem.color;
      colors[aindex] = ocolor;
    } else {
      // First look at this xval, take last color
      colors[index] = colors[cswap];
      colors[cswap] = ocolor;
    }
  }
  // console.log('clast', clast, slices[clast]);
  // console.log('clast+1', clast + 1, slices[clast + 1]);
  // { "x": "▼", "y": 140, "oy": 140, "label": "[135] ▼ 2.4%", "count": 135 }
  for (let index = 0; index <= clast; index++) {
    const color = colors[index];
    const item = slices[index];
    const xval = item.x;
    assigned[index] = { color, xval };
    item.color = color; // For export to p5js
  }
  // For export to p5js
  if (clast + 1 < slices.length) {
    const item = slices[clast + 1];
    item.color = colors[clast + 1];
  }
}
