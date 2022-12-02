<template>
  <div class="root">
    <header :class="$style.header">
      <HeaderMenu/>
    </header>

    <div :class="$style.content">
      <router-view/>
    </div>

    <Footer/>
  </div>
</template>

<script lang="ts" setup>
import { HeaderMenu } from './components/HeaderMenu'
import { userStoreInit } from './store/user'
import { Footer } from './components/Footer'

userStoreInit()
</script>

<style module>
.content {
  box-sizing: border-box;
  padding: 16px;
  overflow: auto;
}

.header {
  height: 80px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr max-content;
}

.footer {
  margin-top: auto;
}
</style>

<style lang="css">
* {
  padding: 0;
  margin: 0;
}

#app, body, html {
  height: 100%;
  width: 100%;
}

a {
  text-decoration: none;
  color: #25bc50;
  cursor: pointer;
}

/* @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap'); */

body {
  font-family: 'JetBrains Mono', monospace;
  font-weight: bold;
  color: #25bc50;
  height: 100%;
  background: #091f13;
}
</style>

<style lang="scss">
$scan-width: 2px;
$scan-crt: true;
$scan-fps: 60;
$scan-color: rgba(26, 96, 60, 0.2);
$scan-z-index: 2147483648;
/* MOVING SCANLINE SETTINGS */
$scan-moving-line: true;
$scan-opacity: .75;
/* MIXINS */
@mixin scan-crt($scan-crt) {
    @if $scan-crt == true {
        animation: scanlines 3s steps($scan-fps) infinite;
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

.root {
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  grid-template-areas: "header" "content" "footer";
  width: 100%;
  height: 100%;
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
      animation: scanline 6s linear infinite;
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
      background-size: 100% $scan-width * 2;
      @include scan-crt($scan-crt);
  }
}
/* ANIMATE UNIQUE SCANLINE */
@keyframes scanline {
    0% {
        transform: translate3d(0%, 200000%, 0);
    }
}
@keyframes scanlines {
    0% {
        background-position: 0 50%;
    }
}
</style>
