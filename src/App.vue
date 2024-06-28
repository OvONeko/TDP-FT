<script lang="ts">
import {Component, Vue} from "vue-facing-decorator";
import ContentField from "@/views/ContentField.vue";

@Component({components: {ContentField}})
export default class App extends Vue {}
</script>

<template>
    <ContentField />
</template>

<style lang="scss">
@import '@/style/mocha';

body {
    background-color: $mantle;
}

#app {
    min-height: 100vh;
    min-width: 100vw;
}
</style>