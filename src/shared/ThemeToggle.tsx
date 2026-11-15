'use client';
import {Moon, Sun} from 'lucide-react';
import {useTheme} from '@/context/ThemeContext';
import Button from './Button';
export default function ThemeToggle({label}: {label: string}) {
  const {mode, toggleTheme} = useTheme();
  return <Button type="button" variant="secondary" onClick={toggleTheme} aria-label={label} aria-pressed={mode === 'dark'}>{mode === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}</Button>;
}
