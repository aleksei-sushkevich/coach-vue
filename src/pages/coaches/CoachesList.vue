<template>
  <div>
    <base-dialog :show="!!error" title="An error!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/register" v-if="!isCoach && !isLoading">Register as Coach</base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
              v-for="coach in filteredCoaches"
              :key="coach.id"
              :id="coach.id"
              :first-name="coach.firstName"
              :last-name="coach.lastName"
              :areas="coach.areas"
              :rate="coach.hourlyRate">
            {{ coach.firstName }}
          </coach-item>
        </ul>
        <h3 v-else>No coaches found. </h3>
      </base-card>
    </section>

  </div>
</template>

<script>
import CoachItem from "@/components/coaches/CoachItem";
import CoachFilter from "@/components/coaches/CoachFilter";
import BaseDialog from "@/components/ui/BaseDialog";
export default {
  name: "CoachesList",
  components: {BaseDialog, CoachFilter, CoachItem},
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter(coach => {
        if (this.activeFilters.fronted && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        return this.activeFilters.career && coach.areas.includes('career');
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    }
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        fronted: true,
        backend: true,
        career: true
      }
    }
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {forceRefresh: refresh});
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    }
  },
  created() {
    this.loadCoaches();
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>