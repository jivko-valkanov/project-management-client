<template>
    <div>
        <v-btn 
        color="primary" 
        @click="$refs.inputUpload.click()"
        :disabled="loading"
        >Select file
        </v-btn>

        <v-btn 
        v-show="this.selectFile!=null"
        :disabled="loading"
        :loading="loading"
        @click="onUpload()">
        Upload
        <v-icon right>cloud_upload</v-icon>
        </v-btn>

        <input 
        v-show="false" 
        ref="inputUpload" 
        type="file" 
        @change="handleUploadFile" >
    </div>
</template>

<script>
import FileService from '@/services/FileService'

export default {
    data() {
        return {
            selectFile:null,
            loading: false,
        }
    },
    methods: {
        handleUploadFile(event) {
            this.selectFile = event.target.files[0];
        },
        async onUpload() {
            this.loading = true;
            let fd = new FormData();
            fd.append("document", this.selectFile, this.selectFile.name);

            await FileService
            .uploadFile(fd)
            .then(() => {
                this.selectFile = null;
                this.loading = false;
            }).catch(() => {
                this.selectFile = null;
                this.loading = false;
            });
        }
    }
}
</script>