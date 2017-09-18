<template>
  <v-app id="sandbox" :dark="dark" :light="!dark">
    <v-navigation-drawer :persistent="'persistent'" :clipped="true" v-model="drawer" absolute overflow enable-resize-watcher>
      <v-list class="pt-0">
        <v-list-tile @click="$router.push('/')" :ripple="true">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push('/releases')" :ripple="true">
          <v-list-tile-action>
            <v-icon>storage</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>ROMS</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group>
          <v-list-tile slot="item" v-if="$store.state.afhFolders.length > 0" :ripple="true">
            <v-list-tile-action>
              <v-icon>storage</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>AndroidFileHost mirror</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile v-for="folder in $store.state.afhFolders" :key="folder.flid" :href="folder.url" :target="'_blank'" :ripple="true">
            <v-list-tile-content>
              <v-list-tile-title>{{folder.name}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>folder</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
        <v-list-tile @click="$router.push('/faq')" :ripple="true">
          <v-list-tile-action>
            <v-icon>help</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>FAQ</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push('/about')" :ripple="true">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About the device</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-group>
          <v-list-tile slot="item" :ripple="true">
            <v-list-tile-action>
              <v-icon>people</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Community</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>keyboard_arrow_down</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile :href="'https://forum.xda-developers.com/redmi-note-2/orig-development/6-x-based-roms-nofearnohappy-kernel-t3494631'" :target="'_blank'" :ripple="true">
            <v-list-tile-content>
              <v-list-tile-title>XDA</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>rss_feed</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile :href="'https://t.me/joinchat/AAAAAEAcYGMW9RpRIW2-XQ'" :target="'_blank'" :ripple="true">
            <v-list-tile-content>
              <v-list-tile-title>Telegram</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>message</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title @click="$router.push('/')" style="cursor: pointer">Hermes-Mirrors</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="dark = !dark"><v-icon left>lightbulb_outline</v-icon> Switch  to {{dark ? 'Light' : 'Dark'}}</v-btn>
    </v-toolbar>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer :absolute="false">
      <span>© {{ new Date().getFullYear() }} - Made by TryHardDood with <font style="color: red; font-size: 16px;">❤</font>️ </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    dark: false,
    drawer: true
  })
}
</script>

<style>

</style>
