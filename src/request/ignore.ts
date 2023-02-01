import HttpRequest from '@/lib/http'
import { StringDict } from '@/lib/common'

const request = new HttpRequest()

export async function getIgnoreList () {
    return await request.get({
        url: '/pagermaid/api/get_ignore_group_list'
    })
}

export async function editIgnoreGroup (data: StringDict) {
    return await request.post({
        url: '/pagermaid/api/set_ignore_group_status',
        data
    })
}

export async function removeAllIgnore () {
    return await request.post({
        url: '/pagermaid/api/clear_ignore_group'
    })
}
