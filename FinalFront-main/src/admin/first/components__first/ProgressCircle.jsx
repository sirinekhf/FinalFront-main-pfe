import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { useEffect, useState } from "react";
const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const angle = progress * 360;
  //const [angle, setAngle] = useState(progress * 360);
  let angle = progress * 360;
  let circleColor = colors.greenAccent[500]; // Default color

  if (progress < 0) {
    circleColor = colors.redAccent[500];
    // const newAngle = progress * 360;
    // setAngle(newAngle);
    angle = progress * 360 * -1;
  }

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
            ${circleColor}`, // Use the circleColor variable here
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};
// const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const angle = progress * 360;
//   return (
//     <Box
//       sx={{
//         background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
//             conic-gradient(transparent 0deg ${angle}deg, ${colors.blueAccent[500]} ${angle}deg 360deg),
//             ${colors.greenAccent[500]}`,
//         borderRadius: "50%",
//         width: `${size}px`,
//         height: `${size}px`,
//       }}
//     />
//   );
// };

export default ProgressCircle;
