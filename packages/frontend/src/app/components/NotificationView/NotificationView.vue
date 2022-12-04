<template>
  <div :class="$style.root">
    <div v-for="notification in notificationSet"
         :key="notification.message"
         :class="[$style.notification, {
           [$style.red]: notification.type === NotificationTypes.Warning,
           [$style.green] : notification.type === NotificationTypes.GreenNotice
         }]">
      {{ notification.message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { notificationSet, NotificationTypes } from '../../Notification/Notification'

</script>

<style module lang="scss">
.root {
  position: fixed;
  display: grid;
  grid-auto-flow: row;
  gap: 12px;
  right: 10px;
  top: 90px;
  align-items: center;
  z-index: 2;
}

.notification {
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 1rem;
  padding: 8px;
  width: 300px;
  height: 56px;
  animation: slide-in-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.green {
  border-left: 4px solid rgba(0, 255, 0, 0.5);
  background-color: rgba(0, 255, 34, 0.1);
}

.red {
  border-left: 4px solid rgba(255, 0, 0, 0.5);
  background-color: rgba(255, 0, 0, 0.1);
  color: rgb(255, 0, 0);
}

@keyframes slide-in-right {
  0% {
    -webkit-transform: translateX(1000px);
            transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
}
</style>
