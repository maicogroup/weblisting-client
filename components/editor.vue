<template>
  <section>
    <client-only>
      <quill-editor
        ref="editor"
        v-model.lazy="editedContent"
        :options="editorOption"
        class="editor--border relative"
        @change="debounceTextChange"
      />
    </client-only>
  </section>
</template>
<script>
// import { debounce } from 'vue-debounce'
export default {
  // 如果是編輯文章，則會從parent收到文章當前的content
  props: {
    content: {
      type: String,
      default: () => '',
    },
  },
  head () {
    return {
      script: [{
        once: true,
        hid: 's3-sdk',
        src: 'https://sdk.amazonaws.com/js/aws-sdk-2.1095.0.min.js',
        body: true,
      }]
    };
  },
  data() {
    return {
      editedContent: this.content,
      // 所有文本編輯器功能設定均寫在editorOption
      editorOption: {
        theme: 'snow', // 可換
        modules: {
          toolbar: {
            // container這裡是個大坑，[]表分群
            container: [
              ['bold', 'italic', 'underline', 'strike', 'code'],
              ['blockquote', 'code-block'],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['clean'],
              ['link', 'image'],
            ],
            // 客製化圖片上傳功能用的
            handlers: {
              image: this.uploadImage,
            },
          },
        },
      },
    }
  },
  methods: {
    debounceTextChange() {
      //don't use arrow function
      this.$emit('text-change', this.editedContent);
    },
    uploadImage(){
        if (!process.client) {
            return
        }
        let fileInput = this.$el.querySelector('input.ql-image[type=file]')

        if (fileInput == null) {
            fileInput = document.createElement('input')
            fileInput.setAttribute('type', 'file')
            fileInput.setAttribute(
            'accept',
            'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
            )
            fileInput.classList.add('ql-image')
            fileInput.addEventListener('change', () => {
                if (fileInput.files != null && fileInput.files[0] != null) {
                    // customize image upload function
                    const file = fileInput.files[0];
                    AWS.config.update({
                        accessKeyId: '8EL21GNHMRNZYW8488OV' ,
                        secretAccessKey: 'xBjwyBdSYz91ADgV9TH8oeTnAuZapmAJ8ycmrCiD',
                        region: 'hn', 
                        endpoint: 'https://hn.ss.bfcplatform.vn',
                        apiVersions: {
                        s3: '2006-03-01'
                        }
                    })
                    const s3 = new AWS.S3()
                    //const fileName = file.name.split('.').slice(0, -1).join('.') //without .png .jpg .svg
                    // 使用nuxt firebase module，圖儲存在store，URL儲存在Realtime Database
                    
                        var uploadParams = {
                            Bucket: 'weblisting',
                            Key: 'project/' + file.name,
                            Body: file,
                            ACL:'public-read',
                            ContentType: file.type 
                        };
                        var uploadOptions = {
                            partSize: 10 * 1024 * 1024,
                            queueSize: 1
                        }
                        var upload = s3.upload(uploadParams, uploadOptions);

                        upload.send((err, data) => {
                            if (err) {
                                console.error("Upload lỗi:", err);
                            } else if (data) {
                                console.log("Upload thành công:", data);
                                
                                                                                                               
                            }
                            let range = this.$refs.editor.quill.getSelection()
                                this.$refs.editor.quill.insertEmbed(
                                    range.index,
                                    'image',
                                    'https://weblisting.hn.ss.bfcplatform.vn/' + 'project/' + file.name
                                )
                        });
                        
                        upload.on('httpUploadProgress', function(evt) {
                            var progress = parseInt((evt.loaded * 100) / evt.total);        
                            console.log(progress + '%');
                        })
                    
                }
            })
            let container = this.$el.querySelector('.ql-toolbar.ql-snow')
            container.appendChild(fileInput)
        }
        fileInput.click()
    }
    // 後面再補上uploadImage說明如何客製化圖片上傳功能
  },
}
</script>