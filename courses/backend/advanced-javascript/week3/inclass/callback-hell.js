import fs from "fs";

fs.readFile("./data/teas.json", "utf-8", (err, teasRaw) => {
  if (err) {
    console.error("Failed to read teas:", err.message);
    return;
  }
  const teas = JSON.parse(teasRaw);

  fs.readFile("./data/orders.json", "utf-8", (err, ordersRaw) => {
    if (err) {
      console.error("Failed to read orders:", err.message);
      return;
    }
    const orders = JSON.parse(ordersRaw);

    fs.readFile("./data/customers.json", "utf-8", (err, customersRaw) => {
      if (err) {
        console.error("Failed to read customers:", err.message);
        return;
      }
      const customers = JSON.parse(customersRaw);

      const summaries = orders.map((order) => {
        const tea = teas.find((t) => t.id === order.teaId);
        const customer = customers.find((c) => c.id === order.customerId);
        const total = (order.grams * tea.pricePerGram).toFixed(2);

        return `${customer.name} (${customer.tier}) ordered ${order.grams}g of ${tea.name} for $${total}`;
      });

      console.log("=== Order Summaries ===");
      summaries.forEach((s) => console.log(s));
    });
  });
});
