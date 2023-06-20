<script lang="ts" setup>
import { ref, computed, reactive } from "vue";
import { useRouteQuery } from "@vueuse/router";
import SearchNotFound from "@/components/spod/Table/SearchNotFound.vue";
import NoData from "@/components/spod/Table/NoData.vue";
import LoadingTable from "@/components/spod/Table/LoadingTable.vue";
import Pagination from "@/components/spod/Pagination/Pagination.vue";
import DeleteModal from "../components/DeleteModal.vue";
import CreateModal from "../components/CreateModal.vue";
import EditModal from "../components/EditModal.vue";
import { fetchAll } from "@/api/role";
import type { FetchAllParams } from "@/api/role";
import type { Role } from "@/modules/role/types";
import type { PagingParams } from "@/types/api";
import { useDayJS } from "@/plugins/date";

const dayjs = useDayJS();
const total = ref<number>(0);
const paging = reactive<PagingParams>({
  page: 1,
  limit: 10,
});

const isShowFilterModal = ref<boolean>(false);
const isShowDeleteModal = ref<boolean>(false);
const isShowCreateModal = ref<boolean>(false);
const isShowEditModal = ref<boolean>(false);

const currentRole = ref<Role>();

const name = useRouteQuery<string>("name");
const createdAtBegin = useRouteQuery<string>("created_at_begin");
const createdAtEnd = useRouteQuery<string>("created_at_end");

const isLoading = ref(false);
const items = ref<Role[]>([]);

const role = ref<Role | undefined>();
const date = ref(
  createdAtBegin.value && createdAtEnd.value
    ? [createdAtBegin.value, createdAtEnd.value]
    : null
);

const hasChangeFilter = computed(() => {
  return name.value || createdAtBegin.value || createdAtEnd.value;
});

const changeLimit = (perPage: number) => {
  paging.page = 1;
  paging.limit = perPage;
  fetchList();
};

const setCurrentRole = (role: Role) => {
  currentRole.value = role;
};

const onClearFilter = async () => {
  paging.page = 1;
  role.value = undefined;
  date.value = null;
  createdAtBegin.value = "";
  createdAtEnd.value = "";
  name.value = "";

  fetchList(true);
};

const changeDate = () => {
  createdAtBegin.value = "";
  createdAtEnd.value = "";
  if (date.value?.length && date.value[0] && date.value[1]) {
    createdAtBegin.value = dayjs(date.value[0].toString()).format("YYYY-MM-DD");
    createdAtEnd.value = dayjs(date.value[1].toString()).format("YYYY-MM-DD");
  }
};

const fetchList = async (isClearFilter = false) => {
  let filter: FetchAllParams = {
    page: paging.page,
    limit: paging.limit,
  };
  if (!isClearFilter) {
    filter = {
      ...filter,
      name: name.value || undefined,
      created_at_begin: createdAtBegin.value || undefined,
      created_at_end: createdAtEnd.value || undefined,
    };
  }

  const { data } = await fetchAll(filter);
  items.value = data?.data?.data || [];
  total.value = data?.data?.total;
};

const fetchData = async () => {
  isLoading.value = true;
  await fetchList();
  isLoading.value = false;
};

