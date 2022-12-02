<template>
  <Transition name="button" appear>
    <button :class="$style.button"
            @click="$router.go(-2)">
      <span> &lt; &lt; &lt; </span> GO TO THEMES
    </button>
  </Transition>
</template>

<script lang="ts" setup>

</script>

<style module lang="scss">
.button {
  position: absolute;
  top: 19px;
  left: 130px;
  font-family: 'VT323', monospace;
  height: 40px;
  font-size: 1.6rem;
  border: none;
  background-color: transparent;
  border: 1px solid #25bc50;
  border-radius: 2px;
  color: #25bc50;
  padding: 0 8px;
  cursor: pointer;
  transition: 0.4s ease-in-out;

  /* display: flex; */
  /* justify-content: center; */

  &:hover {
    color: #000000;
    background-color: #25bc50;
    animation: bounceright;
  }
}

@keyframes bounceright {
  from { transform: translateX(0); }
  to   { transform: translateX(3px); }
}
</style>

<style>
.button-enter-active {
  animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

.button-leave-active {
  animation: slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) reverse;
}

@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-1000px);
            transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
</style>
