class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	search() {
		const keyword = this.queryString.keyword
			? {
					name: {
						$regex: this.queryString.keyword,
						$options: 'i', // case insesitive
					},
			  }
			: {};

		console.log(keyword);
		this.query = this.query.find({ ...keyword });
		return this;
	}

	filter() {
		const queryCopy = { ...this.queryString };

		// Removing fields from the query
		const removeFields = ['keyword', 'limit', 'page'];
		removeFields.forEach((el) => delete queryCopy[el]);

		// Filter for price, ratings etc
		let queryStr = JSON.stringify(queryCopy);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}
}

module.exports = APIFeatures;
