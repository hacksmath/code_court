<template>
  <div>
    <div :id="id"></div>
  </div>
</template>

<script>
import brace from 'brace'

import 'brace/mode/fortran'
import 'brace/mode/java'
import 'brace/mode/python'
import 'brace/mode/ruby'
import 'brace/mode/perl'
import 'brace/mode/lua'
import 'brace/mode/javascript'
import 'brace/mode/c_cpp'
import 'brace/mode/lisp'

import 'brace/theme/chrome'
import 'brace/theme/solarized_light'

var langToMode = {
  'python': 'python',
  'python2': 'python',
  'perl': 'perl',
  'lua': 'lua',
  'nodejs': 'javascript',
  'guile': 'lisp',
  'fortran': 'fortran',
  'c': 'c_cpp',
  'c++': 'c_cpp',
  'java': 'java',
  'ruby': 'ruby'
}

export default {
  data () {
    return {
      editor: null
    }
  },
  props: {
    value: String,
    id: String,
    lang: String,
    readOnly: {
      type: Boolean,
      default: false
    },
    minLines: {
      type: Number,
      default: 15
    },
    maxLines: {
      type: Number,
      default: 35
    },
    theme: {
      type: String,
      default: 'chrome'
    },
    initText: {
      type: String,
      default: null
    }
  },
  methods: {
    getEditor: function () {
      var editor = brace.edit(this.id)
      editor.$blockScrolling = Infinity

      editor.getSession().setMode('ace/mode/' + langToMode[this.lang])
      editor.setTheme('ace/theme/' + this.theme)

      editor.getSession().setUseWorker(false)

      if (this.readOnly) {
        editor.setReadOnly(true)
        editor.renderer.$cursorLayer.element.style.display = 'none'
        editor.setOptions({ highlightActiveLine: false, highlightGutterLine: false })
        editor.$highlightTagPending = false
        editor.$highlightPending = false
      }

      editor.setOptions({
        minLines: this.minLines,
        maxLines: this.maxLines
      })

      if (this.initText) {
        editor.setValue(this.initText)
        editor.clearSelection()
      }

      editor.getSession().on('change', this.emitCode)

      return editor
    },
    emitCode: function () {
      this.$emit('input', this.editor.getValue())
    },
    updateEditorContents: function () {
      var pos = this.editor.session.selection.toJSON()
      this.editor.setValue(this.value)
      this.editor.clearSelection()
      this.editor.session.selection.fromJSON(pos)
    }
  },
  watch: {
    lang: function () {
      this.editor.getSession().setMode('ace/mode/' + langToMode[this.lang])
      this.updateEditorContents()
    },
    id: function () {
      this.updateEditorContents()
    }
  },
  mounted: function () {
    this.editor = this.getEditor()
    this.updateEditorContents()
  }
}
</script>

<style scoped>
</style>
