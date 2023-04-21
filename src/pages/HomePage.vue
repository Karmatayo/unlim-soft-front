<script setup>
import Card from 'primevue/card';
import Image from 'primevue/image';

</script>

<template>
        <div class="grid">
                <div class="col-3 mt-6 text-right">
                        <Image :src="require('@/assets/img.png')" alt="Image" width="250"/>
                        <div class="text-right text-2xl"> Каролина Матханова </div>
                </div>
                <div class="col-9">
                        <Card class="my-6 mr-8 ml-3 shadow-5" style="width: 70em">
                                <template #title> 
                                        <p> 
                                                КаРтОчКа визитная
                                                <span class="text-500 text-xs"> (что-то подобное) </span>
                                        </p>
                                </template>
                                <template #content>
                                        <p>
                                                <br>Что ж...
                                                <br>Цель трудоустройства: у самурая нет цели, только путь...шуршать, работать, учиться и пытаться. Нет цели -> нет пути
                                                <br>Образование: гордые 9 классов = аттестат за 11 кл.;). Еще немного и чуть-чуть, и будет диплом СПО (специальность - программирование в компьютерных системах)
                                                <br>Профессиональные навыки: искренне верю, что они есть, и их будет больше
                                                <br>Личные качества: желание закончить начатое > все остальное и т.п.
                                                <br>Хобби и увлечения: могу "испортить" любую вещь, стену и т.д., только дайте краски!
                                        </p>
                                </template>
                        </Card>
                </div>
        </div>
</template>

<style>

</style>
