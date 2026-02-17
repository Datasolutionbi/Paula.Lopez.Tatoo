import { describe, it, expect } from 'vitest';
import { calculateSliderPercentage, calculateKeyboardPosition } from './sliderLogic';;

describe('InkStories Slider Logic', () => {
    describe('calculateSliderPercentage', () => {
        const rectLeft = 100;
        const rectWidth = 500;

        it('should return 0 when click is at rectLeft', () => {
            expect(calculateSliderPercentage(100, rectLeft, rectWidth)).toBe(0);
        });

        it('should return 100 when click is at rectLeft + rectWidth', () => {
            expect(calculateSliderPercentage(600, rectLeft, rectWidth)).toBe(100);
        });

        it('should return 50 when click is exactly in the middle', () => {
            expect(calculateSliderPercentage(350, rectLeft, rectWidth)).toBe(50);
        });

        it('should clamp to 0 when click is before rectLeft', () => {
            expect(calculateSliderPercentage(50, rectLeft, rectWidth)).toBe(0);
        });

        it('should clamp to 100 when click is after rectLeft + rectWidth', () => {
            expect(calculateSliderPercentage(700, rectLeft, rectWidth)).toBe(100);
        });
    });

    describe('calculateKeyboardPosition', () => {

        it('should decrease percentage by 5 on ArrowLeft', () => {
            expect(calculateKeyboardPosition('ArrowLeft', 50)).toBe(45);
        });

        it('should increase percentage by 5 on ArrowRight', () => {
            expect(calculateKeyboardPosition('ArrowRight', 50)).toBe(55);
        });

        it('should clamp to 0 on ArrowLeft when percentage is near 0', () => {
            expect(calculateKeyboardPosition('ArrowLeft', 2)).toBe(0);
        });

        it('should clamp to 100 on ArrowRight when percentage is near 100', () => {
            expect(calculateKeyboardPosition('ArrowRight', 98)).toBe(100);
        });

        it('should not change percentage for other keys', () => {
            expect(calculateKeyboardPosition('Enter', 50)).toBe(50);
        });
    });
});
