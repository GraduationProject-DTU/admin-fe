<template>
    <div
        class="h-[320px] before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black/90 before:to-black/10 image-fit"
    >
        <img alt="Midone Tailwind HTML Admin Template" class="rounded-t-md" :src="blog.images[0]" />
        <div class="absolute w-full flex items-center px-5 pt-6 z-10">
            <div class="w-10 h-10 flex-none image-fit">
                <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" :src="blog.images[0]" />
            </div>
            <div class="ml-3 text-white mr-auto">
                <a href="" class="font-medium">{{ blog.author }}</a>
                <!-- <div class="text-xs mt-0.5">{{ formatDate(blog.createdAt) }}</div> -->
            </div>
            <Dropdown class="ml-3">
                <DropdownToggle
                    id="closeDropDown"
                    tag="a"
                    href="javascript:;"
                    class="bg-white/20 w-8 h-8 flex items-center justify-center rounded-full"
                >
                    <MoreVerticalIcon class="w-4 h-4 text-white" />
                </DropdownToggle>
                <DropdownMenu class="w-40" :class="'closeMenu' + [blog._id]">
                    <DropdownContent>
                        <DropdownItem> <Edit2Icon class="w-4 h-4 mr-2" /> Edit Post </DropdownItem>
                        <DropdownItem @click="onToggle(blog._id, $event)"> <TrashIcon class="w-4 h-4 mr-2" /> Delete Post </DropdownItem>
                    </DropdownContent>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
            <span class="bg-white/20 px-2 py-1 rounded">{{
                            blog.category
            }}</span>
            <!-- <a href="" class="block font-medium text-xl mt-3">{{
                            item.title
                        }}</a> -->
        </div>
    </div>
    <h1 class="p-5 text-slate-600 dark:text-slate-500">{{blog.title}}</h1>
    <div class="p-5 text-slate-600 dark:text-slate-500" v-html="blog.description"></div>
    <div class="flex items-center px-5 py-3 border-t border-slate-200/60 dark:border-darkmode-400">
        <Tippy
            tag="a"
            href=""
            class="intro-x w-8 h-8 flex items-center justify-center rounded-full border border-slate-300 dark:border-darkmode-400 dark:bg-darkmode-300 dark:text-slate-300 text-slate-500 mr-2"
            content="Bookmark"
        >
            <BookmarkIcon class="w-3 h-3" />
        </Tippy>
        <!-- <div class="intro-x flex mr-2">
                        <div class="intro-x w-8 h-8 image-fit">
                            <Tippy
                                tag="img"
                                alt="Midone Tailwind HTML Admin Template"
                                class="rounded-full border border-white zoom-in"
                                :src="faker.photos[0]"
                                :content="faker.users[0].name"
                            />
                        </div>
                        <div class="intro-x w-8 h-8 image-fit -ml-4">
                            <Tippy
                                tag="img"
                                alt="Midone Tailwind HTML Admin Template"
                                class="rounded-full border border-white zoom-in"
                                :src="faker.photos[1]"
                                :content="faker.users[1].name"
                            />
                        </div>
                        <div class="intro-x w-8 h-8 image-fit -ml-4">
                            <Tippy
                                tag="img"
                                alt="Midone Tailwind HTML Admin Template"
                                class="rounded-full border border-white zoom-in"
                                :src="faker.photos[2]"
                                :content="faker.users[2].name"
                            />
                        </div>
                    </div> -->
        <Tippy
            tag="a"
            href=""
            class="intro-x w-8 h-8 flex items-center justify-center rounded-full text-primary bg-primary/10 dark:bg-darkmode-300 dark:text-slate-300 ml-auto"
            content="Share"
        >
            <Share2Icon class="w-3 h-3" />
        </Tippy>
        <Tippy
            tag="a"
            href=""
            class="intro-x w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white ml-2"
            content="Download PDF"
        >
            <ShareIcon class="w-3 h-3" />
        </Tippy>
    </div>
    <div class="px-5 pt-3 pb-5 border-t border-slate-200/60 dark:border-darkmode-400">
        <div class="w-full flex text-slate-500 text-xs sm:text-sm justify-between">
            <div class="flex">
                <div class="mr-2">
                    Comments: <span class="font-medium">{{ blog.comments.length }}</span>
                </div>
                <div class="mr-2">
                    Views: <span class="font-medium">{{ blog.numberViews }}</span>
                </div>
            </div>
            <div class="flex">
                <div class="ml-2">
                    Likes: <span class="font-medium">{{ blog.likes.length }}</span>
                </div>
                <div class="ml-2">
                    Dislikes: <span class="font-medium">{{ blog.disLikes.length }}</span>
                </div>
            </div>
        </div>
        <div class="w-full flex items-center mt-3">
            <div class="w-8 h-8 flex-none image-fit mr-3">
                <img alt="Midone Tailwind HTML Admin Template" class="rounded-full" :src="blog.images[0]" />
            </div>
            <div class="flex-1 relative text-slate-600 dark:text-slate-200">
                <input
                    type="text"
                    v-model="blog.comment"
                    class="form-control form-control-rounded border-transparent bg-slate-100 pr-10"
                    placeholder="Post a comment..."
                />
                <div class="w-4 h-4 absolute my-auto mr-3" style="top: -50px; right:50px">
                    <Icon @message-icon="addIconToComment(blog, $event)" @post-comment="postComment(blog._id, blog, $event)"></Icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BlogApi from '../../api-services/BlogApi'
import Icon from "../../components/icon/Main.vue"
import { format, formatDistanceToNow } from 'date-fns';

export default {
    components: {
        Icon,
    },
    data() {
        return {
            blog: []
        }
    },
    created() {
        this.getBlogById()
    },
    methods: {
        async getBlogById () {
            const id = new URLSearchParams(window.location.search).get('id')
            const res = await BlogApi.getBlogById(id)
            this.blog = res.blog
        },
        addEmoji(item, emoji) {
            if (item.comment === undefined) {
                item.comment = emoji.i;
            } else {
                item.comment += emoji.i;
            }
        },
        onToggle(id, event) {
            const yRelativeToDocument = event.clientY;
            const yRelativeToWindow = event.pageY;
            this.heightModal = yRelativeToWindow - yRelativeToDocument
            const className = 'closeMenu' + id
            const list = document.getElementsByClassName(className)
            const closeMenuArray = Array.from(list);
            closeMenuArray.map((item, index) => {
                item.classList.remove("show")
            });

            this.idDel = id
            this.isOpen = !this.isOpen
        },
        closeModal() {
            this.isOpen = !this.isOpen
        },
        formatDate(date) {
            const yourDate = new Date(date);
            const currentDate = new Date();

            const diffInDays = Math.floor((currentDate - yourDate) / (1000 * 60 * 60 * 24));

            let formattedDate;
            if (diffInDays < 1) {
                formattedDate = formatDistanceToNow(yourDate, { addSuffix: true });
            } else {
                formattedDate = format(yourDate, 'dd/MM/yyyy') + ' ' + formatDistanceToNow(yourDate, { addSuffix: true });
            }
            return formattedDate
        },
        addIconToComment(item, icon) {
            item.comment += icon;
        },
        postComment(_id, blog, event) {
            let params = {
                bid: _id,
                comment: blog.comment
            }
            BlogApi.commentBlog(params)
            this.listBlog.map(item => {
                if (item._id === _id) {
                    item.comments.push(params)
                }
            })
            blog.comment = ""
        },
    }
}
</script>

<style></style>
