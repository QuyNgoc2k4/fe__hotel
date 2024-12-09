export const barData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
      {
        label: "Doanh thu (triệu VND)",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };
  
  export const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Doanh thu khách sạn theo tháng",
      },
    },
  };
  
  export const lineData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
      {
        label: "Lượt đặt phòng",
        data: [0, 0, 0,0, 0,0],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };
  
  export const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Số lượt đặt phòng theo tháng",
      },
    },
  };
  
  export const pieData = {
    labels: ["Phòng trống", "Phòng đã đặt", "Phòng bảo trì"],
    datasets: [
      {
        label: "Tình trạng phòng",
        data: [4, 4, 0],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      },
    ],
  };
  
  export const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tình trạng phòng hiện tại",
      },
    },
  };
  