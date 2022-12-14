import { Request, Response } from 'express'

import ProductService from '../../services/models/ProductService.js'
import { ProductData } from '../../types/models.js'

const ProService = new ProductService()

export const getProducts = (_req: Request, res: Response) => {
	const products = ProService.getProducts()

	res.json(products)
}

export const createProduct = (req: Request, res: Response) => {
	const { name, desc, price }: Omit<ProductData, 'id'> = req.body

	if (!name || !desc || !price)
		return res.json({
			error: 'name, desc or price fields are missing'
		})

	const product = {
		name,
		desc,
		price
	}

	ProService.createProduct(product)

	res.json({
		message: 'Product created successfully'
	})
}

export const getProduct = (req: Request<{ pid: string }>, res: Response) => {
	const pid = req.params.pid

	const product = ProService.getProduct({ id: pid })

	if (!product)
		return res.json({
			error: 'Product not found πΆβπ«οΈ'
		})

	res.json(product)
}

export const updateProduct = (req: Request<{ pid: string }>, res: Response) => {
	const pid = req.params.pid
	const { name, desc, price }: Omit<ProductData, 'id'> = req.body

	const pro = ProService.getProduct({ id: pid })

	if (!pro)
		return res.json({
			error: 'Product not found πΆβπ«οΈ'
		})

	if (!!name || !!desc || !!price) {
		Object.assign(pro, req.body)

		ProService.updateProduct({ id: pid }, pro)

		res.json(pro)
	}
}

export const deleteProduct = (req: Request<{ pid: string }>, res: Response) => {
	const pid = req.params.pid

	const pro = ProService.getProduct({ id: pid })

	if (!pro)
		return res.json({
			error: 'Product not found πΆβπ«οΈ'
		})

	ProService.deleteProduct({ id: pid })

	res.json({
		message: 'Product successfully deleted'
	})
}
