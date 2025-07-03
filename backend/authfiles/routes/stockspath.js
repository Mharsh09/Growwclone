const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/stocks', async (req, res) => {
  const stockSymbols = ['RELIANCE.BSE', 'TCS.BSE', 'INFY.BSE', 'HDFCBANK.BSE', 'WIPRO.BSE'];
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  const results = [];
  try {
    const fetchData = stockSymbols.map(async (symbol) => {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
      );

      const data = response.data['Global Quote'];
      if (data && data['01. symbol']) {
        results.push({
          name: data['01. symbol'],
          price: data['05. price'],
          change: data['10. change percent'],
          img: `/images_req/icons/${symbol.split('.')[0]}.png`,
        });
      }
    });

    await Promise.all(fetchData);
    res.json(results);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ message: "Failed to fetch stock data" });
  }
  //   const mockStocks = [
  //   {
  //     name:"RELIANCE.BSE",
  //     price: "2740.35",
  //     change: "+0.85%",
  //     img: "/images_req/icons/RELIANCE.png"
  //   },
  //   {
  //     name: "TCS.BSE",
  //     price: "3610.25",
  //     change: "-1.12%",
  //     img: "/images_req/icons/TCS.png"
  //   },
  //   {
  //     name: "INFY.BSE",
  //     price: "1515.10",
  //     change: "+0.45%",
  //     img: "/images_req/icons/INFY.png"
  //   },
  //   {
  //     name: "HDFCBANK.BSE",
  //     price: "1682.75",
  //     change: "+0.33%",
  //     img: "/images_req/icons/HDFCBANK.png"
  //   },
  // ];
  // res.json(mockStocks);
});

router.get('/top-gainers', async (req, res) => {
  const mockStocks = [
    {
      name: "TATAMOTORS.BSE",
      price: "987.65",
      change: "+5.23%",
      img: "/images_req/icons/TATAMOTORS.png"
    },
    {
      name: "ADANIENT.BSE",
      price: "2421.10",
      change: "+4.18%",
      img: "/images_req/icons/ADANIENT.png"
    },
    {
      name: "TECHM.BSE",
      price: "1324.55",
      change: "+3.91%",
      img: "/images_req/icons/TECHM.png"
    },
    {
      name: "POWERGRID.BSE",
      price: "255.30",
      change: "+3.25%",
      img: "/images_req/icons/POWERGRID.png"
    },
  ];

  res.json(mockStocks);
});

router.get('/top-losers', async (req, res) => {
  const mockStocks = [
    {
      name: "WIPRO.BSE",
      price: "445.80",
      change: "-2.45%",
      img: "/images_req/icons/WIPRO.png"
    },
    {
      name: "SBILIFE.BSE",
      price: "1273.15",
      change: "-1.92%",
      img: "/images_req/icons/SBILIFE.png"
    },
    {
      name: "NESTLEIND.BSE",
      price: "23501.00",
      change: "-1.58%",
      img: "/images_req/icons/NESTLEIND.png"
    },
    {
      name: "BAJAJFINSV.BSE",
      price: "1598.45",
      change: "-1.23%",
      img: "/images_req/icons/BAJAJFINSV.png"
    },
  ];

  res.json(mockStocks);
});

module.exports = router;