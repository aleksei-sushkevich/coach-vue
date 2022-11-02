<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    },
    mode: {
      type: String,
      required: false,
      default: null
    },
  }
}
</script>

<style scoped>

button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  border-radius: 30px;
  cursor: pointer;
  color: white;
  border: 1px solid #3a0061;
  background-color: #3a0061;
  font: inherit;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>