export const equalObjs = (value, new_value) => {
	let new_value_str = typeof new_value == 'object' ? JSON.stringify(new_value) : new_value;
	let currect_value_str = typeof value == 'object' ? JSON.stringify(value) : value;
	return new_value_str == currect_value_str;
};
