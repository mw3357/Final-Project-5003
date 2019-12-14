const hash62 = function(n) {
	const map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let re = "";
	n = Math.ceil(n); // limit the size.
	while (n > 1) {
    	re += map[n % 62];
        n = Math.floor(n / 62);
	}
	return re;
}

module.exports = {
    hash62: hash62
};