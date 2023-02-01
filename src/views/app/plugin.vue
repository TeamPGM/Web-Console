<template>
    <div>
        <div class="plugin-list" v-if="pluginList.length">
            <plugin-item-card v-for="(item, index) in pluginList" :key="index" :item="item">
                <template #button>
                    <el-button round type="danger" @click="setStatus(item)" v-if="item.status">禁用</el-button>
                    <el-button round type="primary" @click="setStatus(item)" v-else>启用</el-button>
                    <el-button round type="danger" @click="uninstall(item)">卸载</el-button>
                </template>
            </plugin-item-card>
        </div>
        <div v-else>
            <el-empty description="未安装任何插件"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { getInstalledPlugin, setLocalPluginStatus, uninstallLocalPlugin } from '@/request/plugin'

import PluginItemCard, { PluginItem } from '@/views/app/pluginElem/pluginItemCard.vue'

@Options({
    components: {
        PluginItemCard
    },
    mounted () {
        this.getPlugin()
    }
})
export default class Plugin extends Vue {
    public pluginList = []
    public plugin: PluginItem = {
        name: '',
        status: false,
        installed: false,
        version: 1.0
    }

    public async getPlugin () {
        const res = await getInstalledPlugin()
        if (res) {
            this.pluginList = res.data.rows
        }
    }

    public async setStatus (item: PluginItem) {
        item.plugin = item.name
        const res = await setLocalPluginStatus(item)
        if (res) {
            await this.getPlugin()
        }
    }

    public async uninstall (item: PluginItem) {
        item.plugin = item.name
        const res = await uninstallLocalPlugin(item)
        if (res) {
            await this.getPlugin()
        }
    }
}
</script>

<style scoped lang="scss">
.plugin-list {
    display: flex;
    flex-wrap: wrap;
}
</style>
