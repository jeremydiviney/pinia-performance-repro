<template>
  <div class="hello" @click="changeRandom">
    <table class="center">
      <tr v-for="item in currentItems" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.description}}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useItemStore } from '@/store/item'

const itemStore = useItemStore()

const currentItems = computed(() => itemStore.getItems)

function makeRandomText(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const getName = () => makeRandomText(Math.ceil(Math.random() * 10) + 5)
const getDescription = () => makeRandomText(Math.ceil(Math.random() * 25) + 15)

onMounted(() => {
  const arrayInit = (new Array(1000)).fill().map((i, index) => ({
    id: index,
    name: getName(),
    description: getDescription(),
  }))

  // initials store items
  itemStore.setItems(arrayInit)
})

function changeRandom() {
  const id = Math.floor(Math.random() * 1000)

  itemStore.updateItem({
    id,
    name: getName(),
    description: getDescription(),
  })
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center {
  margin-left: auto;
  margin-right: auto;
  user-select: none;
}
</style>
