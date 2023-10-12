<template>
    <div>
        <h2 class="intro-y text-lg font-medium mt-4 mb-5">Danh sách thương hiệu</h2>
        <div class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center" v-if="loadingIconAction">
            <LoadingIcon icon="ball-triangle" class="w-20 h-20" />
        </div>
        <div class="grid grid-cols-12 gap-6 mt-5" v-if="!loadingIconAction">
            <div class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2">
                <button class="btn btn-primary shadow-md mr-2" @click="createProduct">Thêm</button>
            </div>
            <div v-for="(item, index) in listProduct" :key="index" class="intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                <div class="box">
                    <div class="p-5">
                        <div
                            class="h-40 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10"
                        >
                            <img alt="Midone - HTML Admin Template" class="rounded-md" :src="item.image" />
                            <span class="absolute top-0 bg-pending/80 text-white text-xs m-5 px-2 py-1 rounded z-10">{{item.brand}}</span>
                            <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
                                <a href="" class="block font-medium text-base">{{item.title}}</a>
                            </div>
                        </div>
                        <div class="text-slate-600 dark:text-slate-500 mt-2">
                            <div class="flex items-center text-sm"><LinkIcon class="w-4 h-4 mr-2" /> Giá: {{item.price}}</div>
                            <div class="flex items-center mt-2 text-sm"><LayersIcon class="w-4 h-4 mr-2" /> Số lượng: {{item.quantity}}</div>
                        </div>
                    </div>
                    <div class="flex justify-center lg:justify-end items-center p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                        <a class="flex items-center text-primary mr-auto" href="javascript:;"> <EyeIcon class="w-4 h-4 mr-1" /> Preview </a>
                        <a class="flex items-center mr-3" href="javascript:;" @click="updateProduct(item._id)">
                            <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
                        </a>
                        <a class="flex items-center text-danger" href="javascript:;" @click="onToggle(item._id)">
                            <Trash2Icon class="w-4 h-4 mr-1" /> Delete
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div id="false-delete" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-danger" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">Có lỗi trong quá trình xóa !</div>
            </div>
        </div>
        <div id="success-notification-delete" class="toastify-content toastify-content-update hidden flex">
            <CheckCircleIcon class="text-success" />
            <div class="ml-1 mr-2 message-toast">
                <div class="text-slate-500">Xóa thành công !</div>
            </div>
        </div>
    </div>
    <transition name="fade">
        <div id="headlessui-portal-root" v-if="isOpen == true">
            <div data-headlessui-portal="">
                <button
                    aria-hidden="true"
                    type="button"
                    style="
                        position: fixed;
                        height: 0px;
                        padding: 0px;
                        overflow: hidden;
                        clip: rect(0px, 0px, 0px, 0px);
                        white-space: nowrap;
                        border-width: 0px;
                    "
                ></button>
                <div>
                    <div class="relative z-[60]" id="headlessui-dialog-84" role="dialog" aria-modal="true" data-headlessui-state="open">
                        <div class="fixed -inset-24 bg-black/60" aria-hidden="true"></div>
                        <div class="fixed inset-0 opacity-100 mt-16">
                            <div
                                class="intro-y w-[90%] mx-auto bg-white relative rounded-md shadow-md transition-transform dark:bg-darkmode-600 sm:w-[460px]"
                                id="headlessui-dialog-panel-87"
                                data-headlessui-state="open"
                            >
                                <div class="p-5 text-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="stroke-1.5 w-16 h-16 mx-auto mt-3 text-danger"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="15" y1="9" x2="9" y2="15"></line>
                                        <line x1="9" y1="9" x2="15" y2="15"></line>
                                    </svg>
                                    <div class="mt-5 text-3xl">Bạn chắc chắn?</div>
                                    <div class="mt-2 text-slate-500">Bạn có thực sự muốn xóa mục này?</div>
                                </div>
                                <div class="px-5 pb-8 text-center">
                                    <button
                                        class="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed border-secondary text-slate-500 dark:border-darkmode-100/40 dark:text-slate-300 [&amp;:hover:not(:disabled)]:bg-secondary/20 [&amp;:hover:not(:disabled)]:dark:bg-darkmode-100/10 w-24 mr-1"
                                        type="button"
                                        fdprocessedid="171j3s"
                                        @click="closeModal"
                                    >
                                        Hủy</button
                                    ><button
                                        class="transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&amp;:hover:not(:disabled)]:bg-opacity-90 [&amp;:hover:not(:disabled)]:border-opacity-90 [&amp;:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-danger border-danger text-white dark:border-danger w-24"
                                        type="button"
                                        fdprocessedid="ujsyd"
                                        @click="deleteProduct"
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    aria-hidden="true"
                    type="button"
                    style="
                        position: fixed;
                        height: 0px;
                        padding: 0px;
                        overflow: hidden;
                        clip: rect(0px, 0px, 0px, 0px);
                        white-space: nowrap;
                        border-width: 0px;
                    "
                ></button>
            </div>
        </div>
    </transition>
</template>
<script>
import Toastify from 'toastify-js'
import ProductApi from '../../api-services/ProductApi'

export default {
    data() {
        return {
            listProduct: [],
            loadingIconAction: true,
            isOpen: false,
            idDel: null
        }
    },
    created() {
        this.getListProduct()
    },
    methods: {
        async getListProduct() {
            this.loadingIconAction = true
            const res = await ProductApi.getAllProduct()
            this.listProduct = res.mess
            console.log(this.listProduct);
            this.loadingIconAction = false
        },
        onToggle(id) {
            this.idDel = id
            this.isOpen = !this.isOpen
        },
        closeModal() {
            this.isOpen = !this.isOpen
        },
        async deleteProduct() {
            this.loadingIconAction = true
            const res = await ProductApi.deleteProduct(this.idDel)
            if (res.mess !== 'delete successfully') {
                Toastify({
                    node: dom('#false-delete').clone().removeClass('hidden')[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true
                }).showToast()
            } else {
                this.loadingIconAction = false
                Toastify({
                    node: dom('#success-notification-delete').clone().removeClass('hidden')[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: 'top',
                    position: 'right',
                    stopOnFocus: true
                }).showToast()
                this.getListProduct()
            }
            this.isOpen = !this.isOpen
        },
        createProduct() {
            this.$router.push({ path: '/product/create' })
        },

        updateProduct(id) {
            this.$router.push({ path: '/product/create', query: { id: id } })
        }
    }
}
</script>
<style scoped>
.image-category {
    height: 100px;
    width: 100px;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 500ms ease-out;
}
</style>
<style>
.toastify .toastify-content {
    padding-top: 15px;
    padding-bottom: 15px;
    padding-right: 2.5rem;
    padding-left: 0px;
}

.toastify .toastify-content .text-success,
.toastify .toastify-content .text-danger {
    margin-right: -10px;
    width: 65px;
}
</style>
