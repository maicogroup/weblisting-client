<template>
  <ul
    class="
      items-center
      mx-auto
      flex
      justify-center
      mt-4
      text-stone-900
      bg-white
    "
  >
    <li>
      <a
        :class="`
          h-[40px]
          w-[40px]
          flex
          justify-center
          items-center
          ml-0
          leading-tight
          hover:bg-gray-300
          border border-stone-200
          rounded-l
          hover:cursor-pointer
          ${isInFirstPage ? 'disabled' : ''}
          `
        "
        href="#"
        @click="onClickFirstPage"
        :disabled="isInFirstPage"
        aria-label="Go to first page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
        </svg>
      </a>
    </li>

    <li>
      <a
        :class="`
          h-[40px]
          w-[40px]
          flex
          justify-center
          items-center
          ml-0
          leading-tight
          bg-white
          hover:bg-gray-300
          border border-stone-200
          hover:cursor-pointer
          ${isInFirstPage ? 'disabled' : ''}
        `"
        href="#"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        aria-label="Go to previous page"
      >
        <span class="sr-only">Previous</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </a>
    </li>

    <li
      v-show="currentPage >= 3 && totalPages > 4"
      class="
        h-[40px]
        w-[40px]
        flex
        justify-center
        items-center
        bg-white
        border border-stone-200
      "
    >
      ...
    </li>

    <li class="flex">
      <a
        v-for="page in pages"
        :key="page.name"
        :class="`${isPageActive(page.name)}`"
        @click="onClickPage(page.name)"
        href="#"
        :disabled="page.isDisabled"
        :aria-label="`Go to page number ${page.name}`"
      >
        {{ page.name }}
      </a>
    </li>

    <li
      v-show="currentPage <= totalPages - 2"
      class="
        h-[40px]
        w-[40px]
        flex
        justify-center
        items-center
        bg-white
        border border-stone-200
      "
    >
      ...
    </li>

    <li>
      <a
        :class="`
          h-[40px]
          w-[40px]
          flex
          justify-center
          items-center
          leading-tight
          bg-white
          text-white
          hover:bg-gray-300
          border border-stone-200
          hover:cursor-pointer
          ${isInLastPage ? 'disabled' : ''}
          `
        "
        @click="onClickNextPage"
        :disabled="isInLastPage"
        aria-label="Go to next page"
      >
        <span class="sr-only">Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </a>
    </li>

    <li>
      <a
        :class="`
          h-[40px]
          w-[40px]
          flex
          justify-center
          items-center
          leading-tight
          text-gray-500
          bg-white
          rounded-r
          border border-stone-200
          hover:bg-gray-300 hover:cursor-pointer
          ${isInLastPage ? 'disabled' : ''}
          `
        "
        @click="onClickLastPage"
        href="#"
        :disabled="isInLastPage"
        aria-label="Go to last page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
        </svg>
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  name: "pagination",
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    // totalPages: {
    //   type: Number,
    //   required: false,
    //   default: 0
    // },
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      itemActiveClass:
        "h-[40px] w-[40px] flex justify-center items-center bg-green-600 text-white border border-green-600 hover:cursor-pointer text-[14px] md:font-bold disabled-number",
      itemClass:
        "h-[40px] w-[40px] flex justify-center items-center bg-white border border-stone-200 hover:cursor-pointer hover:bg-gray-300 text-[14px] md:font-bold",
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.totalPages) {
        return Math.max(1, this.totalPages - this.maxVisibleButtons + 1);
      }

      return Math.max(1, this.currentPage - 1);
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickFirstPage() {
      if (this.isInFirstPage) return;
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      if (this.currentPage > 1) {
        this.$emit("pagechanged", this.currentPage - 1);
      }
    },
    onClickPage(page) {
      if (page == this.currentPage) return;
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit("pagechanged", this.currentPage + 1);
      }
    },
    onClickLastPage() {
      if (this.currentPage == this.totalPages) return;
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page ? this.itemActiveClass : this.itemClass;
    },
  },
};
</script>
<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}

.disabled{
  pointer-events: none;
  opacity: .5;
}

.disabled-number {
  pointer-events: none;
}
</style>
