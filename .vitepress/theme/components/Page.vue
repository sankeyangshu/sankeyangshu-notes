<template>
  <div class="page">
    <div class="blog-title">Blogs</div>
    <div class="blog-list" v-if="!isEmpty">
      <a class="blog" v-for="(item, index) in pageBlogs" :key="index" :href="item.url">
        <div class="title">{{ item.title }}</div>
        <div class="date">{{ item.date }}</div>
      </a>
    </div>
    <div class="empty" v-else>
      <p>Sorry, no blogs yet.</p>
    </div>
    <div class="pagination">
      <button class="left" v-if="hasPrevPage" @click="pageNumber--">&lt;</button>
      <div v-if="pageTotal > 1">{{ `${pageNumber}/${pageTotal}` }}</div>
      <button class="right" v-if="hasNextPage" @click="pageNumber++">&gt;</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { data } from '../posts.data';

// 博客列表
const blogs = data.map((blog) => {
  return {
    url: blog.url,
    title: blog.title,
    date: blog.date,
  };
});

// 是否存在博客
const isEmpty = blogs.length === 0;
// 分页-每页显示的博客数量
const pageSize = 5;
// 总页数
const pageTotal = Math.ceil(blogs.length / pageSize);
// 当前页码
const pageNumber = ref(1);

// 是否有下一页
const hasNextPage = computed(() => {
  return pageNumber.value < pageTotal;
});

// 是否有上一页
const hasPrevPage = computed(() => {
  return pageNumber.value > 1;
});

// 当前页的博客
const pageBlogs = computed(() => {
  const start = (pageNumber.value - 1) * pageSize;
  const end = Math.min(pageNumber.value * pageSize, blogs.length);
  return blogs.slice(start, end);
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  font-weight: bold;
  font-size: 1.2em;
}

.blog-title {
  font-size: 2rem;
  margin-top: 20px;
}

.blog-list {
  width: 100%;
  padding: 30px 0;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty {
  font-size: 1.5em;
}

.blog {
  width: 85%;
  display: block;
  border-radius: 10px;
  padding: 7px 20px;
  margin: 10px;
  background: var(--vp-c-bg);
  max-width: 600px;
  cursor: pointer;
  box-shadow: 8px 8px 16px var(--vp-c-bg-1), -8px -8px 16px var(--vp-c-bg-2);
}
.blog:hover {
  text-decoration: none;
  box-shadow: inset 8px 8px 16px var(--vp-c-bg-1), inset -8px -8px 16px var(--vp-c-bg-2);
}
.title {
  color: var(--vp-c-brand);
  font-size: 1.2em;
  font-weight: bold;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 40px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

button {
  display: inline-block;
  position: relative;
  color: var(--vp-c-brand);
  cursor: pointer;
  font-size: 1.2em;
  font-weight: bold;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg);
  box-shadow: 9px 9px 18px var(--vp-c-bg-1), -9px -9px 18px var(--vp-c-bg-2);
}

button:hover {
  box-shadow: inset 9px 9px 18px var(--vp-c-bg-1), inset -9px -9px 18px var(--vp-c-bg-2);
}

.left {
  position: absolute;
  left: 0;
}
.right {
  position: absolute;
  right: 0;
}
</style>
