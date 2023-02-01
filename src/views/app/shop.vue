<template>
    <div>
        <div style="margin-bottom: 10px">
            <el-button type="success" @click="upgradeAll" v-if="needUpdate">更新所有插件</el-button>
        </div>
        <div class="plugin-list">
            <plugin-item-card v-for="(item, index) in officialPlugins" :key="index" :item="item">
                <template #version>
                    <div style="display: flex;align-items: center;">
                        {{ item.version }}
                    </div>
                </template>
                <template #button>
                    <el-button round type="success" @click="upgrade(item)" v-if="item.upgrade">更新</el-button>
                    <el-button round type="primary" @click="setStatus(item)" v-if="!item.status">安装</el-button>
                    <el-button round type="danger" @click="setStatus(item)" style="margin-left: 10px" v-else>
                        卸载
                    </el-button>
                </template>
            </plugin-item-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { getInstalledPlugin, getRemotePlugin, setRemotePluginStatus, upgradePlugin } from '@/request/plugin'
import { StringDict } from '@/lib/common'
import { CaretTop, CaretBottom } from '@element-plus/icons-vue'

import PluginItemCard, { RemotePluginItem } from '@/views/app/pluginElem/remotePluginItemCard.vue'
import { PluginItem } from './pluginElem/pluginItemCard.vue'

@Options({
    components: {
        CaretTop,
        CaretBottom,
        PluginItemCard
    },
    mounted () {
        this.getShopList()
    }
})
export default class Shop extends Vue {
    public officialPlugins: Array<RemotePluginItem> = []
    public needUpdate = false

    public async getShopList () {
        this.needUpdate = false
        const shop = await getRemotePlugin()
        if (shop) {
            this.officialPlugins = shop.data.rows
            const res = await getInstalledPlugin()
            if (res) {
                const list: Array<PluginItem> = res.data.rows
                const installedPlugin: StringDict = {}
                for (const item of list) {
                    installedPlugin[item.name] = item.version
                }
                for (const item of this.officialPlugins) {
                    item.upgrade = false
                    if (installedPlugin[item.name]) {
                        if (installedPlugin[item.name] < item.version) {
                            item.upgrade = true
                            this.needUpdate = true
                        }
                    }
                }
            }
        }
    }

    public async setStatus (item: StringDict) {
        item.plugin = item.name
        const res = await setRemotePluginStatus(item)
        if (res) {
            await this.getShopList()
        }
    }

    public async upgrade (item: StringDict) {
        item.plugin = item.name
        const res = await upgradePlugin(item)
        if (res) {
            await this.getShopList()
        }
    }

    public async upgradeAll () {
        const upgradePlugins = this.officialPlugins.filter((item: RemotePluginItem) => { return item.upgrade })
        for (const item of upgradePlugins) {
            item.plugin = item.name
            await upgradePlugin(item)
        }
        await this.getShopList()
    }
}
</script>

<style scoped lang="scss">
.plugin-author {
    font-size: 16px;
    border-left: 3px solid var(--el-color-success);
    padding-left: 10px;
    margin-top: 20px;
}

.plugin-list {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
}
</style>
