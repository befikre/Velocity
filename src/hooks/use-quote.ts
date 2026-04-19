"use client";

import { useState, useEffect } from "react";

export interface Quote {
  sourceAmount: number;
  sourceCurrency: string;
  targetAmount: number;
  targetCurrency: string;
  exchangeRate: number;
  networkFeeUsd: number;
  serviceFeeUsd: number;
  totalUsd: number;
}

export function useQuote(amountStr: string, isFromUsd: boolean = true) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      const amount = parseFloat(amountStr);
      if (isNaN(amount) || amount <= 0) {
        setQuote(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch quote from API API Route
        const res = await fetch(`/api/quote?amount=${amount}&fromUsd=${isFromUsd}`);
        if (!res.ok) {
          throw new Error("Failed to fetch quote");
        }
        
        const data = await res.json();
        setQuote(data as Quote);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    // Debounce the call
    const timer = setTimeout(() => {
      fetchQuote();
    }, 500);

    return () => clearTimeout(timer);
  }, [amountStr, isFromUsd]);

  return { quote, loading, error };
}
