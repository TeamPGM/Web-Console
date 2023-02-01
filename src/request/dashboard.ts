import HttpRequest from '@/lib/http'

const request = new HttpRequest()

export async function getLog () {
    return await request.get({
        url: '/pagermaid/api/log'
    })
}

export async function getBotStatus () {
    return await request.get({
        url: '/pagermaid/api/status'
    })
}
