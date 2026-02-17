export const calculateSliderPercentage = (
    clientX: number,
    rectLeft: number,
    rectWidth: number
): number => {
    let x = clientX - rectLeft;

    // Clamp
    if (x < 0) x = 0;
    if (x > rectWidth) x = rectWidth;

    const percentage = (x / rectWidth) * 100;
    return percentage;
};

export const calculateKeyboardPosition = (
    key: string,
    currentPercentage: number
): number => {
    let newPercentage = currentPercentage;

    if (key === 'ArrowLeft') {
        newPercentage = Math.max(0, currentPercentage - 5);
    } else if (key === 'ArrowRight') {
        newPercentage = Math.min(100, currentPercentage + 5);
    }

    return newPercentage;
};
