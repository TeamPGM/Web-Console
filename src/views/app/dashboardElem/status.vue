<template>
    <div class="status">
        <el-card>
            <div style="display: flex">
                <number-card :value="status.version" color="4caf50">
                    <template #default>
                        <span>Bot 版本</span>
                    </template>
                </number-card>
                <number-card :value="status.run_time" color="5f75ed">
                    <template #default>
                        <span>运行时间</span>
                    </template>
                </number-card>
                <number-card :value="status.cpu_percent" color="4caf50">
                    <template #default>
                        <span>CPU 占用率</span>
                    </template>
                </number-card>
                <number-card :value="status.ram_percent" color="4caf50">
                    <template #default>
                        <span>RAM 占用率</span>
                    </template>
                </number-card>
                <number-card :value="status.swap_percent" color="4caf50">
                    <template #default>
                        <span>SWAP 占用率</span>
                    </template>
                </number-card>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { StringDict } from '@/lib/common'

import NumberCard from '@/views/app/dashboardElem/numberCard.vue'
import { getBotStatus } from '@/request/dashboard'

@Options({
    components: {
        NumberCard
    },
    mounted () {
        this.getData()
    }
})
export default class Status extends Vue {
    public status: StringDict = {}

    public async getData () {
        const res = await getBotStatus()
        if (res) {
            this.status = res
        }
    }
}
</script>

<style scoped lang="scss">
.status {}
</style>
