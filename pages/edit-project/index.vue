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
              <input v-model="project.projectName" type="text" class="w-1/2" @onfocusout="() => flag = true">
            </p>
            <p class="mb-2">
              <label class="font-semibold">Pháp lý:</label>
              <input v-model="project.juridical" type="text" class="w-1/2">
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
              <textarea v-model="project.description" type="text" class="w-1/2" rows="4" />
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
          <div class="grid grid-cols-4">
            <div>
              <p class="font-semibold">
                Giá
              </p>
              <input v-model="project.price" class="w-auto" type="number">
            </div>
            <div>
              <p class="font-semibold">
                Số căn hộ
              </p>
              <input v-model="project.numberOfApartments" class="w-auto" type="number">
            </div>
            <div>
              <p class="font-semibold">
                Diện tích
              </p>
              <input v-model="project.acreage" class="w-auto" type="number">
            </div>
            <div>
              <p class="font-semibold">
                Số tòa
              </p>
              <input v-model="project.numberOfBuildings" class="w-auto" type="number">
            </div>
            <div>
              <p class="font-semibold">
                Thời điểm hoàn thành
              </p>
              <input v-model="project.completionTime" class="w-auto" type="text">
            </div>
            <div>
              <p class="font-semibold">
                Quy mô
              </p>
              <input v-model="project.scale" class="w-auto" type="text">
            </div>
            <div>
              <p class="font-semibold">
                Diện tích xây dựng
              </p>
              <input v-model="project.constructionAcreage" class="w-auto" type="number">
            </div>
            <div>
              <p class="font-semibold">
                Mật độ xây dựng
              </p>
              <input v-model="project.densityOfConstruction" class="w-auto" type="number">
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
              <input v-model="project.address.street" type="text" class="w-1/2">
            </p>
            <p class="mb-2">
              <label class="font-semibold">Quận:</label>
              <input v-model="project.address.district" type="text" class="w-1/2">
            </p>
            <p class="mb-2">
              <label class="font-semibold">Thành phố: </label>
              <input v-model="project.address.city" type="text" class="w-1/2">
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
              <em>{{ project.address.googleMapLocation }}<br>
                chưa có hoặc sai!
              </em>
            </div>
          </div>
          <div class="flex justify-end my-2">
            <button class="text-white px-3 py-1 bg-green-400 rounded" @click="updateProjectAddress(project.id, currentProjectAddress.street, currentProjectAddress.district, currentProjectAddress.city, currentProjectAddress.googleMapLocation)">
              Cập nhật
            </button>
          </div>
        </expand-panel>

        <expand-panel title="Tiện ích">
          <p>
            <label for="meta" class="font-semibold">Tiện ích vị trí:</label>
            <textarea v-model="project.utilities.locationUtilities" type="text" class="w-1/2" rows="4" />
          </p>
          <p>
            <label for="meta" class="font-semibold">Tiện ích nội khu:</label>
            <textarea v-model="project.utilities.internalUtilities" type="text" class="w-1/2" rows="4" />
          </p>
          <div class="flex justify-between items-start">
            <label for="meta" class="font-semibold">Danh sách tiện ích:</label>
            <div class="flex justify-start items-center">
              <input v-model="tempUtility" type="text" class="w-auto my-2" placeholder="Thêm tiện ích mới">
              <button @click="() => project.utilities.listOfUtilities.push(tempUtility)">
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
              <button @click="() => project.utilities.listOfUtilities.splice(index, 1)">
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
                <button name="delete" @click="showDeletePageInforModal(index)">
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
              <quill-editor
                ref="myQuillEditor"
                v-model="project.sEOContent"
                class="h-auto mb-11"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
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
              <quill-editor
                ref="myQuillEditor"
                v-model="project.projectPost.overview"
                class="h-auto mb-11"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              />
            </client-only>
            <button class="text-white px-3 py-1 bg-green-400 rounded relative float-right mt-3.5" @click="updateProjectPost">
              Cập nhật
            </button>
          </div>
        </expand-panel>

        <expand-panel title="Vị trí">
          <div>
            <client-only>
              <quill-editor
                ref="myQuillEditor"
                v-model="project.projectPost.location"
                class="h-auto mb-11"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              />
            </client-only>
            <button class="text-white px-3 py-1 bg-green-400 rounded relative float-right mt-3.5" @click="updateProjectPost">
              Cập nhật
            </button>
          </div>
        </expand-panel>

        <expand-panel title="Thiết kế dự án">
          <div>
            <client-only>
              <quill-editor
                ref="myQuillEditor"
                v-model="project.projectPost.projectDesign"
                class="h-auto mb-11"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              />
            </client-only>
            <button class="text-white px-3 py-1 bg-green-400 rounded relative float-right mt-3.5" @click="updateProjectPost">
              Cập nhật
            </button>
          </div>
        </expand-panel>

        <expand-panel title="Bài viết tiện ích">
          <div>
            <client-only>
              <quill-editor
                ref="myQuillEditor"
                v-model="project.projectPost.utilitySection"
                class="h-auto mb-11"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              />
            </client-only>
            <button class="text-white px-3 py-1 bg-green-400 rounded relative float-right mt-3.5" @click="updateProjectPost">
              Cập nhật
            </button>
          </div>
        </expand-panel>

        <expand-panel title="Giá thuê và mua">
          <div>
            <client-only>
              <quill-editor
                ref="myQuillEditor"
                v-model="project.projectPost.rentAndSellPrice"
                class="h-auto mb-11"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
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
          <input v-model="project.pageInfors[pageInforIndex].title" type="text" class="w-1/2" style="width: 50% !important">
        </p>

        <p class="mb-3">
          <label for="slug" class="font-semibold">Slug:</label>
          <input v-model="project.pageInfors[pageInforIndex].slug" type="text" class="w-1/2" style="width: 50% !important">
        </p>

        <p>
          <label for="meta" class="font-semibold">Meta description:</label>
          <textarea v-model="project.pageInfors[pageInforIndex].metaDescription" type="text" class="w-1/2" rows="4" />
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
          <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('add-new-page-information')">
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
          <input v-model="project.address.googleMapLocation" type="text" class="w-1/4" style="width:75% !important">
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
          <input v-model="project.images[imageIndex]" type="text" style="width:90% !important">
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
              <p class="font-bold">Tên chủ đầu tư</p>
              <input v-model="investorEdit.investorName" style="width:50%" type="text">
            </div>
            <div class="flex justify-between mb-2">
              <p class="font-bold">Số dự án</p>
              <input v-model="investorEdit.numberOfProjects" style="width:50%" type="number">
            </div>
            <div class="flex justify-between mb-2">
              <p class="font-bold">Thời gian thành lập</p>
              <input v-if="tempFoundedDate" v-model="tempFoundedDate" style="width:50%" type="date">
            </div>
            <div class="flex justify-between mb-2">
              <p class="font-bold">Số điện thoại</p>
              <input v-model="investorEdit.phoneNumber" style="width:50%" type="text" max="10">
            </div>
            <div class="flex justify-between mb-2">
              <p class="font-bold">Hình ảnh</p>
              <input v-model="investorEdit.image" style="width:50%" type="text">
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
          <input ref="masterPlan" :value="project.masterPlan" type="text" style="width:90% !important">
        </p>
        <div class="flex justify-end space-x-3 m-2 my-2">
          <button class="px-3 py-1 bg-gray-300 rounded" @click="$modal.hide('edit-project-master-plan')">
            Quay lại
          </button>
          <button class="text-white px-3 py-1 bg-green-400 rounded" @click="() => project.masterPlan = $refs.masterPlan.value">
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
                  projectPost{
                    overview
                    location
                    projectDesign
                    utilitySection
                    rentAndSellPrice
                  }
                  completionTime
                  constructionAcreage
                  masterPlan
                  distributionUnit
                  scale
                  densityOfConstruction
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
      flag: false,
      tempFoundedDate: null,
      tempUtility: '',
      isShowingEditInvestor: false,
      currentProject: {},
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
          this.currentProject = {
            id: this.project.id,
            projectName: this.project.projectName,
            investor: this.project.investor,
            juridical: this.project.juridical,
            description: this.project.description,
            address: {
              street: this.project.address.street,
              district: this.project.address.district,
              city: this.project.address.city,
              googleMapLocation: this.project.address.googleMapLocation
            },
            utilities: {
              internalUtilities: this.project.utilities.internalUtilities,
              locationUtilities: this.project.utilities.locationUtilities
            },
            masterPlan: this.project.masterPlan,
            images: [],
            sEOContent: this.project.sEOContent,
            pageInfors: {
              slug: this.project.pageInfors.slug,
              title: this.project.pageInfors.title,
              metaDescription: this.project.pageInfors.metaDescription
            },
            projectPost: {
              overview: this.project.overview,
              location: this.project.location,
              projectDesign: this.project.projectDesign,
              utilitySection: this.project.utilitySection,
              rentAndSellPrice: this.project.rentAndSellPrice
            }
          };
          this.project.images.forEach(x => this.currentProject.images.push(x));
          for (let i = 0; i < this.project.pageInfors.length; i++) {
            const pageInfor = {
              slug: this.project.pageInfors[i].slug,
              title: this.project.pageInfors[i].title,
              metaDescription: this.project.pageInfors[i].metaDescription
            };
            this.currentProject.pageInfors.push(pageInfor);
          }
        }, 1000);
        this.pageInforIndex = 0;
        this.imageIndex = 0;
      }
    }
  },
  mounted () {
    this.currentProject = {
      id: this.project.id,
      projectName: this.project.projectName,
      investor: this.project.investor,
      juridical: this.project.juridical,
      description: this.project.description,
      price: this.project.price,
      numberOfApartments: this.project.numberOfApartments,
      numberOfBuildings: this.project.numberOfBuildings,
      acreage: this.project.acreage,
      scale: this.project.scale,
      constructionAcreage: this.project.constructionAcreage,
      densityOfConstruction: this.project.densityOfConstruction,
      completionTime: this.project.completionTime,
      address: {
        street: this.project.address.street,
        district: this.project.address.district,
        city: this.project.address.city,
        googleMapLocation: this.project.address.googleMapLocation
      },
      utilities: {
        internalUtilities: this.project.utilities.internalUtilities,
        locationUtilities: this.project.utilities.locationUtilities,
        listOfUtilities: this.project.utilities.listOfUtilities.splice()
      },
      projectPost: {
        overview: this.project.overview,
        location: this.project.location,
        projectDesign: this.project.projectDesign,
        utilitySection: this.project.utilitySection,
        rentAndSellPrice: this.project.rentAndSellPrice
      },
      images: [],
      sEOContent: this.project.sEOContent,
      pageInfors: []
    };
    this.project.images.forEach(x => this.currentProject.images.push(x));
    for (let i = 0; i < this.project.pageInfors.length; i++) {
      const pageInfor = {
        slug: this.project.pageInfors[i].slug,
        title: this.project.pageInfors[i].title,
        metaDescription: this.project.pageInfors[i].metaDescription
      };
      this.currentProject.pageInfors.push(pageInfor);
    }
  },
  methods: {
    handleProjectFilterChanged (project) {
      this.inputFilter = { ...this.inputFilter, project };
    },
    onEditorBlur (editor) {
      // console.log('editor blur!', editor);
    },
    onEditorFocus (editor) {
      // console.log('editor focus!', editor);
    },
    onEditorReady (editor) {
      // console.log('editor ready!', editor);
    },
    addNewUtility () {

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
      if ((this.currentProject.projectName === this.project.projectName) && (this.currentProject.investorId === this.project.investorId) &&
                (this.currentProject.juridical === this.project.juridical) && (this.currentProject.description === this.project.description) &&
                (this.currentProject.sEOContent === this.project.sEOContent) &&
                (this.currentProject.masterPlan === this.project.masterPlan)) {
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
      this.currentProject.projectName = this.project.projectName;
      this.currentProject.investor = this.project.investor;
      this.currentProject.juridical = this.project.juridical;
      this.currentProject.description = this.project.description;
      this.currentProject.sEOContent = this.project.sEOContent;
    },
    updateProjectAddress () {
      if ((this.currentProject.address.street === this.project.address.street) && (this.currentProject.address.district === this.project.address.district) &&
                (this.currentProject.address.city === this.project.address.city) && (this.currentProject.address.googleMapLocation === this.project.address.googleMapLocation)) {
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
      if (this.currentProject.address.googleMapLocation !== this.project.address.googleMapLocation) {
        this.$modal.hide('google-map-edit-modal');
      }
      this.currentProject.address.street = this.project.address.street;
      this.currentProject.address.district = this.project.address.district;
      this.currentProject.address.city = this.project.address.city;
      this.currentProject.address.googleMapLocation = this.project.address.googleMapLocation;
    },
    updateProjectUtilities () {
      if ((this.currentProject.utilities.locationUtilities === this.project.utilities.locationUtilities) &&
                (this.currentProject.utilities.internalUtilities === this.project.utilities.internalUtilities) &&
                (this.currentProject.utilities.listOfUtilities === this.project.utilities.listOfUtilities)) {
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
      this.currentProject.utilities.locationUtilities = this.project.utilities.locationUtilities;
      this.currentProject.utilities.internalUtilities = this.project.utilities.internalUtilities;
      this.currentProject.utilities.listOfUtilities = this.project.utilities.listOfUtilities.splice();
    },
    addNewProjectImage () {
      if (this.currentProject.images.includes(this.newImage)) {
        this.sendWarningNotification('Hình ảnh đã tồn tại, vui lòng thử lại!');
        this.newImage = '';
        return;
      }
      if (this.newImage === '') {
        this.sendWarningNotification('Chưa có dữ liệu, vui lòng thử lại!');
        return;
      }
      this.project.images.push(this.newImage);
      this.currentProject.images.push(this.newImage);
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
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          projectPost: {
            overview: this.project.projectPost.overview,
            location: this.project.projectPost.location,
            projectDesign: this.project.projectPost.projectDesign,
            utilitySection: this.project.projectPost.utilitySection,
            rentAndSellPrice: this.project.projectPost.rentAndSellPrice
          }
        }
      });
      this.newImage = '';
      this.sendDoneNotification('Thêm thành công!');
      this.currentProject.projectPost.overview = this.project.projectPost.overview;
      this.currentProject.projectPost.location = this.project.projectPost.location;
      this.currentProject.projectPost.projectDesign = this.project.projectPost.projectDesign;
      this.currentProject.projectPost.utilitySection = this.project.projectPost.utilitySection;
      this.currentProject.projectPost.rentAndSellPrice = this.project.projectPost.rentAndSellPrice;
    },
    showUpdateProjectImageModal (index) {
      this.$modal.show('edit-project-image');
      this.imageIndex = index;
    },
    showProjectPostOverview () {
      this.$modal.show('design-project-post-overview');
    },
    updateProjectDetailInformation () {
      if ((this.currentProject.price === this.project.price) && (this.currentProject.numberOfApartments === this.project.numberOfApartments) &&
                (this.currentProject.numberOfBuildings === this.project.numberOfBuildings) && (this.currentProject.acreage === this.project.acreage) &&
                (this.currentProject.completionTime === this.project.completionTime) &&
                (this.currentProject.scale === this.project.scale) &&
                (this.currentProject.constructionAcreage === this.project.constructionAcreage) &&
                (this.currentProject.densityOfConstruction === this.project.densityOfConstruction)) {
        this.sendWarningNotification('Dữ liệu chưa có thay đổi!');
        return;
      }
      if (Math.floor(this.project.price) < 0) {
        this.sendWarningNotification("Giá phải lớn hơn hoặc bằng 0!");
        return;
      }
      if (Math.floor(this.project.numberOfApartments) < 0) {
        this.sendWarningNotification('Số lượng căn hộ phải lớn hơn hoặc bằng 0!');
        return;
      }
      if (Math.floor(this.project.numberOfBuildings) < 0) {
        this.sendWarningNotification("Số lượng tòa nhà phải lớn hơn hoặc bằng 0!");
        return;
      }
      if (Math.floor(this.project.constructionAcreage) < 0) {
        this.sendWarningNotification("Diện tích xây dựng phải lớn hơn hoặc bằng 0!");
        return;
      }
      if (Math.floor(this.project.acreage) < 0) {
        this.sendWarningNotification("Diện tích phải lớn hơn hoặc bằng 0!");
        return;
      }
      if (Math.floor(this.project.densityOfConstruction) < 0) {
        this.sendWarningNotification("Mật độ xây dựng phải lớn hơn hoặc bằng 0!");
        return;
      }
      // eslint-disable-next-line no-unused-expressions
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          price: Math.floor(this.project.price),
          numberOfApartments: Math.floor(this.project.numberOfApartments),
          numberOfBuildings: Math.floor(this.project.numberOfBuildings),
          acreage: Math.floor(this.project.acreage),
          scale: this.project.scale,
          constructionAcreage: Math.floor(this.project.constructionAcreage),
          densityOfConstruction: Math.floor(this.project.densityOfConstruction),
          completionTime: this.project.completionTime
        }
      });
      this.sendDoneNotification('Thay đổi thành công!');
      this.currentProject.price = this.project.price;
      this.currentProject.numberOfApartments = this.project.numberOfApartments;
      this.currentProject.numberOfBuildings = this.project.numberOfBuildings;
      this.currentProject.acreage = this.project.acreage;
      this.currentProject.scale = this.project.scale;
      this.currentProject.constructionAcreage = this.project.constructionAcreage;
      this.currentProject.densityOfConstruction = this.project.densityOfConstruction;
      this.currentProject.completionTime = this.project.completionTime;
    },
    updateProjectImage () {
      if (this.currentProject.images[this.imageIndex] === this.project.images[this.imageIndex]) {
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
      this.currentProject.images[this.imageIndex] = this.project.images[this.imageIndex];
      this.sendDoneNotification('Thay đổi thành công!');
      this.$modal.hide('edit-project-image');
    },
    updateProjectMasterPlan () {
      this.sendUpdateProjectMutation({
        input: {
          id: this.project.id,
          masterPlan: this.project.masterPlan
        }
      });
      this.sendDoneNotification('Thay đổi thành công!');
      this.$modal.hide('edit-project-master-plan');
    },
    showDeleteProjectImageModal (index) {
      this.imageIndex = index;
      this.$modal.show('delete-project-image');
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
      this.investorEdit.numberOfProjects = Number(this.investorEdit.numberOfProjects);
      if (this.investorEdit.numberOfProjects < 0) {
        this.$toast.show("Số lượng dự án phải lớn hơn hoặc bằng 0!", {
          type: "error",
          theme: "bubble",
          duration: "3000",
          position: "top-right"
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
        console.log("refetch");
      }
      this.sendDoneNotification('Cập nhật thành công!');
      this.$modal.hide("show-edit-investor");
    },
    deleteProjectImage () {
      this.project.images = this.project.images.filter(x => x !== this.project.images[this.imageIndex]);
      this.currentProject.images = this.currentProject.images.filter(x => x !== this.currentProject.images[this.imageIndex]);
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
    addNewPageInfor () {
      if ((this.newPageInfor.slug === '') || (this.currentProject.pageInfors.some(x => x.slug === this.newPageInfor.slug) === true)) {
        this.sendWarningNotification('Slug đã tồn tại hoặc chưa có, vui lòng thử lại!');
        this.newPageInfor = {};
        this.$modal.hide('add-new-page-information');
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
      this.newPageInfor = {};
      this.currentProject.pageInfors.push(pageInfor);
      this.sendDoneNotification('Thêm thành công!');
      this.$modal.hide('add-new-page-information');
    },
    showPageInforModal (index) {
      this.pageInforIndex = index;
      this.$modal.show('page-information-detail');
    },
    updatePageInformation () {
      const index = this.pageInforIndex;
      if ((this.currentProject.pageInfors[index].slug === this.project.pageInfors[index].slug) &&
                (this.currentProject.pageInfors[index].title === this.project.pageInfors[index].title) &&
                (this.currentProject.pageInfors[index].metaDescription === this.project.pageInfors[index].metaDescription)) {
        this.sendWarningNotification('Dữ liệu chưa có thay đổi!');
        return;
      }
      if (this.currentProject.pageInfors[index].slug !== this.project.pageInfors[index].slug) {
        if ((this.project.pageInfors[index].slug === '') || (this.currentProject.pageInfors.some(x => x.slug === this.project.pageInfors[index].slug))) {
          this.sendWarningNotification('Slug đã tồn tại hoặc chưa có, vui lòng thử lại!');
          this.project.pageInfors[index].slug = this.currentProject.pageInfors[index].slug;
          this.project.pageInfors[index].title = this.currentProject.pageInfors[index].title;
          this.project.pageInfors[index].metaDescription = this.currentProject.pageInfors[index].metaDescription;
          return;
        }
      }
      this.project.pageInfors.forEach(x => delete x.__typename);
      this.sendUpdateProjectMutation({
        input: {
          input: {
            id: this.project.id,
            pageInfors: this.project.pageInfors
          }
        }
      });
      this.sendDoneNotification('Thay đổi thành công!');
      this.currentProject.pageInfors[index].slug = this.project.pageInfors[index].slug;
      this.currentProject.pageInfors[index].title = this.project.pageInfors[index].title;
      this.currentProject.pageInfors[index].metaDescription = this.project.pageInfors[index].metaDescription;
      this.$modal.hide('page-information-detail');
    },
    showDeletePageInforModal (index) {
      this.pageInforIndex = index;
      this.$modal.show('delete-page-information');
    },
    deletePageInfor () {
      const index = this.pageInforIndex;
      this.project.pageInfors = this.project.pageInfors.filter(x => x.slug !== this.project.pageInfors[index].slug);
      this.currentProject.pageInfors = this.currentProject.pageInfors.filter(x => x.slug !== this.currentProject.pageInfors[index].slug);
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
