import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";

const HorizontalBarCategories = ({ data, isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log(data);
  const barColors = [
    "#ffff33", //9
    colors.greenAccent[400],
    "#ff9226", //8
    "#ebb556", //10
    "#f3e573", //11
    "#e83c3e", //12
    "#a768b1", //13
    colors.blueAccent[400],
    "#b3de6d", //15
    "#b3b3b3", //16
    "#ffff33",
  ];
  const getColor = (bar) => {
    const index = data?.findIndex(
      (item) => item.category_id === bar.data.category_id
    );
    return barColors[index % barColors.length];
  };
  //   const handleClientIdClick = (clientId) => {
  //     window.location.href = `userDetails/${clientId}`;
  //   };

  //   const formatYAxisTick = (id) => {
  //     return (
  //       <a
  //         onClick={(e) => {
  //           e.preventDefault();
  //           handleClientIdClick(id);
  //         }}
  //         style={{
  //           color: colors.grey[100],
  //           cursor: "pointer",
  //         }}
  //       >
  //         C{id}
  //         {console.log(id)}
  //       </a>
  //     );
  //   };
  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.greenAccent[400],
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
      keys={["total_CA"]}
      indexBy="category_name"
      layout="horizontal"
      margin={{ top: 40, right: 120, bottom: 50, left: 70 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={getColor}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={
        isDashboard
          ? null
          : {
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total des achats (DA)",
              legendPosition: "middle",
              legendOffset: 32,
            }
      }
      axisLeft={
        isDashboard
          ? null
          : {
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Top 10 categories",
              legendPosition: "middle",
              legendOffset: -50,
              //   format: formatYAxisTick,
            }
      }
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      role="application"
      ariaLabel="Nivo bar chart demo"
      tooltip={({ id, value, color }) => (
        <div
          style={{
            borderRadius: "3px",
            backgroundColor: "white",
            color: colors.blueAccent[400],
            padding: "5px",
          }}
        >
          <strong>total: </strong>
          <strong>{value} DA</strong>
        </div>
      )}
    />
  );
};

export default HorizontalBarCategories;
