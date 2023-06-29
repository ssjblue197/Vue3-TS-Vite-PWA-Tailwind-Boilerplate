<template>
  <div class="w-full flex flex-col justify-start p-6 pb-0 bg-neutral-10 gap-6">
    <div class="flex justify-between items-center">
      <span class="text-[22px] leading-[28px] text-neutral-900 flex gap-4">
        <LaneTag
          :title="requestStore.filter.location ? requestStore.filter.location : 'All'"
          :count="requestStore.total"
          @clear="onClearFilter"
          isLane
        />
        <LaneTag
          v-if="requestStore.filter.keyword.value"
          :title="requestStore.filter.keyword.title"
          hideCount
          @clear="onClearFilter(false)"
        />
      </span>
      <s-button variant="primary" class="w-[220px] !h-[40px]" @click="handleScanningLocation">
        Scan location code
      </s-button>
    </div>

    <div class="flex gap-7">
      <div
        class="flex-1 flex-col flex gap-5 max-h-[calc(100vh-68px-40px-24px-24px)] overflow-y-scroll relative items-center scroll-touch"
        id="scroll-area"
      >
        <transition-group mode="out-in" name="list" appear v-if="local.requestList.length > 0">
          <RequestItem
            ref="requestList"
            v-for="request in local.requestList"
            :key="request?.id"
            :data="request"
            @click="handleSelectRequest(request)"
            :active="requestStore.selectRequest?.id === request.id"
          />
        </transition-group>
        <transition
          mode="out-in"
          name="list"
          appear
          v-if="local.requestList.length === 0 && !local.isLoading"
        >
          <RequestItem />
        </transition>
      </div>
      <div class="hidden lg:block w-[390px]">
        <transition name="slide-fade-right" appear>
          <RequestDetail
            :data="requestStore.selectRequest"
            @filterLane="handleFilterLane"
            @filterKeyword="handleFilterKeyword"
            :showHeader="false"
          >
            <template #bottom>
              <s-button
                :variant="requestStore.selectRequest ? 'primary' : 'secondary'"
                class="!h-[48px]"
                :class="{
                  '!bg-neutral-30 !text-neutral-90': !requestStore.selectRequest,
                }"
                :disabled="!requestStore.selectRequest"
                @click="handlePickup"
                >Pick up now</s-button
              >
            </template>
          </RequestDetail>
        </transition>
      </div>
    </div>
    <Teleport to="#main">
      <div class="wrapper z-[4] bg-white absolute top-0 left-0" v-if="local.showScanLocation">
        <ScanQRCode
          title="Scan Location Code"
          subtitle="Align the QR code within the frame to scan"
          @result="onScan"
          @error="onError"
        >
          <template #default>
            <span class="flex flex-row gap-4">
              <s-button outline class="!bg-white active:!opacity-80" @click="handleCancelScanning">
                Cancel scanning
              </s-button>
              <s-button
                outline
                variant="danger"
                class="!bg-white active:!opacity-80"
                @click="handleCannotScan"
              >
                I can not scan
              </s-button>
            </span>
          </template>
        </ScanQRCode>
      </div>
    </Teleport>
    <Teleport to="#main">
      <transition name="fade" appear>
        <div
          class="fixed center block lg:hidden w-screen h-screen z-[4] bg-[rgba(0,0,0,0.5)] shadow-2xl"
          v-if="requestStore.selectRequest"
        >
          <div class="w-[80%] max-w-[600px] center">
            <RequestDetail
              v-if="requestStore.selectRequest"
              :data="requestStore.selectRequest"
              @filterLane="handleFilterLane"
              @filterKeyword="handleFilterKeyword"
              showHeader
            >
              <template #bottom>
                <s-button variant="primary" class="!h-[48px]" @click="handlePickup"
                  >Pick up now</s-button
                >
              </template>
            </RequestDetail>
            <s-icon
              :src="$icon.render('iconClose')"
              width="24"
              height="24"
              class="!text-neutral-100 absolute top-5 right-5 cursor-pointer"
              @click="requestStore.selectRequest = undefined"
            ></s-icon>
          </div>
        </div>
      </transition>
    </Teleport>
    <s-modal size="sm" position="center" v-if="requestStore.fulfillSuccessModal" :showClose="false">
      <template #body>
        <div class="wrapper flex flex-col items-center gap-6">
          <s-icon
            :src="$icon.render('iconMove')"
            width="130"
            height="130"
            class="!text-white svg-line"
          ></s-icon>
          <div class="flex flex-col text-center gap-3">
            <div class="text-[22px] text-primary">Successful!</div>
            <div class="text-[17px] text-neutral-200 leading-[140%]">
              You have fulfilled the request.
            </div>
          </div>
          <s-button
            variant="primary"
            class="w-full !h-[48px] flex-1"
            @click="requestStore.fulfillSuccessModal = false"
            >Close</s-button
          >
        </div>
      </template>
    </s-modal>
    <s-modal
      @close="local.locationCodeModal = false"
      size="sm"
      position="center"
      v-if="local.locationCodeModal"
    >
      <template #header> LOCATION CODE </template>
      <template #body>
        <s-input placeholder="Type location code" v-model="local.locationCode"></s-input>
      </template>
      <template #footer>
        <div class="wrapper flex flex-row gap-4">
          <s-button
            variant="primary"
            outline
            class="!h-[48px] flex-1"
            @click="handleCancelInputLocationCode"
            >Cancel</s-button
          >
          <s-button
            variant="primary"
            class="!h-[48px] flex-1"
            @click="handleConfirmInputLocationCode"
            >Confirm</s-button
          >
        </div>
      </template>
    </s-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref, onBeforeUnmount } from 'vue';
