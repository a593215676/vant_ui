import {GET_CITY} from './mutation-types'
import axios from '../http'
import moment from 'moment'


export default {
    async getCity ({commit}) {
        let res = await axios.req("api/v1/recommend")
        commit(GET_CITY, res.data.data)
    },
}
