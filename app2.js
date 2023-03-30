async function buscar(symbol) {
  const url = `https://api.binance.com/api/v3/depth?limit=500&symbol=${symbol}USDT`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Encontrar la cantidad de venta más alta y su precio
    let maxSellAmount = 0;
    let maxSellAmountPrice = 0;

    for (const order of data.asks) {
      const price = parseFloat(order[0]);
      const amount = parseFloat(order[1]);

      if (amount > maxSellAmount) {
        maxSellAmount = amount;
        maxSellAmountPrice = price;
      }
    }

    // Encontrar la cantidad de compra más alta y su precio
    let maxBuyAmount = 0;
    let maxBuyAmountPrice = 0;

    for (const order of data.bids) {
      const price = parseFloat(order[0]);
      const amount = parseFloat(order[1]);

      if (amount > maxBuyAmount) {
        maxBuyAmount = amount;
        maxBuyAmountPrice = price;
      }
    }

    // Agregar los datos a una tabla HTML
    const table = document.getElementById('tabla');
    const row = table.insertRow(-1);
    const symbolCell = row.insertCell(0);
    const buyPriceCell = row.insertCell(1);
    const buyAmountCell = row.insertCell(2);
    const sellPriceCell = row.insertCell(3);
    const sellAmountCell = row.insertCell(4);

    symbolCell.innerHTML = symbol;
    buyAmountCell.innerHTML = maxBuyAmount.toFixed(2);
    buyPriceCell.innerHTML = maxBuyAmountPrice.toFixed(2);
    sellAmountCell.innerHTML = maxSellAmount.toFixed(2);
    sellPriceCell.innerHTML = maxSellAmountPrice.toFixed(2);


  } catch (error) {
    console.log('Error:', error);
  }
}

// Llamar a la función para varias criptomonedas
buscar('APE');
buscar('ETH');
buscar('ADA');
buscar('ALGO');
