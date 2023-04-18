import { useEffect, useState } from "react";
import { MyChest, MyStar } from "../animationStyled";

export const Chest = () => {
  const [display, changeDisplay] = useState(0);
  const [stars, changeStars] = useState([
    { x: 20, y: 10 },
    { x: 5, y: 19 },
    { x: 49, y: 33 },
    { x: 15, y: 40 },
    { x: 31, y: 2 },
  ]);

  useEffect(() => {
    let interval = null;
    setTimeout(() => {
      changeDisplay(1);
      setTimeout(() => {
        interval = setInterval(() => {
          starsGenerator();
        }, 200);
        setTimeout(() => {
          clearInterval(interval);
          changeStars([]);
        }, 5000);
      }, 1000);
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const starsGenerator = () => {
    for (let i = 0; i < 1; i++) {
      let x = Math.random() * 120;
      let y = Math.random() * 120;
      changeStars((val) => [...val, { x: x, y: y }]);
    }
  };

  return (
    <MyChest display={display}>
      {stars.map((item, index) => (
        <MyStar x={item.x} y={item.y} key={index} />
      ))}
    </MyChest>
  );
};
