export const updateObject = (oldObject, newObject) => {
	return {
		...oldObject,
		...newObject
	};
}