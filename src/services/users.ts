//API gelir diye düşündüğüm için böyle bir yapı kurmuştum
//import { get } from '../utils/httphelper';

import axios from "axios";
import MockAdapter from 'axios-mock-adapter'
import { data } from "./data/data";

//@ts-ignore
const mock = new MockAdapter(axios)


mock.onGet('/api/users').reply(200,data)
export const getUsers = async () => {
    return await axios.get('/api/users');
}