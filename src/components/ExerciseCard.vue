<template>
  <div class="exercise-card" :class="exercise.category">
    <div class="exercise-header">
      <h3>{{ exercise.name }}</h3>
      <span class="exercise-category">{{ $t(`categories.${exercise.category}`) }}</span>
    </div>
    
    <div class="exercise-details">
      <div class="detail">
        <span class="label">{{ $t('exercise.sets') }}:</span>
        <span class="value">{{ exercise.sets }}</span>
      </div>
      <div class="detail">
        <span class="label">{{ $t('exercise.reps') }}:</span>
        <span class="value">{{ exercise.reps }}</span>
      </div>
      <div class="detail" v-if="exercise.weight">
        <span class="label">{{ $t('exercise.weight') }}:</span>
        <span class="value">{{ exercise.weight }} kg</span>
      </div>
      <div class="detail" v-if="exercise.rest">
        <span class="label">{{ $t('exercise.rest') }}:</span>
        <span class="value">{{ exercise.rest }} сек</span>
      </div>
    </div>
    
    <div class="exercise-actions">
      <button @click="$emit('edit', exercise)" class="btn-edit">
        {{ $t('workout.edit') }}
      </button>
      <button @click="$emit('delete', exercise.id)" class="btn-delete">
        {{ $t('workout.delete') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExerciseCard',
  props: {
    exercise: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete']
}
</script>

<style scoped>
.exercise-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
  border-left: 5px solid #4CAF50;
}

.exercise-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.exercise-card.strength {
  border-left-color: #FF9800;
}

.exercise-card.cardio {
  border-left-color: #2196F3;
}

.exercise-card.flexibility {
  border-left-color: #9C27B0;
}

.exercise-card.endurance {
  border-left-color: #F44336;
}

.exercise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.exercise-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.exercise-category {
  padding: 4px 12px;
  background: #f0f0f0;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #666;
}

.exercise-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 15px;
}

.detail {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 6px;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.value {
  color: #333;
  font-weight: 600;
}

.exercise-actions {
  display: flex;
  gap: 10px;
}

.btn-edit, .btn-delete {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-edit {
  background: #E3F2FD;
  color: #1976D2;
}

.btn-edit:hover {
  background: #BBDEFB;
}

.btn-delete {
  background: #FFEBEE;
  color: #D32F2F;
}

.btn-delete:hover {
  background: #FFCDD2;
}

@media (max-width: 768px) {
  .exercise-details {
    grid-template-columns: 1fr;
  }
}
</style>