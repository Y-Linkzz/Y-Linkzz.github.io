<script setup>
    import { defineProps } from 'vue'
    const props = defineProps({
        disabled: [Boolean, String]
    })

    console.log({
        disabled : props.disabled
    });
</script>

<template>
    <div class="container">
        {{ props.disabled }}
    </div>
</template>
<style scoped lang="scss">
.container{
    width: 100px;
    height: 100px;
    background: red;
}
</style>
