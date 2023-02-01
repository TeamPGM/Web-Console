import Notice from '@/lib/message'
import HttpRequest from '@/lib/http'
import { StringDict } from '@/lib/common'

const request = new HttpRequest()

export async function getInstalledPlugin () {
    return await request.get({
        url: '/pagermaid/api/get_local_plugins'
    })
}

export async function setLocalPluginStatus (data: StringDict) {
    if (await Notice.confirm('确定改变插件【' + data.plugin + '】的状态？')) {
        data.status = !data.status
        return await request.post({
            url: '/pagermaid/api/set_local_plugin_status',
            data
        })
    }
}

export async function uninstallLocalPlugin (data: StringDict) {
    if (await Notice.confirm('确定卸载插件【' + data.plugin + '】？')) {
        return await request.post({
            url: '/pagermaid/api/remove_local_plugin',
            data
        })
    }
}

export async function getRemotePlugin () {
    return await request.get({
        url: '/pagermaid/api/get_remote_plugins'
    })
}

export async function setRemotePluginStatus (data: StringDict) {
    if (await Notice.confirm('确定改变插件【' + data.plugin + '】的状态？')) {
        data.status = !data.status
        return await request.post({
            url: '/pagermaid/api/set_remote_plugin_status',
            data
        })
    }
}

export async function upgradePlugin (data: StringDict) {
    if (await Notice.confirm('确定更新插件【' + data.plugin + '】？')) {
        data.status = true
        return await request.post({
            url: '/pagermaid/api/set_remote_plugin_status',
            data
        })
    }
}
