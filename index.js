const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3010;
app.use(cors());

app.use(express.static('static'));

function returnsOfStock(boughtAt, marketPrice, quantity) {
  let result = (marketPrice - boughtAt) * quantity;
  return result;
}
app.get('/calculate-returns', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let marketPrice = parseFloat(req.query.marketPrice);
  let quantity = parseFloat(req.query.quantity);
  res.send(returnsOfStock(boughtAt, marketPrice, quantity).toString());
});


app.get('/total-returns', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  res.send((stock1 + stock2 + stock3 + stock4).toString());
});

//Endpoint 3: Calculate the Return Percentage
function getReturnPercentage(boughtAt, returns) {
  let returnPercentage = (returns / boughtAt) * 100;
  return returnPercentage;
}
app.get('/calculate-return-percentage', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);
  res.send(getReturnPercentage(boughtAt, returns).toString());
});

//Endpoint 4: Calculate the Total Return Percentage
app.get('/total-return-percentage', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);
  res.send((stock1 + stock2 + stock3 + stock4).toString());
});

//Endpoint 5: Identify the Status of Stocks based on their Return Value
function getProfitLoss(returnPercentage) {
  if (returnPercentage > 0) {
    return 'profit';
  } else {
    return 'loss';
  }
}
app.get('/status', (req, res) => {
  let returnPercentage = parseFloat(req.query.returnPercentage);
  res.send(getProfitLoss(returnPercentage).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
