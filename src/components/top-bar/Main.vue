<template>
    <!-- BEGIN: Top Bar -->
    <div
        class="hide-icon top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-4"
    >
        <div class="h-full flex items-center">
            <!-- BEGIN: Logo -->
            <a href="/admin" class="-intro-x hidden md:flex">
                <span class="text-white text-lg ml-3"> Green River-Lake </span>
            </a>

            <!-- END: Logo -->
            <!-- BEGIN: Breadcrumb -->
            <nav aria-label="breadcrumb" class="-intro-x h-full mr-auto"></nav>
            <!-- END: Breadcrumb -->
            <!-- BEGIN: Search -->

            <!-- END: Search -->
            <!-- BEGIN: Notifications -->

            <!-- END: Notifications -->
            <!-- BEGIN: Account Menu -->
            <Dropdown class="intro-x w-8 h-8">
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
    </div>
    <!-- END: Top Bar -->
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
import { ref } from 'vue'

const searchDropdown = ref(false)
const showSearchDropdown = () => {
    searchDropdown.value = true
}
const hideSearchDropdown = () => {
    searchDropdown.value = false
}
</script>

<style>
@media screen and (max-width: 768px) {
    .hide-icon {
        display: none;
    }
}
</style>
