import HttpRequest from '@/lib/http'
import { StringDict } from '@/lib/common'

const request = new HttpRequest()

export async function getReplaceList () {
    return await request.get({
        url: '/pagermaid/api/command_alias'
    })
}

export async function updateReplaceList (data: StringDict) {
    return await request.post({
        url: 'pagermaid/api/command_alias',
        data: {
            items: data
        }
    })
}
