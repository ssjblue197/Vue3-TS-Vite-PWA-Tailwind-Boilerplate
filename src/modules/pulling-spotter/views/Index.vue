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
        class="flex-1 flex-col flex gap-5 max-h-[calc(100vh-68px-40px-24px-24px)] overflow-y-scroll relative scroll-touch"
      >
        <transition-group mode="out-in" name="list" appear>
          <RequestItem
            v-for="i in 20"
            :key="i"
            @click="local.selectRequest ? (local.selectRequest = null) : (local.selectRequest = i)"
          />
        </transition-group>
      </div>
      <div class="hidden lg:block w-[390px]">
        <transition name="slide-fade-right" appear>
          <RequestDetail
            hideLocation
            hideDetail
            :hideDivide="['uncheck', 'picking'].includes(String(local.filter.value))"
          >
            <template #bottom>
              <div class="flex flex-col gap-4">
                <div
                  class="flex justify-between items-center pt-4"
                  v-if="['all', 'new'].includes(String(local.filter.value))"
                >
                  <span class="text-neutral-900 leading-1"> Priority request </span>
                  <s-toggle variant="success"></s-toggle>
                </div>
                <s-button
                  variant="danger"
                  outline
                  class="!h-[48px]"
                  @click="handleDelete"
                  v-if="['all', 'new'].includes(String(local.filter.value))"
                  >Delete</s-button
                >
                <s-button
                  variant="primary"
                  class="!h-[48px]"
                  @click="handleScanCheckReceive"
                  v-if="['uncheck'].includes(String(local.filter.value))"
                  >Scan to Check Received</s-button
                >
                <s-button
                  variant="danger"
                  outline
                  class="!h-[48px]"
                  @click="handleReportIssue"
                  v-if="['uncheck'].includes(String(local.filter.value))"
                  >Report issue</s-button
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
        <div class="wrapper flex flex-col gap-5 text-[17px]">
          <div class="text-neutral-200 leading-[140%]">
            Do you want to delete
            <strong class="text-neutral-900 font-normal"> Request ID #9736 </strong>?
          </div>
        </div>
      </template>
      <template #footer>
        <div class="wrapper flex flex-row gap-4">
          <s-button variant="secondary" outline class="!h-[48px] flex-1" @click="handleCancelDelete"
            >Cancel</s-button
          >
          <s-button variant="danger" class="!h-[48px] flex-1" @click="handleConfirmDelete"
            >Confirm</s-button
          >
        </div>
      </template>
    </s-modal>
    <s-modal
      @close="local.addRequestModal = false"
      size="2xl"
      position="center"
      v-if="local.addRequestModal"
    >
      <template #header> ADD NEW REQUEST </template>
      <template #body>
        <div class="wrapper flex flex-col gap-5 text-[17px] divide-y divide-dashed">
          <div class="flex flex-col gap-4">
            <s-input placeholder="Scan SKU Label ID" class="h-[52px] !pr-[52px] after:">
              <template #append>
                <span
                  class="relative after:content-[''] after:w-0 after:h-full after:absolute after:right-8 after:border-l after:top-0 after:border-neutral-40"
                  @click.stop="handleScanningAddRequest"
                >
                  <s-icon
                    :src="$icon.render('iconScan')"
                    width="24"
                    height="24"
                    class="!text-neutral-200 svg-line"
                  ></s-icon>
                </span>
              </template>
            </s-input>
            <span class="mx-auto text-neutral-200"> Or </span>
            <div class="flex gap-3">
              <s-select
                placeholder="Style "
                :allowEmpty="false"
                track-by="val"
                label="label"
                :options="[]"
                class="!h-[52px]"
              ></s-select>
              <s-select
                placeholder="Color "
                :allowEmpty="false"
                track-by="val"
                label="label"
                :options="[]"
              ></s-select>
              <s-select
                placeholder="Size "
                :allowEmpty="false"
                track-by="val"
                label="label"
                :options="[]"
              ></s-select>
            </div>
          </div>
          <div class="flex flex-col gap-6 py-6">
            <div class="flex flex-col gap-1">
              <div class="text-center text-[17px] leading-[140%] text-neutral-900">
                I want to order ... box(es)
              </div>
              <span class="mx-auto text-neutral-200 text-[13px] leading-[100%]">
                from the
                <strong class="font-normal text-information-300"> available box(es): 1,000 </strong>
              </span>
            </div>
            <span class="mx-auto">
              <Quantity />
            </span>
          </div>
          <div class="flex justify-between items-center pt-6">
            <span class="text-neutral-900 leading-1"> Priority request </span>
            <s-toggle variant="success" size="default"></s-toggle>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="wrapper flex flex-row gap-4">
          <s-button
            variant="primary"
            outline
            class="!h-[48px] w-[160px]"
            @click="handleCancelAddRequest"
            >Cancel</s-button
          >
          <s-button variant="primary" class="!h-[48px] flex-1" @click="handleConfirmAddRequest"
            >Confirm</s-button
          >
        </div>
      </template>
    </s-modal>
    <s-modal
      @close="local.reportIssueModal = false"
      size="md"
      position="center"
      v-if="local.reportIssueModal"
    >
      <template #header> REPORT ISSUE </template>
      <template #body>
        <div class="wrapper flex flex-col text-[17px] divide-y">
          <div class="pb-5 text-neutral-900 text-[17px] leading-[140%]">
            This request has the wrong SKU, please enter the correct information to add to shelve.
          </div>
          <div class="flex flex-col pt-5 gap-5">
            <s-input class="!h-[52px] text-[17px]" placeholder="Enter correct SKU"></s-input>
            <span class="mx-auto text-neutral-200 leading-[140%] text-[17px]">Or</span>
            <div class="flex gap-3">
              <s-select
                placeholder="Style "
                :allowEmpty="false"
                track-by="val"
                label="label"
                :options="[]"
                class="!h-[52px]"
              ></s-select>
              <s-select
                placeholder="Color "
                :allowEmpty="false"
                track-by="val"
                label="label"
                :options="[]"
              ></s-select>
              <s-select
                placeholder="Size "
                :allowEmpty="false"
                track-by="val"
                label="label"
                :options="[]"
              ></s-select>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="wrapper flex flex-row gap-4">
          <s-button
            variant="primary"
            outline
            class="!h-[48px] w-[100px]"
            @click="handleCancelReport"
            >Cancel</s-button
          >
          <s-button variant="primary" class="!h-[48px] flex-1" @click="handleConfirmReport"
            >Report</s-button
          >
        </div>
      </template>
    </s-modal>
    <s-modal
      @close="local.checkReceiveModal = false"
      size="sm"
      position="center"
      v-if="local.checkReceiveModal"
    >
      <template #header> CHECK RECEIVED </template>
      <template #body>
        <s-input placeholder="Type box ID" class="!h-[52px] text-[17px]"></s-input>
      </template>
      <template #footer>
        <div class="wrapper flex flex-row gap-4">
          <s-button
            variant="primary"
            outline
            class="!h-[48px] flex-1"
            @click="handleCancelCheckReceive"
            >Cancel</s-button
          >
          <s-button variant="primary" class="!h-[48px] flex-1" @click="handleConfirmCheckReceive"
            >Confirm</s-button
          >
        </div>
      </template>
    </s-modal>
    <Teleport to="body">
      <div class="wrapper z-[2] bg-white absolute top-0 left-0" v-if="local.showScanQRCode">
        <ScanQRCode
          :title="local.isScanAddRequest ? 'Scan QR Code' : 'Scan Box ID'"
          subtitle="Align the QR code within the frame to scan"
          @result="onScan"
          @error="onError"
        >
          <template #default>
            <s-button
              outline
              variant="primary"
              class="!bg-white active:!opacity-80"
              @click="handleCancelScanning"
              v-if="local.isScanAddRequest"
            >
              Cancel scanning
            </s-button>
            <div class="flex flex-row flex-nowrap h-[48px] gap-4" v-else>
              <s-button
                outline
                variant="danger"
                class="!bg-white active:!opacity-80 w-[160px]"
                @click="handleCannotScan"
              >
                I can not scan
              </s-button>
              <s-button
                variant="primary"
                class="active:!opacity-80 w-[160px]"
                @click="handleCancelScanning"
              >
                Finish
              </s-button>
            </div>
          </template>
          <template #top-left v-if="!local.isScanAddRequest">
            <div
              class="bg-white rounded-lg border shadow-md relative aspect-square w-[48px]"
              @click="local.showScanQRCode = false"
            >
              <s-icon
                :src="$icon.render('iconClose')"
                width="24"
                height="24"
                class="!text-neutral-100 center"
              ></s-icon>
            </div>
          </template>
          <template #top-right v-if="!local.isScanAddRequest">
            <div class="relative w-[220px] flex flex-col gap-5">
              <div
                class="p-4 flex flex-col gap-4 bg-white rounded-lg text-neutral-900 items-center relative"
              >
                <img src="@/assets/images/qr-code.png" alt="qr-code" class="w-[80px] h-[80px]" />
                <span class="text-[22px] leading-[130%]"> Scanned 1/3 </span>
                <s-icon
                  :src="$icon.render('iconClose')"
                  width="24"
                  height="24"
                  class="!text-neutral-100 absolute top-2 right-2"
                ></s-icon>
              </div>
              <div
                class="p-4 flex flex-col gap-4 bg-white rounded-lg text-neutral-900 items-center relative"
              >
                <img src="@/assets/images/qr-code.png" alt="qr-code" class="w-[80px] h-[80px]" />
                <span class="text-[22px] leading-[130%]"> Scanned 2/3 </span>
                <s-icon
                  :src="$icon.render('iconClose')"
                  width="24"
                  height="24"
                  class="!text-neutral-100 absolute top-2 right-2"
                ></s-icon>
              </div>
            </div>
          </template>
        </ScanQRCode>
      </div>
    </Teleport>
    <Teleport to="body">
      <div
        class="absolute center block lg:hidden w-[80%] max-w-[600px] z-1 bg-white shadow-2xl rounded-[16px]"
        v-if="local.selectRequest"
      >
        <transition name="fade" appear>
          <RequestDetail
            hideLocation
            hideDetail
            :hideDivide="['uncheck', 'picking'].includes(String(local.filter.value))"
          >
            <template #bottom>
              <div class="flex flex-col gap-4">
                <div
                  class="flex justify-between items-center pt-4"
                  v-if="['all', 'new'].includes(String(local.filter.value))"
                >
                  <span class="text-neutral-900 leading-1"> Priority request </span>
                  <s-toggle variant="success"></s-toggle>
                </div>
                <s-button
                  variant="danger"
                  outline
                  class="!h-[48px]"
                  @click="handleDelete"
                  v-if="['all', 'new'].includes(String(local.filter.value))"
                  >Delete</s-button
                >
                <s-button
                  variant="primary"
                  class="!h-[48px]"
                  @click="handleScanCheckReceive"
                  v-if="['uncheck'].includes(String(local.filter.value))"
                  >Scan to Check Received</s-button
                >
                <s-button
                  variant="danger"
                  outline
                  class="!h-[48px]"
                  @click="handleReportIssue"
                  v-if="['uncheck'].includes(String(local.filter.value))"
                  >Report issue</s-button
                >
              </div>
            </template>
          </RequestDetail>
        </transition>
        <s-icon
          :src="$icon.render('iconClose')"
          width="24"
          height="24"
          class="!text-neutral-100 absolute top-4 right-4 cursor-pointer"
          @click="local.selectRequest = null"
        ></s-icon>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import ScanQRCode from '@/components/ScanQRCode.vue';
