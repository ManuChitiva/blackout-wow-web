"use client";
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { interfaceText } from './interface-copy';

export function useInterfaceCopy() {
  const { i18n } = useTranslation();
  return useCallback((text: string) => interfaceText(text, i18n.language), [i18n.language]);
}
