import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";

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
        header: Header,
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
    });
  };

  inject("editor", (options) => editor(options));
};
