<template>
  <div class="vue-expand-panel p-2 h-auto">
    <h1 class="text-center font-bold text-lg mb-5">
      CHỈNH SỬA DỰ ÁN
    </h1>
    <div class="flex items-center justify-center">
      <project-filter-dropdown :selected-option="inputFilter.project" @optionchanged="handleProjectFilterChanged" />
    </div>
    <div class="w-auto h-auto p-2 border-2 rounded m-5">
      <h1 class="font-semidbold text-lg">
        {{ project.projectName }}
      </h1>
      <div class="p-2 h-auto" style="width:1000px;">
        <expand-panel title="Thông tin">
          <div>
            <p class="mb-2">
              <label class="font-semibold">Tên dự án:</label>
              <input v-model="project.projectName" type="text" class="w-1/2" @change="() => flags.information = true">
            </p>
            <p class="mb-2">
              <label class="font-semibold">Pháp lý:</label>
              <input v-model="project.juridical" type="text" class="w-1/2" @change="() => flags.information = true">
            </p>
            <div class="flex items-start justify-between">
              <div>
                <label class="font-semibold">Chủ đầu tư:</label>
                <select v-model="project.investorId">
                  <option v-for="investor in investors" :key="investor.id" :value="investor.id">
                    {{ investor.investorName }}
                  </option>
                </select>
              </div>
              <button name="edit-button" @click="ShowModalEditInvestor">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" /><polygon points="18 2 22 6 12 16 8 16 8 12 18 2" /></svg>
              </button>
            </div>
            <p>
              <label class="font-semibold">Mô tả:</label>
              <textarea v-model="project.description" type="text" class="w-1/2" rows="4" @change="() => flags.information = true" />
            </p>
            <p>
              <label class="font-semibold">Mặt bằng:</label>
            </p>
            <div class="items-start flex">
              <img
                onerror="this.onerror=null; this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC'"
                class="h-48 sm:h-96 w-full mr-4"
                :src="project.masterPlan"
                alt="cay xoai"
              >
              <button name="edit-button" @click="() => $modal.show('edit-project-master-plan')">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" /><polygon points="18 2 22 6 12 16 8 16 8 12 18 2" /></svg>
              </button>
            </div>
          </div>
          <div class="flex justify-end my-2">
            <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectInformation">
              Cập nhật
            </button>
          </div>
        </expand-panel>
        <expand-panel title="Thông tin chi tiết">
          <div class="flex justify-end items-center">
            <input v-model="tempInfor" type="text" class="w-auto my-2" placeholder="Thêm thông tin">
            <button @click="addNewTempInfor">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-3"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
            </button>
          </div>
          <div class="grid grid-cols-4">
            <div>
              <p class="font-semibold">
                Giá
              </p>
              <input v-model="project.price" class="w-auto" type="number" @change="() => flags.detailInformation = true">
            </div>
            <div>
              <p class="font-semibold">
                Số căn hộ
              </p>
              <input v-model="project.numberOfApartments" class="w-auto" type="number" @change="() => flags.detailInformation = true">
            </div>
            <div>
              <p class="font-semibold">
                Diện tích
              </p>
              <input v-model="project.acreage" class="w-auto" type="number" @change="() => flags.detailInformation = true">
            </div>
            <div>
              <p class="font-semibold">
                Số tòa
              </p>
              <input v-model="project.numberOfBuildings" class="w-auto" type="number" @change="() => flags.detailInformation = true">
            </div>
            <div v-for="(item, index) in project.tempProjectInfors" :key="index">
              <div class="flex justify-between items-center">
                <p class="font-semibold mr-4">
                  {{ item.inforName }}
                </p>
                <button class="pr-9" @click="deleteTempInfor(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                </button>
              </div>
              <input v-model="item.inforContent" class="w-auto" type="text" @change="() => flags.detailInformation = true">
            </div>
          </div>
          <div class="flex justify-end my-2">
            <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectDetailInformation">
              Cập nhật
            </button>
          </div>
        </expand-panel>
        <expand-panel title="Địa chỉ">
          <div>
            <p class="mb-2">
              <label class="font-semibold">Tên đường:</label>
              <input v-model="project.address.street" type="text" class="w-1/2" @change="() => flags.address = true">
            </p>
            <p class="mb-2">
              <label class="font-semibold">Quận:</label>
              <input v-model="project.address.district" type="text" class="w-1/2" @change="() => flags.address = true">
            </p>
            <p class="mb-2">
              <label class="font-semibold">Thành phố: </label>
              <input v-model="project.address.city" type="text" class="w-1/2" @change="() => flags.address = true">
            </p>
          </div>
          <div>
            <label class="font-semibold flex items-center">
              Google Map: &nbsp;&nbsp;
              <button @click="() => $modal.show('google-map-edit-modal')">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" /><polygon points="18 2 22 6 12 16 8 16 8 12 18 2" /></svg>
              </button>
            </label>
            <div v-if="project.address.googleMapLocation !== null && project.address.googleMapLocation.includes('https')">
              <iframe :src="project.address.googleMapLocation" width="100%" height="400px" loading="lazy" />
            </div>
            <div v-else>
              <em>
                chưa có hoặc sai!
              </em>
            </div>
          </div>
          <div class="flex justify-end my-2">
            <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectAddress">
              Cập nhật
            </button>
          </div>
        </expand-panel>

        <expand-panel title="Tiện ích">
          <p>
            <label for="meta" class="font-semibold">Tiện ích vị trí:</label>
            <textarea v-model="project.utilities.locationUtilities" type="text" class="w-1/2" rows="4" @change="() => flags.utilities = true" />
          </p>
          <p>
            <label for="meta" class="font-semibold">Tiện ích nội khu:</label>
            <textarea v-model="project.utilities.internalUtilities" type="text" class="w-1/2" rows="4" @change="() => flags.utilities = true" />
          </p>
          <div class="flex justify-between items-start">
            <label for="meta" class="font-semibold">Danh sách tiện ích:</label>
            <div class="flex justify-start items-center">
              <input v-model="tempUtility" type="text" class="w-auto my-2" placeholder="Thêm tiện ích mới">
              <button @click="addNewUtility">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ml-3"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
              </button>
            </div>
          </div>
          <ul class="grid grid-cols-3">
            <li v-for="(utility, index) in project.utilities.listOfUtilities" :key="utility" class="flex justify-start items-center">
              <label class="mr-3"> {{ utility }} </label>
              <button @click="deleteUtility(index)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
              </button>
            </li>
          </ul>
          <div class="flex justify-end space-x-1">
            <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectUtilities">
              Cập nhật
            </button>
          </div>
        </expand-panel>

        <expand-panel title="Hình ảnh">
          <div class="flex justify-start items-center">
            <input v-model="newImage" type="text" class="w-1/5 my-2" placeholder="Thêm hình ảnh mới">
            <button @click="addNewProjectImage">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-3"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
            </button>
          </div>
          <div class="container mt-3" style="float:left;">
            <div v-for="(item, index) in project.images" :key="index" class="w-100 mx-2" style="float:left">
              <img
                onerror="this.onerror=null; this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC'"
                class="w-40 h-32 mr-2 my-2"
                :src="item"
              >
              <div class="flex justify-evenly">
                <button name="edit-button" @click="showUpdateProjectImageModal(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" /><polygon points="18 2 22 6 12 16 8 16 8 12 18 2" /></svg>
                </button>
                <button name="delete" @click="showDeleteProjectImageModal(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                </button>
              </div>
            </div>
          </div>
        </expand-panel>
        <expand-panel title="Thông tin SEO">
          <div class="my-2">
            <button class="px-3 py-1 bg-gray-300 rounded" @click="() => $modal.show('add-new-page-information')">
              Thêm thông tin mới
            </button>
          </div>
          <div v-for="(item, index) in project.pageInfors" :key="index" class="container mb-5">
            <div class="flex justify-between items-center">
              <p>{{ item.title }}</p>
              <div class="flex justify-around items-center space-x-1">
                <button name="edit-page-infor" @click="showPageInforModal(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" /><polygon points="18 2 22 6 12 16 8 16 8 12 18 2" /></svg>
                </button>
                <button v-if="index == 0" name="delete" @click="sendWarningNotification('Không được xóa thông tin này!')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                </button>
                <button v-else name="delete" @click="showDeletePageInforModal(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                </button>
              </div>
            </div>
          </div>
        </expand-panel>

        <expand-panel title="Nội dung SEO">
          <div>
            <client-only>
              <editor
                :content="project.sEOContent"
                class="h-auto mb-11"
                @text-change="((e) => {
                  if (e != project.sEOContent) {
                    flags.information = true;
                    project.sEOContent = e;
                  }
                })"
              />
            </client-only>
            <button class="text-white px-3 py-1 bg-green-400 rounded relative float-right mt-3.5" @click="updateProjectInformation">
              Cập nhật
            </button>
          </div>
        </expand-panel>

        <expand-panel title="Tổng quan">
          <div style="">
            <client-only>
              <editor
                :content="project.projectPost"
                class="h-auto mb-11"
                @text-change="((e) => {
                  if (e != project.projectPost)
                  {
                    project.projectPost = e;
                    flags.projectPost = true;
                  }
                })"
              />
            </client-only>
            <button class="text-white px-3 py-1 bg-green-400 rounded relative float-right mt-3.5" @click="updateProjectPost">
              Cập nhật
            </button>
          </div>
        </expand-panel>
      </div>
    </div>
    <modal name="page-information-detail">
      <h2 class="mt-2 text-lg font-semibold text-center">
        Chỉnh sửa thông tin SEO
      </h2>
      <div class="p-2 m-2">
        <p class="mb-3">
          <label for="title" class="font-semibold">Tiêu đề:</label>
          <input v-model="project.pageInfors[pageInforIndex].title" type="text" class="w-1/2" style="width: 50% !important" @change="() => flags.pageInfor = true">
        </p>

        <p class="mb-3">
          <label for="slug" class="font-semibold">Slug:</label>
          <input v-model="project.pageInfors[pageInforIndex].slug" type="text" class="w-1/2" style="width: 50% !important" @change="() => flags.pageInfor = true">
        </p>

        <p>
          <label for="meta" class="font-semibold">Meta description:</label>
          <textarea v-model="project.pageInfors[pageInforIndex].metaDescription" type="text" class="w-1/2" rows="4" @change="() => flags.pageInfor = true" />
        </p>
        <div class="flex justify-end space-x-3 my-2">
          <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('page-information-detail')">
            Quay lại
          </button>
          <button class="px-3 py-1 bg-green-400 rounded" @click="updatePageInformation">
            Đồng ý
          </button>
        </div>
      </div>
    </modal>
    <modal name="delete-page-information">
      <h2 class="mt-2 text-lg font-semibold text-center">
        Bạn có chắc chắn muốn xóa?
      </h2>
      <div class="p-2 m-2">
        <p class="mb-3">
          <label for="title" class="font-semibold">Tiêu đề:</label>
          <input v-model="project.pageInfors[pageInforIndex].title" type="text" class="w-1/2" style="width: 50% !important" disabled>
        </p>

        <p class="mb-3">
          <label for="slug" class="font-semibold">Slug:</label>
          <input v-model="project.pageInfors[pageInforIndex].slug" type="text" class="w-1/2" style="width: 50% !important" disabled>
        </p>

        <p>
          <label for="meta" class="font-semibold">Meta description:</label>
          <textarea v-model="project.pageInfors[pageInforIndex].metaDescription" type="text" class="w-1/2" rows="4" disabled />
        </p>
        <div class="flex justify-end space-x-3 my-2">
          <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('delete-page-information')">
            Quay lại
          </button>
          <button class="px-3 py-1 bg-green-400 rounded" @click="deletePageInfor">
            Đồng ý
          </button>
        </div>
      </div>
    </modal>
    <modal name="add-new-page-information">
      <h2 class="mt-2 text-lg font-semibold text-center">
        Thêm thông tin SEO mới
      </h2>
      <div class="p-2 m-2">
        <p class="mb-3">
          <label for="title" class="font-semibold">Tiêu đề:</label>
          <input v-model="newPageInfor.title" type="text" class="w-1/2" style="width: 50% !important">
        </p>

        <p class="mb-3">
          <label for="slug" class="font-semibold">Slug:</label>
          <input v-model="newPageInfor.slug" type="text" class="w-1/2" style="width: 50% !important">
        </p>

        <p>
          <label for="meta" class="font-semibold">Meta description:</label>
          <textarea v-model="newPageInfor.metaDescription" type="text" class="w-1/2" rows="4" />
        </p>
        <div class="flex justify-end space-x-3 my-2">
          <button
            class="px-3 py-1 bg-gray-300 rounded"
            @click="() => {
              $modal.hide('add-new-page-information');
              newPageInfor = {};
            }"
          >
            Quay lại
          </button>
          <button class="px-3 py-1 bg-green-400 rounded" @click="addNewPageInfor">
            Đồng ý
          </button>
        </div>
      </div>
    </modal>
    <modal name="google-map-edit-modal">
      <div class="pt-12">
        <h2 class="mt-2 text-lg font-semibold text-center">
          Chỉnh sửa Google Map
        </h2>
        <p class="m-10">
          <label for="map" class="font-semibold">Google map:</label>
          <input
            v-model="project.address.googleMapLocation"
            type="text"
            class="w-1/4"
            style="width:75% !important"
            @change="() => flags.address = true"
          >
        </p>
        <div class="flex justify-end space-x-3 m-2 my-2">
          <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('google-map-edit-modal')">
            Quay lại
          </button>
          <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectAddress">
            Đồng ý
          </button>
        </div>
      </div>
    </modal>
    <modal name="delete-project-utilities">
      <div class="pt-14">
        <h2 class="mt-2 text-xl font-bold text-center">
          Bạn có chắc chắn muốn xóa?
        </h2>
        <p class="px-2 my-3">
          Lưu ý, sau khi xóa, hành động này sẽ không thể hoàn tác!
        </p>
        <div class="flex justify-end space-x-3 m-2 my-2">
          <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('delete-project-utilities')">
            Quay lại
          </button>
          <button class="text-white px-3 py-1 bg-green-400 rounded" @click="deleteProjectUtilities(projectId)">
            Đồng ý
          </button>
        </div>
      </div>
    </modal>
    <modal name="edit-project-image">
      <div class="pt-12">
        <h2 class="mt-2 text-lg font-semibold text-center">
          Chỉnh sửa hình ảnh
        </h2>
        <p class="m-10">
          <label class="font-semibold">Url: </label>
          <input v-model="project.images[imageIndex]" type="text" style="width:90% !important" @change="() => flags.image = true">
        </p>
        <div class="flex justify-end space-x-3 m-2 my-2">
          <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('edit-project-image')">
            Quay lại
          </button>
          <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectImage">
            Đồng ý
          </button>
        </div>
      </div>
    </modal>

    <modal name="show-edit-investor">
      <div v-if="investorEdit" class="p-5">
        <h2 class="my-2 text-lg font-semibold text-center">
          Chỉnh sửa chủ đầu tư
        </h2>
        <div class="flex justify-between" style="height: 170px;">
          <div>
            <div class="flex justify-between mb-2">
              <p class="font-bold">
                Tên chủ đầu tư
              </p>
              <input v-model="investorEdit.investorName" style="width:50%" type="text" @change="() => flags.investor = true">
            </div>
            <div class="flex justify-between mb-2">
              <p class="font-bold">
                Số dự án
              </p>
              <input v-model="investorEdit.numberOfProjects" style="width:50%" type="number" @change="() => flags.investor = true">
            </div>
            <div class="flex justify-between mb-2">
              <p class="font-bold">
                Thời gian thành lập
              </p>
              <input v-if="tempFoundedDate" v-model="tempFoundedDate" style="width:50%" type="date" @change="() => flags.investor = true">
            </div>
            <div class="flex justify-between mb-2">
              <p class="font-bold">
                Số điện thoại
              </p>
              <input v-model="investorEdit.phoneNumber" style="width:50%" type="text" max="10" @change="() => flags.investor = true">
            </div>
            <div class="flex justify-between mb-2">
              <p class="font-bold">
                Hình ảnh
              </p>
              <input v-model="investorEdit.image" style="width:50%" type="text" @change="() => flags.investor = true">
            </div>
          </div>
          <img
            onerror="this.onerror=null; this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAQlBMVEX///+hoaGenp6ampr39/fHx8fOzs7j4+P8/Pyvr6/d3d3FxcX29va6urqYmJjs7OzU1NSlpaW1tbWtra3n5+e/v78TS0zBAAACkUlEQVR4nO3b63KCMBCGYUwUUVEO6v3fagWVY4LYZMbZnff51xaZ5jON7CZNEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQb5tvI8qzX4/nH84XG5Upfj2ir2V2E5fZ/XpIX9saMnhkYLIkiyRJjdgMoiEDMmiQgfwM8rSu77ew2wnPoLTmwdZBs0J2BuXrYckcQm4nOoP+WcmWAbcTnUHZPy9eA24nOoN7n0HI54ToDM5k8PjluwyqgNuJzqDoaugPg8gWZ4noDAYLwuIg75fLeeHHsjNIzrZJwWwW+0DNsmEWPjiEZ5AcD8ZUu8VZ8HyQMifvBdIz+PS33i8adu+7Qn4Gn1Tdupl7rlCfQb9seosK7RkcBy1o30iVZ5CPOtDW3WhQnsF13IV3v0p3BqfJRoSpXVepzmA/24+yqeMyzRm4tqOs44lSUwa3yfgOri25av5CPRnklR33VlPnrqSZV09qMsiqSWV082xOz1uPajJ49pTM/f115k6guWa6JGjJ4N1lt8fXN2rv/vysjFaSQdFXBc/KKF04ptFPliclGVR9Bu27XCyeVOkmy5OODAZN9rYyyip/AIPJ8qIig+PoXbf7YdPdncFoSdCQQT4ZceV+MhiFMBy0hgyu0yGvOLI17KwpyGBaHK5jtt0N5GcwLw7XZdB31sRn8O+ziqYro8Vn4CwOV+k6a9Iz+PwRsKC7h+gMfMXhKu/OmuwM/MXhKq8yWnYG/uJw5Uxoy2jRGZTBZ/jboxuSM1guDtdNhKazJjiDbNMe0AxzKUVnkO+jEJxBxNtJzWCTxlNLzSB8KehJ/H+mJGYAjaDjzj9SnHZRuXZiAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAECXP1XDHv7U4SNFAAAAAElFTkSuQmCC'"
            :src="investorEdit.image"
            :alt="project.projectName"
            width="200"
            height="200"
          >
        </div>
        <div class="flex justify-end space-x-3 m-2 my-2">
          <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('show-edit-investor')">
            Quay lại
          </button>
          <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateInvestor">
            Đồng ý
          </button>
        </div>
      </div>
    </modal>
    <modal name="edit-project-master-plan">
      <div class="pt-12">
        <h2 class="mt-2 text-lg font-semibold text-center">
          Chỉnh sửa mặt bằng
        </h2>
        <p class="m-10">
          <label class="font-semibold">Url: </label>
          <input ref="masterPlan" v-model="project.masterPlan" type="text" style="width:90% !important" @change="() => flags.information = true">
        </p>
        <div class="flex justify-end space-x-3 m-2 my-2">
          <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('edit-project-master-plan')">
            Quay lại
          </button>
          <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectInformation">
            Đồng ý
          </button>
        </div>
      </div>
    </modal>
    <modal name="delete-project-image">
      <div class="pt-14">
        <h2 class="mt-2 text-xl font-bold text-center">
          Bạn có chắc chắn muốn xóa?
        </h2>
        <p class="px-2 my-3">
          Lưu ý, sau khi xóa, hành động này sẽ không thể hoàn tác!
        </p>
        <div class="flex justify-end space-x-3 m-2 my-2">
          <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('delete-project-image')">
            Quay lại
          </button>
          <button class="text-white px-3 py-1 bg-green-400 rounded" @click="deleteProjectImage">
            Đồng ý
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script type="text/javascript">
import gql from 'graphql-tag';
import { expandPanel } from 'vue-expand-panel';
import ProjectFilterDropdown from './components/project-filter-dropdown.vue';
// import styles
import '~/assets/css/vue-expander.css';
const getProject = gql`query GetProjectToEdit($condition: ProjectCollectionFilterInput)
            {
                projects(where: $condition) {
                    id
                    description
                    investorId
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
                  price
                  acreage
                  numberOfApartments
                  numberOfBuildings
                  juridical
                  investor{
                    investorName
                    image
                    numberOfProjects
                    foundedTime
                    phoneNumber
                  }
                  projectPost
                  tempProjectInfors{
                    inforName
                    inforContent
                  }
                  utilities{
                    locationUtilities
                    internalUtilities
                    listOfUtilities
                  }
                }
            }`;
