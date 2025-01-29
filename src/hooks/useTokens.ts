"use client";

import type { Token } from "@/token";
import * as OTPAuth from "otpauth";
import { useEffect, useState } from "react";

const SECRETS_NAME = "kod-generator-secrets";
const EXPORTED_NAME = "kod-generator-exported";

const loadFromStorage = (key: string) => {
  const raw = localStorage.getItem(key);
  if (!raw) return [];
  return JSON.parse(raw);
};

const saveInStorage = (key: string, tokens: Token[]) => {
  localStorage.setItem(key, JSON.stringify(tokens));
};

export function useTokens() {
  const [tokens, setTokens] = useState<Token[]>(loadFromStorage(SECRETS_NAME));
  const [codes, setCodes] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    saveInStorage(SECRETS_NAME, tokens);
    const exportedTokens: Token[] = loadFromStorage(EXPORTED_NAME);
    if (
      tokens.some(
        (token) =>
          !exportedTokens.find(
            (other) =>
              token.name === other.name && token.secret === other.secret
          )
      )
    ) {
      setShowWarning(true);
    }
  }, [tokens]);

  useEffect(() => {
    const updateCodes = () => {
      const newCodes: Record<string, string> = {};
      tokens.forEach((token) => {
        const totp = new OTPAuth.TOTP({
          secret: OTPAuth.Secret.fromBase32(token.secret),
          digits: 6,
          period: 30,
        });
        newCodes[token.id] = totp.generate();
      });
      setCodes(newCodes);
    };

    const updateTimeRemaining = () => {
      const now = Math.floor(Date.now() / 1000);
      setTimeRemaining(30 - (now % 30));
    };
    updateCodes();
    updateTimeRemaining();

    const interval = setInterval(() => {
      updateTimeRemaining();
      if (timeRemaining <= 1) {
        updateCodes();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tokens, timeRemaining]);

  const setExportedTokens = () => {
    saveInStorage(EXPORTED_NAME, tokens);
    setShowWarning(false);
  };

  return {
    tokens,
    setTokens,
    codes,
    timeRemaining,
    showWarning,
    setExportedTokens,
  };
}
