interface Sale {
  year: string;
  month: string;
  day: string;
  branch: string;
  invoice: string;
  customerName: string;
  amount: string;
}

export function parseSalesFile(content: string): Sale[] {
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  return lines.map((line) => ({
    year: line.substring(0, 4).trim(),
    month: line.substring(4, 6).trim(),
    day: line.substring(6, 8).trim(),
    branch: line.substring(11, 16).trim(),
    invoice: line.substring(28, 36).trim(),
    customerName: line.substring(78, 108).trim(),
    amount: line.substring(108, 123).trim(),
  }));
}

export function convertSalesToCSV(sales: Sale[]): string {
  const headers = ["Fecha", "Sucursal", "Factura", "Nombre", "Importe"];

  const rows = sales.map((sale) => [
    `${sale.year}-${sale.month}-${sale.day}`,
    sale.branch,
    sale.invoice,
    sale.customerName,
    sale.amount,
  ]);

  return [headers, ...rows]
    .map((row) => row.map((value) => `"${value}"`).join(","))
    .join("\n");
}
