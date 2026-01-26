import { describe, it, expect } from 'vitest';
import { formatDate, formatDateShort } from './formatDate';

describe('formatDate', () => {
  it('should format date in Spanish locale with full month name', () => {
    const date = new Date(2026, 0, 25); // Month is 0-indexed
    const result = formatDate(date);
    expect(result).toBe('25 de enero de 2026');
  });

  it('should format date correctly for different months', () => {
    const testCases = [
      { date: new Date(2026, 2, 15), expected: '15 de marzo de 2026' },
      { date: new Date(2026, 5, 30), expected: '30 de junio de 2026' },
      { date: new Date(2026, 11, 1), expected: '1 de diciembre de 2026' },
    ];

    testCases.forEach(({ date, expected }) => {
      expect(formatDate(date)).toBe(expected);
    });
  });

  it('should handle year boundaries correctly', () => {
    const newYear = new Date(2027, 0, 1);
    expect(formatDate(newYear)).toBe('1 de enero de 2027');
    
    const newYearsEve = new Date(2026, 11, 31);
    expect(formatDate(newYearsEve)).toBe('31 de diciembre de 2026');
  });

  it('should format dates with single digit days', () => {
    const date = new Date(2026, 4, 5);
    expect(formatDate(date)).toBe('5 de mayo de 2026');
  });

  it('should handle leap year dates', () => {
    const leapDay = new Date(2024, 1, 29);
    expect(formatDate(leapDay)).toBe('29 de febrero de 2024');
  });
});

describe('formatDateShort', () => {
  it('should format date with abbreviated month name', () => {
    const date = new Date(2026, 0, 25);
    const result = formatDateShort(date);
    expect(result).toBe('25 ene 2026');
  });

  it('should format short dates correctly for different months', () => {
    const testCases = [
      { date: new Date(2026, 2, 15), expected: '15 mar 2026' },
      { date: new Date(2026, 5, 30), expected: '30 jun 2026' },
      { date: new Date(2026, 11, 1), expected: '1 dic 2026' },
    ];

    testCases.forEach(({ date, expected }) => {
      expect(formatDateShort(date)).toBe(expected);
    });
  });

  it('should use consistent abbreviation format', () => {
    const date = new Date(2026, 8, 15);
    const result = formatDateShort(date);
    // Should be abbreviated and in Spanish
    expect(result).toContain('sept');
    expect(result).toBe('15 sept 2026');
  });

  it('should handle all months with short format', () => {
    const months = [
      { month: 0, abbr: 'ene' },
      { month: 1, abbr: 'feb' },
      { month: 2, abbr: 'mar' },
      { month: 3, abbr: 'abr' },
      { month: 4, abbr: 'may' },
      { month: 5, abbr: 'jun' },
      { month: 6, abbr: 'jul' },
      { month: 7, abbr: 'ago' },
      { month: 8, abbr: 'sept' },
      { month: 9, abbr: 'oct' },
      { month: 10, abbr: 'nov' },
      { month: 11, abbr: 'dic' },
    ];

    months.forEach(({ month, abbr }) => {
      const date = new Date(2026, month, 15);
      const result = formatDateShort(date);
      expect(result).toContain(abbr);
    });
  });
});

describe('formatDate edge cases', () => {
  it('should handle very old dates', () => {
    const oldDate = new Date(1900, 0, 1);
    expect(formatDate(oldDate)).toBe('1 de enero de 1900');
  });

  it('should handle future dates', () => {
    const futureDate = new Date(2099, 11, 31);
    expect(formatDate(futureDate)).toBe('31 de diciembre de 2099');
  });

  it('should be consistent between calls with same date', () => {
    const date = new Date(2026, 6, 15);
    const result1 = formatDate(date);
    const result2 = formatDate(date);
    expect(result1).toBe(result2);
  });
});
