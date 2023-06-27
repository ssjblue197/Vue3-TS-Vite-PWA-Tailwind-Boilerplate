<template>
  <div class="w-full flex flex-col justify-start p-6 pb-0 bg-neutral-10 gap-6">
    <div class="flex justify-between items-center">
      <span class="text-[22px] leading-[28px] text-neutral-900">
        <LaneTag
          :title="requestStore.filter.location ? requestStore.filter.location : 'All'"
          :count="requestStore.total"
          @clear="onClearFilter"
        />
      </span>
      <s-button variant="primary" class="w-[220px] !h-[40px]" @click="handleScanningLocation">
        Scan location code
      </s-button>
    </div>

    <div class="flex gap-7">
      <div
        class="flex-1 flex-col flex gap-5 max-h-[calc(100vh-68px-40px-24px-24px)] overflow-y-scroll relative items-center"
        id="scroll-area scroll-touch"
        v-if="local.requestList.length > 0"
      >
        <transition-group mode="out-in" name="list" appear>
          <RequestItem
            ref="requestList"
            v-for="request in local.requestList"
            :key="request?.id"
            :data="request"
            @click="handleSelectRequest(request)"
            :active="requestStore.selectRequest?.id === request.id"
          />
          <infinite-loading
            target="#scroll-area"
            @infinite="loadData(false)"
            v-show="!local.isEnd"
          ></infinite-loading>
        </transition-group>
      </div>
      <div class="hidden lg:block w-[390px]" v-if="requestStore.selectRequest">
        <transition name="slide-fade-right" appear>
          <RequestDetail :data="requestStore.selectRequest">
            <template #bottom>
              <s-button variant="primary" class="!h-[48px]" @click="handlePickup"
                >Pick up now</s-button
              >
            </template>
          </RequestDetail>
        </transition>
      </div>
    </div>
    <Teleport to="body">
      <div class="wrapper z-[2] bg-white absolute top-0 left-0" v-if="local.showScanLocation">
        <ScanQRCode
          title="Scan Location Code"
          subtitle="Align the QR code within the frame to scan"
          @result="onScan"
          @error="onError"
        >
          <template #default>
            <s-button outline class="!bg-white active:!opacity-80" @click="handleCancelScanning">
              Cancel scanning
            </s-button>
          </template>
        </ScanQRCode>
      </div>
    </Teleport>
    <Teleport to="body">
      <div
        class="absolute center block lg:hidden w-[80%] max-w-[600px] z-1 bg-white shadow-2xl rounded-[16px]"
        v-if="requestStore.selectRequest"
      >
        <transition name="fade" appear>
          <RequestDetail v-if="requestStore.selectRequest" :data="requestStore.selectRequest">
            <template #bottom>
              <s-button variant="primary" class="!h-[48px]" @click="handlePickup"
                >Pick up now</s-button
              >
            </template>
          </RequestDetail>
        </transition>
        <s-icon
          :src="$icon.render('iconClose')"
          width="24"
          height="24"
          class="!text-neutral-100 absolute top-4 right-4 cursor-pointer"
          @click="requestStore.selectRequest = undefined"
        ></s-icon>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import ScanQRCode from '@/components/ScanQRCode.vue';
import RequestItem from '@/components/RequestItem.vue';
import RequestDetail from '@/components/RequestDetail.vue';
// import EventBus from '@/utils/eventbus';
import { useRouter } from 'vue-router';
import LaneTag from '@/components/LaneTag.vue';
import { useRequestStore } from '@/stores/request';
import type { Request } from '@/modules/fullfill-request/types';
import axios from 'axios';

const requestStore = useRequestStore();
const router = useRouter();
const requestList = ref();

interface Local {
  showScanLocation?: boolean;
  showMessage: boolean;
  requestList: Array<Request>;
  isEnd: boolean;
  lastCountItems: number;
}

const local: Local = reactive({
  showScanLocation: false,
  showMessage: false,
  requestList: [],
  isEnd: false,
  lastCountItems: 0,
});

const onClearFilter = async () => {
  requestStore.setDefaultFilter();
  local.isEnd = false;
  await loadData();
};

const onScan = async (decodedText: string, decodedResult: any) => {
  if (decodedText) {
    console.log(decodedResult);
    requestStore.filter.location = decodedText;
    // requestStore.filter.limit = ITEMS_PER_PAGE;
    local.isEnd = false;
    await loadData();
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
const handlePickup = async () => {
  //TODO handle pickup
  const payload = {
    employee_id: 3, //Fake
    request_id: requestStore.selectRequest?.id,
  };
  const data = await requestStore.receiveRequest(payload);
  if (data) {
    router.push({
      name: 'picking-up',
    });
  }
};

const loadData = async (init = true) => {
  try {
    if (!init) {
      // requestStore.filter.limit += ITEMS_PER_PAGE;
    } else {
      local.requestList = [];
      requestStore.selectRequest = undefined;
      requestStore.total = 0;
    }
    const data = await requestStore.getListRequest(requestStore.filter);
    if (data.length > 0) {
      // local.requestList = [...local.requestList, ...data];
      local.requestList = [...data];
      if (init) {
        requestStore.selectRequest = local.requestList[0];
      }
    }
    if (local.lastCountItems >= data.length) {
      local.isEnd = true;
    }
    local.lastCountItems = data.length;
  } catch (error) {
    if (axios.isAxiosError(error)) console.warn(error);
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

loadData();
onMounted(() => {});
</script>

<style scoped></style>
