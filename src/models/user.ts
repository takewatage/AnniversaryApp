import {Model, ArrayMappable} from '@team-decorate/alcts'


export default class User extends Model {

	id: string = ''
	email: string = ''
	name: string = ''
	password: string = ''
	deviceId: string = ''
	updatedAt: string = ''
	deletedAt: string = ''


	constructor(data: object) {
		super()

		this.convert = false

		this.fillable = [
			'id', 'email', 'name', 'deviceId', 'createdAt', 'updatedAt', 'deletedAt', 'lang'
		]
		this.presents = []

		this.data = data
	}


	beforePostable() {
	}

	afterPostable() {

	}
}