import RequestItem from '@/components/RequestItem.vue';
import RequestDetail from '@/components/RequestDetail.vue';
import Quantity from '@/components/Quantity.vue';
// import EventBus from '@/utils/eventbus';
import { reactive } from 'vue';

import CustomFilter from '@/components/CustomFilter.vue';
import type { FilterItem } from '@/components/CustomFilter.vue';

interface Local {
  filterList: FilterItem[];
  filter: FilterItem;
  selectRequest: any;
  deleteRequest: boolean;
  addRequestModal: boolean;
  showScanQRCode: boolean;
  isScanAddRequest: boolean;
  reportIssueModal: boolean;
  checkReceiveModal: boolean;
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
  selectRequest: null,
  deleteRequest: false,
  addRequestModal: false,
  showScanQRCode: false,
  isScanAddRequest: false,
  reportIssueModal: false,
  checkReceiveModal: false,
});

const handleDelete = () => {
  //TODO handle delete request
  local.selectRequest = null;
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
  local.addRequestModal = true;
  //TODO handle add request
};

const handleCancelAddRequest = () => {
  local.addRequestModal = false;
};
const handleConfirmAddRequest = () => {
  local.addRequestModal = false;
};

const handleScanningAddRequest = () => {
  local.isScanAddRequest = true;
  local.showScanQRCode = true;
};
const handleCancelScanning = () => {
  local.showScanQRCode = false;
};

const onScan = (decodedText: string, decodedResult: any) => {
  console.log(decodedResult);
  if (decodedText) {
    local.showScanQRCode = false;
  }
};

const onError = () => {};

const handleScanCheckReceive = () => {
  local.isScanAddRequest = false;
  local.showScanQRCode = true;
};

const handleReportIssue = () => {
  local.reportIssueModal = true;
  local.selectRequest = null;
};

const handleCancelReport = () => {
  local.reportIssueModal = false;
};

const handleConfirmReport = () => {
  local.reportIssueModal = false;
  //TODO handle report issue
};

const handleCannotScan = () => {
  local.showScanQRCode = false;
  local.checkReceiveModal = true;
};

const handleCancelCheckReceive = () => {
  local.checkReceiveModal = false;
};
const handleConfirmCheckReceive = () => {
  local.checkReceiveModal = false;
  //TODO Handle confirm check receive
};
</script>

<style scoped></style>
