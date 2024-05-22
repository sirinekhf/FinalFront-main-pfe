import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useEffect } from "react";

const dataDefault = [
  {
    etat: "draft",
    nombre_commandes: 450,
  },
  {
    etat: "paid",
    nombre_commandes: 190,
  },
  {
    etat: "confirm",
    nombre_commandes: 380,
  },
  {
    etat: "shipped",
    nombre_commandes: 95,
  },
  {
    etat: "cancel",
    nombre_commandes: 20,
  },
];

const getFormattedEtat = (etat) => {
  switch (etat) {
    case "draft":
      return "Brouillon";
    case "paid":
      return "Payée";
    case "confirm":
      return "Confirmée";
    case "shipped":
      return "Livrée";
    case "cancel":
      return "Annulée";
    default:
      return etat;
  }
};

const PieChart = ({ isDashboard = false, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const formattedData = data?.map((item) => ({
    id: getFormattedEtat(item.etat),
    etat: item.etat,
    value: item.nombre_commandes,
  }));

  return (
    <ResponsivePie
      data={formattedData}
      colors={{ scheme: "nivo" }}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={
        isDashboard
          ? undefined
          : [
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]
      }
      //tooltip={({ datum }) => `${datum.id}: ${datum.value}`}
      tooltip={({ datum }) => (
        <div
          style={{
            borderRadius: "3px",
            backgroundColor: "white",
            color: colors.blueAccent[400],
            padding: "5px",
          }}
        >
          <strong>{datum.id}: </strong>
          <strong>{datum.value}</strong>
        </div>
      )}
    />
  );
};

export default PieChart;
