export const isCellEmpty = (value: any) => {
  return (
    value === undefined || value === null || value.toString().trim() === ""
  );
};

export const commaSplit = (value: string) => {
  return (value && value.length > 0) ? value.split(",") : [];
};
