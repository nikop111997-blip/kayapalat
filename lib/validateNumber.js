export function validateNumber(value, rule) {
  if (value === "") {
    return {
      status: "idle",
      message: ""
    };
  }

  const num = Number(value);

  if (Number.isNaN(num)) {
    return {
      status: "error",
      message: "Please enter a valid number."
    };
  }

  if (num < rule.warning.min || num > rule.warning.max) {
    return {
      status: "error",
      message: rule.errorMessage
    };
  }

  if (num < rule.valid.min || num > rule.valid.max) {
    return {
      status: "warning",
      message: rule.warningMessage
    };
  }

  return {
    status: "valid",
    message: ""
  };
}