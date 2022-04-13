import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import NestedList from "@editorjs/nested-list";
import Hyperlink from "editorjs-hyperlink";
import Paragraph from "editorjs-paragraph-with-alignment";


export default (_, inject) => {
  const defaultOptions = {
    id: "",
    data: {},
    onChange: () => {},
  };
  const editor = (options = defaultOptions) => {
    return new EditorJS({
      placeholder: "Let`s write an awesome story!",
      /**
       * Id of Element that should contain Editor instance
       */
      holder: options.id,
      /**
       * Available Tools list.
       * Pass Tool's class or Settings object for each Tool you want to use
       */
      tools: {
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        hyperlink: {
          class: Hyperlink,
          config: {
            shortcut: "CMD+L",
            target: "_blank",
            rel: "nofollow",
            availableTargets: ["_blank", "_self"],
            availableRels: ["author", "noreferrer"],
            validate: false,
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              /**
               * Upload file to the server and return an uploaded image data
               * @param {File} file - file selected from the device or pasted by drag-n-drop
               * @return {Promise.<{success, file: {url}}>}
               */
              uploadByFile(file) {
                return {
                  success: 1,
                  file: {
                    url: URL.createObjectURL(file),
                    file,
                    // any other image data you want to store, such as width, height, color, extension, etc
                  },
                };
              },
            },
          },
        },
      },
      /**
       * Previously saved data that should be rendered
       */
      data: options.data || {},
      onChange(data) {
        // pass in function from component to run on change
        options.onChange(data);
      },
      i18n: {
        toolNames: {
          Hyperlink: "Link",
        },
        tools: {
          hyperlink: {
            Save: "Salvar",
            "Select target": "Seleziona destinazione",
            "Select rel": "Wählen rel",
          },
        },
      },
    });
  };
  
  

  inject("editor", (options) => editor(options));
};
