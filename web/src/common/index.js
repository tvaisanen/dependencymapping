export const filterItems = ({items, filterValue}) => {
    return items.filter(item => item.toLowerCase().includes(filterValue.toLowerCase()));
};