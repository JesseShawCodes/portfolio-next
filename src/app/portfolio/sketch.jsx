import { useRef, useContext } from 'react';
import dynamic from 'next/dynamic';
import { faL } from '@fortawesome/free-solid-svg-icons';

const Sketch = dynamic(() => import('react-p5'), {
  ssr: false
})

const P5Sketch = ({ onSketchReady }) => {
  let activity = [];
  const p5InstanceRef = useRef(null); // Ref to store the p5 instance

  const setup = (p5, canvasParentRef) => {
    p5InstanceRef.current = p5; // Store the p5 instance
    p5.createCanvas(1000, p5.windowHeight + 200).parent(canvasParentRef);
    // p5.noLoop();
    p5.colorMode(p5.HSB, 360, 100, 100);
    p5.noStroke();

    for (let i = 0; i < 35; i++) {
      activity.push(p5.int(p5.random(0, 6))); // activity level: 0 to 5
    }

    // Call the callback to pass the p5 instance to the parent component
    if (onSketchReady) {
      onSketchReady(p5);
    }
  };

  const draw = (p5) => {
    console.log("DRAW");
    p5.clear();

    let cols = 7; // Days of week
    let rows = 5; // 5 weeks
    let cellSize = 45;
    let padding = 10;

    let offsetX = p5.width / 2 - ((cols * (cellSize + padding)) / 2);
    let offsetY = p5.height / 2 - ((rows * (cellSize + padding)) / 2);

    for (let i = 0; i < activity.length; i++) {
      let col = i % cols;
      let row = Math.floor(i / cols);
      let val = activity[i];

      let hue = p5.map(val, 0, 5, 160, 30);       // teal → orange
      let alpha = p5.map(val, 0, 5, 0.2, 0.95);   // fade for low activity
      let brightness = p5.map(val, 0, 5, 30, 100);
      let pulse = p5.sin(p5.frameCount * 0.05 + i) * 2;

      let x = offsetX + col * (cellSize + padding);
      let y = offsetY + row * (cellSize + padding);

      // Outer glow effect
      p5.fill(hue, 80, brightness, alpha * 0.6);
      p5.ellipse(x + cellSize / 2, y + cellSize / 2, cellSize + pulse + 8);

      // Main cell
      p5.fill(hue, 80, brightness, alpha);
      p5.rect(x, y, cellSize, cellSize, 12); // rounded corners
    }

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }
  };

  return (
    <>
      <Sketch setup={setup} draw={draw} />
    </>
  )
}

export default P5Sketch;
