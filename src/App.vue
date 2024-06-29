<script lang="ts">
import ContentField from "@/views/ContentField.vue";
import {Component, Vue} from "vue-facing-decorator";

@Component({ components: { ContentField } })
export default class App extends Vue {
}
</script>

<template>
    <ContentField/>
</template>

<style lang="scss">
@import '@/style/mocha';
@import '@/style/font.css';

body {
    background-color: $mantle;
}

#app {
    min-height: 100vh;
    min-width: 100vw;
    position: absolute;
    left: 0;
    top: 20px;
    font-family: "PingFang SC", "Microsoft YaHei", sans-serif, serif;
}
</style>