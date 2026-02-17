import { describe, it, expect } from 'vitest';
import { validateContactForm } from './formValidation';

describe('Contact Form Validation', () => {
    const validData = {
        name: 'Test User',
        phone: '+1 234 567 8900',
        placement: 'Arm',
        size: 'Medium',
        description: 'A traditional rose tattoo design.',
    };

    it('should return empty errors for valid data', () => {
        const errors = validateContactForm(validData);
        expect(errors).toHaveLength(0);
    });

    it('should validate name length', () => {
        const data = { ...validData, name: 'A' };
        const errors = validateContactForm(data);
        expect(errors).toContainEqual(expect.objectContaining({ field: 'name' }));
    });

    it('should validate phone format', () => {
        const data = { ...validData, phone: 'abc' };
        const errors = validateContactForm(data);
        expect(errors).toContainEqual(expect.objectContaining({ field: 'phone' }));
    });

    it('should validate description length', () => {
        const data = { ...validData, description: 'Short' };
        const errors = validateContactForm(data);
        expect(errors).toContainEqual(expect.objectContaining({ field: 'description' }));
    });

    it('should validate required placement', () => {
        const data = { ...validData, placement: '' };
        const errors = validateContactForm(data);
        expect(errors).toContainEqual(expect.objectContaining({ field: 'placement' }));
    });
});
