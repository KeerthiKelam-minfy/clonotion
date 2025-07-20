import { Mark, mergeAttributes } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";

export const CommentExtension = Mark.create({
  name: "comment",

  addOptions() {
    return {
      HTMLAttributes: {
        class: "comment-mark",
        style: "background-color: rgba(255, 229, 100, 0.4);",
      },
      onCommentActivated: () => {},
    };
  },

  addAttributes() {
    return {
      commentId: {
        default: null,
        parseHTML: (el) => el.getAttribute("data-comment-id"),
        renderHTML: (attrs) => ({
          "data-comment-id": attrs.commentId,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-comment-id]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addStorage() {
    return { activeCommentId: null };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("comment-extension"),
        view: (editorView) => {
          return {
            update: (view, prevState) => {
              const { state } = view;
              const { from } = state.selection;
              const $from = state.doc.resolve(from);
              const activeMark = $from.marks().find((mark) => mark.type === this.type);
              const activeId = activeMark?.attrs.commentId || null;

              this.storage.activeCommentId = activeId;
              this.options.onCommentActivated(activeId);
            },
          };
        },
      }),
    ];
  },

  addCommands() {
    return {
      setComment:
        (commentId) =>
        ({ commands }) =>
          commands.setMark(this.name, { commentId }),

      unsetComment:
        () =>
        ({ chain }) =>
          chain().focus().unsetMark(this.name, { extendEmptyMarkRange: true }).run(),
    };
  },
});
