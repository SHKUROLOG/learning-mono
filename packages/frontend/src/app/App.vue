<template>
  <div class="scanlines">
    <header :class="$style.header">
      <HeaderMenu/>

      <LoginForm v-if="isLoginFormShown && !user "/>
    </header>

    <div>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isLoginFormShown, user, userStoreInit } from './store/user'
import { HeaderMenu } from './components/HeaderMenu'
import { LoginForm } from './components/LoginForm'

userStoreInit()
</script>

<style module>
.header {
  height: 100px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr max-content;
}
</style>

<style lang="css">
* {
  padding: 0;
  margin: 0;
}

a {
  font-family: "JetBrains Mono ExtraBold", monospace;
  text-decoration: none;
  color: #19e57c;
  cursor: pointer;
}
body {
  font-family: "JetBrains Mono ExtraBold", monospace;
  color: #19e57c;
  height: 100%;
  background: linear-gradient(to right, #141912, #171717);
}
</style>

<style lang="scss">
$scan-width: 1px;
$scan-crt: true;
$scan-fps: 60;
$scan-color: rgba(20, 25, 18, .3);
$scan-z-index: 2147483648;

/* MOVING SCANLINE SETTINGS */
$scan-moving-line: true;
$scan-opacity: .75;

/* MIXINS */

@mixin scan-crt($scan-crt) {
    @if $scan-crt == true {
        animation: scanlines 1s steps($scan-fps) infinite;
    }
    @else { animation: none; }
}

// apply CRT animation: @include scan-crt($scan-crt);
@mixin scan-moving($scan-moving-line) {
  @if $scan-moving-line == true {
      animation: scanline 6s linear infinite;
  }
  @else { animation: none; }
}

.scanlines {
  min-height: 100vh;
  position: relative;
  overflow: hidden; // only to animate the unique scanline

  &:before,
  &:after {
      display: block;
      pointer-events: none;
      content: '';
      position: absolute;
  }

  // unique scanline travelling on the screen
  &:before {
      // position: absolute;
      // bottom: 100%;
      width: 100%;
      height: $scan-width * 1;
      z-index: $scan-z-index + 1;
      background: $scan-color;
      opacity: $scan-opacity;
      // animation: scanline 6s linear infinite;
      @include scan-moving($scan-moving-line);
  }

  // the scanlines, so!
  &:after {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: $scan-z-index;
      background: linear-gradient(
          to bottom,
          transparent 50%,
          $scan-color 51%
      );
      background-size: 100% $scan-width*2;
      @include scan-crt($scan-crt);
  }
}

/* ANIMATE UNIQUE SCANLINE */
@keyframes scanline {
    0% {
        transform: translate3d(0,200000%,0);
    }
}

@keyframes scanlines {
    0% {
        background-position: 0 50%;
    }
}
</style>
