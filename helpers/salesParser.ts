interface Sale {
  year: number;
  month: number;
  day: number;
  branch: number;
  invoice: number;
  customerName: string;
  amount: number;
}

export function parseSalesFile(content: string): Sale[] {
  const lines = content.split("\n").filter((line) => line.trim() !== "");

  return lines.map((line) => ({
    year: parseInt(line.substring(0, 4).trim()),
    month: parseInt(line.substring(4, 6).trim()),
    day: parseInt(line.substring(6, 8).trim()),
    branch: parseInt(line.substring(11, 16).trim()),
    invoice: parseInt(line.substring(28, 36).trim()),
    customerName: fixEncoding(line.substring(78, 108).trim()),
    amount: formatAmount(line.substring(108, 123).trim()),
  }));
}

function fixEncoding(text: string): string {
  return text.replace(/\uFFFD/g, "Ñ").normalize("NFKD");
}

function formatAmount(amount: string): number {
  return parseFloat(amount.replace(/^0+/, "")) / 100;
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
    .map((row) => row.map((value) => `${value}`).join(","))
    .join("\n");
}
