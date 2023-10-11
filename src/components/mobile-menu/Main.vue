<template>
    <!-- BEGIN: Mobile Menu -->
    <div
        class="mobile-menu md:hidden"
        :class="{
            'mobile-menu--active': activeMobileMenu
        }"
    >
        <div class="mobile-menu-bar">
            <a href="" class="flex mr-auto">
                <img alt="Icewall Tailwind HTML Admin Template" class="w-6" src="@/assets/images/logo.svg" />
            </a>
            <div class="h-full flex items-center">
                <!-- BEGIN: Logo -->
                <a href="/admin" class="-intro-x hidden md:flex">
                    <span class="text-white text-lg ml-3"> Green River-Lake </span>
                </a>

                <!-- END: Logo -->
                <!-- BEGIN: Breadcrumb -->
                <nav aria-label="breadcrumb" class="-intro-x h-full mr-auto"></nav>
                <!-- END: Breadcrumb -->
                <!-- BEGIN: Account Menu -->
                <Dropdown class="intro-x w-8 h-8 mr-3 z-index">
                    <DropdownToggle tag="div" role="button" class="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110">
                        <img alt="" :src="urlLogo" />
                    </DropdownToggle>
                    <DropdownMenu class="w-56">
                        <DropdownContent
                            class="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white"
                        >
                            <DropdownHeader tag="div" class="!font-normal">
                                <div class="font-medium">
                                    {{ username }}
                                </div>
                                <div class="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                                    {{ email }}
                                </div>
                            </DropdownHeader>
                            <DropdownDivider class="border-white/[0.08]" />
                            <DropdownItem @click="changePass" class="dropdown-item hover:bg-white/5">
                                <LockIcon class="w-4 h-4 mr-2" /> Thay đổi mật khẩu</DropdownItem
                            >
                            <DropdownItem @click="handleLogout" class="dropdown-item hover:bg-white/5">
                                <ToggleRightIcon class="w-4 h-4 mr-2" /> Đăng xuất
                            </DropdownItem>
                        </DropdownContent>
                    </DropdownMenu>
                </Dropdown>
                <!-- END: Account Menu -->
            </div>
            <a href="javascript:;" class="mobile-menu-toggler">
                <BarChart2Icon class="w-8 h-8 text-white transform -rotate-90" @click="toggleMobileMenu" />
            </a>
        </div>
        <div class="scrollable">
            <a href="javascript:;" class="mobile-menu-toggler">
                <XCircleIcon class="w-8 h-8 text-white transform -rotate-90" @click="toggleMobileMenu" />
            </a>
            <ul class="scrollable__content py-2">
                <!-- BEGIN: First Child -->
                <template v-for="(menu, menuKey) in formattedMenu">
                    <li v-if="menu == 'devider'" :key="menu + menuKey" class="menu__devider my-6"></li>
                    <li v-else :key="menu + menuKey">
                        <a
                            href="javascript:;"
                            class="menu"
                            :class="{
                                'menu--active': menu.active,
                                'menu--open': menu.activeDropdown
                            }"
                            @click="linkTo(menu, router)"
                        >
                            <div class="menu__icon">
                                <component :is="menu.icon" />
                            </div>
                            <div class="menu__title">
                                {{ menu.title }}
                                <div v-if="menu.subMenu" class="menu__sub-icon" :class="{ 'transform rotate-180': menu.activeDropdown }">
                                    <ChevronDownIcon />
                                </div>
                            </div>
                        </a>
                        <!-- BEGIN: Second Child -->
                        <transition @enter="enter" @leave="leave">
                            <ul v-if="menu.subMenu && menu.activeDropdown">
                                <li v-for="(subMenu, subMenuKey) in menu.subMenu" :key="subMenuKey">
                                    <a href="javascript:;" class="menu" :class="{ 'menu--active': subMenu.active }" @click="linkTo(subMenu, router)">
                                        <div class="side-menu__icon">
                                            <component :is="subMenu.icon" />
                                        </div>
                                        <div class="menu__title">
                                            {{ subMenu.title }}
                                            <div
                                                v-if="subMenu.subMenu"
                                                class="menu__sub-icon"
                                                :class="{
                                                    'transform rotate-180': subMenu.activeDropdown
                                                }"
                                            >
                                                <ChevronDownIcon />
                                            </div>
                                        </div>
                                    </a>
                                    <!-- BEGIN: Third Child -->
                                    <transition @enter="enter" @leave="leave">
                                        <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                                            <li v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu" :key="lastSubMenuKey">
                                                <a
                                                    href="javascript:;"
                                                    class="menu"
                                                    :class="{ 'menu--active': lastSubMenu.active }"
                                                    @click="linkTo(lastSubMenu, router)"
                                                >
                                                    <div class="side-menu__icon">
                                                        <component :is="subMenu.icon" />
                                                    </div>
                                                    <div class="menu__title">
                                                        {{ lastSubMenu.title }}
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </transition>
                                    <!-- END: Third Child -->
                                </li>
                            </ul>
                        </transition>
                        <!-- END: Second Child -->
                    </li>
                </template>
                <!-- END: First Child -->
            </ul>
        </div>
    </div>
    <!-- END: Mobile Menu -->
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import avatarLogoDefault from '@/assets/images/avatar.png'
export default {
    name: 'dashboard',
    data: () => ({
        name: '',
        urlLogo: avatarLogoDefault
    }),
    computed: mapGetters('auth', ['username', 'email']),
    methods: {
        ...mapActions('auth', ['logout']),
        handleLogout() {
            const isLogout = this.logout()
            this.$router.push('/admin/login')
        },
        changePass() {
            this.$router.push('/admin/change-pass')
        }
    }
}
</script>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { helper as $h } from '@/utils/helper'
import { useSideMenuStore } from '@/stores/side-menu'
import { activeMobileMenu, toggleMobileMenu, linkTo, enter, leave } from './index'
import { nestedMenu } from '@/layouts/side-menu'
import dom from '@left4code/tw-starter/dist/js/dom'
import SimpleBar from 'simplebar'

const searchDropdown = ref(false)
const showSearchDropdown = () => {
    searchDropdown.value = true
}
const hideSearchDropdown = () => {
    searchDropdown.value = false
}
const route = useRoute()
const router = useRouter()
const formattedMenu = ref([])
const sideMenuStore = useSideMenuStore()
const mobileMenu = computed(() => nestedMenu(sideMenuStore.menu, route))

watch(
    computed(() => route.path),
    () => {
        formattedMenu.value = $h.toRaw(mobileMenu.value)
    }
)

onMounted(() => {
    if (dom('.mobile-menu .scrollable').length) {
        new SimpleBar(dom('.mobile-menu .scrollable')[0])
    }
    formattedMenu.value = $h.toRaw(mobileMenu.value)
})
</script>
<style>
.z-index {
    z-index: -50 !important;
}
</style>
