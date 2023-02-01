import HttpRequest from '@/lib/http'

export const cos = new HttpRequest({
    host: '//'
})

export async function getNotice () {
    return await cos.get({
        url: '/notice.txt'
    })
}
