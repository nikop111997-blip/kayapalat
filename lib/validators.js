export const validators = {
  age: {
    valid: { min: 12, max: 80 },
    warning: { min: 8, max: 100 },
    warningMessage: "This age is unusual. Please verify.",
    errorMessage: "Age must be between 10 and 100 years."
  },

  height: {
  // Normal range
  valid: {
    min: 140,
    max: 205,
  },

  // Possible but uncommon
  warning: {
    min: 90,
    max: 250,
  },

  warningMessage:
    "This height is uncommon. Please verify.",

  errorMessage:
    "Height must be between 90 cm and 250 cm."
},

  weight: {
    valid: { min: 40, max: 180 },
    warning: { min: 20, max: 300 },
    warningMessage: "This weight is unusual. Please verify.",
    errorMessage: "Weight must be between 20 and 300 kg."
  },
waist: {
  // Normal range
  valid: {
    min: 60,
    max: 110,
  },

  // Possible but uncommon
  warning: {
    min: 40,
    max: 180,
  },

  warningMessage:
    "This waist measurement is unusual. Please verify.",

  errorMessage:
    "Waist must be between 40 cm and 180 cm."
},
};