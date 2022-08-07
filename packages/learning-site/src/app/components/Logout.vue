<template>
  <div :class="$style.btn_logout">
    <button :class="$style.logout"
            @click="userLogout">
      Logout
    </button>
  </div>
</template>

<script lang="ts" setup>
async function userLogout() {
  await fetch('http://localhost:3030/logout')
}
</script>

<style module>
.btn_logout {

}
.logout {

}
</style>
