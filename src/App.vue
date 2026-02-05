<template>
  <div id="app" :class="theme">
    <div class="container">
      <!-- Header -->
      <header class="header">
        <div class="header-content">
          <h1>{{ $t('app.title') }}</h1>
          <p class="subtitle">{{ $t('app.subtitle') }}</p>
        </div>
        
        <div class="controls">
          <!-- Language Selector -->
          <div class="language-selector">
            <label for="language-select">{{ $t('language') }}:</label>
            <select id="language-select" v-model="currentLocale" @change="changeLanguage">
              <option value="en">🇺🇸 English</option>
              <option value="ru">🇷🇺 Русский</option>
              <option value="es">🇪🇸 Español</option>
            </select>
          </div>
          
          <!-- Theme Toggle -->
          <div class="theme-toggle">
            <button 
              v-for="themeOption in themeOptions" 
              :key="themeOption.value"
              class="theme-btn" 
              :class="{ active: theme === themeOption.value }"
              @click="toggleTheme(themeOption.value)"
            >
              {{ $t(`theme.${themeOption.value}`) }}
            </button>
          </div>
        </div>
      </header>
      
      <!-- Main Content -->
      <main class="main-content">
        <!-- Stats Overview -->
        <div class="stats-overview">
          <div class="stat-card">
            <div class="stat-icon">🏋️</div>
            <div class="stat-info">
              <div class="stat-value">{{ workouts.length }}</div>
              <div class="stat-label">{{ $t('stats.total_workouts') }}</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">🔥</div>
            <div class="stat-info">
              <div class="stat-value">{{ totalCalories }}</div>
              <div class="stat-label">{{ $t('stats.total_calories') }}</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">⏱️</div>
            <div class="stat-info">
              <div class="stat-value">{{ avgDuration }} min</div>
              <div class="stat-label">{{ $t('stats.avg_duration') }}</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">💪</div>
            <div class="stat-info">
              <div class="stat-value">{{ totalExercises }}</div>
              <div class="stat-label">{{ $t('stats.total_exercises') }}</div>
            </div>
          </div>
        </div>
        
        <div class="content-grid">
          <!-- Left Column: Workout Form & Goals -->
          <div class="left-column">
            <!-- Workout Form -->
            <div class="form-section">
              <h2>{{ editingWorkout ? $t('workout.edit') : $t('workout.add_workout') }}</h2>
              
              <div class="form-group">
                <label>{{ $t('workout.workout_name') }}</label>
                <input 
                  v-model="newWorkout.name" 
                  type="text" 
                  :placeholder="$t('workout.workout_name')"
                />
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>{{ $t('workout.workout_type') }}</label>
                  <select v-model="newWorkout.type">
                    <option value="full_body">{{ $t('types.full_body') }}</option>
                    <option value="upper_body">{{ $t('types.upper_body') }}</option>
                    <option value="lower_body">{{ $t('types.lower_body') }}</option>
                    <option value="cardio">{{ $t('types.cardio') }}</option>
                    <option value="hiit">{{ $t('types.hiit') }}</option>
                    <option value="yoga">{{ $t('types.yoga') }}</option>
                  </select>
                </div>
                
                <div class="form-group">
                  <label>{{ $t('workout.date') }}</label>
                  <input 
                    v-model="newWorkout.date" 
                    type="date" 
                  />
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label>{{ $t('workout.duration') }}</label>
                  <input 
                    v-model="newWorkout.duration" 
                    type="number" 
                    min="1"
                  />
                </div>
                
                <div class="form-group">
                  <label>{{ $t('workout.calories') }}</label>
                  <input 
                    v-model="newWorkout.calories" 
                    type="number" 
                    min="0"
                  />
                </div>
              </div>
              
              <!-- Exercise Form -->
              <div class="exercise-form">
                <h3>{{ $t('workout.add_exercise') }}</h3>
                
                <div class="form-row">
                  <div class="form-group">
                    <label>{{ $t('exercise.name') }}</label>
                    <input 
                      v-model="newExercise.name" 
                      type="text" 
                      :placeholder="$t('exercise.name')"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label>{{ $t('exercise.category') }}</label>
                    <select v-model="newExercise.category">
                      <option value="strength">{{ $t('categories.strength') }}</option>
                      <option value="cardio">{{ $t('categories.cardio') }}</option>
                      <option value="flexibility">{{ $t('categories.flexibility') }}</option>
                      <option value="endurance">{{ $t('categories.endurance') }}</option>
                    </select>
                  </div>
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label>{{ $t('exercise.sets') }}</label>
                    <input 
                      v-model="newExercise.sets" 
                      type="number" 
                      min="1"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label>{{ $t('exercise.reps') }}</label>
                    <input 
                      v-model="newExercise.reps" 
                      type="number" 
                      min="1"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label>{{ $t('exercise.weight') }}</label>
                    <input 
                      v-model="newExercise.weight" 
                      type="number" 
                      min="0"
                      step="0.5"
                    />
                  </div>
                </div>
                
                <button @click="addExercise" class="add-exercise-btn">
                  {{ $t('workout.add_exercise') }}
                </button>
                
                <!-- Current Exercises -->
                <div v-if="newWorkout.exercises.length > 0" class="current-exercises">
                  <h4>{{ $t('exercise.name') }}s ({{ newWorkout.exercises.length }})</h4>
                  <div class="exercises-list">
                    <div 
                      v-for="(exercise, index) in newWorkout.exercises" 
                      :key="index"
                      class="exercise-item"
                    >
                      <span>{{ exercise.name }} ({{ exercise.sets }}×{{ exercise.reps }})</span>
                      <button @click="removeExercise(index)" class="remove-exercise">×</button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label>{{ $t('workout.notes') }}</label>
                <textarea 
                  v-model="newWorkout.notes" 
                  :placeholder="$t('workout.notes')"
                  rows="3"
                ></textarea>
              </div>
              
              <div class="form-actions">
                <button @click="saveWorkout" class="save-btn">
                  {{ editingWorkout ? $t('workout.save') : $t('buttons.add') }}
                </button>
                <button v-if="editingWorkout" @click="cancelEdit" class="cancel-btn">
                  {{ $t('workout.cancel') }}
                </button>
                <button @click="clearForm" class="clear-btn">
                  {{ $t('buttons.clear') }}
                </button>
              </div>
            </div>
            
            <!-- Goals Section -->
            <div class="goals-section">
              <h2>{{ $t('goals.set_goal') }}</h2>
              
              <div class="form-group">
                <label>{{ $t('goals.workouts_per_week') }}</label>
                <input 
                  v-model="weeklyGoal.workouts" 
                  type="number" 
                  min="0"
                />
              </div>
              
              <div class="form-group">
                <label>{{ $t('goals.calories_per_workout') }}</label>
                <input 
                  v-model="weeklyGoal.calories" 
                  type="number" 
                  min="0"
                />
              </div>
              
              <div class="goal-progress">
                <div class="progress-bar">
                  <div 
                    class="progress-fill" 
                    :style="{ width: weeklyGoalProgress + '%' }"
                  ></div>
                </div>
                <span class="progress-text">
                  {{ $t('goals.progress') }}: {{ Math.round(weeklyGoalProgress) }}%
                </span>
              </div>
              
              <button @click="saveGoal" class="save-goal-btn">
                {{ $t('goals.set_goal') }}
              </button>
            </div>
          </div>
          
          <!-- Right Column: Workouts List -->
          <div class="right-column">
            <!-- Filters -->
            <div class="filters">
              <button 
                v-for="filter in workoutFilters" 
                :key="filter.value"
                class="filter-btn" 
                :class="{ active: currentFilter === filter.value }"
                @click="currentFilter = filter.value"
              >
                {{ filter.label }}
              </button>
            </div>
            
            <!-- Workouts List -->
            <div class="workouts-list">
              <h2>{{ $t('workout.add_workout') }}s</h2>
              
              <div v-if="filteredWorkouts.length === 0" class="empty-state">
                <p>{{ $t('workout.no_workouts') }}</p>
              </div>
              
              <WorkoutItem
                v-for="workout in filteredWorkouts"
                :key="workout.id"
                :workout="workout"
                @edit="editWorkout"
                @delete="deleteWorkout"
                @clone="cloneWorkout"
              />
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <footer class="footer">
          <p>{{ $t('app.created_by') }}</p>
          <p class="locale-info">
            {{ $t('language') }}: {{ currentLocale.toUpperCase() }} • 
            {{ workouts.length }} {{ $t('workout.add_workout').toLowerCase() }}s • 
            {{ totalExercises }} {{ $t('exercise.name').toLowerCase() }}s
          </p>
        </footer>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import WorkoutItem from './components/WorkoutItem.vue'