fetchData();
</script>
<template>
  <div class="relative">
    <div class="flex justify-between items-end">
      <div class="flex items-center space-x-11">
        <div class="w-[400px]">
          <div class="flex justify-between mb-2">
            <label
              for="name"
              class="typo-small text-neutral-primary cursor-pointer"
            >
              Search
            </label>
          </div>
          <s-input
            id="name"
            v-model="name"
            placeholder="Enter name"
            :hasPrepend="true"
            @keyup.enter="fetchList()"
          >
            <template #prepend>
              <s-icon
                width="20"
                height="20"
                class="!text-icon-default svg-line"
                :src="$icon.render('iconSearch')"
              ></s-icon>
            </template>
          </s-input>
        </div>
        <div
          class="mt-7 flex items-center cursor-pointer !text-icon-secondary hover:!text-primary"
          @click="isShowFilterModal = true"
        >
          <s-icon
            width="24"
            height="24"
            class="mr-2"
            :src="$icon.render('iconFilter')"
          ></s-icon>
          <span class="text-neutral-secondary hover:text-primary">Filter</span>
        </div>
        <div
          class="mt-7 text-danger cursor-pointer"
          @click="onClearFilter()"
          v-if="hasChangeFilter"
        >
          Reset
        </div>
      </div>
      <div>
        <CheckPermission v-slot="slotProps" :permission="['roles.store']">
          <SButton
            class="px-5"
            @click="isShowCreateModal = true"
            :disabled="!slotProps.hasPermission"
            :class="{ 'pointer-events-none': !slotProps.hasPermission }"
          >
            <s-icon :src="$icon.render('iconPlus')" class="mr-2"></s-icon>
            Create Role
          </SButton>
        </CheckPermission>
      </div>
    </div>
    <div class="mt-6">
      <s-table>
        <s-table-head>
          <s-table-head-cell class="w-12">#</s-table-head-cell>
          <s-table-head-cell>Name</s-table-head-cell>
          <s-table-head-cell class="w-20"></s-table-head-cell>
        </s-table-head>
        <s-table-body class="relative">
          <s-table-row v-if="isLoading">
            <s-table-cell colspan="3" class="py-16">
              <LoadingTable />
            </s-table-cell>
          </s-table-row>

          <s-table-row v-else-if="!items.length && hasChangeFilter">
            <s-table-cell colspan="3" class="py-16">
              <SearchNotFound />
            </s-table-cell>
          </s-table-row>

          <s-table-row v-else-if="!items.length">
            <s-table-cell colspan="3" class="py-16">
              <NoData @createNew="isShowCreateModal = true" />
            </s-table-cell>
          </s-table-row>

          <s-table-row v-for="(item, index) in items" :key="index" v-else>
            <s-table-cell class="w-12">{{ index + 1 }}</s-table-cell>
            <s-table-cell maxWidthClass="max-w-sm">
              {{ item.name }}
            </s-table-cell>
            <s-table-cell class="w-20">
              <div class="flex space-x-4 items-center">
                <CheckPermission
                  v-slot="slotProps"
                  :permission="['roles.update']"
                >
                  <s-icon
                    :disabled="!slotProps.hasPermission"
                    :class="{ 'pointer-events-none': !slotProps.hasPermission }"
                    class="!text-icon-default svg-line hover:!text-primary cursor-pointer"
                    width="24"
                    height="24"
                    :src="$icon.render('iconEdit')"
                    @click="
                      setCurrentRole(item);
                      isShowEditModal = true;
                    "
                  >
                  </s-icon>
                </CheckPermission>

                <CheckPermission
                  v-slot="slotProps"
                  :permission="['roles.delete']"
                >
                  <s-icon
                    :disabled="!slotProps.hasPermission"
                    :class="{ 'pointer-events-none': !slotProps.hasPermission }"
                    @click="
                      setCurrentRole(item);
                      isShowDeleteModal = true;
                    "
                    class="!text-danger svg-line cursor-pointer"
                    width="24"
                    height="24"
                    :src="$icon.render('iconTrash')"
                  >
                  </s-icon>
                </CheckPermission>
              </div>
            </s-table-cell>
          </s-table-row>
        </s-table-body>
      </s-table>
      <Pagination
        class="mt-4"
        v-model="paging.page"
        :totalItems="total"
        :perPage="paging.limit"
        @change="fetchList()"
        @changeLimit="changeLimit"
      />
    </div>

    <s-modal v-if="isShowFilterModal" @close="isShowFilterModal = false">
      <template #header>
        <h4 class="uppercase text-neutral-primary">Filter</h4>
      </template>
      <template #body>
        <div class="space-y-5">
          <div>
            <div class="flex justify-between mb-2">
              <label class="typo-small text-neutral-primary cursor-pointer">
                Created date
              </label>
            </div>
            <s-date-picker
              :clearable="true"
              range
              multi-calendars
              :format="'yyyy-MM-dd'"
              v-model="date"
              placeholder="From - To"
              @update:model-value="changeDate()"
              @cleared="changeDate()"
            ></s-date-picker>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex space-x-4 justify-end">
          <s-button
            variant="secondary"
            class="min-w-[120px]"
            @click="
              isShowFilterModal = false;
              onClearFilter();
            "
          >
            Reset
          </s-button>
          <s-button
            class="min-w-[120px]"
            @click="
              isShowFilterModal = false;
              fetchList();
            "
          >
            Apply
          </s-button>
        </div>
      </template>
    </s-modal>

    <DeleteModal
      size="small"
      v-if="isShowDeleteModal && currentRole"
      @close="isShowDeleteModal = false"
      @onCancel="isShowDeleteModal = false"
      @onSubmit="
        isShowDeleteModal = false;
        fetchList();
      "
      :item="currentRole"
    />

    <CreateModal
      @close="isShowCreateModal = false"
      @onCancel="isShowCreateModal = false"
      @onSubmit="
        isShowCreateModal = false;
        fetchList();
      "
      v-if="isShowCreateModal"
    />

    <EditModal
      @close="isShowEditModal = false"
      @onCancel="isShowEditModal = false"
      @onSubmit="
        isShowEditModal = false;
        fetchList();
      "
      v-if="isShowEditModal && currentRole"
      :item="currentRole"
    />
  </div>
</template>
