/**
 * @returns {number} 6 digit random number
 */
export const generateOtp = () => Math.floor(100000 + Math.random() * 900000);
