<script lang="ts" setup>
import { ref, computed, reactive, inject } from "vue";
import SearchNotFound from "@/components/spod/Table/SearchNotFound.vue";
import NoData from "@/components/spod/Table/NoData.vue";
import LoadingTable from "@/components/spod/Table/LoadingTable.vue";
import Pagination from "@/components/spod/Pagination/Pagination.vue";
import DeleteModal from "../components/DeleteModal.vue";
import ChangePasswordModal from "../components/ChangePasswordModal.vue";
import CreateModal from "../components/CreateModal.vue";
import EditModal from "../components/EditModal.vue";
import { fetchAll } from "@/api/user";
import type { FetchAllParams } from "@/api/user";
import { fetchAll as fetchAllRole } from "@/api/role";
import type { Role } from "@/modules/role/types";
import { useAccountStore } from "@/stores/account";
import type { User } from "@/modules/user/types";
import type { PagingParams } from "@/types/api";
import type { PermissionPlugin } from "@/plugins/permission";
import { useDayJS } from "@/plugins/date";
import { useUrlSearchParams } from "@vueuse/core";

const dayjs = useDayJS();
const account = useAccountStore();
const permission = inject<PermissionPlugin>("permission");

const total = ref<number>(0);
const paging = reactive<PagingParams>({
  page: 1,
  limit: 10,
});

const isShowFilterModal = ref<boolean>(false);
const isShowDeleteModal = ref<boolean>(false);
const isShowChangePasswordModal = ref<boolean>(false);
const isShowCreateModal = ref<boolean>(false);
const isShowEditModal = ref<boolean>(false);

const currentUser = ref<User>();

const roles = ref<Role[]>([]);

interface QueryUrl {
  keyword?: string;
  active?: string;
  inactive?: string;
  created_at_begin?: string;
  created_at_end?: string;
  role_id?: string;
}

const query: QueryUrl = useUrlSearchParams();

const isLoading = ref(false);
const items = ref<User[]>([]);

const role = ref<Role | undefined>();
const date = ref(
  query.created_at_begin && query.created_at_end
    ? [query.created_at_begin, query.created_at_end]
    : null
);

const hasChangeFilter = computed(() => {
  if (Object.keys(query)?.length) {
    return true;
  }

  return false;
});

const changeLimit = (perPage: number) => {
  paging.page = 1;
  paging.limit = perPage;
  fetchList();
};

const setCurrentUser = (user: User) => {
  currentUser.value = user;
};

const allowAction = (user: User, action: string | string[]): boolean => {
  if (account?.profile?.id === user.id && user.is_superadmin) {
    return true;
  }

  if (!permission || user.is_superadmin) return false;

  return permission.can(action);
};

const onClearFilter = async () => {
  paging.page = 1;
  role.value = undefined;
  date.value = null;

  const queryLength = Object.keys(query).length;
  for (let i = 0; i < queryLength; i++) {
    const key = Object.keys(query)[i] as keyof QueryUrl;
    query[key] = undefined;
  }

  fetchList();
};

const selectRole = () => {
  query.role_id = role.value?.id ? role.value.id.toString() : "";
};

const changeDate = () => {
  query.created_at_begin = "";
  query.created_at_end = "";
  if (date.value?.length && date.value[0] && date.value[1]) {
    query.created_at_begin = dayjs(date.value[0].toString()).format(
      "YYYY-MM-DD"
    );
    query.created_at_end = dayjs(date.value[1].toString()).format("YYYY-MM-DD");
  }
};

const fetchList = async () => {
  const isActive: number[] = [];
  query.active === "true" ? isActive.push(1) : "";
  query.inactive === "true" ? isActive.push(0) : "";

  const filter: FetchAllParams = {
    page: paging.page,
    limit: paging.limit,
    keyword: query.keyword || undefined,
    role_id: Number(query.role_id) || undefined,
    created_at_begin: query.created_at_begin || undefined,
    created_at_end: query.created_at_end || undefined,
    is_active: isActive ?? undefined,
  };

  const { data } = await fetchAll(filter);
  items.value = data?.data?.data || [];
  total.value = data?.data?.total;
};

const fetchListRole = async () => {
  const { data } = await fetchAllRole({});
  roles.value = data?.data || [];
  role.value =
    roles.value &&
    roles.value.find(
      (i: Role) => query.role_id && i.id.toString() === query.role_id
    );
};

const fetchData = async () => {
  isLoading.value = true;
  await fetchList();
  isLoading.value = false;
};

