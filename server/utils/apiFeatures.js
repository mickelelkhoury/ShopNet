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

		this.query = this.query.find({ ...keyword });
		return this;
	}

	filter() {
		const queryCopy = { ...this.queryString };

		console.log(queryCopy);

		// Removing fields from the query
		const removeFields = ['keyword', 'limit', 'page'];
		removeFields.forEach((el) => delete queryCopy[el]);

		// Filter for price, ratings etc
		let queryStr = JSON.stringify(queryCopy);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
		console.log(queryStr);

		this.query = this.query.find(JSON.parse(queryStr));
		console.log(this);
		return this;
	}

	pagination(resPerPage) {
		const currentPage = Number(this.queryString.page) || 1;
		const skip = resPerPage * (currentPage - 1);

		this.query = this.query.limit(resPerPage).skip(skip);
		return this;
	}
}

module.exports = APIFeatures;
