<template>
  <div class="w-full flex flex-row justify-center p-6 bg-neutral-10 gap-7">
    <div class="flex-1 lg:basis-1/2 lg:flex-none">
      <transition name="slide-fade-left" appear>
        <RequestDetail :data="local.currentPickingUp">
          <template #bottom>
            <span class="flex flex-col gap-4">
              <s-button variant="primary" class="!h-[48px]" @click="handleScanningBoxID">
                Scan Box ID</s-button
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
        <CountDown :time="local.countDown" @end="handleEndTime" />
        <s-button variant="danger" outline class="!h-[48px]" @click="openCancelModal"
          >Cancel pickup</s-button
        >
      </div>
    </transition>
    <Teleport to="#main">
      <div class="wrapper z-[4] bg-white absolute top-0 left-0" v-if="local.showScanQR">
        <ScanQRCode
          :title="local.isScanLocation ? 'Scan Location Code' : 'Scan Box ID'"
          subtitle="Align the QR code within the frame to scan"
          @result="onScan"
          @error="onError"
        >
          <template #default>
            <span class="flex flex-row gap-4">
              <s-button
                outline
                variant="primary"
                class="!bg-white active:!opacity-80"
                @click="handleCancelScanning"
              >
                Cancel scanning
              </s-button>
              <s-button
                outline
                variant="danger"
                class="!bg-white active:!opacity-80"
                @click="handleCannotScan(local.isScanLocation)"
              >
                I can not scan
              </s-button>
            </span>
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
            <div class="flex justify-between" v-for="box in local.missingBoxList" :key="box?.id">
              <span class="text-neutral-200"> Box ID </span>
              <span class="text-neutral-900"> {{ box.barcode }} </span>
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
        <s-input placeholder="Type box ID" v-model="local.barcode"></s-input>
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
              Request has been cancelled due to time out.
            </div>
          </div>
          <s-button variant="primary" class="w-full !h-[48px] flex-1" @click="handleTimeoutPickup"
            >Return to Dashboard</s-button
          >
        </div>
      </template>
    </s-modal>
    <s-modal size="sm" position="center" v-if="local.outOfStockModal" :showClose="false">
      <template #body>
        <div class="wrapper flex flex-col items-center gap-6">
          <s-icon
            :src="$icon.render('iconDanger')"
            width="130"
            height="130"
            class="!text-white svg-line"
          ></s-icon>
          <div class="flex flex-col text-center gap-3">
            <div class="text-[22px] text-danger">Out of stock!</div>
            <div class="text-[17px] text-neutral-200 leading-[140%]">
              Please reach out to the relevant department for assistance.
            </div>
          </div>
          <s-button
            variant="primary"
            class="w-full !h-[48px] flex-1"
            @click="local.outOfStockModal = false"
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
              One or more boxes have been removed from suggested locations.
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
    <s-modal
      @close="local.cancelPickupModal = false"
      size="sm"
      position="center"
      v-if="local.cancelPickupModal"
    >
      <template #header> CANCEL PICKUP </template>
      <template #body>
        <div class="wrapper text-[17px]">Do you want to cancel pickup this request?</div>
      </template>
      <template #footer>
        <div class="wrapper flex flex-row gap-4">
          <s-button
            variant="primary"
            outline
            class="!h-[48px] flex-1"
            @click="local.cancelPickupModal = false"
            >No</s-button
          >
          <s-button variant="primary" class="!h-[48px] flex-1" @click="handleCancelPickup"
            >Yes</s-button
          >
        </div>
      </template>
    </s-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount } from 'vue';
import ScanQRCode from '@/components/ScanQRCode.vue';
import CountDown from '@/components/CountDown.vue';
import RequestDetail from '@/components/RequestDetail.vue';
import { useRouter } from 'vue-router';
import EventBus from '@/utils/eventbus';
import { usePickingUpStore } from '@/stores/pickingup';
import { useAuthStore } from '@/stores/auth';
import type { Request } from '@/modules/fullfill-request/types';
import { checkPickupTimeOut } from '@/utils/helper';
import { useRequestStore } from '@/stores/request';
import type { Box } from '@/modules/picking-up/types';
import { FIREBASE_EVENTS } from '@/utils/const';

const requestStore = useRequestStore();
const authStore = useAuthStore();
const pickingUpStore = usePickingUpStore();
const router = useRouter();