export default {
  name: 'App',
  components: {
    WorkoutItem
  },
  setup() {
    const { locale } = useI18n()
    
    // Reactive data
    const workouts = ref([])
    const newWorkout = ref({
      name: '',
      type: 'full_body',
      date: new Date().toISOString().split('T')[0],
      duration: 60,
      calories: 300,
      exercises: [],
      notes: ''
    })
    
    const newExercise = ref({
      name: '',
      category: 'strength',
      sets: 3,
      reps: 10,
      weight: 0,
      rest: 60
    })
    
    const weeklyGoal = ref({
      workouts: 4,
      calories: 250
    })
    
    const currentFilter = ref('all')
    const currentLocale = ref(locale.value)
    const theme = ref('light')
    const editingWorkout = ref(null)
    const notification = ref('')
    
    // Constants
    const themeOptions = [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' }
    ]
    
    const workoutFilters = [
      { value: 'all', label: 'All' },
      { value: 'full_body', label: 'Full Body' },
      { value: 'upper_body', label: 'Upper Body' },
      { value: 'lower_body', label: 'Lower Body' },
      { value: 'cardio', label: 'Cardio' },
      { value: 'hiit', label: 'HIIT' },
      { value: 'yoga', label: 'Yoga' }
    ]
    
    // Load data from localStorage
    onMounted(() => {
      const savedWorkouts = localStorage.getItem('fitness-workouts')
      const savedGoal = localStorage.getItem('fitness-goal')
      const savedTheme = localStorage.getItem('fitness-theme')
      const savedLocale = localStorage.getItem('fitness-locale')
      
      if (savedWorkouts) {
        workouts.value = JSON.parse(savedWorkouts)
      } else {
        // Add sample workouts
        workouts.value = [
          {
            id: 1,
            name: 'Morning Strength',
            type: 'full_body',
            date: new Date().toISOString().split('T')[0],
            duration: 75,
            calories: 450,
            exercises: [
              { id: 1, name: 'Squats', category: 'strength', sets: 4, reps: 10, weight: 60 },
              { id: 2, name: 'Bench Press', category: 'strength', sets: 4, reps: 8, weight: 50 },
              { id: 3, name: 'Pull-ups', category: 'strength', sets: 3, reps: 12, weight: 0 }
            ],
            notes: 'Good session, felt strong!'
          },
          {
            id: 2,
            name: 'Evening Cardio',
            type: 'cardio',
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            duration: 45,
            calories: 350,
            exercises: [
              { id: 4, name: 'Running', category: 'cardio', sets: 1, reps: 0, duration: 30 },
              { id: 5, name: 'Cycling', category: 'cardio', sets: 1, reps: 0, duration: 15 }
            ],
            notes: 'Steady pace, good heart rate'
          }
        ]
        saveWorkouts()
      }
      
      if (savedGoal) {
        weeklyGoal.value = JSON.parse(savedGoal)
      }
      
      if (savedTheme) {
        theme.value = savedTheme
      }
      
      if (savedLocale) {
        currentLocale.value = savedLocale
        locale.value = savedLocale
      }
    })
    
    // Computed properties - БЕЗ побочных эффектов
    const filteredWorkouts = computed(() => {
      if (currentFilter.value === 'all') {
        return [...workouts.value].sort((a, b) => new Date(b.date) - new Date(a.date))
      }
      return workouts.value
        .filter(workout => workout.type === currentFilter.value)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    })
    
    const totalCalories = computed(() => {
      return workouts.value.reduce((sum, workout) => sum + workout.calories, 0)
    })
    
    const totalExercises = computed(() => {
      return workouts.value.reduce((sum, workout) => sum + workout.exercises.length, 0)
    })
    
    const avgDuration = computed(() => {
      if (workouts.value.length === 0) return 0
      const total = workouts.value.reduce((sum, workout) => sum + workout.duration, 0)
      return Math.round(total / workouts.value.length)
    })
    
    const weeklyGoalProgress = computed(() => {
      const oneWeekAgo = new Date(Date.now() - 7 * 86400000)
      const thisWeekWorkouts = workouts.value.filter(workout => {
        const workoutDate = new Date(workout.date)
        return workoutDate >= oneWeekAgo
      })
      
      if (thisWeekWorkouts.length === 0 || weeklyGoal.value.workouts === 0) return 0
      
      const workoutsProgress = Math.min((thisWeekWorkouts.length / weeklyGoal.value.workouts) * 50, 50)
      const avgCalories = thisWeekWorkouts.reduce((sum, w) => sum + w.calories, 0) / thisWeekWorkouts.length
      const caloriesProgress = weeklyGoal.value.calories > 0 
        ? Math.min((avgCalories / weeklyGoal.value.calories) * 50, 50)
        : 0
      
      return Math.min(workoutsProgress + caloriesProgress, 100)
    })
    
    // Methods
    const addExercise = () => {
      if (!newExercise.value.name.trim()) return
      
      const exercise = {
        id: Date.now(),
        ...newExercise.value
      }
      
      newWorkout.value.exercises.push(exercise)
      
      // Reset exercise form
      newExercise.value = {
        name: '',
        category: 'strength',
        sets: 3,
        reps: 10,
        weight: 0,
        rest: 60
      }
    }
    
    const removeExercise = (index) => {
      newWorkout.value.exercises.splice(index, 1)
    }
    
    const saveWorkout = () => {
      if (!newWorkout.value.name.trim()) {
        alert('Please enter workout name')
        return
      }
      
      const workout = {
        id: editingWorkout.value ? editingWorkout.value.id : Date.now(),
        ...newWorkout.value
      }
      
      if (editingWorkout.value) {
        const index = workouts.value.findIndex(w => w.id === editingWorkout.value.id)
        if (index !== -1) {
          workouts.value[index] = workout
        }
        editingWorkout.value = null
        showNotification('Workout updated!')
      } else {
        workouts.value.unshift(workout)
        showNotification('Workout saved!')
      }
      
      clearForm()
      saveWorkouts()
    }
    
    const editWorkout = (workout) => {
      editingWorkout.value = workout
      newWorkout.value = { ...workout }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    const cloneWorkout = (workout) => {
      const clonedWorkout = {
        ...workout,
        id: Date.now(),
        name: `${workout.name} (Copy)`,
        date: new Date().toISOString().split('T')[0]
      }
      workouts.value.unshift(clonedWorkout)
      saveWorkouts()
      showNotification('Workout cloned!')
    }
    
    const deleteWorkout = (id) => {
      if (confirm('Are you sure you want to delete this workout?')) {
        workouts.value = workouts.value.filter(workout => workout.id !== id)
        saveWorkouts()
        showNotification('Workout deleted')
      }
    }
    
    const cancelEdit = () => {
      editingWorkout.value = null
      clearForm()
    }
    
    const clearForm = () => {
      newWorkout.value = {
        name: '',
        type: 'full_body',
        date: new Date().toISOString().split('T')[0],
        duration: 60,
        calories: 300,
        exercises: [],
        notes: ''
      }
      editingWorkout.value = null
    }
    
    const saveGoal = () => {
      localStorage.setItem('fitness-goal', JSON.stringify(weeklyGoal.value))
      showNotification('Goal saved!')
    }
    
    const changeLanguage = () => {
      locale.value = currentLocale.value
      localStorage.setItem('fitness-locale', currentLocale.value)
    }
    
    const toggleTheme = (newTheme) => {
      theme.value = newTheme
      localStorage.setItem('fitness-theme', newTheme)
    }
    
    const saveWorkouts = () => {
      localStorage.setItem('fitness-workouts', JSON.stringify(workouts.value))
    }
    
    const showNotification = (message) => {
      notification.value = message
      // Показываем уведомление на 3 секунды
      setTimeout(() => {
        notification.value = ''
      }, 3000)
    }
    
    return {
      workouts,
      newWorkout,
      newExercise,
      weeklyGoal,
      currentFilter,
      currentLocale,
      theme,
      editingWorkout,
      notification,
      themeOptions,
      workoutFilters,
      filteredWorkouts,
      totalCalories,
      totalExercises,
      avgDuration,
      weeklyGoalProgress,
      addExercise,
      removeExercise,
      saveWorkout,
      editWorkout,
      cloneWorkout,
      deleteWorkout,
      cancelEdit,
      clearForm,
      saveGoal,
      changeLanguage,
      toggleTheme
    }
  }
}
</script>

<style>
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #4CAF50;
  --secondary-color: #2196F3;
  --accent-color: #FF9800;
  --danger-color: #F44336;
  --light-bg: #f5f7fa;
  --card-bg: #ffffff;
  --text-primary: #333333;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --radius: 12px;
}

