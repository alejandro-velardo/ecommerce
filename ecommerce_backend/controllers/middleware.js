const jsonwebtoken = require("jsonwebtoken")


const authenticate = (req, res, next) => {
	let token = req.headers.authorization || '';
	if (!token) {
		next({ error: 'no token' });
	} 

	jsonwebtoken.verify(token, process.env.SECRET_KEY, (error, decoded) => {
		if (error) {
			next({ error: 'invalid token' });
		} else {
            console.log(decoded)
			let { expiredAt } = decoded;
        
			if (Number(expiredAt) > new Date().getTime()) {
				next();
			} else {
				next({ error: 'Session expired'});
			}
		}
	});

};

const authError = (err, req, res, next) => {
	console.log(err)
	res.status(400).json(err);
};

export default [authenticate, authError]
