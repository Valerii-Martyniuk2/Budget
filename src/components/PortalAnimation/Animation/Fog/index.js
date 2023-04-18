import { useEffect } from "react";
import { useState } from "react";
import { FogCloud } from "../animationStyled";

export const Fog = () => {
  const [display, changeDisplay] = useState(1);
  const [fog, changeFog] = useState([]);
  useEffect(() => {
    let interval = null;
    setTimeout(() => {
      interval = setInterval(() => {
        fogGeneration();
      }, 200);
      setTimeout(() => {
        clearInterval(interval);
      }, 4000);
      setTimeout(() => {
        changeDisplay(0);
      }, 5500);
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fogGeneration = () => {
    for (let i = 0; i <= 2; i++) {
      let x = Math.random() * 200;
      if (x < 45) {
        x = 45;
      }
      let y = Math.random() * 40;
      changeFog((val) => [...val, { x: x, y: y }]);
    }
  };

  return (
    <>
      {fog.map((item, index) => (
        <FogCloud x={item.x} y={item.y} display={display} key={index} />
      ))}
    </>
  );
};
