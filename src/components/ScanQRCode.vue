<template>
  <div class="wrapper flex flex-col items-center p-[50px] justify-between">
    <div class="flex flex-col items-center gap-3 text-center">
      <span class="text-[34px] font-semibold text-white z-[2] leading-[140%]">
        {{ props.title }}
      </span>
      <span class="text-[20px] font-normal text-white z-[2] leading-[140%]">
        {{ props.subtitle }}
      </span>
    </div>
    <div class="wrapper !absolute w-screen h-screen top-0 left-0 z-1">
      <div
        id="qr-code-full-region"
        class="w-full h-full bg-[rgba(10,11,13,0.3)] backdrop-blur-[2px] z-1 flex items-center flex-col overflow-hidden absolute top-0 left-0 z-1"
      ></div>
    </div>
    <div class="z-[2]">
      <slot name="default" />
    </div>
    <div class="absolute top-8 z-[2] left-8">
      <slot name="top-left" />
    </div>
    <div class="absolute top-8 z-[2] right-8">
      <slot name="top-right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive } from 'vue';
import { Html5Qrcode } from 'html5-qrcode';
import type { CameraDevice, Html5QrcodeCameraScanConfig } from 'html5-qrcode';
import EventBus from '@/utils/eventbus';

interface Props {
  title?: string;
  subtitle?: string;
}

interface Local {
  html5QrCode: any;
  scanArea?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
});

// const scanStore = useScanStore();
const emit = defineEmits(['result', 'error']);

const local: Local = reactive({
  html5QrCode: null,
  scanArea: 400,
});

