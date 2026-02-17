export interface ValidationError {
    field: string;
    message: string;
}

export const validateContactForm = (data: {
    name: string;
    phone: string;
    placement: string;
    size: string;
    description: string;
}): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!data.name || data.name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Name must be at least 2 characters long.' });
    }

    // Simple phone validation: allow +, spaces, digits, dashes, parens
    const phoneRegex = /^[\d\+\-\s\(\)]{7,}$/;
    if (!data.phone || !phoneRegex.test(data.phone.trim())) {
        errors.push({ field: 'phone', message: 'Please enter a valid phone number.' });
    }

    if (!data.placement) {
        errors.push({ field: 'placement', message: 'Please select a placement.' });
    }

    if (!data.size) {
        errors.push({ field: 'size', message: 'Please select a size.' });
    }

    if (!data.description || data.description.trim().length < 10) {
        errors.push({
            field: 'description',
            message: 'Description must be at least 10 characters long to help us understand your idea.',
        });
    }

    return errors;
};
