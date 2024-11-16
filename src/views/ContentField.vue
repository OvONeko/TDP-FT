<script lang="ts">
import topHtml from '@/assets/top.md';
import ContentCard from "@/components/ContentCard.vue";
import {Content, Data} from "@/logic/data";
import {fetchWithParams, gShuffle} from "@/logic/helper";
import {marked} from "marked";
import {Component, Vue} from 'vue-facing-decorator';

@Component({ components: { ContentCard } })
export default class ContentField extends Vue {
    contents = [] as Content[]
    topHtml = topHtml;
    bottomHtml = ''

    created() {
        fetchWithParams('https://raw.githubusercontent.com/LS-KR/TransDefenseProject/master/institute_list.json')
            .then(it => it.text())
            .then(it => {
                console.log(it);
                this.contents = gShuffle((JSON.parse(it) as Data).content)
            })

        fetchWithParams('https://raw.githubusercontent.com/LS-KR/TransDefenseProject/refs/heads/master/README.md')
            .then(it => it.text())
            .then(it => {
                console.log(it);
                this.bottomHtml = marked(it).toString().replace(/\n/g, '<br/>');
            })
    }
}
</script>

<template>
    <div class="head-message markdown" v-html="topHtml"/>
    <div class="content-field">
        <ContentCard v-for="content in contents" :key="content" :content="content" class="content-card"/>
    </div>
    <div class="bottom-message markdown" v-html="bottomHtml"/>
</template>

<style lang="scss">
@import "@/style/markdown.scss";

.content-field {
    column-count: 3;
    width: 100%;
    height: fit-content;
    max-width: 1293px;
    margin: auto;

    .content-card {
        justify-self: flex-start;
    }
}

.head-message {
    width: 100%;
    height: fit-content;
    max-width: 1293px;
    margin: auto auto 2rem;
}

.bottom-message {
    width: 100%;
    height: fit-content;
    max-width: 1263px;
    margin: 2rem auto;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
}

@media screen and (max-width: 976px) {
    .content-field {
        column-count: 2;
    }
}

@media screen and (max-width: 655px) {
    .content-field {
        column-count: 1;
    }
}
</style>