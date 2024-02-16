/**
 * Check the type of a variable and return a corresponding string.
 * @param {*} variable - The variable to check.
 * @returns {string} A string indicating the type of the variable.
 */
export const  checkType = (variable) => {
    if (Array.isArray(variable)) {
      return 'array';
    } else if (typeof variable === 'object' && variable !== null) {
      return 'object';
    } else {
      return 'string';
    }
  }

/**
 * Check if an array is empty or undefined.
 * @param {Array} arr - The array to check.
 * @returns {boolean} True if the array is empty or undefined, false otherwise.
 */
export const isEmptyOrUndefined = (value) => {
    const type = checkType(value);
    if(type === 'array')
    {
        return value === undefined || value.length === 0;
    }
    else if(type === "object")
    {
        return value === undefined || Object.keys(value).length === 0;
    }
    else 
    {
        return value === undefined || value === "" || value === null
    }
}