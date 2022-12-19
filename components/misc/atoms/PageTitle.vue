<template>
  <div class="d-flex align-center flex-column">
    <div class="page-title" :class="router.scrolled ? 'mb-9' : 'mb-6'">
      {{ text }}
    </div>
    <!--     <v-divider style="width: 120px"></v-divider>
    <v-divider style="width: 120px" class="mt-1"></v-divider> -->
    <div class="text-body-1 mt-3"><slot></slot></div>
  </div>
</template>
<script setup>
const props = defineProps({ text: String })
const router = useRouter()
</script>
<style lang="scss">
@use 'vuetify/settings';

.page-title {
  font-family: 'Bodoni Moda';
  font-size: 3.5rem;
  font-weight: 500;
  max-width: 1200px;
  line-height: 1.2;
}
.page-title.smaller {
  font-size: 3rem;
  max-width: 1200px;
}

@media #{map-get(settings.$display-breakpoints, 'lg')} {
  .page-title {
    font-size: 3rem;
    max-width: 900px;
  }
  .page-title.smaller {
    font-size: 2.4rem;
    max-width: 900px;
  }
}
@media #{map-get(settings.$display-breakpoints, 'md')} {
  .page-title {
    font-size: 2.6rem;
    max-width: 800px;
  }
  .page-title.smaller {
    font-size: 2.2rem;
    max-width: 800px;
  }
}
@media #{map-get(settings.$display-breakpoints, 'sm')} {
  .page-title {
    font-size: 2.4rem;
  }
  .page-title.smaller {
    font-size: 2rem;
    max-width: 800px;
  }
}
@media #{map-get(settings.$display-breakpoints, 'xs')} {
  .page-title {
    font-size: 2rem;
  }
  .page-title.smaller {
    font-size: 1.8rem;
    max-width: 800px;
  }
}

.page-subtitle {
  font-size: 2rem;
  font-weight: 500;
  max-width: 1200px;
  color: #959595;
  line-height: 1.2;
  font-style: italic;
}
.page-subtitle.smaller {
  font-size: 1.8rem;
  max-width: 1200px;
}
@media #{map-get(settings.$display-breakpoints, 'lg')} {
  .page-subtitle {
    font-size: 2rem;
    max-width: 900px;
  }
  .page-subtitle.smaller {
    font-size: 1.8rem;
    max-width: 900px;
  }
}
@media #{map-get(settings.$display-breakpoints, 'md')} {
  .page-subtitle {
    font-size: 1.8rem;
    max-width: 800px;
  }
  .page-subtitle.smaller {
    font-size: 1.6rem;
    max-width: 800px;
  }
}
@media #{map-get(settings.$display-breakpoints, 'sm')} {
  .page-subtitle {
    font-size: 1.7rem;
  }
  .page-subtitle.smaller {
    font-size: 1.5rem;
    max-width: 800px;
  }
}
@media #{map-get(settings.$display-breakpoints, 'xs')} {
  .page-subtitle {
    font-size: 1.7rem;
  }
  .page-subtitle.smaller {
    font-size: 1.5rem;
    max-width: 800px;
  }
}
</style>
