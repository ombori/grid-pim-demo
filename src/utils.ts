export const isCellEmpty = (value: any) => {
    return value === undefined || value === null || value.toString().trim() !== '';
}