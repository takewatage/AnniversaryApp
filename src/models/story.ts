import {Model, ArrayMappable} from '@team-decorate/alcts'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import relativeTime from "dayjs/plugin/relativeTime"
import 'dayjs/locale/ja';

dayjs.extend(utc)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.locale('ja');


export default class Story extends Model {

	title: string = ''
	date: string = ''
	dateCount: string = ''

	scheme: boolean = false

	constructor(data: object) {
		super()

		this.convert = false
		this.fillable = [
		]
		this.presents = []

		this.data = data
	}

	onScheme() {
		this.scheme = true
		return this
	}

	beforePostable() {
	}

	afterPostable() {

	}
}