<template>
    <div style="height: calc(100% - 20px)">
        <router-view/>
    </div>
    <div class="cc">
        Copyright © 2023 &nbsp;&nbsp;<a href="https://github.com/TeamPGM/PagerMaid-Pyro" target="_blank" class="link-secondary">  PagerMaid-Pyro
        </a>&nbsp;&nbsp; X &nbsp;&nbsp;<a target="_blank" href="https://github.com/AmiyaBot/Amiya-Bot-console2" class="link-secondary" rel="noopener">
        Amiya-Bot-console2
        </a>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class App extends Vue {
}
</script>

<style scoped lang="scss">
.cc {
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
        font-size: 12px;
        color: var(--el-color-info);
    }
}
</style>
<style lang="scss">
* {
    box-sizing: border-box;
    font-family: Helvetica, Arial, sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-overflow: initial !important;

    &:not(svg) {
        font-size: 14px;
    }
}

html,
body {
    margin: 0;
    overflow: hidden;
}

#app {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    z-index: 0;
}

:root {
    scroll-behavior: smooth;
    --c-main: var(--el-color-primary);
    --c-main-light: var(--el-color-primary-light-8);
}

.el-notification__content {
    word-break: break-all;
    word-wrap: break-word;
    text-align: inherit;
}

.v-loading {
    background-color: transparent !important;
    backdrop-filter: blur(10px);
}
</style>
