const capitalize = (str: string): string => {
  if (!str) return str; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export { capitalize };
