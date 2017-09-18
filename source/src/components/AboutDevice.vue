<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
            <v-card-media :src="image" height="200px">
            </v-card-media>
            <v-card-title>
              <div>
                <div class="headline">About the device</div>
              </div>
            </v-card-title>
            <v-card-text>
              <v-list>
                  <v-list-tile @click="">
                    <v-list-tile-action style="margin-right: 5px;">
                      Device Name: 
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title style="font-style: italic; font-weight: 300">{{name}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="">
                     <v-list-tile-action style="margin-right: 5px;">
                      Device Codename: 
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title  style="font-style: italic; font-weight: 300;">{{codename}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="">
                     <v-list-tile-action style="margin-right: 5px;">
                      CPU: 
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title  style="font-style: italic; font-weight: 300;">{{cpu}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="">
                     <v-list-tile-action style="margin-right: 5px;">
                      Chipset: 
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title  style="font-style: italic; font-weight: 300;">{{chipset}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="">
                     <v-list-tile-action style="margin-right: 5px;">
                      GPU: 
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title  style="font-style: italic; font-weight: 300;">{{gpu}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="">
                     <v-list-tile-action style="margin-right: 5px;">
                      Memory: 
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title  style="font-style: italic; font-weight: 300;">{{memory}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="">
                     <v-list-tile-action style="margin-right: 5px;">
                      Storage: 
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title  style="font-style: italic; font-weight: 300;">{{storage}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="">
                     <v-list-tile-action style="margin-right: 5px;">
                      MicroSD: 
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title  style="font-style: italic; font-weight: 300;">{{microsd}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="">
                     <v-list-tile-action style="margin-right: 5px;">
                      Battery: 
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title  style="font-style: italic; font-weight: 300;">{{battery}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="">
                     <v-list-tile-action style="margin-right: 5px;">
                      Display: 
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title  style="font-style: italic; font-weight: 300;">{{display}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="">
                     <v-list-tile-action style="margin-right: 5px;">
                      Rear Camera: 
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title  style="font-style: italic; font-weight: 300;">{{rear_camera}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="">
                     <v-list-tile-action style="margin-right: 5px;">
                      Front Camera: 
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title  style="font-style: italic; font-weight: 300;">{{front_camera}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
              </v-list>
            </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'about-device',
  data () {
    return {
      name: 'Xiaomi Redmi Note 2/Prime',
      codename: 'hermes',
      image: 'https://camo.githubusercontent.com/d03397f1a09f18fb9c24a5c72f4879d659290b31/687474703a2f2f63646e322e67736d6172656e612e636f6d2f76762f706963732f7869616f6d692f7869616f6d692d7265646d692d6e6f74652d322d312e6a7067',

      cpu: 'Octa-core 2.0/2.2 GHz Cortex-A53 - Redmi Note 2',
      chipset: 'Mediatek MT6795 Helio X10',
      gpu: 'PowerVR G6200',
      memory: '2GB/3GB',
      storage: '16GB/32GB',
      microsd: 'Up to 32GB',
      battery: 'Removable Li-Po 3060 mAh battery',
      display: '1920x1080 pixels, 5.5 inches (~403 ppi pixel density)',
      rear_camera: '13 MP, f/2.2, phase detection autofocus, LED flash',
      front_camera: '5 MP, f/2.0, 720p'
    }
  }
}
</script>