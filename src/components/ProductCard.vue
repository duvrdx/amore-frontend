<template>
  <q-card flat class="product-card">
    <q-img class="product-image" fit="cover" :src="image" />

    <q-card-section>
      <div class="row wrap justify-between items-center">
        <div class="col text-h6 ellipsis title">{{ title }}</div>
      </div>

      <div class="badges-tag">
        Tamanho:
        <q-badge class="badge" outline align="middle" color="primary">
          {{ getSize() }}
        </q-badge>

        Tipo:
        <q-badge class="badge" outline align="middle" color="primary">
          {{ getCategory() }}
        </q-badge>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none description">

      <div class="text-caption">
        <p>{{ description }}</p>
      </div>
    </q-card-section>

    <q-separator class="card-bottom" />
    <q-card-actions class="card-actions">
      <q-btn flat round icon="shopping_bag" @click="addToCart" />
      <div class="text-h6 ellipsis div-price">R$<span>{{ price.toFixed(2) }}</span></div>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  productId: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['add-to-cart']);

const addToCart = () => {
  emit('add-to-cart', { productId: props.productId });
};

const getCategory = () => {
  switch (props.category) {
    case 'anel':
      return 'Anel';
    case 'brinco':
      return 'Brinco';
    case 'colar':
      return 'Colar';
    case 'pulseira':
      return 'Pulseira';
    case 'pingente':
      return 'Pingente';
    case 'alianca':
      return 'Aliança';
    case 'relogio':
      return 'Relógio';
    case 'outro':
      return 'Outros';
    default:
      return props.category;
  }
};

const getSize = () => {
  switch (props.size) {
    case 'pp':
      return 'PP';
    case 'p':
      return 'P';
    case 'm':
      return 'M';
    case 'g':
      return 'G';
    case 'gg':
      return 'GG';
    case 'u':
      return 'Único';
    default:
      return '';
  }
};

</script>


<style scoped>
.product-card {
  color: #6B3A8C;
  width: 18rem;
  height: 26rem;
  margin: 0.5rem;
  border: 1px solid #7a7a7a;
  border-radius: 15px;
}

.card-bottom {
  background-color: hsl(316, 71%, 83%);
  bottom: 0;
  width: 100%;
  height: 4rem;
  position: absolute;
  border-radius: 0 0 15px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.badge {
  margin-right: .5rem;
}
.title {
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  font-size: 1.2rem;
}
.description {
  font-weight: 500;
  font-size: 0.8rem;
  height: 5.2rem; /* Adjusted height */
}

span {
  font-size: 1.8rem; /* Adjusted font size */
  font-weight: bold;
}

.product-image {
  width: 100%;
  height: 14rem; /* Adjusted height */
  border-radius: 10px 10px 0 0;
}

.text-caption {
  word-wrap: break-word;
}

.div-price {
  position: absolute;
  right: 1.5rem; /* Adjusted right position */
}

.card-actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 4rem;
}
</style>
