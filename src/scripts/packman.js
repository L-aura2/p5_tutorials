  import { onMounted, ref } from 'vue'
  import p5 from 'p5'

  const sketchContainer = ref(null)
  let p5Instance = null
  let direction = "right"


  export const packman = (p) => {
    // Variables for Packman size and position
    const packmanSize = 24;
    const centerX = 250;
    const centerY = 250;
    const eyeSize = 4;
    const eyeOffsetFromCenter = 5;

    p.noStroke();
    p.fill(255, 255, 0);
    let biteSize = p.PI / 16;
    let startAngle = biteSize * p.sin(p.frameCount * 0.1) + biteSize;
    let endAngle = p.TWO_PI - startAngle;zs
    if (direction === "down") {
      startAngle += p.HALF_PI;
      endAngle += p.HALF_PI;
    } else if (direction === "left") {
      startAngle += p.PI;
      endAngle += p.PI;
    } else if (direction === "up") {
      startAngle += 3 * p.HALF_PI;
      endAngle += 3 * p.HALF_PI;
    }
    p.arc(centerX, centerY, packmanSize, packmanSize, startAngle, endAngle, p.PIE);

    p.fill(0);
    let x = centerX;
    let y = centerY - eyeOffsetFromCenter;
    if (direction === "down" || direction === "up") {
      x = centerX - eyeOffsetFromCenter;
      y = centerY;
    }
    p.arc(x, y, eyeSize, eyeSize, 0, p.PI + p.PI);

    if (p.keyIsPressed === true) {
      if (p.key === 'z') {
        direction = "up";
      } else if (p.key === 'q') {
        direction = "left"
      } else if (p.key === 's') {
        direction = "down"
      } else if (p.key === 'd') {
        direction = "right"
      }
    }
  }
