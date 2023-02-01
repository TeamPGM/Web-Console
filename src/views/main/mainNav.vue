<template>
    <div class="main-nav">
        <div class="menu">
            <div v-for="(item, index) in indexChildren" :key="index" :class="{ selected: isSelected(index) }"
                @click="selectMenu(index)">
                <el-icon class="icon">
                    <component :is="navIcon[item.name]"></component>
                </el-icon>
                {{ navName[item.name] || item.name }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { shallowRef } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { RouteRecordRaw } from 'vue-router'
import { indexChildren } from '@/router'
import {
    Monitor,
    DocumentCopy,
    CreditCard,
    Goods,
    Link
} from '@element-plus/icons-vue'

const navName = {
    index: '控制台',
    shell: 'shell',
    replace: '命令别名',
    ignore: '忽略群组',
    plugin: '插件管理',
    shop: '插件仓库'
}

const navIcon = {
    index: shallowRef(Monitor),
    shell: shallowRef(Monitor),
    replace: shallowRef(DocumentCopy),
    ignore: shallowRef(CreditCard),
    plugin: shallowRef(Link),
    shop: shallowRef(Goods)
}

export {
    navName,
    navIcon
}

@Options({
    watch: {
        selected (index) {
            const item = this.indexChildren[index]

            this.$emit('onSelected', item.name)
            this.$router.push(item.path)
        }
    },
    mounted () {
        if (this.$route.name) {
            for (const index in this.indexChildren) {
                const item = this.indexChildren[index]

                if (this.$route.name === item.name) {
                    this.selected = parseInt(index)
                    break
                }
            }
        }
    }
})
export default class MainNav extends Vue {
    public selected: null | number = null

    public indexChildren: Array<RouteRecordRaw> = indexChildren

    public navName = navName
    public navIcon = navIcon

    public selectMenu (index: number): void {
        this.selected = index
    }

    public isSelected (index: number): boolean {
        return index === this.selected
    }
}
</script>

<style scoped lang="scss">
.main-nav {
    height: 100%;
    border-radius: 4px;
    box-shadow: 0 0 12px rgba(0, 0, 0, .12);
    overflow: hidden;
}

.menu {
    display: flex;
    flex-direction: column;

    &>div {
        height: 40px;
        padding: 0 20px;
        transition: all 200ms ease-in-out;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    &>div.selected {
        color: var(--c-main);
        background: var(--c-main-light);
    }

    &>div:hover:not(.selected) {
        color: #fff;
        background: var(--c-main);
    }

    .icon {
        margin-right: 8px;
    }
}
</style>
