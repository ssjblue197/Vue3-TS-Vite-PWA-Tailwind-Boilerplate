<template>
  <div class="w-full flex flex-col justify-start p-6 pb-0 bg-neutral-10 gap-6">
    <div class="flex justify-between items-center">
      <span class="text-[22px] leading-[28px] text-neutral-900 flex flex-nowrap gap-3">
        <CustomFilter :data="local.filterList" v-model="local.filter" />
      </span>
      <s-button variant="primary" class="w-[160px] !h-[40px]" @click="handleAddRequest">
        Add request
      </s-button>
    </div>

    <div class="flex gap-7">
      <div
        class="flex-1 flex-col flex gap-5 max-h-[calc(100vh-68px-40px-24px-24px)] overflow-y-scroll relative"
      >
        <transition-group mode="out-in" name="list" appear>
          <RequestItem v-for="i in 20" :key="i" />
        </transition-group>
      </div>
      <div class="w-[390px]">
        <transition name="slide-fade-right" appear>
          <RequestDetail hideLocation hideDetail>
            <template #bottom>
              <div class="flex flex-col gap-6 pt-6">
                <div class="flex justify-between items-center">
                  <span class="text-neutral-900 leading-1"> Priority request </span>
                  <s-toggle variant="success"></s-toggle>
                </div>
                <s-button variant="danger" outline class="!h-[48px]" @click="handleDelete"
                  >Delete</s-button
                >
              </div>
            </template>
          </RequestDetail>
        </transition>
      </div>
    </div>
    <s-modal
      @close="local.deleteRequest = false"
      size="sm"
      position="center"
      v-if="local.deleteRequest"
    >
      <template #header> CONFIRM DELETE </template>
      <template #body>
        <div class="main-container flex flex-col gap-5 text-[17px]">
          <div class="text-neutral-200 leading-[140%]">
            Do you want to delete
            <strong class="text-neutral-900 font-normal"> Request ID #9736 </strong>?
          </div>
        </div>
      </template>
      <template #footer>
        <div class="main-container flex flex-row gap-4">
          <s-button variant="secondary" outline class="!h-[48px] flex-1" @click="handleCancelDelete"
            >Cancel</s-button
          >
          <s-button variant="danger" class="!h-[48px] flex-1" @click="handleConfirmDelete"
            >Confirm</s-button
          >
        </div>
      </template>
    </s-modal>
  </div>
</template>

<script setup lang="ts">
import RequestItem from '@/components/RequestItem.vue';
import RequestDetail from '@/components/RequestDetail.vue';
// import EventBus from '@/utils/eventbus';
import { reactive } from 'vue';
import LaneTag from '@/components/LaneTag.vue';

import CustomFilter from '@/components/CustomFilter.vue';
import type { FilterItem } from '@/components/CustomFilter.vue';

interface Local {
  filterList: FilterItem[];
  filter: FilterItem;
  deleteRequest: boolean;
}

const local: Local = reactive({
  filterList: [
    {
      title: 'All',
      value: 'all',
      count: 120,
    },
    {
      title: 'New',
      value: 'new',
      count: 30,
    },
    {
      title: 'Picking up',
      value: 'picking',
      count: 30,
    },
    {
      title: 'Uncheck',
      value: 'uncheck',
      count: 60,
    },
  ],
  filter: {
    title: 'All',
    value: 'all',
    count: 120,
  },
  deleteRequest: false,
});

const handleDelete = () => {
  //TODO handle delete request
  local.deleteRequest = true;
};

const handleCancelDelete = () => {
  local.deleteRequest = false;
};

const handleConfirmDelete = () => {
  local.deleteRequest = false;
  //TODO Handle confirm delete request
};

const handleAddRequest = () => {
  //TODO handle add request
};
</script>

<style scoped></style>
