import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.core.css'

if (process.browser) {
  Vue.use(VueQuillEditor)
}
