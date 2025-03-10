"use client";

import { useCurrency } from "@/hooks/use-currency";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface CurrencyDisplayProps {
  value: number;
  className?: string;
  showSign?: boolean;
  asBadge?: boolean;
}

export const CurrencyDisplay = ({
  value,
  className,
  showSign = true,
  asBadge = false,
}: CurrencyDisplayProps) => {
  const { format } = useCurrency();
  const formattedValue = format(value);

  if (asBadge) {
    return (
      <Badge
        variant={value > 0 ? "primary" : "destructive"}
        className={cn("text-sm font-medium px-3.5 py-1.5", className)}
      >
        {showSign && value > 0 ? "+" : ""}
        {formattedValue}
      </Badge>
    );
  }

  return (
    <span className={className}>
      {showSign && value > 0 ? "+" : ""}
      {formattedValue}
    </span>
  );
};