.dark {
  --primary-color: #66BB6A;
  --secondary-color: #42A5F5;
  --accent-color: #FFB74D;
  --danger-color: #EF5350;
  --light-bg: #121212;
  --card-bg: #1e1e1e;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --border-color: #333333;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--light-bg);
  color: var(--text-primary);
  transition: background-color 0.3s, color 0.3s;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.header-content h1 {
  font-size: 2.5rem;
  margin-bottom: 8px;
  color: var(--primary-color);
  font-weight: 700;
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.controls {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 15px;
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.language-selector label {
  font-weight: 600;
  color: var(--text-secondary);
}

#language-select {
  padding: 8px 15px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-primary);
  font-size: 1rem;
  cursor: pointer;
  transition: border-color 0.3s;
}

#language-select:focus {
  outline: none;
  border-color: var(--primary-color);
}

.theme-toggle {
  display: flex;
  gap: 8px;
  padding: 10px;
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.theme-btn {
  padding: 8px 16px;
  border: 2px solid var(--border-color);
  background: var(--card-bg);
  color: var(--text-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.theme-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.theme-btn:hover:not(.active) {
  border-color: var(--primary-color);
}

/* Stats Overview */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: transform 0.3s;
}

.stat-card:hover {
  transform: translateY(-3px);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 5px;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 30px;
  margin-bottom: 30px;
}

@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

/* Form Sections */
.form-section, .goals-section, .workouts-list {
  background: var(--card-bg);
  border-radius: var(--radius);
  padding: 25px;
  box-shadow: var(--shadow);
  margin-bottom: 20px;
}

h2, h3, h4 {
  color: var(--text-primary);
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5rem;
  border-bottom: 3px solid var(--primary-color);
  padding-bottom: 10px;
}

h3 {
  font-size: 1.2rem;
  margin-top: 20px;
}

/* Form Styles */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text-secondary);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

/* Exercise Form */
.exercise-form {
  background: rgba(76, 175, 80, 0.05);
  padding: 20px;
  border-radius: var(--radius);
  margin: 20px 0;
  border: 2px dashed var(--border-color);
}

.add-exercise-btn {
  width: 100%;
  padding: 12px;
  background: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 15px;
}

.add-exercise-btn:hover {
  background: #1976D2;
}

.current-exercises {
  margin-top: 20px;
}

.exercises-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.exercise-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: var(--card-bg);
  border: 2px solid var(--border-color);
  border-radius: 8px;
}

