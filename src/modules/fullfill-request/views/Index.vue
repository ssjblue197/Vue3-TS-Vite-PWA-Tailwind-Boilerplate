<template>
  <div class="w-full flex flex-col justify-start p-6 pb-0 bg-neutral-10 gap-6">
    <div class="flex justify-between items-center">
      <span class="text-[22px] leading-[28px] text-neutral-900">
        <LaneTag title="All" :count="120" />
      </span>
      <s-button variant="primary" class="w-[220px] !h-[40px]" @click="handleScanningLocation">
        Scan location code
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
          <RequestDetail>
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
  </div>
</template>

<script setup lang="ts">
import ScanQRCode from '@/components/ScanQRCode.vue';
import RequestItem from '@/components/RequestItem.vue';
import RequestDetail from '@/components/RequestDetail.vue';
// import EventBus from '@/utils/eventbus';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import LaneTag from '@/components/LaneTag.vue';

const router = useRouter();

interface Local {
  showScanLocation?: boolean;
  showMessage: boolean;
}

const local: Local = reactive({
  showScanLocation: false,
  showMessage: false,
});

const onScan = (decodedText: string, decodedResult: any) => {
  console.log(decodedResult);
  if (decodedText) {
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
const handlePickup = () => {
  //TODO handle pickup
  router.push({
    name: 'picking-up',
  });
};
</script>

<style scoped></style>