import ScanQRCode from '@/components/ScanQRCode.vue';
import RequestItem from '@/components/RequestItem.vue';
import RequestDetail from '@/components/RequestDetail.vue';
import EventBus from '@/utils/eventbus';
import { useRouter } from 'vue-router';
import LaneTag from '@/components/LaneTag.vue';
import { useRequestStore } from '@/stores/request';
import { useAuthStore } from '@/stores/auth';
import type { Request } from '@/modules/fullfill-request/types';
// import { isPortrait } from '@/utils/device';
import axios from 'axios';
import { FIREBASE_EVENTS } from '@/utils/const';
// import { debounce } from '@/utils/debounce';

const authStore = useAuthStore();
const requestStore = useRequestStore();
const router = useRouter();
const requestList = ref();

interface Local {
  showScanLocation?: boolean;
  requestList: Array<Request>;
  locationCodeModal: boolean;
  locationCode: string;
  isLoading: boolean;
}

const local: Local = reactive({
  showScanLocation: false,
  requestList: [],
  locationCodeModal: false,
  locationCode: '',
  isLoading: false,
});

const handleFilterKeyword = async (data: any) => {
  requestStore.filter = {
    ...requestStore.filter,
    keyword: {
      ...data,
    },
  };
  await loadData(true);
};

const handleFilterLane = async (lane: string) => {
  requestStore.filter.location = lane;
  await loadData(true);
};

const onClearFilter = async (isFilterLane = true) => {
  if (!isFilterLane) {
    requestStore.setDefaultFilterKeyword();
  } else {
    requestStore.setDefaultFilter();
  }
  await loadData(true);
};

const onScan = async (decodedText: string) => {
  if (decodedText) {
    requestStore.filter.location = decodedText;
    await loadData(true);
    local.showScanLocation = false;
  }
};

const onError = () => {};

const handleScanningLocation = () => {
  local.showScanLocation = true;
};
const handleCancelScanning = () => {
  local.showScanLocation = false;
};
const handleCannotScan = () => {
  local.showScanLocation = false;
  local.locationCodeModal = true;
};
const handlePickup = async () => {
  //TODO handle pickup
  if (requestStore.selectRequest) {
    const payload = {
      employee_id: authStore.employee?.id,
      request_id: requestStore.selectRequest?.id,
    };
    const data = await requestStore.receiveRequest(payload);
    if (data) {
      router.push({
        name: 'picking-up',
      });
    }
  }
};

const handleCancelInputLocationCode = () => {
  local.locationCodeModal = false;
  local.locationCode = '';
};
const handleConfirmInputLocationCode = async () => {
  if (local.locationCode) {
    requestStore.filter.location = local.locationCode;
  } else {
    requestStore.filter.location = '';
  }
  await loadData();
  local.locationCode = '';
  local.locationCodeModal = false;
};

const loadData = async (init = false) => {
  console.log('Loading data');

  try {
    if (init) {
      local.isLoading = true;
      requestStore.selectRequest = undefined;
    }
    requestStore.total = 0;
    requestStore.filter = {
      ...requestStore.filter,
      employee: authStore.employee?.id,
    };
    const filter = {
      ...requestStore.filter,
      keyword: requestStore.filter.keyword.value,
    };

    const data = await requestStore.getListRequest(filter);
    if (data) {
      local.requestList = data;
      // if (!isPortrait && local.requestList.length > 0) {
      //   requestStore.selectRequest = local.requestList[0];
      // }
    } else {
      local.requestList = [];
    }
  } catch (error) {
    if (axios.isAxiosError(error)) console.warn(error);
  } finally {
    local.isLoading = false;
  }
};

const handleSelectRequest = (request: Request) => {
  if (
    !requestStore.selectRequest ||
    (requestStore.selectRequest && requestStore.selectRequest.id !== request.id)
  ) {
    requestStore.selectRequest = request;
  }
};
// const debounceLoadData = debounce(loadData, 500);

loadData(true);
onMounted(() => {
  EventBus.$on(FIREBASE_EVENTS.EVENT_CREATE, loadData);
  EventBus.$on(FIREBASE_EVENTS.EVENT_RECEIVE, loadData);
  EventBus.$on(FIREBASE_EVENTS.EVENT_FULFILL, loadData);
  EventBus.$on(FIREBASE_EVENTS.EVENT_REJECT, loadData);
  EventBus.$on(FIREBASE_EVENTS.EVENT_RELEASE, loadData);
  EventBus.$on(FIREBASE_EVENTS.EVENT_TIMEOUT, loadData);
  EventBus.$on(FIREBASE_EVENTS.EVENT_CONFIRM, loadData);
  EventBus.$on(FIREBASE_EVENTS.EVENT_UPDATE_PRIORITY, loadData);
  EventBus.$on(FIREBASE_EVENTS.EVENT_REPORT_MISSING_BOX, loadData);
});

onBeforeUnmount(() => {
  EventBus.$off(FIREBASE_EVENTS.EVENT_CREATE);
  EventBus.$off(FIREBASE_EVENTS.EVENT_RECEIVE);
  EventBus.$off(FIREBASE_EVENTS.EVENT_FULFILL);
  EventBus.$off(FIREBASE_EVENTS.EVENT_REJECT);
  EventBus.$off(FIREBASE_EVENTS.EVENT_RELEASE);
  EventBus.$off(FIREBASE_EVENTS.EVENT_TIMEOUT);
  EventBus.$off(FIREBASE_EVENTS.EVENT_CONFIRM);
  EventBus.$off(FIREBASE_EVENTS.EVENT_UPDATE_PRIORITY);
  EventBus.$off(FIREBASE_EVENTS.EVENT_REPORT_MISSING_BOX);
});
</script>

<style scoped></style>
