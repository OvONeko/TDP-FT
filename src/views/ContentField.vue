<script lang="ts">
import {Content, Data} from "@/logic/data";
import {fetchWithParams, gShuffle} from "@/logic/helper";
import {Vue, Component} from 'vue-facing-decorator';
import ContentCard from "@/components/ContentCard.vue";
import topHtml from '@/assets/top.md';

@Component({components: {ContentCard}})
export default class ContentField extends Vue {
    contents = [] as Content[]
    topHtml = topHtml;

    created() {
        fetchWithParams('https://raw.githubusercontent.com/LS-KR/TransDefenseProject/master/institute_list.json')
            .then(it => it.text())
            .then(it => {
                console.log(it);
                this.contents = gShuffle((JSON.parse(it) as Data).content)
            })
    }
}
</script>

<template>
    <div class="head-message markdown" v-html="topHtml"/>
    <div class="content-field">
        <ContentCard v-for="content in contents" :key="content" :content="content" class="content-card"/>
    </div>
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