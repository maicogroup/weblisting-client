/* eslint-disable no-unused-vars */
<template>
  <div class="w-full max-w-screen-xl px-4">
    <div class="z-10 w-full fixed left-0 top-after-header hidden md:flex space-x-4 bg-white shadow-sm px-4">
      <div class="double-button my-4 flex">
        <button :class="`text-base py-2 px-4 border rounded-l-md ${sellButtonClasses}`" @click="setFilterDemandOption('Bán')">
          Bán
        </button>
        <button :class="`text-base whitespace-nowrap py-2 px-4 border rounded-r-md ${rentButtonClasses}`" @click="setFilterDemandOption('Cho Thuê')">
          Cho thuê
        </button>
      </div>

      <div class="filter-search-bar relative my-4">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button class="p-1 text-gray-400 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </span>
        <input type="search" class="w-full border py-2 pl-10 pr-2 h-full rounded-md bg-white focus:text-gray-900 focus:outline-none" placeholder="Tìm kiếm...">
      </div>

      <div class="flex justify-between grow">
        <type-filter-dropdown :selected-option="inputFilter.type" @optionchanged="handleTypeFilterChanged" />
        <location-ftiler-dropdown :selected-option="inputFilter.location" @optionchanged="handleLocationFilterChanged" />
        <project-filter-dropdown :selected-option="inputFilter.project" @optionchanged="handleProjectFilterChanged" />
        <price-filter-dropdown :selected-option="inputFilter.priceRange" :demand="inputFilter.demand" @optionchanged="handlePriceFilterChanged" />
        <acreage-filter-dropdown :selected-option="inputFilter.acreageRange" @optionchanged="handleAcreageFilterChanged" />
        <direction-filter-dropdown :selected-option="inputFilter.directions" @optionchanged="handleDirectionFilterChanged" />
        <bedroom-filter-dropdown :selected-option="inputFilter.bedroomOptions" @optionchanged="handleBedroomFilterChanged" />
      </div>

      <button class="my-auto text-gray-600 hover:text-gray-800 px-2 h-fit" @click="resetFilter">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      <button class="whitespace-nowrap ml-12 rounded-md px-6 bg-red-600 hover:bg-red-700 font-semibold text-white my-4" @click="handleFilterButtonPressed">
        Tìm kiếm
      </button>
    </div>
    <div class="relative my-4">
      <div class="w-full block md:hidden" @click="openCloseMobileFilter">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button class="p-1 text-gray-400 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <h4 class="focus:text-gray-900 focus:outline-none text-gray-400">Tìm kiếm</h4>
        </span>
        <input type="button" class="w-full border py-2 pl-10 pr-2 h-full rounded-md" placeholder="Tìm kiếm...">
      </div>
    </div>
    <div class="filter-bar-blank-space hidden md:block" />
    <ProjectHeader v-if="showIfPostsOfOneProject" :project="project" />
    <Divider v-if="showIfPostsOfOneProject" class="mt-7 mb-1.5" />
    <div class="flex justify-between w-full">
      <ListPost v-if="waitTillProjectIsDetermined" class="left-0" :filter="filter" />
      <div class="ml-9 mt-14 hidden lg:block">
        <ContactInfor />
        <div class="border mt-4 p-4 rounded">
          <p class="font-bold mb-2">
            Xem theo giá
          </p>
          <div v-if="filter.demand === 'Cho Thuê'">
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: undefined, gtln: 3})">
              Dưới 3 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 3, gtln: 5})">
              Từ 3 - 5 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 5, gtln: 7})">
              Từ 5 - 7 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 7, gtln: 10})">
              Từ 7 - 10 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 10, gtln: 15})">
              Từ 10 - 15 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 15, gtln: 20})">
              Từ 15 - 20 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 20, gtln: 30})">
              Từ 20 - 30 triệu
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 30, gtln: undefined})">
              Trên 30 triệu
            </quick-filter-button>
          </div>
          <div v-else>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: undefined, gtln: 1})">
              Dưới 1 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 1, gtln: 2})">
              Từ 1 tỷ - đến 2 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 2, gtln: 3})">
              Từ 2 tỷ - đến 3 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 3, gtln: 5})">
              Từ 3 tỷ - đến 5 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 5, gtln: 7})">
              Từ 5 tỷ - đến 7 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 7, gtln: 10})">
              Từ 7 tỷ - đến 10 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 10, gtln: 20})">
              Từ 10 tỷ - đến 20 tỷ
            </quick-filter-button>
            <quick-filter-button @click="updateUrlQueryAndNavigate({gtnn: 20, gtln: undefined})">
              Trên 20 tỷ
            </quick-filter-button>
          </div>
        </div>

        <div class="border mt-4 p-4 rounded">
          <p class="font-bold mb-2">
            Xem theo diện tích
          </p>
          <quick-filter-button @click="updateUrlQueryAndNavigate({dtnn: undefined, dtln: 30})">
            Dưới 30 m²
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({dtnn: 30, dtln: 50})">
            Từ 30 - 50 m²
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({dtnn: 50, dtln: 70})">
            Từ 50 - 70 m²
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({dtnn: 70, dtln: 100})">
            Từ 70 - 100 m²
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({dtnn: 100, dtln: undefined})">
            Trên 100 m²
          </quick-filter-button>
        </div>

        <div class="border mt-4 p-4 rounded">
          <p class="font-bold mb-2">
            Xem theo phòng ngủ
          </p>
          <quick-filter-button @click="updateUrlQueryAndNavigate({slpn: ['1']})">
            1 phòng ngủ
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({slpn: ['2']})">
            2 phòng ngủ
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({slpn: ['3']})">
            3 phòng ngủ
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({slpn: ['4']})">
            4 phòng ngủ
          </quick-filter-button>
          <quick-filter-button @click="updateUrlQueryAndNavigate({slpn: ['5+']})">
            5+ phòng ngủ
          </quick-filter-button>
        </div>
      </div>
    </div>
    <div v-if="project && showIfPostsOfOneProject">
      <div
        class="rounded-lg border w-4/5 mr-auto ml-auto mt-9 mb-5"
        v-html="project.sEOContent"
      />
    </div>
    <div
      v-if="filterResponsive == true"
      class="fixed inset-0 h-full w-full z-30 bg-white opacity-100"
    >
      <div class="flex justify-between mt-5 items-center mb-4">
        <h4 class="mr-auto ml-auto text-base">
          Tìm kiếm bất động sản
        </h4>
        <div class="absolute right-3" @click="openCloseMobileFilter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f71e1e"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
        </div>
      </div>
      <div class="relative mx-2.5">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button class="p-1 text-gray-400 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </span>
        <input type="search" class="w-full border py-2 pl-10 pr-2 h-11 rounded-md bg-white focus:text-gray-900 focus:outline-none" placeholder="Tìm kiếm...">
      </div>
      <div class="double-button my-4 flex mx-2.5">
        <button :class="`grow text-base py-2 px-4 border rounded-l-md ${sellButtonClasses}`" @click="setFilterDemandOption('Bán')">
          Bán
        </button>
        <button :class="`grow text-base whitespace-nowrap py-2 px-4 border rounded-r-md ${rentButtonClasses}`" @click="setFilterDemandOption('Cho Thuê')">
          Cho thuê
        </button>
      </div>
      <div class="mx-2.5">
        <type-filter-option :selected-option="inputFilter.type" @optionchanged="handleTypeFilterChanged" />

        <location-filter-option :selected-option="inputFilter.location" @optionchanged="handleLocationFilterChanged" />

        <price-filter-option :selected-option="inputFilter.priceRange" :demand="inputFilter.demand" @optionchanged="handlePriceFilterChanged" />

        <acreage-filter-option :selected-option="inputFilter.acreageRange" @optionchanged="handleAcreageFilterChanged" />

        <project-filter-option :selected-option="inputFilter.project" @optionchanged="handleProjectFilterChanged" />

        <direction-filter-options :selected-option="inputFilter.directions" @optionchanged="handleDirectionFilterChanged" />

        <bedroom-filter-options :selected-option="inputFilter.bedroomOptions" @optionchanged="handleBedroomFilterChanged" />
      </div>
      <div class="mx-2.5 flex space-x-2">
        <button class="px-6 py-2 shrink-0 border rounded-md my-4 hover:bg-gray-100" @click="resetFilter">
          Đặt lại
        </button>
        <button class="grow whitespace-nowrap rounded-md px-6 py-2 bg-green-500 hover:bg-green-700 text-white my-4" @click="handleFilterButtonPressed">
          Tìm kiếm
        </button>
      </div>

      <!-- <p class="mb-4">
        Bạn phải chọn <span><p class="text-sky-500">Khu vực</p></span> trước
      </p> -->
    </div>

    // chon khu vuc mobile
    <div
      v-if="isShowArea"
      class="fixed inset-0 mt-12 w-full z-30 bg-white opacity-100 overflow-auto"
    >
      <div
        class="flex justify-between"
      >
        <h4 class="mr-auto ml-auto">
          Chọn khu vực
        </h4>
        <div
          @click="isShowArea = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#32c82b"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ><path d="M19 12H6M12 5l-7 7 7 7" /></svg>
        </div>
      </div>
      <div class="relative my-4 w-full">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button class="p-1 text-gray-400 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </span>
        <input type="search" class="w-full border py-2 pl-10 pr-2 h-full rounded-md bg-white focus:text-gray-900 focus:outline-none" placeholder="Tìm kiếm Tỉnh/Thành phố">
      </div>
      <div
        class="flex justify-between"
        @click="isShowDistrict = true"
      >
        <p>TP Hồ Chí Minh</p>
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 13L7 7L1 1" stroke="#999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>

    // show district
    <div
      v-if="isShowDistrict"
      class="fixed inset-0 mt-12 w-full z-30 bg-white opacity-100 overflow-auto"
    >
      <div
        class="flex justify-between"
      >
        <h4 class="mr-auto ml-auto">
          TP. Hồ Chí Minh
        </h4>
        <div
          @click="isShowDistrict = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 relative"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="relative my-4 w-full">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button class="p-1 text-gray-400 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </span>
        <input type="search" class="w-full border py-2 pl-10 pr-2 h-full rounded-md bg-white focus:text-gray-900 focus:outline-none" placeholder="Tìm kiếm Tỉnh/Thành phố">
      </div>
      <div
        class="flex justify-between"
      >
        <p>Quận 9</p>
        <input type="radio" checked="checked">
      </div>
    </div>

    //chon khoang gia
    <div
      v-if="isShowPriceRange"
      class="fixed inset-0 mt-12 w-full z-30 bg-white opacity-100 overflow-auto"
    >
      <div
        class="flex justify-between"
      >
        <h4 class="mr-auto ml-auto">
          Chọn giá
        </h4>
        <div
          @click="isShowPriceRange = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 relative"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="ml-auto mr-auto flex justify-center items-center px-6 mt-3">
        <label class="flex items-center">
          <input class="w-14 px-2 py-1 text-center text-sm border rounded-md outline-none">
          <p>triệu</p>
        </label>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 12H4" />
        </svg>
        <label class="flex items-center">
          <input class="w-14 px-2 py-1 text-center text-sm border rounded-md outline-none">
          <p>triệu</p>
        </label>
      </div>
      <div
        class="flex justify-between"
      >
        <p>Tất cả</p>
        <input type="radio" checked="checked">
      </div>
    </div>

    //chon khoang dien tich
    <div
      v-if="isShowAcreage"
      class="fixed inset-0 mt-12 w-full z-30 bg-white opacity-100 overflow-auto"
    >
      <div
        class="flex justify-between"
      >
        <h4 class="mr-auto ml-auto">
          Chọn diện tích
        </h4>
        <div
          @click="isShowAcreage = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 relative"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="ml-auto mr-auto flex justify-center items-center px-6 mt-3">
        <label class="flex items-center">
          <input class="w-14 px-2 py-1 text-center text-sm border rounded-md outline-none">
          <p>m²</p>
        </label>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 12H4" />
        </svg>
        <label class="flex items-center">
          <input class="w-14 px-2 py-1 text-center text-sm border rounded-md outline-none">
          <p>m²</p>
        </label>
      </div>
      <div
        class="flex justify-between"
      >
        <p>Tất cả</p>
        <input type="radio" checked="checked">
      </div>
    </div>

    //chon khoang du an
    <div
      v-if="isShowProject"
      class="fixed inset-0 mt-12 w-full z-30 bg-white opacity-100 overflow-auto"
    >
      <div
        class="flex justify-between"
      >
        <h4 class="mr-auto ml-auto">
          Chọn dự án
        </h4>
        <div
          @click="isShowProject = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 relative"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div class="relative my-4 w-full">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <button class="p-1 text-gray-400 focus:outline-none focus:shadow-outline">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </span>
        <input type="search" class="w-full border py-2 pl-10 pr-2 h-full rounded-md bg-white focus:text-gray-900 focus:outline-none" placeholder="Tìm kiếm dự án">
      </div>
      <div
        class="flex justify-between"
      >
        <p>Tất cả</p>
        <input type="radio" checked="checked">
      </div>
    </div>

    //chon huong
    <div
      v-if="isShowDirection"
      class="fixed inset-0 mt-12 w-full z-30 bg-white opacity-100 overflow-auto"
    >
      <div
        class="flex justify-between"
      >
        <h4 class="mr-auto ml-auto">
          Chọn hướng
        </h4>
        <div
          @click="isShowDirection = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 relative"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div
        class="flex justify-between"
      >
        <p>Tất cả</p>
        <input type="radio" checked="checked">
      </div>
    </div>

    //chon so phong
    <div
      v-if="isShowRoomOption"
      class="fixed inset-0 mt-12 w-full z-30 bg-white opacity-100 overflow-auto"
    >
      <div
        class="flex justify-between"
      >
        <h4 class="mr-auto ml-auto">
          Chọn số phòng ngủ
        </h4>
        <div
          @click="isShowRoomOption = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 relative"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
      <div
        class="flex justify-between"
      >
        <p>Tất cả</p>
        <input type="radio" checked="checked">
      </div>
    </div>
  </div>
