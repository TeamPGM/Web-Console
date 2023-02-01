<template>
    <div>
        <v-table ref="table" :load="loadList">
            <template #header>
                <el-button type="danger" @click="removeAllIgnore">清空忽略状态</el-button>
            </template>
            <template #operations="{row}">
                <el-link :underline="false" type="primary" @click="editStatus(row)">编辑</el-link>
            </template>
        </v-table>

        <v-form-dialog title="编辑状态" :form="form" ref="dialog">
            <el-form-item label="群组 ID">
                <el-input v-model="form.id" disabled/>
            </el-form-item>
            <el-form-item label="群组昵称">
                <el-input v-model="form.title" disabled/>
            </el-form-item>
            <el-form-item label="是否屏蔽">
                <el-switch v-model="form.status" :active-value="true" :inactive-value="false"/>
            </el-form-item>
            <template #footer>
                <el-button type="primary" @click="submit">保存</el-button>
            </template>
        </v-form-dialog>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { getIgnoreList, editIgnoreGroup, removeAllIgnore } from '@/request/ignore'
import Common, { DictArray, StringDict } from '@/lib/common'

import VTable from '@/components/table/v-table.vue'
import VFormDialog from '@/components/v-form-dialog.vue'

@Options({
    components: {
        VTable,
        VFormDialog
    },
    computed: {
        table () {
            return this.$refs.table
        },
        dialog () {
            return this.$refs.dialog
        }
    },
    mounted () {
        this.table.setColumns({
            title: '群组名称',
            id: '群组 ID',
            status: {
                title: '状态',
                format: (row: StringDict, value: any) => value === true ? '已屏蔽' : '未屏蔽'
            }
        })
    }
})
export default class User extends Vue {
    table!: VTable
    dialog!: VFormDialog

    private form: StringDict = {}
    private ignores: DictArray = []

    public async loadList () {
        const res = await getIgnoreList()
        if (res) {
            this.ignores = res.data.groups
            const tableData = {
                total: this.ignores.length,
                list: this.ignores
            }
            this.table.setPaginationData(tableData)
        }
    }

    public async editStatus (data: StringDict) {
        this.form = Common.deepCopy(data)
        this.dialog.show()
    }

    public async submit () {
        const res = await editIgnoreGroup(this.form)
        if (res) {
            this.dialog.hide()
            this.table.executeLoad()
        }
    }

    public async removeAllIgnore () {
        const res = await removeAllIgnore()
        if (res) {
            this.table.executeLoad()
        }
    }
}
</script>

<style scoped lang="scss">

</style>
