<template>
    <div>
        <el-button type="primary" @click="update">更新</el-button>
        <el-button type="danger" @click="restart">重启</el-button>
        <el-button type="warning" @click="$refs.shell.show()">运行 Shell 命令</el-button>
        <el-button type="warning" @click="$refs.eval.show()">运行 python 命令</el-button>

        <br><br>

        <el-card class="log">
            <template #header>
                <div class="log-header">
                    <div style="display: flex;align-items: center;">
                        <span>运行日志&nbsp;&nbsp;</span>
                    </div>
                </div>
            </template>
            <div class="log-pad" ref="pad">
                <div v-for="(line, index) in logList" :key="index" v-html="logFormat(line)"></div>
            </div>
        </el-card>

        <v-form-dialog title="运行 Shell 命令" :form="form" ref="shell">
            <el-form-item label="命令">
                <el-input v-model="form.cmd" :rows="8" type="textarea"/>
            </el-form-item>
            <template #footer>
                <el-button type="primary" @click="submit(false)">提交</el-button>
            </template>
        </v-form-dialog>
        <v-form-dialog title="运行 python 命令" :form="form" ref="eval">
            <el-form-item label="命令">
                <el-input v-model="form.cmd" :rows="8" type="textarea"/>
            </el-form-item>
            <template #footer>
                <el-button type="primary" @click="submit(true)">提交</el-button>
            </template>
        </v-form-dialog>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { runEval, runSh, botUpdate, botRestart } from '@/request/shell'

import VFormDialog from '@/components/v-form-dialog.vue'

@Options({
    components: {
        VFormDialog
    },
    computed: {
        table () {
            return this.$refs.table
        },
        shell () {
            return this.$refs.shell
        },
        eval () {
            return this.$refs.eval
        },
        pad () {
            return this.$refs.pad
        }
    },
    watch: {
        inputMode (val) {
            if (val) {
                this.$refs.tagInput.focus()
            }
        }
    }
})
export default class Shell extends Vue {
    shell!: VFormDialog
    eval!: VFormDialog
    pad!: HTMLElement

    public logList: any = []

    private form = {
        cmd: ''
    }

    public async submit (type: boolean) {
        let res = ''
        if (type) {
            res = await runEval(this.form.cmd)
        } else {
            res = await runSh(this.form.cmd)
        }
        if (res) {
            this.shell.hide()
            this.eval.hide()
            this.logList = res.split('\n')
            await this.$nextTick(() => {
                this.pad.scrollTop = this.pad.scrollHeight
            })
        }
    }

    public logFormat (line: string): string {
        return line
            .replace('<', '&lt;')
            .replace('>', '&gt;')
            .replace(/\s/g, '&nbsp;')
            .replace(/&nbsp;\[(.*)]\[(.+?)]&nbsp;/, (res, r1, r2) => {
                const main = r1.replace(/&nbsp;/g, '')
                const level = r2.replace(/&nbsp;/g, '')

                return `<span class="tag-main ${main}">${main}</span><span class="tag-level ${level}">${level}</span>`
            })
    }

    public async update () {
        return await botUpdate()
    }

    public async restart () {
        return await botRestart()
    }
}
</script>

<style scoped lang="scss">
.log {
    width: 100%;

    .log-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .log-pad {
        height: 400px;
        overflow: auto;
        padding: 5px;

        & > div {
            font-size: 12px;
            white-space: nowrap;
        }
    }
}
</style>
<style lang="scss">
.log-pad {
    span {
        width: 60px;
        margin-right: 5px;
        font-size: 12px;
        background: var(--el-color-info-light-9);
        padding: 0 5px;
        display: inline-block;
        text-align: right;
    }

    .tag-main {
        margin-left: 5px;
    }
}
</style>
