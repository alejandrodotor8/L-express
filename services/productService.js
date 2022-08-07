const faker = require('faker');
const boom = require('@hapi/boom');

class ProductService {
	constructor() {
		this.products = [];
		this.size = 100;
		this.generate();
	}
	generate() {
		for (let i = 0; i < this.size; i++) {
			this.products.push({
				id: faker.datatype.number(this.size),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price()),
				image: faker.image.cats(),
				isBlock: faker.datatype.boolean(),
			});
		}
	}
	async create(data) {
		const newProduct = {
			id: faker.datatype.number({ min: 100, max: 200 }),
			...data,
		};
		this.products.push(newProduct);
		return newProduct;
	}
	async find(size) {
		if (size == this.size) return this.products;
		else return this.products.slice(0, size);
	}
	async findOne(id) {
		const product = this.products.find((item) => item.id == id);
		if (!product) throw boom.notFound('Product not found');
		else if (product.isBlock) throw boom.conflict('Product is blocked');
		else return product;
	}
	async update(id, changes) {
		const index = this.products.findIndex((item) => item.id == id);
		if (index == -1) {
			throw boom.notFound('Product not found');
		} else {
			return (this.products[index] = {
				...this.products[index],
				...changes,
			});
		}
	}
	async delete(id) {
		const index = this.products.findIndex((item) => item.id == id);
		if (index == -1) {
			throw boom.notFound('Product not found');
		} else {
			this.products.splice(index, 1);
			return id;
		}
	}
}

module.exports = ProductService;
