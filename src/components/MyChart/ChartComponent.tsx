import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { findPetsByStatus } from "../../api";

interface ChartComponentProps {
  status: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ status }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchDataAndDrawChart = async () => {
      try {
        const response = await findPetsByStatus(status);
        const pets = response.data;

        // Извлекаем имена и возраст питомцев для графика
        const labels = pets.map((pet: any) => pet.name);
        const ages = pets.map((pet: any) => pet.age);

        // Создаем данные для графика
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: `Pets by Status: ${status}`,
              data: ages,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        };

        // Получаем контекст canvas
        const ctx = chartRef.current?.getContext("2d");

        if (ctx) {
          // Создаем новый график
          new Chart(ctx, {
            type: "bar",
            data: chartData,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndDrawChart();
  }, [status]);

  return <canvas ref={chartRef} width="400" height="400" />;
};

export default ChartComponent;
