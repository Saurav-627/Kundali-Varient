export const isObjectEmpty = (obj: any): boolean => {
    return (
        obj &&
        Object.keys(obj).length === 0 &&
        obj.constructor === Object
    );
};