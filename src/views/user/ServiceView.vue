<template>
	<div>
		<button @click="() => TogglePopup('buttonTrigger')">Open Popup</button>
		<Popup 
			v-if="popupTriggers.buttonTrigger" 
			:TogglePopup="() => TogglePopup('buttonTrigger')">
			<h2>My Button Popup</h2>
		</Popup>
		
	</div>
</template>

<script setup>
import { ref } from 'vue';
import Popup from '@/components/user/Popup.vue';

const popupTriggers = ref({
	buttonTrigger: false,
	timedTrigger: false
});

const TogglePopup = (trigger) => {
	popupTriggers.value[trigger] = !popupTriggers.value[trigger]
}

setTimeout(() => {
	popupTriggers.value.timedTrigger = true;
}, 3000);
</script>
