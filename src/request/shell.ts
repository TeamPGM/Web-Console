import HttpRequest from '@/lib/http'
import Notice from '@/lib/message'

const request = new HttpRequest()

export async function runEval (cmd: string) {
    return await request.get({
        params: {
            cmd: cmd
        },
        url: '/pagermaid/api/run_eval'
    })
}

export async function runSh (cmd: string) {
    return await request.get({
        params: {
            cmd: cmd
        },
        url: '/pagermaid/api/run_sh'
    })
}

export async function botUpdate () {
    if (await Notice.confirm('确定更新吗？')) {
        return await request.post({
            url: '/pagermaid/api/bot_update'
        })
    }
}

export async function botRestart () {
    if (await Notice.confirm('确定重启吗？')) {
        return await request.post({
            url: '/pagermaid/api/bot_restart'
        })
    }
}
