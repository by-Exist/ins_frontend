export function parseErrorMessages(fieldsErrorMessages) {
  return Object.entries(fieldsErrorMessages).reduce((acc, [fieldName, errorList]) => {
    acc[fieldName] = {
      validateStatus: 'error',
      help: errorList.join(" "),
    };
    return acc;
  }, {})
}