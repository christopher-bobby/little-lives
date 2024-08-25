<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const durationValue = ref(0);
    const numberOfSession = ref(0);
    const allowVideoTourCall = ref(false);
    
    // Define the days of the week
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    // Create a reactive object to hold selected time and new time for each day
    const selectedTimes = ref(days.reduce((acc, day) => {
      acc[day] = '7:00 AM'; // Default time for each day
      return acc;
    }, {}));
    
    const newTimes = computed(() => {
      const result = {};
      days.forEach(day => {
        const [time, period] = selectedTimes.value[day].split(' ');
        const [hours, minutes] = time.split(':').map(Number);
        const isPM = period === 'PM';

        let totalMinutes = hours * 60 + minutes;
        if (isPM && hours !== 12) totalMinutes += 12 * 60;
        if (!isPM && hours === 12) totalMinutes -= 12 * 60;

        totalMinutes += durationValue.value;

        const newHours = Math.floor(totalMinutes / 60) % 24;
        const newMinutes = totalMinutes % 60;

        const newPeriod = newHours >= 12 ? 'PM' : 'AM';
        const displayHours = newHours % 12 || 12;
        result[day] = `${displayHours}:${newMinutes.toString().padStart(2, '0')} ${newPeriod}`;
      });
      return result;
    });

    const generateTimes = () => {
      const startHour = 7;
      const endHour = 19; // 7 PM in 24-hour format
      const interval = 15; // minutes
      const times = [];

      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minutes = 0; minutes < 60; minutes += interval) {
          if (hour === endHour && minutes > 0) break;
          
          const timeString = `${hour % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`;
          times.push(timeString);
        }
      }

      return times;
    };

    const times = ref(generateTimes());

    return {
      durationValue,
      numberOfSession,
      allowVideoTourCall,
      times,
      selectedTimes,
      newTimes,
      days
    };
  }
}
</script>


<template>
    <div class="text-center py-4">
      <div>
        <div>Visit duration</div>
        <select 
          v-model.number="durationValue" 
          class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="" disabled>Select</option>
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
          v-model.number="numberOfSession"
          type="number" 
          placeholder="Enter your number of booking" 
          class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <input 
          type="checkbox" 
          id="allowVideoTourCall"
          v-model="allowVideoTourCall"
        />
        <label for="allowVideoTourCall">Allow video tour call</label>
      </div>
    
      <div>
        <h4>Availability</h4>
        <p>Set your weekly recurring schedule</p>
    
        <div v-for="day in days" :key="day" class="flex pb-4 border-b mb-4">
          <input 
            type="checkbox" 
            :id="day.toLowerCase()"
          />
          <label :for="day.toLowerCase()" class="font-semibold ml-2 p-1">{{ day }}</label>
          <select v-model="selectedTimes[day]" class="p-1">
            <option v-for="time in times" :key="time" :value="time">
              {{ time }}
            </option>
          </select>
    
          <div class="bg-gray-300 p-1 cursor-not-allowed rounded-sm ml-4">
            {{ newTimes[day] }}
          </div>

            <div class="relative w-6 h-6 cursor-pointer">
                <span class="absolute inset-0 bg-gray-700 transform rotate-45"></span>
                <span class="absolute inset-0 bg-gray-700 transform -rotate-45"></span>
            </div>

        </div>
      </div>
    </div>
  </template>
  