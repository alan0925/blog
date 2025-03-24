export function paintBorder(label){
  let w,h,r
  w=label.offsetWidth
  h=label.offsetHeight
  r=Math.max(2,Math.min(w/100,h/100))
  // console.log("param",w,h,r);
  
  label.style.backgroundImage = getBorderImage(w,h,r)
}

function getBorderImage(width,height,r){
  let svg = getBorderSvgs(width-2*r,height-2*r,r)
  let encodedSvg = encodeURIComponent(svg);
  return `url("data:image/svg+xml;utf8,${encodedSvg}")`;
}

function getBorderSvgs(width,height,r){
  let lines = new Array(8)
  lines[0]=getVerticalline(width,r,r,r)
  lines[1]=getVerticalline(width,r,r,r)
  lines[2]=getVerticalline(width,r,r,r+height)
  lines[3]=getVerticalline(width,r,r,r+height)
  lines[4]=getHorizationline(height,r,r,r)
  lines[5]=getHorizationline(height,r,r,r)
  lines[6]=getHorizationline(height,r,r+width,r)
  lines[7]=getHorizationline(height,r,r+width,r)

  // console.log(`<svg width="${width+2*r}" height="${height+2*r}" xmlns="http://www.w3.org/2000/svg">`
  //         +lines.join('')+
  //         `</svg>`);
  return `<svg width="${width+2*r}" height="${height+2*r}" xmlns="http://www.w3.org/2000/svg">`
          +lines.join('')+
          `</svg>`
}
function getVerticalline(width,r,px,py){
  let sx,sy,dx,dy,qx,qy
  sx = getRandom(r)
  sy = getRandom(r)
  dx = getRandom(r)
  dy = getRandom(r)
  qx = getRandom(r)
  qy = getRandom(r)
  return `<path d="M ${px+sx} ${py+sy} Q ${px+width/2+qx} ${py+qy} ${px+width+dx} ${py+dy} " fill="transparent" stroke="black" stroke-width="1" />`
}
function getHorizationline(height,r,px,py){
  let sx,sy,dx,dy,qx,qy
  sx = getRandom(r)
  sy = getRandom(r)
  dx = getRandom(r)
  dy = getRandom(r)
  qx = getRandom(r)
  qy = getRandom(r)
  return `<path d="M ${px+sx} ${py+sy} Q ${px+qx} ${py+height/2+qy} ${px+dx} ${py+height+dy} " fill="transparent" stroke="black" stroke-width="1" />`
}
function getRandom(r){
  return Math.random()*2*r-r;
}
