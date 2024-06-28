<script lang="ts">
import {Content, Data} from "@/logic/data";
import {fetchWithParams} from "@/logic/helper";
import {Vue, Component} from 'vue-facing-decorator';
import ContentCard from "@/components/ContentCard.vue";

@Component({components: {ContentCard}})
export default class ContentField extends Vue {
    contents = [] as Content[]

    created() {
        fetchWithParams('https://raw.githubusercontent.com/FunctionSir/TransDefenseProject/master/institute_list.json')
            .then(it => it.text())
            .then(it => {
                console.log(it);
                this.contents = (JSON.parse(it) as Data).content
            })
    }
}
</script>

<template>
    <div class="content-field">
        <ContentCard v-for="content in contents" :key="content" :content="content" class="content-card"/>
    </div>
</template>

<style lang="less">
.content-field {
    //display: flex;
    //flex-direction: row;
    //flex-wrap: wrap;
    //gap: 50px 20px;
    //justify-items: start;
    //align-items: start;
    //justify-content: flex-start;
    column-count: 3;
    width: 100%;
    height: fit-content;
    max-width: 1293px;
    //padding: 20px;
    margin: auto;

    .content-card {
        justify-self: flex-start;
    }
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