const getInvestors = gql`query GetInvestors {
  investor{
    id
    investorName
  }
}`;
const getInvestorById = gql`query GetInvestorToEdit($input: InvestorCollectionFilterInput) {
  investor(where: $input){
    id
    investorName
    image
    numberOfProjects
    foundedTime
    phoneNumber
  }
}`;
export default {
  name: 'EditProject',
  apollo: {
    project: {
      query: getProject,
      variables: {
        condition: {
          id: {
            eq: '61c966dd6e47abd592a5c169'
          }
        }
      },
      update: data => data.projects[0]
    },
    investors: {
      query: getInvestors,
      update: data => data.investor
    },
    investorEdit: {
      query: getInvestorById,
      skip () { return !this.isShowingEditInvestor; },
      update: data => data.investor[0]
    }
  },
  components: {
    expandPanel,
    ProjectFilterDropdown
  },
  data () {
    return {
      flags: {
        information: false,
        investor: false,
        detailInformation: false,
        address: false,
        utilities: false,
        image: false,
        pageInfor: false,
        seoContent: false,
        projectPost: false
      },
      pageInforsSlug: [],
      tempFoundedDate: null,
      tempUtility: '',
      tempInfor: '',
      isShowingEditInvestor: false,
      inputFilter: {},
      newPageInfor: {},
      newImage: '',
      imageIndex: 0,
      pageInforIndex: 0,
      editorOption: {
        // Some Quill options...
        theme: 'snow',
        modules: {
          toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            ['clean'] // remove formatting button
          ]
        }
      }
    };
  },
  computed: {
    tempDetailInfors () {
      const items = [];
      this.project.tempProjectInfors.forEach((element) => {
        const tempInfor = { name: element.inforName, content: element.inforContent };
        items.push(tempInfor);
      });
      return items;
    }
  },
  watch: {
    // project: {
    //     handler(data, newData) {
    //         console.log("watch start");
    //     },
    //     deep: true,
    // },
    inputFilter (filter) {
      console.log(filter);
      console.log(this.inputFilter);
      console.log('Project name berfore refetch: ', this.project.projectName);
      if (filter.project) {
        this.$apollo.queries.project.refetch({
          condition: {
            id: {
              eq: this.inputFilter.project.id
            }
          }
        });
        setTimeout(() => {
          this.project.pageInfors.forEach(x => this.pageInforsSlug.push(x.slug));
        }, 1000);
        this.pageInforIndex = 0;
        this.imageIndex = 0;
      }
    }
  },
  mounted () {
    this.project.pageInfors.forEach(x => this.pageInforsSlug.push(x.slug));
  },
  methods: {
    handleProjectFilterChanged (project) {
      this.inputFilter = { ...this.inputFilter, project };
    },
    sendWarningNotification (notification) {
      this.$toast.show(notification, {
        type: 'error',
        theme: 'bubble',
        duration: 3000,
        position: 'top-right'
      });
    },
    sendDoneNotification (notification) {
      this.$toast.show(notification, {
        type: 'success',
        duration: 2000,
        theme: 'bubble',
        position: 'top-right'
      });
    },
    sendUpdateProjectMutation (queryable) {
      this.$apollo.mutate({
        mutation: gql`mutation UpdateProjectInformation($input: UpdateProjectInput!) {
                    updateProject(input: $input) {
                        string
                    }
                }`,
        variables: queryable
      });
    },
    updateProjectInformation () {
      if (this.flags.information == false) {
        this.sendWarningNotification('Dữ liệu chưa có thay đổi!');
        return;
      }
      // eslint-disable-next-line no-unused-expressions
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          projectName: this.project.projectName,
          investorId: this.project.investorId,
          juridical: this.project.juridical,
          description: this.project.description,
          sEOContent: this.project.sEOContent,
          masterPlan: this.project.masterPlan
        }
      });
      this.sendDoneNotification('Thay đổi thành công!');
      this.flags.information = false;
      this.$modal.hide('edit-project-master-plan');
    },
    updateProjectAddress () {
      if (this.flags.address == false) {
        this.sendWarningNotification('Dữ liệu chưa có thay đổi!');
        return;
      }
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          address: {
            street: this.project.address.street,
            district: this.project.address.district,
            city: this.project.address.city,
            googleMapLocation: this.project.address.googleMapLocation
          }
        }
      });
      this.sendDoneNotification('Thay đổi thành công!');
      this.$modal.hide('google-map-edit-modal');
      this.flags.address = false;
    },
    addNewUtility () {
      if (this.project.utilities.listOfUtilities.some(x => x.toLowerCase() == this.tempUtility.toLowerCase())) {
        this.sendWarningNotification('Đã tồn tại tiện ích này!');
        return;
      }
      this.project.utilities.listOfUtilities.push(this.tempUtility);
      this.$apollo.mutate({
        mutation: gql`mutation AddNewUtility($input: UpdateProjectInput!)
        {
          updateProject(input: $input)
          {
            string
          }
        }`,
        variables: {
          input: {
            id: this.project.id,
            utilities: {
              internalUtilities: this.project.utilities.internalUtilities,
              locationUtilities: this.project.utilities.locationUtilities,
              listOfUtilities: this.project.utilities.listOfUtilities
            }
          }
        }
      });
      this.sendDoneNotification('Thêm thành công!');
      this.tempUtility = '';
    },
    addNewTempInfor () {
      if (this.project.tempProjectInfors.some(x => x.inforName.toLowerCase() === this.tempInfor.toLowerCase())) {
        this.sendWarningNotification('Đã tồn tại tiện ích này!');
        return;
      }
      this.project.tempProjectInfors.push({ inforName: this.tempInfor, inforContent: '' });
      this.sendDoneNotification('Thêm thành công!');
      this.flags.detailInformation = true;
      this.tempInfor = '';
    },
    deleteTempInfor (index) {
      this.project.tempProjectInfors.splice(index, 1);
      this.sendDoneNotification('Xóa thành công!');
      this.flags.detailInformation = true;
    },
    deleteUtility (index) {
      this.project.utilities.listOfUtilities.splice(index, 1);
      this.$apollo.mutate({
        mutation: gql`mutation AddNewUtility($input: UpdateProjectInput!)
        {
          updateProject(input: $input)
          {
            string
          }
        }`,
        variables: {
          input: {
            id: this.project.id,
            utilities: {
              internalUtilities: this.project.utilities.internalUtilities,
              locationUtilities: this.project.utilities.locationUtilities,
              listOfUtilities: this.project.utilities.listOfUtilities
            }
          }
        }
      });
      this.sendDoneNotification('Xóa thành công!');
    },
    updateProjectUtilities () {
      if (this.flags.utilities == false) {
        this.sendWarningNotification('Dữ liệu chưa có thay đổi!');
        return;
      }
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          utilities: {
            internalUtilities: this.project.utilities.internalUtilities,
            locationUtilities: this.project.utilities.locationUtilities,
            listOfUtilities: this.project.utilities.listOfUtilities
          }
        }
      });
      this.sendDoneNotification('Thay đổi thành công!');
      this.flags.utilities = false;
    },
    addNewProjectImage () {
      if (this.project.images.includes(this.newImage)) {
        this.sendWarningNotification('Hình ảnh đã tồn tại, vui lòng thử lại!');
        this.newImage = '';
        return;
      }
      if (this.newImage === '') {
        this.sendWarningNotification('Chưa có dữ liệu, vui lòng thử lại!');
        return;
      }
      this.project.images.push(this.newImage);
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          images: this.project.images
        }
      });
      this.newImage = '';
      this.sendDoneNotification('Thêm thành công!');
    },
    updateProjectPost () {
      if (this.flags.projectPost == false) {
        this.sendWarningNotification('Dữ liệu chưa có thay đổi!');
        return;
      }
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          projectPost: this.project.projectPost
        }
      });
      this.sendDoneNotification('Thay đổi thành công!');
      this.flags.projectPost = false;
    },
    showUpdateProjectImageModal (index) {
      this.$modal.show('edit-project-image');
      this.imageIndex = index;
    },
    updateProjectImage () {
      if (this.flags.image == false) {
        this.sendWarningNotification('Dữ liệu chưa có thay đổi!');
        return;
      }
      if (this.project.images[this.imageIndex] === '') {
        this.sendWarningNotification('Dữ liệu không được để trống, hoặc bạn có thể xóa đi hình ảnh này!');
        return;
      }
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          images: this.project.images
        }
      });
      this.sendDoneNotification('Thay đổi thành công!');
      this.$modal.hide('edit-project-image');
      this.flags.image = false;
    },
    showDeleteProjectImageModal (index) {
      this.imageIndex = index;
      this.$modal.show('delete-project-image');
    },
    deleteProjectImage () {
      this.project.images = this.project.images.filter(x => x !== this.project.images[this.imageIndex]);
      this.$apollo.mutate({
        mutation: gql`mutation DeleteProjectImage($input: UpdateProjectInput!) 
                {
                    updateProject(input: $input)
                    {
                        string
                    }
                }`,
        variables: {
          input: {
            id: this.project.id,
            images: this.project.images
          }
        }
      });
      this.sendDoneNotification('Xóa thành công!');
      this.$modal.hide('delete-project-image');
    },
    updateProjectDetailInformation () {
      if (this.flags.detailInformation === false) {
        this.sendWarningNotification('Dữ liệu chưa có thay đổi!');
        return;
      }
      if (Math.floor(this.project.price) < 0) {
        this.sendWarningNotification('Giá phải lớn hơn hoặc bằng 0!');
        return;
      }
      if (Math.floor(this.project.numberOfApartments) < 0) {
        this.sendWarningNotification('Số lượng căn hộ phải lớn hơn hoặc bằng 0!');
        return;
      }
      if (Math.floor(this.project.numberOfBuildings) < 0) {
        this.sendWarningNotification('Số lượng tòa nhà phải lớn hơn hoặc bằng 0!');
        return;
      }
      if (Math.floor(this.project.acreage) < 0) {
        this.sendWarningNotification('Diện tích phải lớn hơn hoặc bằng 0!');
        return;
      }
      const tempProjectInfors = new Array();
      this.project.tempProjectInfors.forEach(
        (x) => {
          const tempProjectInfor = {
            inforName: x.inforName,
            inforContent: x.inforContent
          };
          tempProjectInfors.push(tempProjectInfor);
        }
      );
      tempProjectInfors.forEach(x => delete x.__typename);
      // eslint-disable-next-line no-unused-expressions
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          price: Math.floor(this.project.price),
          numberOfApartments: Math.floor(this.project.numberOfApartments),
          numberOfBuildings: Math.floor(this.project.numberOfBuildings),
          acreage: Math.floor(this.project.acreage),
          tempProjectInfors: tempProjectInfors
        }
      });
      this.sendDoneNotification('Thay đổi thành công!');
      this.flags.detailInformation = false;
    },
    ShowModalEditInvestor () {
      const foundedTime = new Date(this.project.investor.foundedTime);
      if (foundedTime.getDate() < 10 && foundedTime.getMonth() + 1 > 10) {
        this.tempFoundedDate = foundedTime.getFullYear() + '-' + (foundedTime.getMonth() + 1).toString() + '-' + '0' + foundedTime.getDate();
      } else if (foundedTime.getDate() < 10 && foundedTime.getMonth() + 1 < 10) {
        this.tempFoundedDate = foundedTime.getFullYear() + '-0' + (foundedTime.getMonth() + 1).toString() + '-0' + foundedTime.getDate();
      } else if (foundedTime.getDate() > 10 && foundedTime.getMonth() + 1 < 10) {
        this.tempFoundedDate = foundedTime.getFullYear() + '-0' + (foundedTime.getMonth() + 1).toString() + '-' + foundedTime.getDate();
      } else {
        this.tempFoundedDate = foundedTime.getFullYear() + '-' + (foundedTime.getMonth() + 1).toString() + '-' + foundedTime.getDate();
      }
      this.$apollo.queries.investorEdit.refetch({
        input: {
          id: { eq: this.project.investorId }
        }
      }
      );
      this.isShowingEditInvestor = true;
      this.$modal.show('show-edit-investor');
    },
    updateInvestor () {
      if (this.flags.investor == false) {
        this.sendWarningNotification('Dữ liệu chưa có thay đổi!');
        return;
      }
      this.investorEdit.numberOfProjects = Number(this.investorEdit.numberOfProjects);
      if (this.investorEdit.numberOfProjects < 0) {
        this.$toast.show('Số lượng dự án phải lớn hơn hoặc bằng 0!', {
          type: 'error',
          theme: 'bubble',
          duration: '3000',
          position: 'top-right'
        });
        return;
      }
      this.$apollo.mutate({
        mutation: gql`mutation UpdateInvestor($input: UpdateInvestorInput!) 
                {
                    updateInvestor(input: $input)
                    {
                        string
                    }
                }`,
        variables: {
          input: {
            id: this.project.investorId,
            name: this.investorEdit.investorName,
            image: this.investorEdit.image,
            numberOfProjects: this.investorEdit.numberOfProjects,
            phoneNumber: this.investorEdit.phoneNumber,
            foundedTime: this.tempFoundedDate.substring(5, 7) + '-' + this.tempFoundedDate.substring(8, 10) + '-' + this.tempFoundedDate.substring(0, 4)
          }
        }
      });
      if (this.investors.some(x => x.investorName == this.investorEdit.investorName) == false) {
        setTimeout(() => {
          this.$apollo.queries.investors.refetch({
            condition: null
          });
        }, 500);
        console.log('refetch');
      }
      this.sendDoneNotification('Cập nhật thành công!');
      this.flags.investor = false;
      this.$modal.hide('show-edit-investor');
    },
    addNewPageInfor () {
      if ((this.newPageInfor.slug === '') || (this.project.pageInfors.some(x => x.slug == this.newPageInfor.slug))) {
        this.sendWarningNotification('Slug đã tồn tại hoặc chưa có, vui lòng thử lại!');
        return;
      }
      const pageInfor = {
        title: this.newPageInfor.title,
        slug: this.newPageInfor.slug,
        metaDescription: this.newPageInfor.metaDescription
      };
      this.project.pageInfors.forEach(x => delete x.__typename);
      this.project.pageInfors.push(pageInfor);
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          pageInfors: this.project.pageInfors
        }
      });
      this.pageInforsSlug.push(this.newPageInfor.slug);
      this.newPageInfor = {};
      this.sendDoneNotification('Thêm thành công!');
      this.$modal.hide('add-new-page-information');
    },
    showPageInforModal (index) {
      this.pageInforIndex = index;
      console.log(index);
      this.$modal.show('page-information-detail');
    },
    updatePageInformation () {
      const slug = this.project.pageInfors[this.pageInforIndex].slug.trim();
      if (this.flags.pageInfor == false) {
        this.sendWarningNotification('Dữ liệu chưa có thay đổi!');
        return;
      }
      if (this.pageInforsSlug.some(x => x == slug && this.pageInforIndex != this.pageInforsSlug.indexOf(slug)) == true) {
        this.sendWarningNotification('Slug đã tồn tại!');
        return;
      }
      if (slug == '') {
        this.sendWarningNotification('Nội dung không được để trống!');
        return;
      }
      this.project.pageInfors.forEach(x => delete x.__typename);
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          pageInfors: this.project.pageInfors
        }
      });
      this.sendDoneNotification('Thay đổi thành công!');
      this.pageInforsSlug[this.pageInforIndex] = slug;
      this.$modal.hide('page-information-detail');
    },
    showDeletePageInforModal (index) {
      this.pageInforIndex = index;
      this.$modal.show('delete-page-information');
    },
    deletePageInfor () {
      const index = this.pageInforIndex;
      this.project.pageInfors.splice(index, 1);
      this.pageInforsSlug.splice(index, 1);
      this.project.pageInfors.forEach(x => delete x.__typename);
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          pageInfors: this.project.pageInfors
        }
      });
      this.sendDoneNotification('Xóa thành công!');
      this.pageInforIndex = 0;
      this.$modal.hide('delete-page-information');
    }
  }
};
</script>

<style scoped>
    textarea {
        width: 100%;
        height: 90px;
        padding: 12px 10px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 16px;
        resize: none;
    }
    input {
        width: 25%;
        padding-inline: 10px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
        background-color: #f8f8f8;
        font-size: 14px;
        resize: none;
    }
    ul .uti {
        list-style-type: disc;
    }
    .w-auto {
        width: auto;
    }
    .h-auto{
      height: auto;
    }
</style>