export const getFormattedPhone = (phoneNumber: string): string => {
    const cleaned = phoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phoneNumber; // Return original if it's not in a valid format
};
