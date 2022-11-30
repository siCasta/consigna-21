import { v4 as uuid } from 'uuid'

import { ProductData } from '../types/models.js'

export default class ProductMemory {
	private data: Array<ProductData>

	constructor() {
		this.data = [
			{
				id: '6dffbdf8-72ef-4118-a839-f8d908585651',
				name: 'rice',
				price: 10,
				desc: 'is rice'
			},
			{
				id: '309f24ec-9d76-4fd8-8735-0f1d292f7267',
				name: 'wood',
				price: 10,
				desc: 'is wood'
			},
			{
				id: '8146cde2-3e3c-4a0f-9514-94b3f767b19f',
				name: 'water',
				price: 10,
				desc: 'is water'
			}
		]
	}

	insertOne(values: Omit<ProductData, 'id'>) {
		const id = uuid()

		const item: ProductData = {
			id,
			...values
		}

		this.data = [...this.data, item]
	}

	findOne(id: string) {
		const item = this.data.find(i => (i.id = id))

		if (!item) throw Error('The product id does not exists')

		return item
	}

	find() {
		return this.data
	}

	updateOne(id: string, values: Omit<ProductData, 'id'>) {
		const item = this.data.find(i => (i.id = id))

		if (!item) throw Error('The product id does not exists')
	}
}
