"use client";

import { useCurrency } from "@/hooks/use-currency";
import CountUp from "@/components/count-up";

interface FormattedCountUpProps {
  value: number;
  decimals?: number;
  decimalPlaces?: number;
  start?: number;
  preserveValue?: boolean;
}

export const FormattedCountUp = ({
  value,
  decimals = 2,
  decimalPlaces = 2,
  start = 0,
  preserveValue = true,
}: FormattedCountUpProps) => {
  const { format } = useCurrency();

  return (
    <CountUp
      start={start}
      end={value}
      decimals={decimals}
      decimalPlaces={decimalPlaces}
      preserveValue={preserveValue}
      formattingFn={format}
    />
  );
};
