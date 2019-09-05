<template>
    <div v-if="validationErrors">
        <v-alert
            v-model="isActive"
            dismissible
            dense
            outlined
            type="error">
            <div v-for="(value, key) in validationErrors" :key="key">
                {{ value }}
            </div>
        </v-alert>
    </div>
</template>

<script>
export default {
    props: {
        errors: {
            type: Object,
            required: true
        }
    },
    computed: {
        validationErrors(){
            let errors = Object.values(this.errors);
            errors = errors.flat();
            return errors;
        },
        isActive() {
            return Object.keys(this.errors).length === 0 ? false : true;
        }
    }
}
</script>