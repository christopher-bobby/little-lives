<script setup>
</script>

<template>
    <div class="text-center py-4">
        <div>
            <div>Visit duration</div>
            <select class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option selected disabled>Select</option>
                <option value="15">15 min</option>
                <option value="30">30 min</option>
                <option value="45">45 min</option>
                <option value="60">60 min</option>
                <option value="90">90 min</option>
            </select>
        </div>
        <div>
            <div>No. of Booking / Session</div>
            <input 
                type="text" 
                placeholder="Enter your number of booking" 
                class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>

    </div>
</template>
  
