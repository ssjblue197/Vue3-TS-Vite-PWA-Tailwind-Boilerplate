<template>
  <div class="w-full flex flex-row justify-center p-6 bg-neutral-10 gap-7">
    <div class="flex-1 lg:basis-1/2 lg:flex-none">
      <transition name="slide-fade-left" appear>
        <RequestDetail :data="requestStore.selectRequest">
          <template #bottom>
            <span class="flex flex-col gap-4">
              <s-button variant="primary" class="!h-[48px]" @click="handleScanningBoxID"
                >Confirm fulfilled</s-button
              >
              <s-button variant="danger" outline class="!h-[48px]" @click="handleScanningLocation"
                >Report missing box</s-button
              >
            </span>
          </template>
        </RequestDetail>
      </transition>
    </div>
    <transition name="slide-fade-right" appear>
      <div class="card p-6 flex flex-col gap-4 h-fit w-[208px]">
        <CountDown :time="10 * 60" @end="handleEndTime" />
        <s-button variant="danger" outline class="!h-[48px]" @click="handleCancelPickup"
          >Cancel pickup</s-button
        >
      </div>
    </transition>
    <Teleport to="body">
      <div class="wrapper z-[2] bg-white absolute top-0 left-0" v-if="local.showScanQR">
        <ScanQRCode
          :title="local.isScanLocation ? 'Scan Location Code' : 'Scan Box ID'"
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
              v-if="local.isScanLocation"
            >
              Cancel scanning
            </s-button>
            <s-button
              outline
              variant="danger"
              class="!bg-white active:!opacity-80"
              @click="handleCannotScan"
              v-else
            >
              I can not scan
            </s-button>
          </template>
        </ScanQRCode>
      </div>
    </Teleport>
    <s-modal
      @close="local.reportMissingBoxModal = false"
      size="sm"
      position="center"
      v-if="local.reportMissingBoxModal"
    >
      <template #header> REPORT MISSING BOX </template>
      <template #body>
        <div class="wrapper flex flex-col gap-5 text-[17px]">
          <div class="text-neutral-900 leading-[140%]">Do you want to report missing box?</div>
          <div class="max-h-[140px] overflow-y-auto flex flex-col gap-3">
            <div class="flex justify-between" v-for="i in 10" :key="i">
              <span class="text-neutral-200"> Box ID </span>
              <span class="text-neutral-900"> A768475 </span>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="wrapper flex flex-row gap-4">
          <s-button variant="primary" outline class="!h-[48px] flex-1" @click="handleCancelReport"
            >Cancel</s-button
          >
          <s-button variant="primary" class="!h-[48px] flex-1" @click="handleConfirmReport"
            >Confirm</s-button
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
        <s-input placeholder="Type box ID"></s-input>
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
    <s-modal size="sm" position="center" v-if="local.timeoutModal" :showClose="false">
      <template #body>
        <div class="wrapper flex flex-col items-center gap-6">
          <s-icon
            :src="$icon.render('iconDanger')"
            width="130"
            height="130"
            class="!text-white svg-line"
          ></s-icon>
          <div class="flex flex-col text-center gap-3">
            <div class="text-[22px] text-danger">Time out!</div>
            <div class="text-[17px] text-neutral-200 leading-[140%]">
              The request has been withdrawn due to the expiration of the time limit. Please return
              to the list for pick-up if needed.
            </div>
          </div>
          <s-button
            variant="primary"
            class="w-full !h-[48px] flex-1"
            @click="local.timeoutModal = false"
            >Close</s-button
          >
        </div>
      </template>
    </s-modal>
    <s-modal size="sm" position="center" v-if="local.locationUpdateModal" :showClose="false">
      <template #body>
        <div class="wrapper flex flex-col items-center gap-6">
          <s-icon
            :src="$icon.render('iconMove')"
            width="130"
            height="130"
            class="!text-white svg-line"
          ></s-icon>
          <div class="flex flex-col text-center gap-3">
            <div class="text-[22px] text-primary">Location updated!</div>
            <div class="text-[17px] text-neutral-200 leading-[140%]">
              Please double-check the suggested locations, as one of them is already out of stock
              and has been hidden.
            </div>
          </div>
          <s-button
            variant="primary"
            class="w-full !h-[48px] flex-1"
            @click="local.locationUpdateModal = false"
            >Close</s-button
          >
        </div>
      </template>
    </s-modal>
  </div>
</template>

<script setup lang="ts">
import ScanQRCode from '@/components/ScanQRCode.vue';
import CountDown from '@/components/CountDown.vue';
import RequestDetail from '@/components/RequestDetail.vue';
import { useRouter } from 'vue-router';
// import EventBus from '@/utils/eventbus';
import { reactive } from 'vue';
import { useRequestStore } from '@/stores/request';

const requestStore = useRequestStore();
const router = useRouter();

interface Local {
  showScanQR?: boolean;
  isScanLocation?: boolean;
  reportMissingBoxModal?: boolean;
  checkReceiveModal?: boolean;
  timeoutModal?: boolean;
  locationUpdateModal?: boolean;
}

const local: Local = reactive({
  showScanQR: false,
  isScanLocation: false,
  reportMissingBoxModal: false,
  checkReceiveModal: false,
  timeoutModal: false,
  locationUpdateModal: false,
});

const onScan = (decodedText: string, decodedResult: any) => {
  console.log(decodedResult);
  if (decodedText) {
    local.showScanQR = false;
    if (local.isScanLocation) {
      //TODO handle scan location
      local.reportMissingBoxModal = true;
    } else {
      //TODO Handle scan box ID confirm fulfill
      router.push({
        name: 'fulfill-request',
      });
    }
  }
};

const onError = () => {};

const handleScanningLocation = () => {
  local.isScanLocation = true;
  local.showScanQR = true;
};

const handleScanningBoxID = () => {
  local.isScanLocation = false;
  local.showScanQR = true;
};
const handleCancelScanning = () => {
  local.showScanQR = false;
};

const handleCannotScan = () => {
  local.showScanQR = false;
  local.checkReceiveModal = true;
};

const handleCancelReport = () => {
  local.reportMissingBoxModal = false;
};
const handleConfirmReport = () => {
  local.reportMissingBoxModal = false;
  //TODO Handle confirm report

  router.push({
    name: 'fulfill-request',
  });
};

const handleCancelCheckReceive = () => {
  local.checkReceiveModal = false;
};
const handleConfirmCheckReceive = () => {
  local.checkReceiveModal = false;
  //TODO Handle confirm check receive

  router.push({
    name: 'fulfill-request',
  });
};

const handleCancelPickup = () => {
  //TODO redirect to previous page and cancel pickup
  router.push({
    name: 'fulfill-request',
  });
};

const handleEndTime = () => {
  console.log('End time');
};
</script>

<style scoped></style>
