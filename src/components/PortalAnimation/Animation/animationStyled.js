import styled from "styled-components";

export const Rocket = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/budget-689a8.appspot.com/o/Img%2Fanimation%2Frocket%20(1).png?alt=media&token=827b9ec3-bc22-447b-a252-9ccc2768242a");
  background-size: 200px 200px;
  background-position: center;
  transition-duration: 2s;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, 0%);
  animation: ${(props) => props.goRocket} 2000ms linear forwards;
`;

export const RocketFire = styled.div`
  width: 40px;
  height: 50px;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/budget-689a8.appspot.com/o/Img%2Fanimation%2Ffire.jpg?alt=media&token=1e2a098a-3f13-4dbb-bddc-98072a42dcd5");
  background-size: 350px 50px;
  background-position: ${(props) => props.position}px 9px;
  background-repeat: no-repeat;
  transition-duration: 0ms;
  position: absolute;
  left: 44%;
  bottom: 2px;
  transform: translate(-50%, -50%);
  transform: rotate(180deg);
  animation: ${(props) => props.goFire} 2000ms linear forwards;
`;
// export const FogCloud = styled.div`
//   opacity: ${(props) => props.display};
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   border: 1px solid gray;
//   background-color: silver;
//   transition-duration: 1s;
//   box-shadow: silver 0px 0px 3px 4px;
//   position: absolute;
//   left: ${(props) => props.x}px;
//   bottom: ${(props) => props.y}px;
//   animation: fireRocket 500ms linear forwards;
// `;

export const FogCloud = styled.div.attrs(({ x, y, display }) => ({
  style: {
    opacity: display,
    bottom: y + "px",
    left: x + "px",
  },
}))`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: silver;
  transition-duration: 1s;
  box-shadow: silver 0px 0px 3px 4px;
  position: absolute;
  animation: fireRocket 500ms linear forwards;
`;

export const MyChest = styled.div`
  opacity: ${(props) => props.display};
  width: 120px;
  height: 120px;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/budget-689a8.appspot.com/o/Img%2Fanimation%2Fpngwing.com%20(1).png?alt=media&token=5c22416a-d0ae-4e2a-8e92-fadecec945a0");
  background-size: 120px 120px;
  position: absolute;
  left: 50%;
  bottom: 15px;
  transition-duration: 8s;
  transform: translate(-50%, 0%);
`;

// export const MyStar = styled.div`
//   display: block;
//   width: 5px;
//   height: 5px;
//   background-image: url("https://firebasestorage.googleapis.com/v0/b/budget-689a8.appspot.com/o/Img%2Fanimation%2Fnorth-star.png?alt=media&token=2374b1a0-7b0c-4fa6-b908-def0681817ae");
//   background-size: 5px 5px;
//   position: absolute;
//   left: ${(props) => props.x}px;
//   bottom: ${(props) => props.y}px;
//   animation: star 1000ms linear forwards;
// `;

export const MyStar = styled.div.attrs(({ x, y }) => ({
  style: {
    bottom: y + "px",
    left: x + "px",
  },
}))`
  display: block;
  width: 5px;
  height: 5px;
  background-image: url("https://firebasestorage.googleapis.com/v0/b/budget-689a8.appspot.com/o/Img%2Fanimation%2Fnorth-star.png?alt=media&token=2374b1a0-7b0c-4fa6-b908-def0681817ae");
  background-size: 5px 5px;
  position: absolute;
  animation: star 1000ms linear forwards;
`;
