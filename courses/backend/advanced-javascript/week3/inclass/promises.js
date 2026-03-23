import fs from "fs/promises";

let teas, orders;

fs.readFile("./data/teas.json", "utf-8")
  .then((teasRaw) => {
    teas = JSON.parse(teasRaw);
    return fs.readFile("./data/orders.json", "utf-8");
  })
  .then((ordersRaw) => {
    orders = JSON.parse(ordersRaw);
    return fs.readFile("./data/customers.json", "utf-8");
  })
  .then((customersRaw) => {
    const customers = JSON.parse(customersRaw);
    const summaries = orders.map((order) => {
      const tea = teas.find((t) => t.id === order.teaId);
      const customer = customers.find((c) => c.id === order.customerId);
      const total = (order.grams * tea.pricePerGram).toFixed(2);

      return `${customer.name} (${customer.tier}) ordered ${order.grams}g of ${tea.name} for $${total}`;
    });

    console.log("=== Order Summaries ===");
    summaries.forEach((s) => console.log(s));
  })
  .catch((err) => {
    console.error("Something went wrong:", err);
  });