interface Local {
  showScanQR?: boolean;
  isScanLocation?: boolean;
  reportMissingBoxModal?: boolean;
  checkReceiveModal?: boolean;
  locationCodeModal?: boolean;
  timeoutModal?: boolean;
  outOfStockModal?: boolean;
  locationUpdateModal?: boolean;
  cancelPickupModal?: boolean;
  currentPickingUp?: Request;
  countDown: number;
  barcode: string;
  locationCode: string;
  missingBoxList: Array<Box>;
}

const local: Local = reactive({
  showScanQR: false,
  isScanLocation: false,
  reportMissingBoxModal: false,
  checkReceiveModal: false,
  locationCodeModal: false,
  timeoutModal: false,
  outOfStockModal: false,
  locationUpdateModal: false,
  cancelPickupModal: false,
  currentPickingUp: undefined,
  countDown: 0,
  barcode: '',
  locationCode: '',
  missingBoxList: [],
});

const onScan = async (decodedText: string) => {
  if (decodedText) {
    console.log(decodedText);

    EventBus.$emit('changeState', 3);
    if (local.isScanLocation) {
      //TODO handle scan location
      const payload = {
        employee_id: String(authStore.employee?.id),
        internal_request_id: String(local.currentPickingUp?.id),
        location_barcode: String(decodedText),
        product_id: String(local.currentPickingUp?.product_id),
      };
      const data = await pickingUpStore.getAllMissingBox(payload);
      console.log('box missing', data);
      if (data && Object.keys(data).length > 0) {
        local.missingBoxList = data.data;
        console.log(local.missingBoxList);
        local.locationCode = String(decodedText);
        local.showScanQR = false;
        local.reportMissingBoxModal = true;
      } else {
        setTimeout(() => {
          EventBus.$emit('changeState', 0);
        }, 1000);
      }
    } else {
      //TODO Handle scan box ID confirm fulfill
      const payload = {
        employee_id: Number(authStore.employee?.id),
        barcode: String(decodedText),
        id_time_checking: Number(authStore.time_checking_id),
        request_id: Number(local.currentPickingUp?.id),
      };
      const data = await pickingUpStore.fulfillRequest(payload);
      if (data && Object.keys(data).length > 0) {
        requestStore.fulfillSuccessModal = true;
        router.push({
          name: 'fulfill-request',
        });
      } else {
        setTimeout(() => {
          EventBus.$emit('changeState', 0);
        }, 1000);
      }
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

const handleCannotScan = (isLocation?: boolean) => {
  local.showScanQR = false;
  if (isLocation) {
    local.locationCodeModal = true;
  } else {
    local.checkReceiveModal = true;
  }
};

const handleCancelReport = () => {
  local.reportMissingBoxModal = false;
  local.missingBoxList = [];
  local.locationCode = '';
};
const handleConfirmReport = async () => {
  //TODO Handle confirm report
  try {
    const payload = {
      employee_id: String(authStore.employee?.id),
      internal_request_id: String(local.currentPickingUp?.id),
      location_barcode: String(local.locationCode),
      product_id: String(local.currentPickingUp?.product_id),
    };
    const data = await pickingUpStore.reportMissingBox(payload);
    console.log('report box missing', data);
  } catch (error) {
  } finally {
    local.locationCode = '';
    local.reportMissingBoxModal = false;
    local.missingBoxList = [];
  }
};

const handleCancelInputLocationCode = () => {
  local.locationCodeModal = false;
  local.locationCode = '';
};
const handleConfirmInputLocationCode = async () => {
  //TODO Handle confirm location
  try {
    const payload = {
      employee_id: String(authStore.employee?.id),
      internal_request_id: String(local.currentPickingUp?.id),
      location_barcode: String(local.locationCode),
      product_id: String(local.currentPickingUp?.product_id),
    };
    const data = await pickingUpStore.getAllMissingBox(payload);
    console.log('box missing', data);
    if (data && Object.keys(data).length > 0) {
      local.missingBoxList = data.data;
      console.log(local.missingBoxList);
      local.reportMissingBoxModal = true;
    }
  } catch (error) {
  } finally {
    local.locationCode = '';
    local.locationCodeModal = false;
  }
};

const handleCancelCheckReceive = () => {
  local.checkReceiveModal = false;
  local.barcode = '';
};
const handleConfirmCheckReceive = async () => {
  //TODO Handle confirm check receive
  try {
    const payload = {
      employee_id: Number(authStore.employee?.id),
      barcode: local.barcode,
      id_time_checking: Number(authStore.time_checking_id),
      request_id: Number(local.currentPickingUp?.id),
    };
    const data = await pickingUpStore.fulfillRequest(payload);
    if (data && Object.keys(data).length > 0) {
      requestStore.fulfillSuccessModal = true;
      router.push({
        name: 'fulfill-request',
      });
    }
  } catch (error) {
  } finally {
    local.barcode = '';
    local.checkReceiveModal = false;
  }
};

const openCancelModal = () => {
  local.cancelPickupModal = true;
};

const handleCancelPickup = async () => {
  //TODO redirect to previous page and cancel pickup
  try {
    console.log({
      employee_id: authStore.employee?.id,
      request_id: local.currentPickingUp?.id,
    });

    const data = await pickingUpStore.cancelPickup({
      employee_id: authStore.employee?.id,
      request_id: local.currentPickingUp?.id,
    });
    if (Object.keys(data).length > 0) {
      router.push({
        name: 'fulfill-request',
      });
    }
  } catch (error) {
  } finally {
    local.cancelPickupModal = false;
  }
};

const handleEndTime = () => {
  console.log('End time');
  local.timeoutModal = true;
};

const handleTimeoutPickup = () => {
  router.push({
    name: 'fulfill-request',
  });
};

const loadData = async () => {
  local.currentPickingUp = await pickingUpStore.getCurrentPickingUp({
    employee_id: authStore.employee?.id,
    location: requestStore.filter.location,
  });
  if (local.currentPickingUp && Object.keys(local.currentPickingUp).length > 0) {
    const res = checkPickupTimeOut(local.currentPickingUp.expried_at);
    local.countDown = res.range;
  } else {
    router.push({
      name: 'fulfill-request',
    });
  }
};

const handleCheckRelease = async () => {
  const newestPickingUp = await pickingUpStore.getCurrentPickingUp({
    employee_id: authStore.employee?.id,
    location: requestStore.filter.location,
  });
  if (!newestPickingUp || (newestPickingUp && Object.keys(newestPickingUp).length === 0)) {
    router.push({
      name: 'fulfill-request',
    });
  }
};

// const handleCheckTimeout = async () => {
//   const newestPickingUp = await pickingUpStore.getCurrentPickingUp({
//     employee_id: authStore.employee?.id,
//     location: requestStore.filter.location,
//   });
//   console.log('TIMEOUT HANDLE: ', newestPickingUp);
//   if (!newestPickingUp || (newestPickingUp && Object.keys(newestPickingUp).length === 0)) {
//     local.timeoutModal = true;
//   }
// };

const isNormalLane = (lane: string) => {
  if (lane.charAt(0) === lane.charAt(1)) {
    return true;
  }
  return false;
};

const compareDiffLocations = (oldLocations: any, newLocations: any) => {
  if (oldLocations.length === 0 || newLocations.length === 0) return false;
  if (
    (isNormalLane(oldLocations) && !isNormalLane(newLocations)) ||
    (!isNormalLane(oldLocations) && isNormalLane(newLocations)) ||
    (isNormalLane(oldLocations) &&
      isNormalLane(newLocations) &&
      oldLocations[0].charAt(0) !== newLocations[0].charAt(0))
  ) {
    return true;
  }
  return false;
};

const handleCheckLocation = async () => {
  const newestPickingUp = await pickingUpStore.getCurrentPickingUp({
    employee_id: authStore.employee?.id,
    location: requestStore.filter.location,
  });
  if (newestPickingUp && Object.keys(newestPickingUp).length > 0) {
    if (newestPickingUp.locations.length === 0) {
      local.outOfStockModal = true;
    } else {
      if (
        requestStore.filter.location &&
        compareDiffLocations(local.currentPickingUp?.locations, newestPickingUp.locations)
      ) {
        local.locationUpdateModal = true;
      }
    }
  }
};

loadData();
onMounted(() => {
  EventBus.$on(FIREBASE_EVENTS.EVENT_RELEASE, handleCheckRelease);
  // EventBus.$on(FIREBASE_EVENTS.EVENT_TIMEOUT, handleCheckTimeout);
  EventBus.$on(FIREBASE_EVENTS.EVENT_FULFILL, handleCheckLocation);
  EventBus.$on(FIREBASE_EVENTS.EVENT_REPORT_MISSING_BOX, handleCheckLocation);
});

onBeforeUnmount(() => {
  EventBus.$off(FIREBASE_EVENTS.EVENT_RELEASE);
  // EventBus.$off(FIREBASE_EVENTS.EVENT_TIMEOUT);
  EventBus.$off(FIREBASE_EVENTS.EVENT_FULFILL);
  EventBus.$off(FIREBASE_EVENTS.EVENT_REPORT_MISSING_BOX);
});
</script>

<style scoped></style>
