<template>
    <div>
        <v-table ref="table" :load="loadList">
            <template #header>
                <el-button type="primary" @click="$refs.dialog.show()">添加命令别名</el-button>
                <el-button type="warning" @click="loadList">同步命令别名</el-button>
            </template>
            <template #operations="{row}">
                <el-link :underline="false" type="primary" @click="editReplace(row)">编辑</el-link>
                <el-link :underline="false" type="danger" @click="delReplace(row)">删除</el-link>
            </template>
        </v-table>

        <v-form-dialog title="添加命令别名" :form="form" ref="dialog">
            <el-form-item label="被替换命令">
                <el-input v-model="form.command"/>
            </el-form-item>
            <el-form-item label="替换命令">
                <el-input v-model="form.alias"/>
            </el-form-item>
            <template #footer>
                <el-button type="primary" @click="submit">保存</el-button>
            </template>
        </v-form-dialog>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import {
    getReplaceList, updateReplaceList
} from '@/request/replace'
import { DictArray, StringDict } from '@/lib/common'

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
        },
        setting () {
            return this.$refs.setting
        }
    },
    watch: {
        inputMode (val) {
            if (val) {
                this.$refs.tagInput.focus()
            }
        }
    },
    mounted () {
        this.table.setColumns({
            command: '被替换命令',
            alias: '替换命令'
        })
    }
})
export default class Replace extends Vue {
    table!: VTable
    dialog!: VFormDialog
    setting!: VFormDialog

    private form = {
        command: '',
        alias: ''
    }

    private alias: DictArray = []

    public async loadList () {
        const res = await getReplaceList()
        if (res) {
            this.alias = res.data.items
            const tableData = {
                total: this.alias.length,
                list: this.alias
            }
            this.table.setPaginationData(tableData)
        }
    }

    public async submit () {
        const newAlias = {
            command: this.form.command,
            alias: this.form.alias
        }
        this.alias.push(newAlias)
        const res = await updateReplaceList(this.alias)
        if (res) {
            this.dialog.hide()
            this.table.executeLoad()
            this.form = {
                command: '',
                alias: ''
            }
        }
    }

    public async delReplace (data: StringDict) {
        this.alias = this.alias.filter((item) => {
            return item.command !== data.command
        })
        const res = await updateReplaceList(this.alias)
        if (res) {
            this.table.executeLoad()
        }
    }

    public async editReplace (data: StringDict) {
        this.form = {
            command: data.command,
            alias: data.alias
        }
        this.dialog.show()
    }
}
</script>

<style scoped lang="scss">
.setting-word {
    display: flex;
    flex-wrap: wrap;

    .tag {
        margin-right: 5px;
    }

    .add {
        width: 100px;
    }
}
</style>
