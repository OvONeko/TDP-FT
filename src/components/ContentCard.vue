<script lang="ts">
import {Content} from "@/logic/data";
import {Icon} from '@iconify/vue'
import {Component, Prop, Vue} from 'vue-facing-decorator';

@Component({ components: { Icon } })
export default class ContentCard extends Vue {
    @Prop({ required: true }) content: Content
}
</script>

<template>
    <div class="content">
        <h1 v-for="t in content.names" :key="t" v-text="t" class="title"/>
        <details v-if="(content.sites.length > 0) && (!content.sites[0].includes('UNKNOWN'))">
            <summary>点击查看网络站点</summary>
            <a v-for="s in content.sites" :key="s"
               v-bind:href="s.replaceAll('(无法正常访问)', '').replaceAll('(推测而得)', '')">
                <span><Icon class="icon-link-off" icon="uil:link-broken" v-if="s.includes('(无法正常访问)')"/></span>
                <span><Icon class="icon-sync-off" icon="uil:sync-slash" v-if="s.includes('(推测而得)')"/></span>
                <span>{{ s.replaceAll('(无法正常访问)', '').replaceAll('(推测而得)', '') }}</span>
            </a>
        </details>
        <details v-if="content.locations.length > 0">
            <summary>点击查看地址</summary>
            <p v-for="l in content.locations" :key="l" v-text="l"/>
        </details>
        <details v-if="content.sources.length > 0">
            <summary>来源</summary>
            <p v-for="v in content.sources" :key="v" v-text="v"/>
        </details>
        <div class="warning" v-if="content.persecution.known">
            <p class="p-warning">
                <span><Icon class="icon-warning" icon="ion:warning-outline"/></span>
                <span>存在对跨性别者的迫害</span>
            </p>
            <details v-if="content.persecution.evidences.length > 0">
                <summary>Evidences</summary>
                <p v-for="v in content.persecution.evidences" :key="v" v-text="v" class="evidences-content"/>
            </details>
        </div>
        <hr/>
        <p v-if="content.checked">
            <span><Icon class="icon-checked" icon="ion:checkmark-circle-sharp"/></span>
            <span>已认证</span>
        </p>
        <p v-else>
            <span><icon class="icon-pending" icon="ion:help-circle-sharp"/></span>
            <span>待确认</span>
        </p>
    </div>
</template>

<style lang="scss">
@import '@/style/mocha.sass';

.content {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: flex-start;
    width: calc(100vw / 3 - 60px);
    max-width: 371px;
    height: fit-content;
    padding: 10px;
    border: 2px solid $flamingo;
    border-radius: 10px;
    color: $text;
    overflow: scroll;
    transition: all 0.5s ease;
    background-color: $base;
    margin: 0 20px 50px 0;

    &:hover {
        filter: drop-shadow(0px 0px 10px $flamingo);
    }

    h1 {
        font-size: 2rem;
        border-bottom: 1px solid $rosewater;
        color: $rosewater;
        margin: auto auto 0.5rem 1rem;
        transition: all 0.5s ease;

        &:hover {
            filter: drop-shadow(0px 0px 5px $rosewater);
        }
    }

    details {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        transition: all 0.5s ease;
        margin: 2px 0;

        p {
            margin: 0 0 0 1rem;
            color: $sky;
        }

        a {
            margin: 0 0 0 1rem;
            text-decoration: none;
            color: $teal;

            &:active {
                color: $teal;
            }

            span {
                .icon-link-off {
                    color: $pink;
                    width: 22.5px;
                    height: 22.5px;
                    margin: 0 0.25rem 0 0;
                    position: relative;
                    top: 0.33rem;
                }

                .icon-sync-off {
                    color: $sapphire;
                    width: 22.5px;
                    height: 22.5px;
                    margin: 0 0.25rem 0 0;
                    position: relative;
                    top: 0.33rem;
                }
            }
        }
    }

    .p-warning {
        color: $maroon !important;
    }

    .evidences-content {
        color: $yellow !important;
    }

    p {
        margin: 0.25rem 0.25rem 0.25rem 0;

        span {
            margin-left: 0.5rem;
        }

        .icon-warning {
            color: $peach;
            width: 22.5px;
            height: 22.5px;
            margin: 0 0 0 0.5rem;
            position: relative;
            top: 0.25rem;
        }

        .icon-checked {
            color: $green;
            width: 22.5px;
            height: 22.5px;
            margin: 0 0 0 0.5rem;
            position: relative;
            top: 0.33rem;
        }

        .icon-pending {
            color: $blue;
            width: 22.5px;
            height: 22.5px;
            margin: 0 0 0 0.5rem;
            position: relative;
            top: 0.33rem;
        }
    }

    .warning {
        border: 1px solid $yellow;
        border-radius: 5px;
        padding: 5px;
        margin: 1rem 1rem 0.5rem 1rem;
        width: calc(100% - 3rem);
        transition: all 0.5s ease;

        &:hover {
            filter: drop-shadow(0px 0px 10px $yellow);
        }

        p {
            margin-bottom: 0.5rem;
        }
    }

    hr {
        margin-top: 1rem;
        border-image: repeating-linear-gradient(45deg, $red, $peach 10px, $yellow 20px, $green 40px, $teal 50px, $sky 60px, $blue, 70px, $lavender 80px, $mauve 90px, $red 100px) 1;
        width: calc(100% - 20px);
    }
}

@media screen and (max-width: 976px) {
    .content {
        width: calc(100vw / 2 - 60px);
        max-width: 450px !important;
    }
}

@media screen and (max-width: 655px) {
    .content {
        width: calc(100vw - 40px) !important;
        max-width: unset !important;
    }
}
</style>