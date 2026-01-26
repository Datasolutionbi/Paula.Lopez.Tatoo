import { describe, it, expect } from 'vitest';
import { getReadingTime } from './readingTime';

describe('getReadingTime', () => {
  it('should calculate reading time for short content (1 min)', () => {
    const shortContent = 'word '.repeat(150); // 150 words
    const result = getReadingTime(shortContent);
    expect(result).toBe('1 min de lectura');
  });

  it('should calculate reading time for medium content (2 min)', () => {
    const mediumContent = 'word '.repeat(300); // 300 words
    const result = getReadingTime(mediumContent);
    expect(result).toBe('2 min de lectura');
  });

  it('should calculate reading time for long content (5 min)', () => {
    const longContent = 'word '.repeat(900); // 900 words
    const result = getReadingTime(longContent);
    expect(result).toBe('5 min de lectura');
  });

  it('should round up partial minutes', () => {
    // 201 words = 1.005 minutes, should round up to 2
    const content = 'word '.repeat(201);
    const result = getReadingTime(content);
    expect(result).toBe('2 min de lectura');
  });

  it('should handle empty content as 1 minute', () => {
    const result = getReadingTime('');
    expect(result).toBe('1 min de lectura');
  });

  it('should handle whitespace-only content as 1 minute', () => {
    const result = getReadingTime('   \n  \t  ');
    expect(result).toBe('1 min de lectura');
  });

  it('should handle single word as 1 minute', () => {
    const result = getReadingTime('Hello');
    expect(result).toBe('1 min de lectura');
  });

  it('should handle content with multiple spaces between words', () => {
    const content = 'word    word    word'; // Extra spaces
    const result = getReadingTime(content);
    expect(result).toBe('1 min de lectura');
  });

  it('should handle content with newlines and tabs', () => {
    const content = 'word\nword\tword\n\nword\t\tword';
    const result = getReadingTime(content);
    expect(result).toBe('1 min de lectura');
  });

  it('should use 200 words per minute rate', () => {
    // Exactly 200 words should be 1 minute
    const content = 'word '.repeat(200);
    const result = getReadingTime(content);
    expect(result).toBe('1 min de lectura');

    // 400 words should be 2 minutes
    const longerContent = 'word '.repeat(400);
    const longerResult = getReadingTime(longerContent);
    expect(longerResult).toBe('2 min de lectura');
  });

  it('should handle very long content (10+ min)', () => {
    const veryLongContent = 'word '.repeat(2500); // 2500 words = 13 min
    const result = getReadingTime(veryLongContent);
    expect(result).toBe('13 min de lectura');
  });

  it('should handle content with punctuation', () => {
    const content = 'Hello, world! How are you today? I hope everything is going well.';
    const result = getReadingTime(content);
    expect(result).toBe('1 min de lectura');
  });

  it('should handle markdown-style content', () => {
    const markdownContent = `
      # Heading
      
      This is a **bold** paragraph with some *italic* text.
      
      - List item 1
      - List item 2
      
      [Link](https://example.com)
    `;
    const result = getReadingTime(markdownContent);
    expect(result).toBe('1 min de lectura');
  });

  it('should handle Spanish content', () => {
    const spanishContent = 'La visualización de datos es importante para el análisis de negocios.';
    const result = getReadingTime(spanishContent);
    expect(result).toBe('1 min de lectura');
  });

  it('should return consistent results for same input', () => {
    const content = 'word '.repeat(500);
    const result1 = getReadingTime(content);
    const result2 = getReadingTime(content);
    expect(result1).toBe(result2);
  });

  it('should always return a positive number', () => {
    const testCases = ['', 'word', 'word '.repeat(1000)];
    testCases.forEach((content) => {
      const result = getReadingTime(content);
      const minutes = parseInt(result.split(' ')[0]);
      expect(minutes).toBeGreaterThan(0);
    });
  });

  it('should format output correctly in Spanish', () => {
    const content = 'word '.repeat(300);
    const result = getReadingTime(content);
    expect(result).toMatch(/^\d+ min de lectura$/);
  });
});

describe('getReadingTime boundary cases', () => {
  it('should handle exactly 200 words (1 minute)', () => {
    const content = 'word '.repeat(200);
    expect(getReadingTime(content)).toBe('1 min de lectura');
  });

  it('should handle 199 words (round up to 1 minute)', () => {
    const content = 'word '.repeat(199);
    expect(getReadingTime(content)).toBe('1 min de lectura');
  });

  it('should handle 201 words (round up to 2 minutes)', () => {
    const content = 'word '.repeat(201);
    expect(getReadingTime(content)).toBe('2 min de lectura');
  });

  it('should handle 400 words (exactly 2 minutes)', () => {
    const content = 'word '.repeat(400);
    expect(getReadingTime(content)).toBe('2 min de lectura');
  });
});
