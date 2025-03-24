<script setup>
import { ref, onMounted, computed } from 'vue';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import toc from 'markdown-it-toc-done-right';
import anchor from 'markdown-it-anchor';

const renderedContent = ref('');

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, {
          language: lang,
          ignoreIllegals: true
        }).value}</code></pre>`;
      } catch (__) { }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
}).use(anchor, {
  // 锚点配置
  permalink: anchor.permalink.headerLink({
    class: 'header-anchor', // 锚点链接的 class
    symbol: '#' // 显示在标题旁的符号
  })
}).use(toc, {
  // TOC 配置
  containerClass: 'table-of-contents', // TOC 容器的 class
  listType: 'ul', // 列表类型
  level: [1, 2, 3, 4, 5, 6] // 只包含 h2 和 h3
});

onMounted(async () => {
  try {
    const response = await fetch('/src/assets/md/test.md');
    if (!response.ok) throw new Error('Network response was not ok');
    renderedContent.value = md.render(await response.text()); // 高亮已在 markdown-it 处理
  } catch (error) {
    console.error('Error:', error);
    // 可添加用户提示，如 Toast 或占位符
  }
});
</script>

<template>
  <div class="article-container">
    <div class="markdown-content" v-html="renderedContent"></div>
  </div>
</template>

<style lang="scss">
.article-container {
  width: 1200px;
  margin: 10px auto;

  .markdown-content {
    width: 1000px;
    background-color: #eee;
    padding: 0px 50px 20px 50px;
    margin: 0 auto;

    * {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #333;
    }

    h1,
    h2,
    h3 {
      font-weight: 600;
      margin: 1.5em 0 1em;
      color: #222;
    }

    h1 {
      font-size: 2em;
    }

    h2 {
      font-size: 1.75em;
    }

    h3 {
      font-size: 1.5em;
    }

    p {
      margin-bottom: 1.2em;
    }

    a {
      color: #0366d6;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    pre {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 6px;
      margin: 1.5rem 0;
      overflow-x: auto;

      code {
        font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
        font-size: 14px;
      }
    }

    code:not(pre code) {
      background: #f3f4f6;
      padding: 0.2em 0.4em;
      border-radius: 4px;
      color: #d6336c;
    }

    blockquote {
      border-left: 4px solid #dee2e6;
      margin: 1.5em 0;
      padding: 0.5em 1em;
      color: #6c757d;
      background: #f8f9fa;
    }

    table {
      width: 100%;
      margin: 2em 0;
      border-collapse: collapse;

      th,
      td {
        padding: 0.75em;
        border: 1px solid #dee2e6;
      }

      th {
        background-color: #f8f9fa;
        font-weight: 600;
      }
    }

    img {
      max-width: 100%;
      height: auto;
      margin: 1.5em 0;
      border-radius: 4px;
    }
  }
}
</style>