const onShowFilter = () => {
  fetchListRole();
  isShowFilterModal.value = true;
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
              for="keyword"
              class="typo-small text-neutral-primary cursor-pointer"
            >
              Search
            </label>
          </div>
          <s-input
            id="keyword"
            v-model="query.keyword"
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
          @click="onShowFilter"
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
        <CheckPermission v-slot="slotProps" :permission="['users.store']">
          <SButton
            class="px-5"
            @click="isShowCreateModal = true"
            :disabled="!slotProps.hasPermission"
            :class="{ 'pointer-events-none': !slotProps.hasPermission }"
          >
            <s-icon :src="$icon.render('iconPlus')" class="mr-2"></s-icon>
            Create User
          </SButton>
        </CheckPermission>
      </div>
    </div>
    <div class="mt-6">
      <s-table>
        <s-table-head>
          <s-table-head-cell class="w-12">#</s-table-head-cell>
          <s-table-head-cell>Name</s-table-head-cell>
          <s-table-head-cell class="w-24">Role</s-table-head-cell>
          <s-table-head-cell class="w-28">Status</s-table-head-cell>
          <s-table-head-cell class="w-20"></s-table-head-cell>
        </s-table-head>
        <s-table-body class="relative">
          <s-table-row v-if="isLoading">
            <s-table-cell colspan="5" class="py-16">
              <LoadingTable />
            </s-table-cell>
          </s-table-row>

          <s-table-row v-else-if="!items.length && hasChangeFilter">
            <s-table-cell colspan="5" class="py-16">
              <SearchNotFound />
            </s-table-cell>
          </s-table-row>

          <s-table-row v-else-if="!items.length">
            <s-table-cell colspan="5" class="py-16">
              <NoData @createNew="isShowCreateModal = true" />
            </s-table-cell>
          </s-table-row>

          <s-table-row v-for="(item, index) in items" :key="index" v-else>
            <s-table-cell class="w-12">{{ index + 1 }}</s-table-cell>
            <s-table-cell maxWidthClass="max-w-sm">
              {{ item.first_name }} {{ item.last_name }}
            </s-table-cell>
            <s-table-cell>{{ item?.roles?.[0]?.name }}</s-table-cell>
            <s-table-cell>
              <s-tag
                :variant="item.is_active ? 'success' : 'secondary'"
                class="w-28"
              >
                {{ item.is_active ? "Active" : "Inactive" }}
              </s-tag>
            </s-table-cell>
            <s-table-cell class="w-20">
              <div class="flex space-x-4 items-center">
                <s-icon
                  v-if="allowAction(item, 'users.update')"
                  class="!text-icon-default svg-line hover:!text-primary cursor-pointer"
                  width="24"
                  height="24"
                  :src="$icon.render('iconEdit')"
                  @click="
                    setCurrentUser(item);
                    isShowEditModal = true;
                  "
                >
                </s-icon>
                <template v-else>
                  <s-tooltip content="User not permission" :hover="true">
                    <s-icon
                      class="!text-icon-default svg-line opacity-60 cursor-no-drop"
                      width="24"
                      height="24"
                      :src="$icon.render('iconEdit')"
                    ></s-icon>
                  </s-tooltip>
                </template>
                <s-dropdown
                  widthContent="w-[200px]"
                  placement="bottom-right"
                  :showIcon="false"
                  contentClasses="p-4"
                >
                  <template #title>
                    <s-icon
                      class="!text-icon-default svg-line hover:!text-primary cursor-pointer"
                      width="24"
                      height="24"
                      :src="$icon.render('iconMoreSquare')"
                    >
                    </s-icon>
                  </template>
                  <template v-slot:content="{ onClose }">
                    <span
                      v-if="allowAction(item, 'users.password')"
                      @click="
                        onClose();
                        setCurrentUser(item);
                        isShowChangePasswordModal = true;
                      "
                      class="block pb-3 text-neutral-primary cursor-pointer"
                    >
                      Change password
                    </span>
                    <div v-else class="block pb-3 text-neutral-primary">
                      <s-tooltip content="User not permission" :hover="true">
                        <span class="opacity-60 cursor-no-drop">
                          Change password
                        </span>
                      </s-tooltip>
                    </div>

                    <span
                      v-if="
                        allowAction(item, 'users.delete') &&
                        item.id !== account?.profile?.id
                      "
                      @click="
                        onClose();
                        setCurrentUser(item);
                        isShowDeleteModal = true;
                      "
                      class="block pt-3 text-danger border-t border-border-base cursor-pointer"
                    >
                      Delete
                    </span>
                    <div
                      v-else
                      class="block pt-3 text-danger border-t border-border-base"
                    >
                      <s-tooltip content="User not permission" :hover="true">
                        <span class="opacity-60 cursor-no-drop">Delete</span>
                      </s-tooltip>
                    </div>
                  </template>
                </s-dropdown>
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
                Role
              </label>
            </div>
            <s-select
              label="name"
              track-by="id"
              v-model="role"
              :options="roles"
              @select="selectRole()"
              @remove="selectRole()"
              placeholder="Select role"
            ></s-select>
          </div>

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

          <div>
            <div class="flex justify-between mb-2">
              <label class="typo-small text-neutral-primary cursor-pointer">
                Status
              </label>
            </div>
            <div class="flex items-center space-x-10">
              <s-checkbox v-model="query.active">Active</s-checkbox>
              <s-checkbox v-model="query.inactive">Inactive</s-checkbox>
            </div>
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
      v-if="isShowDeleteModal && currentUser"
      @close="isShowDeleteModal = false"
      @onCancel="isShowDeleteModal = false"
      @onSubmit="
        isShowDeleteModal = false;
        fetchList();
      "
      :item="currentUser"
    />

    <ChangePasswordModal
      v-if="isShowChangePasswordModal && currentUser"
      @close="isShowChangePasswordModal = false"
      @onCancel="isShowChangePasswordModal = false"
      @onSubmit="isShowChangePasswordModal = false"
      :item="currentUser"
    />

    <CreateModal
      @close="isShowCreateModal = false"
      @onCancel="isShowCreateModal = false"
      @onSubmit="
        isShowCreateModal = false;
        fetchList();
      "
      v-if="isShowCreateModal"
      :roles="roles"
    />

    <EditModal
      @close="isShowEditModal = false"
      @onCancel="isShowEditModal = false"
      @onSubmit="
        isShowEditModal = false;
        fetchList();
      "
      v-if="isShowEditModal && currentUser"
      :roles="roles"
      :item="currentUser"
    />
  </div>
</template>
