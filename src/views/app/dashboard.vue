<template>
    <div>
        <el-alert type="warning" v-if="notice">
            <template #title>
                <div style="display: flex;align-items: center;">
                    <el-icon>
                        <BellFilled />
                    </el-icon>
                    <span style="padding-left: 5px">公告</span>
                </div>
            </template>
            <div v-html="notice"></div>
        </el-alert>
        <br>
        <status />
        <br>
        <logger />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { BellFilled } from '@element-plus/icons-vue'

import Logger from '@/views/app/dashboardElem/logger.vue'
import Status from '@/views/app/dashboardElem/status.vue'

import { getNotice } from '@/request/remote/notice'

@Options({
    components: {
        Logger,
        Status,
        BellFilled
    },
    mounted () {
        this.getNotice()
    }
})
export default class Dashboard extends Vue {
    public notice = ''

    public async getNotice () {
        const res = await getNotice()
        if (res) {
            this.notice = res
        }
    }
}
</script>

<style scoped lang="scss">

</style>
