import { useGetSettings } from "@/features/settings/api/use-get-settings";

export type CurrencySymbol = {
  [key: string]: { symbol: string; position: "prefix" | "suffix" };
};

const currencySymbols: CurrencySymbol = {
  USD: { symbol: "$", position: "prefix" },
  EUR: { symbol: "€", position: "prefix" },
  GBP: { symbol: "£", position: "prefix" },
  JPY: { symbol: "¥", position: "prefix" },
  INR: { symbol: "₹", position: "prefix" }
};

export const useCurrency = () => {
  const { data: settings } = useGetSettings();
  const currency = settings?.currency || "USD";

  const format = (amount: number) => {
    const formatter = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency
    });
    return formatter.format(amount);
  };

  return {
    currency,
    symbol: currencySymbols[currency]?.symbol || "$",
    position: currencySymbols[currency]?.position || "prefix",
    format
  };
};
