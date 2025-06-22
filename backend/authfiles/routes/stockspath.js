const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/stocks', async (req, res) => {
  const mockStocks = [
    // 'RELIANCE.BSE', 'TCS.BSE', 'INFY.BSE', 'HDFCBANK.BSE', 'WIPRO.BSE'
    {
      name: "RELIANCE.BSE",
      price: "2740.35",
      change: "+0.85%",
      img: "/images_req/RELIANCE.png"
    },
    {
      name: "TCS.BSE",
      price: "3610.25",
      change: "-1.12%",
      img: "/images_req/TCS.png"
    },
    {
      name: "INFY.BSE",
      price: "1515.10",
      change: "+0.45%",
      img: "/images_req/INFY.png"
    },
    {
      name: "HDFCBANK.BSE",
      price: "1682.75",
      change: "+0.33%",
      img: "/images_req/HDFCBANK.png"
    },
    {
      name: "WIPRO.BSE",
      price: "452.20",
      change: "-0.75%",
      img: "/images_req/WIPRO.png"
    }
  ];

  res.json(mockStocks);
});

module.exports = router;