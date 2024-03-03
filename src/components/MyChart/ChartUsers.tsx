import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import Chart from "chart.js/auto";

const BASE_URL = "https://petstore.swagger.io/v2";

const UserLoginChart = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Login Activity",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<any> = await axios.get(
          `${BASE_URL}/user/login`
        );

        const loginData = response.data;

        setChartData({
          labels: Object.keys(loginData),
          datasets: [
            {
              label: "Login Activity",
              data: Object.values(loginData),
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching login data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const previousChart = (chartRef.current as any)?.chart as Chart;

    if (previousChart) {
      previousChart.destroy();
    }

    const ctx = chartRef.current;

    if (ctx) {
      new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartData]);

  return (
    <canvas id="loginChart" ref={chartRef} width="400" height="200"></canvas>
  );
};

export default UserLoginChart;
