<template>
  <div class="workout-item" :class="workout.type">
    <div class="workout-header">
      <div class="workout-title">
        <h3>{{ workout.name }}</h3>
        <span class="workout-type">{{ $t(`types.${workout.type}`) }}</span>
      </div>
      <div class="workout-date">
        {{ formatDate(workout.date) }}
      </div>
    </div>
    
    <div class="workout-meta">
      <div class="meta-item">
        <span class="meta-icon">⏱️</span>
        <span class="meta-value">{{ workout.duration }} {{ $t('workout.duration') }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-icon">🔥</span>
        <span class="meta-value">{{ workout.calories }} {{ $t('workout.calories') }}</span>
      </div>
      <div class="meta-item">
        <span class="meta-icon">💪</span>
        <span class="meta-value">{{ workout.exercises.length }} {{ $t('exercise.name').toLowerCase() }}s</span>
      </div>
    </div>
    
    <div class="workout-exercises" v-if="workout.exercises.length > 0">
      <h4>{{ $t('exercise.name') }}s:</h4>
      <div class="exercises-list">
        <span 
          v-for="exercise in workout.exercises" 
          :key="exercise.id" 
          class="exercise-tag"
        >
          {{ exercise.name }} ({{ exercise.sets }}×{{ exercise.reps }})
        </span>
      </div>
    </div>
    
    <div class="workout-notes" v-if="workout.notes">
      <h4>{{ $t('workout.notes') }}:</h4>
      <p>{{ workout.notes }}</p>
    </div>
    
    <div class="workout-actions">
      <button @click="$emit('edit', workout)" class="action-btn edit-btn">
        {{ $t('workout.edit') }}
      </button>
      <button @click="$emit('delete', workout.id)" class="action-btn delete-btn">
        {{ $t('workout.delete') }}
      </button>
      <button @click="$emit('clone', workout)" class="action-btn clone-btn">
        Clone
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkoutItem',
  props: {
    workout: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete', 'clone'],
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.workout-item {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-top: 5px solid #4CAF50;
}

.workout-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.workout-item.full_body { border-top-color: #4CAF50; }
.workout-item.upper_body { border-top-color: #2196F3; }
.workout-item.lower_body { border-top-color: #FF9800; }
.workout-item.cardio { border-top-color: #F44336; }
.workout-item.hiit { border-top-color: #9C27B0; }
.workout-item.yoga { border-top-color: #00BCD4; }

.workout-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.workout-title h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 1.4rem;
}

.workout-type {
  padding: 4px 12px;
  background: #E8F5E9;
  color: #2E7D32;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.workout-date {
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
}

.workout-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  background: #F5F5F5;
  border-radius: 10px;
  min-width: 140px;
}

.meta-icon {
  font-size: 1.2rem;
}

.meta-value {
  color: #333;
  font-weight: 500;
}

.workout-exercises {
  margin-bottom: 20px;
}

.workout-exercises h4 {
  margin: 0 0 10px 0;
  color: #555;
  font-size: 1rem;
}

.exercises-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.exercise-tag {
  padding: 6px 12px;
  background: #E3F2FD;
  color: #1565C0;
  border-radius: 20px;
  font-size: 0.85rem;
  white-space: nowrap;
}

.workout-notes {
  margin-bottom: 20px;
}

.workout-notes h4 {
  margin: 0 0 10px 0;
  color: #555;
  font-size: 1rem;
}

.workout-notes p {
  margin: 0;
  color: #666;
  line-height: 1.5;
  padding: 12px;
  background: #FFF8E1;
  border-radius: 8px;
  border-left: 4px solid #FFC107;
}

.workout-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn {
  background: #E8F5E9;
  color: #2E7D32;
}

.edit-btn:hover {
  background: #C8E6C9;
}

.delete-btn {
  background: #FFEBEE;
  color: #D32F2F;
}

.delete-btn:hover {
  background: #FFCDD2;
}

.clone-btn {
  background: #E3F2FD;
  color: #1976D2;
}

.clone-btn:hover {
  background: #BBDEFB;
}

@media (max-width: 768px) {
  .workout-header {
    flex-direction: column;
  }
  
  .workout-meta {
    flex-direction: column;
    gap: 10px;
  }
  
  .meta-item {
    min-width: auto;
  }
  
  .workout-actions {
    flex-direction: column;
  }
}
</style>