const startScanQRCode = async () => {
  const area = document.querySelector('#qr-code-full-region');
  const config: Html5QrcodeCameraScanConfig = {
    fps: 2,
    qrbox: local.scanArea,
  };
  if (local.html5QrCode.getState() !== 2) {
    await local.html5QrCode
      .start(
        { facingMode: 'environment' },
        config,
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (decodedText: string, decodedResult: any) => {
          emit('result', decodedText, decodedResult);
          const scan = area?.querySelector('#qr-shaded-region');
          if (scan) {
            scan.innerHTML = `
            <div 
              style="
                position: absolute; top: -8px; left: -8px; transform: rotate(-45deg); width: 150px;
                height: 150px;
                border: solid 6px #4641d2;
                border-color: #4641d2 transparent transparent transparent;
                border-radius: 50%/90px 90px 0 0;
              "
            ></div>
            <div 
              style="
                position: absolute; bottom: -8px; left: -8px; transform: rotate(-135deg); width: 150px;
                height: 150px;
                border: solid 6px #4641d2;
                border-color: #4641d2 transparent transparent transparent;
                border-radius: 50%/90px 90px 0 0;
              "
            ></div>
            <div 
              style="
                position: absolute; bottom: -8px; right: -8px; transform: rotate(135deg); width: 150px;
                height: 150px;
                border: solid 6px #4641d2;
                border-color: #4641d2 transparent transparent transparent;
                border-radius: 50%/90px 90px 0 0;
              "
            ></div>
            <div 
              style="
                position: absolute; top: -8px; right: -8px; transform: rotate(45deg); width: 150px;
                height: 150px;
                border: solid 6px #4641d2;
                border-color: #4641d2 transparent transparent transparent;
                border-radius: 50%/90px 90px 0 0;
              "
            ></div>
            <div
              style="
              position: absolute;
              top: 0;
              left: 0;
              transform: rotate(90deg);
                width: 38px;
                height: 38px;
                background: radial-gradient(180% 180% at right -65% top -65%, transparent 99%, rgba(0,0,0,0.48) )
              "
            ></div>
            <div
              style="
              position: absolute;
              top: 0;
              right: 0;
              transform: rotate(180deg);
                width: 38px;
                height: 38px;
                background: radial-gradient(180% 180% at right -65% top -65%, transparent 99%, rgba(0,0,0,0.48) )
              "
            ></div>
            <div
              style="
              position: absolute;
              bottom: 0;
              right: 0;
              transform: rotate(-90deg);
                width: 38px;
                height: 38px;
                background: radial-gradient(180% 180% at right -65% top -65%, transparent 99%, rgba(0,0,0,0.48) )
              "
            ></div>
            <div
              style="
              position: absolute;
              bottom: 0;
              left: 0;
              transform: rotate(0deg);
                width: 38px;
                height: 38px;
                background: radial-gradient(180% 180% at right -65% top -65%, transparent 99%, rgba(0,0,0,0.48) )
              "
            ></div>

            `;
          }
        },
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (errorMessage: any) => {
          emit('error', errorMessage);
          const scan = area?.querySelector('#qr-shaded-region');
          if (scan) {
            scan.innerHTML = `
            <div 
              style="
                position: absolute; top: -8px; left: -8px; transform: rotate(-45deg); width: 150px;
                height: 150px;
                border: solid 6px #4641d2;
                border-color: #4641d2 transparent transparent transparent;
                border-radius: 50%/90px 90px 0 0;
              "
            ></div>
            <div 
              style="
                position: absolute; bottom: -8px; left: -8px; transform: rotate(-135deg); width: 150px;
                height: 150px;
                border: solid 6px #4641d2;
                border-color: #4641d2 transparent transparent transparent;
                border-radius: 50%/90px 90px 0 0;
              "
            ></div>
            <div 
              style="
                position: absolute; bottom: -8px; right: -8px; transform: rotate(135deg); width: 150px;
                height: 150px;
                border: solid 6px #4641d2;
                border-color: #4641d2 transparent transparent transparent;
                border-radius: 50%/90px 90px 0 0;
              "
            ></div>
            <div 
              style="
                position: absolute; top: -8px; right: -8px; transform: rotate(45deg); width: 150px;
                height: 150px;
                border: solid 6px #4641d2;
                border-color: #4641d2 transparent transparent transparent;
                border-radius: 50%/90px 90px 0 0;
              "
            ></div>
            <div
              style="
              position: absolute;
              top: 0;
              left: 0;
              transform: rotate(90deg);
                width: 38px;
                height: 38px;
                background: radial-gradient(180% 180% at right -65% top -65%, transparent 99%, rgba(0,0,0,0.48) )
              "
            ></div>
            <div
              style="
              position: absolute;
              top: 0;
              right: 0;
              transform: rotate(180deg);
                width: 38px;
                height: 38px;
                background: radial-gradient(180% 180% at right -65% top -65%, transparent 99%, rgba(0,0,0,0.48) )
              "
            ></div>
            <div
              style="
              position: absolute;
              bottom: 0;
              right: 0;
              transform: rotate(-90deg);
                width: 38px;
                height: 38px;
                background: radial-gradient(180% 180% at right -65% top -65%, transparent 99%, rgba(0,0,0,0.48) )
              "
            ></div>
            <div
              style="
              position: absolute;
              bottom: 0;
              left: 0;
              transform: rotate(0deg);
                width: 38px;
                height: 38px;
                background: radial-gradient(180% 180% at right -65% top -65%, transparent 99%, rgba(0,0,0,0.48) )
              "
            ></div>
            `;
          }
        }
      )
      .then(() => {
        //Make full scan area
        const el: any = document.querySelector('#qr-code-full-region video');
        if (el) {
          if (el.clientHeight > el.clientWidth) {
            el.style.width = '100%';
          } else {
            el.style.height = '100%';
          }
          el.style['object-fit'] = 'cover';
        }
      })
      .catch((err: any) => {
        // Start failed, handle it.
        console.warn(err);
      });
  }
};

const pauseScan = async () => {
  if (local.html5QrCode.getState() === 2) {
    local.html5QrCode.pause();
  }
};

const resumeScan = async () => {
  if (local.html5QrCode.getState() === 3) {
    local.html5QrCode.resume();
  }
};

const stopScanQRCode = async () => {
  if (local.html5QrCode.getState() === 2) {
    await local.html5QrCode.stop();
  }
};

const handleChangeState = async (state: number) => {
  switch (state) {
    case 1:
      return await stopScanQRCode();
    case 2:
      return await startScanQRCode();
    case 3:
      return await pauseScan();
    default:
      return await resumeScan();
  }
};

onMounted(() => {
  EventBus.$on('changeState', (state: number) => handleChangeState(state));
  local.html5QrCode = new Html5Qrcode('qr-code-full-region');
  Html5Qrcode.getCameras()
    .then(async (devices: Array<CameraDevice>) => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      if (devices && devices.length) {
        // scanStore.devices = devices;
        await startScanQRCode();
      } else {
        // toast.error('An error occurred with your camera');
      }
    })
    .catch((err: any) => {
      // handle err
      console.warn(err);
    });
});

onBeforeUnmount(() => {
  EventBus.$off('changeState');
  stopScanQRCode();
});
</script>

<style scoped>
#qr-code-full-region {
  border: none !important;
  height: 100% !important;
}
#qr-code-full-region video {
  object-fit: cover !important;
  aspect-ratio: 1 !important;
}
</style>