</template>

<script>
import { gql } from 'graphql-tag';

import { marked } from 'marked';
import ProjectHeader from './components/ProjectHeader.vue';
import ListPost from './components/ListPost.vue';
import ContactInfor from './components/ContactInfor.vue';
import LocationFtilerDropdown from './components/filtering/location-filter-dropdown.vue';
import ProjectFilterDropdown from './components/filtering/project-filter-dropdown.vue';
import DirectionFilterDropdown from './components/filtering/direction-filter-dropdown.vue';
import TypeFilterDropdown from './components/filtering/type-filter-dropdown.vue';
import PriceFilterDropdown from './components/filtering/price-filter-dropdown.vue';
import AcreageFilterDropdown from './components/filtering/acreage-filter-dropdown.vue';
import BedroomFilterDropdown from './components/filtering/bedroom-filter-dropdown.vue';
import QuickFilterButton from './components/quick-filter-button.vue';
import TypeFilterOption from './components/responsive-filtering/type-filter-option.vue';
import LocationFilterOption from './components/responsive-filtering/location-filter-option.vue';
import PriceFilterOption from './components/responsive-filtering/price-filter-option.vue';
import AcreageFilterOption from './components/responsive-filtering/acreage-filter-option.vue';
import DirectionFilterOptions from './components/responsive-filtering/direction-filter-options.vue';
import ProjectFilterOption from './components/responsive-filtering/project-filter-option.vue';
import BedroomFilterOptions from './components/responsive-filtering/bedroom-filter-options.vue';
import Divider from '~/components/Divider.vue';

