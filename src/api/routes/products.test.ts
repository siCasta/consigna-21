import Supertest from 'supertest'
import chai from 'chai'

const expect = chai.expect
const requester = Supertest('http://localchost:8080')

describe('Products testing', () => {
	describe('GET', () => {
		it('La peticion base debe retornar 200', () => {
			requester.get('/api/products').then(response => {
				console.log(response)

				expect(response.status).to.be.equal(200)
			})
		})
	})
})