.remove-exercise {
  background: var(--danger-color);
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  line-height: 1;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.save-btn, .cancel-btn, .clear-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.save-btn {
  background: var(--primary-color);
  color: white;
}

.save-btn:hover {
  background: #388E3C;
}

.cancel-btn {
  background: var(--text-secondary);
  color: white;
}

.cancel-btn:hover {
  background: #555;
}

.clear-btn {
  background: var(--danger-color);
  color: white;
}

.clear-btn:hover {
  background: #D32F2F;
}

/* Goals Section */
.goal-progress {
  margin: 20px 0;
}

.progress-bar {
  height: 20px;
  background: var(--border-color);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 10px;
  transition: width 0.5s ease;
}

.progress-text {
  display: block;
  text-align: center;
  font-weight: 600;
  color: var(--primary-color);
}

.save-goal-btn {
  width: 100%;
  padding: 12px;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-goal-btn:hover {
  background: #F57C00;
}

/* Filters */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-btn {
  padding: 10px 20px;
  background: var(--card-bg);
  color: var(--text-secondary);
  border: 2px solid var(--border-color);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.filter-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.filter-btn:hover:not(.active) {
  border-color: var(--primary-color);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
  font-style: italic;
}

.empty-state p {
  font-size: 1.1rem;
}

/* Footer */
.footer {
  text-align: center;
  padding: 20px;
  color: var(--text-secondary);
  border-top: 1px solid var(--border-color);
  margin-top: 40px;
}

.locale-info {
  margin-top: 10px;
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
  }
  
  .controls {
    width: 100%;
    justify-content: space-between;
  }
  
  .stats-overview {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .filters {
    justify-content: center;
  }
  
  .form-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
  }
  
  .header-content h1 {
    font-size: 2rem;
  }
  
  .controls {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>