export default {
  name: 'PostList',
  components: { ProjectHeader, ListPost, ContactInfor, Divider, LocationFtilerDropdown, ProjectFilterDropdown, DirectionFilterDropdown, TypeFilterDropdown, PriceFilterDropdown, AcreageFilterDropdown, BedroomFilterDropdown, QuickFilterButton, TypeFilterOption, LocationFilterOption, PriceFilterOption, AcreageFilterOption, ProjectFilterOption, DirectionFilterOptions, BedroomFilterOptions },
  data () {
    return {
      // filter dùng để lọc
      filter: null,
      // filter đang được người dùng chỉnh sửa, chuẩn bị dùng để lọc
      inputFilter: {},
      searchButtonPressed: false,
      tempSEOContent: '**Hello World**',
      filterResponsive: false,
      isShowApartmentType: false,
      isShowArea: false,
      isShowDistrict: false,
      isShowPriceRange: false,
      isShowAcreage: false,
      isShowProject: false,
      isShowDirection: false,
      isShowRoomOption: false
    };
  },

  head () {
    let title;
    if (this.$route.params.slug) {
      title = this.project?.pageInfors.find(c => c.slug.includes(this.$route.params.slug)).title;
    } else {
      const type = this.filter.type ?? 'căn hộ';
      const demand = this.filter.demand;

      let price = '';
      if (this.filter.priceRange) {
        const unit = demand === 'Bán' ? 'tỷ' : 'triệu';
        const { from, to } = this.filter.priceRange;
        if (from && to) {
          price = `, giá từ ${from} ${unit} đến ${to} ${unit}`;
        } else if (from) {
          price = `, giá trên ${from} ${unit}`;
        } else {
          price = `, giá dưới ${to} ${unit}`;
        }
      }

      let acreage = '';
      if (this.filter.acreageRange) {
        const { from, to } = this.filter.acreageRange;
        if (from && to) {
          acreage = `, diện tích từ ${from} m² đến ${to} m²`;
        } else if (from) {
          acreage = `, diện tích trên ${from} m²`;
        } else {
          acreage = `, diện tích dưới ${to} m²`;
        }
      }

      title = `${demand} nhà đất ${type}${price}${acreage}`;
    }

    return {
      title,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.project?.pageInfors.find(c => c.slug.includes(this.$route.params.slug)).metaDescription
      }]
    };
  },

  computed: {
    waitTillProjectIsDetermined () {
      if (this.$route.params.slug) {
        return this.filter?.project?.id !== null;
      }

      return this.filter !== null;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    markdownToHtml () {
      return marked(this.tempSEOContent);
    },
    showIfPostsOfOneProject () {
      return this.$route.params.slug !== undefined;
    },

    sellButtonClasses () {
      return this.inputFilter.demand === 'Bán' ? 'bg-gray-200' : 'hover:bg-gray-100';
    },

    rentButtonClasses () {
      return this.inputFilter.demand !== 'Bán' ? 'bg-gray-200' : 'hover:bg-gray-100';
    }
  },

  created () {
    if (process.server) {
      // không rõ tại sao nhưng server created sẽ đc gọi trước apollo
      this.filter = this.createFilterFromUrl();
      this.inputFilter = { ...this.filter };
    } else {
      // còn bên client thì ngược lại: apollo đc gọi trước created
      this.filter = { ...this.createFilterFromUrl(), ...this.filter };
      this.inputFilter = { ...this.filter };
    }

    this.$watch(
      () => this.$route.params,
      (param, prevParam) => {
        if (param.slug !== prevParam.slug && param.slug !== null) {
          this.$apollo.queries.project.refetch({ slug: param.slug });
        }

        const newFilter = this.createFilterFromUrl();
        if (param.slug === prevParam.slug && param.slug !== null) {
          // do thông tin project sẽ không bị load lại nên lấy thông tin project cũ
          newFilter.project = this.filter.project;
        }

        this.filter = newFilter;
        this.inputFilter = { ...newFilter };
      }
    );
  },

  apollo: {
    project: {
      query () {
        return gql`
              query GetProjects($slug: String!) {
                projects(where: { pageInfors: { some: { slug: { eq: $slug }}} }) {
                  id
                  projectName
                  address {
                    street
                    district
                    city
                    googleMapLocation
                  }
                  images
                  sEOContent
                  pageInfors{
                    title
                    slug
                    metaDescription
                  }
                }
            }`;
      },

      update (data) {
        const project = data.projects[0];

        this.filter = { ...this.filter, project: { pageInfor: { slug: this.$route.params.slug }, id: project.id, projectName: project.projectName } };
        this.inputFilter = { ...this.filter };

        return project;
      },

      skip () {
        return this.$route.params.slug === undefined;
      },

      variables () {
        return {
          slug: this.$route.params.slug
        };
      }
    }
  },

  methods: {
    setFilterDemandOption (option) {
      this.inputFilter.demand = option;
    },

    resetFilter () {
      this.inputFilter = { demand: 'Cho Thuê' };
    },

    openCloseMobileFilter () {
      this.filterResponsive = !this.filterResponsive;
    },

    createFilterFromUrl () {
      const filter = {};
      const query = this.$route.query;

      filter.demand = query.demand ?? 'Cho Thuê';
      filter.type = query.type;

      if (query.city || query.district) {
        filter.location = {
          city: query.city,
          district: query.district
        };
      }

      if (query.priceFrom || query.priceTo) {
        const parsedPriceFrom = parseInt(query.priceFrom);
        const parsedPriceTo = parseInt(query.priceTo);

        filter.priceRange = {
          from: isNaN(parsedPriceFrom) ? null : parsedPriceFrom,
          to: isNaN(parsedPriceTo) ? null : parsedPriceTo
        };
      }

      if (query.acreageFrom || query.acreageTo) {
        const parsedAcreageFrom = parseInt(query.acreageFrom);
        const parsedAcreageTo = parseInt(query.acreageTo);

        filter.acreageRange = {
          from: isNaN(parsedAcreageFrom) ? null : parsedAcreageFrom,
          to: isNaN(parsedAcreageTo) ? null : parsedAcreageTo
        };
      }

      if (query.directions) {
        filter.directions = Array.isArray(query.directions) ? query.directions : [query.directions];
      }

      if (query.bedroomOptions) {
        filter.bedroomOptions = Array.isArray(query.bedroomOptions) ? query.bedroomOptions : [query.bedroomOptions];
      }

      return filter;
    },

    handleTypeFilterChanged (type) {
      this.inputFilter = { ...this.inputFilter, type };
    },

    handleLocationFilterChanged (location) {
      this.inputFilter = { ...this.inputFilter, location };
    },

    handleProjectFilterChanged (project) {
      this.inputFilter = { ...this.inputFilter, project };
    },

    handlePriceFilterChanged (priceRange) {
      this.inputFilter = { ...this.inputFilter, priceRange };
    },

    handleAcreageFilterChanged (acreageRange) {
      this.inputFilter = { ...this.inputFilter, acreageRange };
    },

    handleDirectionFilterChanged (directions) {
      this.inputFilter = { ...this.inputFilter, directions };
    },

    handleBedroomFilterChanged (bedroomOptions) {
      this.inputFilter = { ...this.inputFilter, bedroomOptions };
    },

    handleFilterButtonPressed () {
      this.searchButtonPressed = true;
      this.filter = { ...this.inputFilter };
      this.filterResponsive = false;

      let path = '/danh-sach-can-ho';
      if (this.filter.project) {
        path = path + '/' + this.filter.project.pageInfor.slug;
      }

      const query = {};

      if (this.filter.demand) {
        query.demand = this.filter.demand;
      }

      if (this.filter.type) {
        query.type = this.filter.type;
      }

      if (this.filter.location) {
        const location = this.filter.location;
        query.city = location.city;
        query.district = location.district;
      }

      if (this.filter.priceRange) {
        const { from, to } = this.swapRangeValueIfInvalid(this.filter.priceRange);

        if (from) {
          query.priceFrom = from;
        }

        if (to) {
          query.priceTo = to;
        }
      }

      if (this.filter.acreageRange) {
        const { from, to } = this.swapRangeValueIfInvalid(this.filter.acreageRange);

        if (from) {
          query.acreageFrom = from;
        }

        if (to) {
          query.acreageTo = to;
        }
      }

      if (this.filter.directions) {
        query.directions = this.filter.directions;
      }

      if (this.filter.bedroomOptions) {
        query.bedroomOptions = this.filter.bedroomOptions;
      }

      this.$router.push({ path, query });
    },

    /** trường hợp người dùng bấm tìm kiếm trước khi range được swap bởi filter dropdown */
    swapRangeValueIfInvalid (range) {
      const bothAreNumber = range.from !== null && range.to !== null;

      if (bothAreNumber && range.to - range.from < 0) {
        return { from: range.to, to: range.from };
      }

      return range;
    },

    /** các query được đưa vào sẽ dùng để sửa giá trị của các query hiện tại hoặc thêm query mới cho url */
    updateUrlQueryAndNavigate (query) {
      this.$router.push({ path: this.$route.path, query: { ...this.$route.query, ...query } })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
.filter-bar-blank-space {
  height: 42px;
}

.filter-search-bar {
  min-width: 8rem;
  max-width: 12rem;
}

.top-after-header {
  top: 73px;
}

.double-button {
  font-size: 0;
}

.bg-black-73{
  background: #000000BA;
}
</style>
